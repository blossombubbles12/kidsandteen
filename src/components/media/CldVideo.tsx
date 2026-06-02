'use client';

import { CldVideoPlayer, CldVideoPlayerProps } from 'next-cloudinary';
import 'next-cloudinary/dist/cld-video-player.css';

/**
 * A component for rendering optimized Cloudinary videos using CldVideoPlayer.
 */
export function CldVideo(props: CldVideoPlayerProps) {
    return (
        <div className="w-full aspect-video rounded-3xl overflow-hidden shadow-xl border border-border/50">
            <CldVideoPlayer
                {...props}
                colors={{
                    accent: '#ff6b00', // KTU primary color
                    base: '#000000',
                    text: '#ffffff',
                }}
                fontFace="Outfit"
            />
        </div>
    );
}
