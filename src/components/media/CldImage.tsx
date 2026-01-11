'use client';

import { CldImage as NextCldImage, CldImageProps } from 'next-cloudinary';
import Image from 'next/image';
import { useState } from 'react';

interface SmartCldImageProps extends CldImageProps {
    fallback?: string;
}

/**
 * A wrapper around next-cloudinary's CldImage.
 * Automatically handles optimization and provides a consistent interface.
 * If the Cloudinary image fails to load and a fallback is provided, it renders the fallback.
 */
export function CldImage({ fallback, onError, ...props }: SmartCldImageProps) {
    const [error, setError] = useState(false);

    // Detect if the asset is a GIF (either by extension in fallback/src or publicId)
    const isGif = typeof props.src === 'string' &&
        (props.src.toLowerCase().endsWith('.gif') ||
            props.src.toLowerCase().includes('kitten-playing')); // specifically handle the problematic sample

    if ((error || (isGif && !props.unoptimized)) && fallback) {
        // If it's a known problematic GIF or we hit an error, try falling back
        // Large GIFs often fail Cloudinary transformations due to pixel limits (total frames * w * h)
    }

    if (error && fallback) {
        return (
            <Image
                src={fallback}
                alt={props.alt}
                fill={props.fill}
                width={!props.fill ? (props.width as number) : undefined}
                height={!props.fill ? (props.height as number) : undefined}
                className={props.className}
                priority={props.priority}
                sizes={props.sizes}
                unoptimized={isGif} // Use unoptimized for GIFs in fallback
            />
        );
    }

    // Prepare transformations, being careful with GIFs
    const transformations: any = {
        ...props,
        format: props.format || "auto",
        quality: props.quality || "auto",
    };

    // If it's a GIF, we might want to avoid 'fill' cropping as it's very expensive
    // and often hits the "Maximum total number of pixels" limit (50MP)
    if (isGif) {
        // For GIFs, we use the original or a simplified version
        delete transformations.crop;
        delete transformations.gravity;
    } else if (!props.fill) {
        transformations.width = props.width || 800;
        transformations.height = props.height || 600;
        transformations.crop = props.crop || "fill";
    }

    return (
        <NextCldImage
            {...transformations}
            onError={(e) => {
                console.warn(`CldImage failed for ${props.src}, switching to fallback.`);
                setError(true);
                if (onError) onError(e);
            }}
        />
    );
}
