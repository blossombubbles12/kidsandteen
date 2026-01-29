'use server'

import cloudinary from '@/lib/cloudinary';

export async function getAllMedia(maxResults: number = 500) {
    try {
        const rootFolder = 'mydogandigroup';

        const [images, videos] = await Promise.all([
            cloudinary.search
                .expression(`resource_type:image AND folder:${rootFolder}/*`)
                .sort_by('created_at', 'desc')
                .max_results(maxResults)
                .with_field('context')
                .with_field('tags')
                .execute(),
            cloudinary.search
                .expression(`resource_type:video AND folder:${rootFolder}/*`)
                .sort_by('created_at', 'desc')
                .max_results(maxResults)
                .with_field('context')
                .with_field('tags')
                .execute()
        ]);

        return {
            success: true,
            media: [...images.resources, ...videos.resources].sort((a, b) =>
                new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
            )
        };
    } catch (error) {
        console.error('Get all media error:', error);
        return { success: false, error: 'Failed to fetch media', media: [] };
    }
}

export async function deleteMedia(publicId: string, resourceType: 'image' | 'video' = 'image') {
    try {
        await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
        return { success: true };
    } catch (error) {
        console.error('Delete media error:', error);
        return { success: false, error: 'Failed to delete media' };
    }
}

export async function createFolder(folderPath: string) {
    try {
        await cloudinary.api.create_folder(folderPath);
        return { success: true };
    } catch (error) {
        console.error('Create folder error:', error);
        return { success: false, error: 'Failed to create folder' };
    }
}

export async function deleteFolder(folderPath: string) {
    try {
        await cloudinary.api.delete_folder(folderPath);
        return { success: true };
    } catch (error) {
        console.error('Delete folder error:', error);
        return { success: false, error: 'Failed to delete folder' };
    }
}

export async function getAllFolders() {
    try {
        const rootFolder = 'mydogandigroup';
        const allFolders: any[] = [];

        async function fetchSubfolders(path: string) {
            try {
                const subResult = await cloudinary.api.sub_folders(path);
                for (const folder of subResult.folders) {
                    allFolders.push(folder);
                    await fetchSubfolders(folder.path);
                }
            } catch (e) {
                // Folder might be empty or inaccessible
            }
        }

        // Start from mydogandigroup root and fetch all subfolders
        await fetchSubfolders(rootFolder);

        return { success: true, folders: allFolders };
    } catch (error) {
        console.error('Get folders error:', error);
        return { success: false, error: 'Failed to fetch folders', folders: [] };
    }
}
