import { getMediaFromFolder } from "@/app/actions/media";
import { ACMSPageContent } from "./ACMSPageContent";

export const metadata = {
    title: "Animal Cruelty Must Stop March (ACMS) | My Dog & I Group",
    description: "Raising awareness against animal cruelty. Re-live our historic 2023 march and see how we're making a difference.",
};

export default async function ACMSPage() {
    // Cloudinary folder name as provided by user
    const albumFolder = "animal cruelty must stop march (acms)";
    const media = await getMediaFromFolder(albumFolder, 50);

    return <ACMSPageContent initialMedia={media} />;
}
