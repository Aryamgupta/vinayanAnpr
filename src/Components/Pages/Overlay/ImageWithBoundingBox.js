import React, { useEffect, useRef } from 'react';

function ImageWithBoundingBox({ imageUrl, coordinatesString }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        // Convert the coordinates string into an array of numbers
        const coordinates = coordinatesString.split(',').map(Number);
        console.log(coordinates);
        const [x, y, width, height] = coordinates;

        // Create a new Image object
        const img = new Image();
        img.src = imageUrl;

        img.onload = function() {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');

            canvas.width = img.width;
            canvas.height = img.height;


            ctx.drawImage(img, 0, 0);

            ctx.strokeStyle = 'blue'; 
            ctx.lineWidth = 4; 
            ctx.strokeRect(x, y, width, height); 
        };

        img.onerror = function() {
            console.error('Failed to load image:', imageUrl);
        };
    }, [imageUrl, coordinatesString]);

    return <canvas ref={canvasRef}></canvas>;
}

export default ImageWithBoundingBox;
