'use client';
import Image from 'next/image';

interface GameboyScreenProps {
  imageUrl: string;
  alt: string;
  pokemonName: string;
  pokemonNumber: number;
  pokemonDesc: string;
}

export default function GameboyScreen({
  imageUrl,
  alt,
  pokemonName,
  pokemonNumber,
  pokemonDesc
}: GameboyScreenProps) {
  const formattedNumber = `#${String(pokemonNumber).padStart(3, '0')}`;
  return (
    <div id="greenscreen" className="aspect-[3/2] relative rounded overflow-hidden border-[#8b9c4f] border-1 bg-[#abbc5f] text-black/80">
      <div id="greenscreen-content" className="flex flex-col w-full h-full p-2">
        <div id="greenscreen-name-and-number" className="mb-1 pb-1 border-b border-black/30">
          <span className="uppercase">{formattedNumber} - {pokemonName}</span>
        </div>
        <div id="greenscreen-image-and-desc" className="flex flex-grow min-h-0 pt-1">
          <div id="greenscreen-image" className="w-1/2 flex items-center justify-center pr-1">
            <Image
              src={imageUrl}
              alt={alt}
              width={400} // MAX width and height, they won't ever hit this due to 500px max width.
              height={400}
              className="object-contain grayscale opacity-90 mix-blend-multiply max-w-full max-h-full"
              priority
            />
          </div>
          <div id="greenscreen-desc" className="w-1/2 flex flex-col pl-1">
            <div className="text-md leading-tight overflow-y-auto h-full"> 
              {pokemonDesc}
            </div>
          </div>
        </div>
        <div id="scanline-overlay" className="absolute inset-0 pointer-events-none scanlines"></div>
      </div>
    </div>
  );
}