'use server';

import cloudinary from '@/lib/cloudinary';
import { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
import { cache } from 'react';
import { unstable_cache } from 'next/cache';

// Trigger build: 2026-02-08 11:37
const checkCloudinaryConfig = () => {
    if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_SECRET) {
        console.error('❌ Cloudinary configuration is missing in the current environment.');
    } else {
        console.log('✅ Cloudinary configuration detected.');
    }
};

checkCloudinaryConfig();

export type CloudinaryUploadResponse =
    | { success: true; result: UploadApiResponse }
    | { success: false; error: UploadApiErrorResponse | string };

/**
 * Uploads a file to Cloudinary from a server action.
 * @param formData The form data containing the file to upload.
 * @param folder The folder in Cloudinary to store the file.
 * @param tags Optional tags for organization.
 */
export async function uploadToCloudinary(
    formData: FormData,
    folder: string = 'mydogandigroup/uploads',
    tags: string[] = []
): Promise<CloudinaryUploadResponse> {
    const file = formData.get('file') as File;

    if (!file) {
        return { success: false, error: 'No file provided' };
    }

    try {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        return new Promise((resolve) => {
            cloudinary.uploader.upload_stream(
                {
                    folder,
                    tags,
                    resource_type: 'auto', // Automatically detect image or video
                },
                (error, result) => {
                    if (error || !result) {
                        resolve({ success: false, error: error || 'Upload failed' });
                    } else {
                        resolve({ success: true, result });
                    }
                }
            ).end(buffer);
        });
    } catch (error) {
        console.error('Cloudinary upload error:', error);
        return { success: false, error: 'Internal server error during upload' };
    }
}

/**
 * Fetches media from a folder with caching.
 */
export const getMediaFromFolder = cache(async (folder: string = 'mydogandigroup', limit: number = 100) => {
    return unstable_cache(
        async () => {
            try {
                // Fetch both images and videos in one call using Search API
                const result = await cloudinary.search
                    .expression(`folder:"${folder}/*"`)
                    .sort_by('created_at', 'desc')
                    .max_results(limit)
                    .with_field('context')
                    .execute();

                return result.resources || [];
            } catch (error) {
                console.error('Cloudinary fetch error:', error);
                return [];
            }
        },
        [`media-${folder}-${limit}`],
        { revalidate: 3600, tags: ['media'] } // Cache for 1 hour
    )();
});

export interface AlbumData {
    name: string;
    path: string;
    coverSrc?: string;
    coverId?: string;
    count: number;
}

/**
 * Fetches all albums with caching.
 */
export const getAlbums = cache(async (): Promise<AlbumData[]> => {
    return unstable_cache(
        async () => {
            try {
                const targetRoot = 'mydogandigroup';
                let foldersToProcess: any[] = [];

                try {
                    const result = await cloudinary.api.sub_folders(targetRoot);
                    foldersToProcess = result.folders;
                } catch (e) {
                    console.warn(`Folder '${targetRoot}' not found or empty.`);
                }

                const albums = await Promise.all(foldersToProcess.map(async (folder: any) => {
                    try {
                        const { resources, total_count } = await cloudinary.search
                            .expression(`folder:"${folder.path}"`)
                            .sort_by('created_at', 'desc')
                            .max_results(1)
                            .execute();

                        const cover = resources[0];

                        return {
                            name: folder.name,
                            path: folder.path,
                            coverSrc: cover?.secure_url,
                            coverId: cover?.public_id,
                            count: total_count || 0
                        };
                    } catch (e) {
                        console.error(`Error fetching cover for album ${folder.name}:`, e);
                        return {
                            name: folder.name,
                            path: folder.path,
                            count: 0
                        };
                    }
                }));

                return albums.sort((a, b) => a.name.localeCompare(b.name));
            } catch (error) {
                console.error("Error fetching albums:", error);
                return [];
            }
        },
        ['albums-list'],
        { revalidate: 3600, tags: ['albums'] } // Cache for 1 hour
    )();
});
