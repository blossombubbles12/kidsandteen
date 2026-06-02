import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function run() {
    try {
        const res = await cloudinary.search
            .expression(`resource_type:image`)
            .sort_by('created_at', 'desc')
            .max_results(20)
            .execute();
        console.log("Total recent images:", res.resources.length);
        res.resources.forEach(r => {
            console.log(`- folder: ${r.folder}, url: ${r.secure_url}`);
        });
    } catch(e) { console.error(e) }
}
run();
