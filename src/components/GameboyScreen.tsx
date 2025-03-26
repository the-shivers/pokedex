'use client';
import Image from 'next/image';

interface GameboyScreenProps {
  imageUrl: string;
  alt: string;
}

export default function GameboyScreen({ imageUrl, alt }: GameboyScreenProps) {
    return (
      <div className="relative w-full max-w-sm mx-auto">
        <div className="vt323">charizard</div>
        <div 
          className="relative bg-gray-200 pt-10 pb-12 px-5 rounded-md"
          style={{
            boxShadow: "inset 2px 2px 6px rgba(0,0,0,0.4)"
          }}
        >
          <div className="aspect-3/2 relative rounded overflow-hidden shadow-inner border-[#8b9c4f] border-1">
            <div className="absolute inset-0 bg-[#abbc5f]"></div>
            <Image
              src={imageUrl}
              alt={alt}
              fill
              sizes="(max-width: 768px) 60vw, 280px"
              className="object-contain p-2 grayscale opacity-90 mix-blend-multiply"
              priority
            />
            <div className="absolute inset-0 pointer-events-none bg-scanlines"></div>
          </div>
        </div>
      </div>
    );
  }