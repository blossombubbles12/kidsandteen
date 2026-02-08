import { MediaHero } from "@/components/media/MediaHero";
import { GalleryGrid, MediaAsset } from "@/components/media/GalleryGrid";
import { EventAlbums } from "@/components/media/EventAlbums";
import { MediaSubmission } from "@/components/media/MediaSubmission";
import { getMediaFromFolder, getAlbums, AlbumData } from "@/app/actions/media";

export const dynamic = 'force-dynamic';

export default async function MediaPage() {
    // Fetch all assets from root since user hasn't created a specific folder yet
    // Increased limit to 100 to cover all ~65 assets mentioned by the user
    // Fetch folders/albums
    const [cloudinaryAssets, albums] = await Promise.all([
        getMediaFromFolder('mydogandigroup', 500),
        getAlbums()
    ]);

    // Map Cloudinary resources to MediaAsset type for our GalleryGrid
    const media: MediaAsset[] = cloudinaryAssets
        .filter((asset: any) => {
            // Exclude audio files (mp3, wav, etc.) that might be fetched as resource_type: video
            const isAudio = asset.resource_type === 'video' &&
                (asset.is_audio || asset.format === 'mp3' || asset.format === 'wav');
            return !isAudio;
        })
        .map((asset: any) => ({
            id: asset.public_id,
            src: asset.secure_url,
            cloudinaryId: asset.public_id,
            type: asset.resource_type === 'video' ? 'video' : 'image',
            format: asset.format,
            alt: asset.context?.custom?.alt || "Lagos Dog Carnival / My Dog and I Community Moment",
            // Clean up public_id for caption if no custom caption is set
            caption: asset.context?.custom?.caption ||
                asset.public_id.split('/').pop()?.replace(/[_-]/g, ' ') ||
                "Community Moment"
        }));

    return (
        <div className="min-h-screen bg-background text-foreground">
            <MediaHero media={media} />
            <GalleryGrid initialMedia={media} />
            <EventAlbums albums={albums} />
            <MediaSubmission albums={albums} />
        </div>
    );
}
