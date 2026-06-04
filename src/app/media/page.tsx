import { GalleryGrid, MediaAsset } from "@/components/media/GalleryGrid";
import { MediaSubmission } from "@/components/media/MediaSubmission";
import { getFolderImages } from "@/app/actions/media";
import Image from "next/image";

export const dynamic = 'force-dynamic';

export default async function MediaPage() {
    const [sliderImages, uploadImages] = await Promise.all([
        getFolderImages("ktuafrica/sliders", 6),
        getFolderImages("ktuafrica/uploads", 50),
    ]);

    const media: MediaAsset[] = uploadImages.map((asset: any) => ({
        id: asset.public_id,
        src: asset.secure_url,
        cloudinaryId: asset.public_id,
        type: 'image',
        format: asset.format,
        alt: asset.context?.custom?.alt || "KTU Community Moment",
        caption: asset.context?.custom?.caption ||
            asset.public_id.split('/').pop()?.replace(/[_-]/g, ' ') ||
            "Community Moment"
    }));

    return (
        <div className="min-h-screen bg-[#faf8f5]">
            {/* Hero */}
            <section className="relative py-28 md:py-36 overflow-hidden bg-[#1a1a1a] text-white">
                {sliderImages.length > 0 && (
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url('${sliderImages[0].secure_url}')` }}
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-br from-[#e50a1e]/20 via-[#1a1a1a]/90 to-[#1a1a1a]" />
                <div className="container px-4 md:px-6 relative z-10 text-center">
                    <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white/15 border border-white/25 text-sm font-semibold mb-4 text-white">
                        📸 GALLERY
                    </span>
                    <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-tight">
                        Media & <span className="text-[#e50a1e]">Moments</span>
                    </h1>
                    <p className="text-xl text-white/80 max-w-2xl mx-auto font-semibold leading-relaxed">
                        Real moments from our programs, events, and community — captured and curated for the KTU family.
                    </p>
                </div>
            </section>

            <GalleryGrid initialMedia={media} />
            <MediaSubmission />
        </div>
    );
}
