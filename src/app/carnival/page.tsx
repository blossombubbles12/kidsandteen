import { getMediaFromFolder } from "@/app/actions/media";
import { MediaAsset } from "@/components/media/GalleryGrid";
import { CarnivalClient } from "@/components/carnival/CarnivalClient";

export default async function CarnivalPage() {
    const cloudinaryAssets = await getMediaFromFolder('mydogandigroup', 50);

    const galleryMedia: MediaAsset[] = cloudinaryAssets
        .filter((asset: any) => asset.resource_type === 'image')
        .map((asset: any) => ({
            id: asset.public_id,
            src: asset.secure_url,
            cloudinaryId: asset.public_id,
            type: 'image' as const,
            alt: asset.context?.custom?.alt || "Carnival Moment",
            caption: asset.context?.custom?.caption || "Lagos Dog Carnival"
        }))
        .sort(() => Math.random() - 0.5)
        .slice(0, 7);

    return <CarnivalClient galleryMedia={galleryMedia} />;
}
