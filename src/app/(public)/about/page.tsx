import AboutPageContent from "@/components/AboutPageContent";
import { getFolderImages } from "@/app/actions/media";

export const dynamic = 'force-dynamic';

export default async function AboutPage() {
    const sliderImages = await getFolderImages("ktuafrica/sliders", 6);
    let uploadImages = await getFolderImages("ktuafrica/uploads", 10);
    if (uploadImages.length === 0) {
        uploadImages = await getFolderImages("ktuafrica", 10);
    }
    return <AboutPageContent uploadImages={uploadImages} sliderImages={sliderImages} />;
}
