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
            />
        );
    }

    return (
        <NextCldImage
            {...props}
            format="auto"
            quality="auto"
            // Default to fill if not specified otherwise, but allow overrides
            {...(props.fill ? {} : { width: props.width || 800, height: props.height || 600 })}
            onError={(e) => {
                setError(true);
                if (onError) onError(e);
            }}
        />
    );
}
