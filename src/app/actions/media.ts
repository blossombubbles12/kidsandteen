'use server';

import cloudinary from '@/lib/cloudinary';
import { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';

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
    folder: string = 'mydog/uploads',
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

export async function getMediaFromFolder(folder: string = '', limit: number = 100) {
    try {
        // Fetch images
        const { resources: images } = await cloudinary.api.resources({
            resource_type: 'image',
            type: 'upload',
            prefix: folder,
            max_results: Math.floor(limit / 2),
        });

        // Fetch videos
        const { resources: videos } = await cloudinary.api.resources({
            resource_type: 'video',
            type: 'upload',
            prefix: folder,
            max_results: Math.floor(limit / 2),
        });

        // Combine and sort by creation date (newest first)
        return [...images, ...videos].sort((a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
    } catch (error) {
        console.error('Cloudinary fetch error:', error);
        return [];
    }
}
