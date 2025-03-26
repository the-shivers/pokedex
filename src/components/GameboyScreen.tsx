'use client';
import Image from 'next/image';

interface GameboyScreenProps {
  imageUrl: string;
  alt: string;
}

export default function GameboyScreen({ imageUrl, alt }: GameboyScreenProps) {
  return (
    <div className="relative w-full max-w-md mx-auto">
        <div className="aspect-square relative rounded overflow-hidden shadow-inner">
            <div className="absolute inset-0 bg-[#abbc5f]"></div>
              <Image
                src={imageUrl}
                alt={alt}
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-contain p-2 grayscale opacity-90 mix-blend-multiply"
                priority
              />
            <div className="absolute inset-0 pointer-events-none bg-scanlines"></div>
        </div>
    </div>
  );
}