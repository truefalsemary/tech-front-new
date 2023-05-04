import React, { useState, useEffect } from 'react';

interface Props {
    src: string;
    alt: string;
}

const SafeImage = (src: string) => {
    const [imageSource, setImageSource] = useState<string | null>(null);

    useEffect(() => {
        const img = new Image();
        img.onload = () => setImageSource(src);
        img.onerror = () => setImageSource(null);
        img.src = src;
    }, [src]);

    return <img src={imageSource || ''} alt={src} />;
};

export default SafeImage;
