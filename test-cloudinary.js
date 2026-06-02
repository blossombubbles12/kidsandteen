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
        const result = await cloudinary.search
            .expression(`folder="sliders" AND resource_type:image`)
            .execute();
        console.log("sliders:", result.resources.length);
        
        const result2 = await cloudinary.search
            .expression(`folder="ktuafrica/sliders" AND resource_type:image`)
            .execute();
        console.log("ktuafrica/sliders:", result2.resources.length);
    } catch(e) { console.error(e) }
}
run();
