import AboutPageContent from "@/components/AboutPageContent";
import { getFolderImages } from "@/app/actions/media";

export default async function AboutPage() {
    const uploadImages = await getFolderImages("ktuafrica/uploads", 10);
    return <AboutPageContent uploadImages={uploadImages} />;
}
