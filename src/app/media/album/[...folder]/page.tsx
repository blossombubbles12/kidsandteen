import { MediaHero } from "@/components/media/MediaHero";
import { GalleryGrid, MediaAsset } from "@/components/media/GalleryGrid";
import { getMediaFromFolder } from "@/app/actions/media";
import Link from "next/link";
import { ArrowLeft, Camera } from "lucide-react";
import { MediaSubmission } from "@/components/media/MediaSubmission";

export const dynamic = 'force-dynamic';

interface PageProps {
    params: Promise<{
        folder: string[];
    }>;
}

export default async function AlbumPage({ params }: PageProps) {
    const { folder } = await params;
    const folderPath = folder.map(decodeURIComponent).join('/');

    // Fetch assets from the specific folder
    const cloudinaryAssets = await getMediaFromFolder(folderPath, 50);

    // Map Cloudinary resources to MediaAsset type
    const media: MediaAsset[] = cloudinaryAssets
        .filter((asset: any) => {
            const isAudio = asset.resource_type === 'video' &&
                (asset.is_audio || asset.format === 'mp3' || asset.format === 'wav');
            return !isAudio;
        })
        .map((asset: any) => ({
            id: asset.public_id,
            src: asset.secure_url,
            cloudinaryId: asset.public_id,
            type: asset.resource_type === 'video' ? 'video' : 'image',
            alt: asset.context?.custom?.alt || "Gallery Image",
            caption: asset.context?.custom?.caption ||
                asset.public_id.split('/').pop()?.replace(/[_-]/g, ' ') ||
                "Moment"
        }));

    return (
        <div className="min-h-screen bg-background text-foreground pt-24 md:pt-14">
            {/* Header / Nav */}
            <div className="bg-background/80 border-b border-border/40">
                <div className="container px-4 h-16 flex items-center gap-4">
                    <Link href="/media" className="p-2 hover:bg-secondary/20 rounded-full transition-colors">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <h1 className="text-xl font-bold capitalize truncate">
                        {folderPath.split('/').pop()?.replace(/[_-]/g, ' ')}
                    </h1>
                    <span className="text-sm text-muted-foreground ml-2">
                        {media.length} items
                    </span>
                </div>
            </div>

            {/* Reuse MediaHero but maybe smaller or same? Let's skip Hero for album view to be more "App-like" gallery focus, or reuse it? 
               User said "Showcase media in a clean, immersive gallery layout".
               A hero with the slideshow might be nice, but maybe overkill for every sub-album. 
               Let's just show the grid. 
            */}

            <div className="pt-8 mb-20">
                <GalleryGrid initialMedia={media} allowEmpty={true} />
            </div>

            {media.length === 0 && (
                <div className="container px-4 text-center mb-12">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Camera className="w-10 h-10 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">This album is empty</h3>
                    <p className="text-muted-foreground text-lg max-w-md mx-auto">
                        Be the first to add some memories to this collection!
                    </p>
                </div>
            )}

            <MediaSubmission defaultFolder={folderPath} />
        </div>
    );
}
