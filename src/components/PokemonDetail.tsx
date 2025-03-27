'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import GameboyScreen from './GameboyScreen';

// Interface
interface PokemonDetailProps {
  pokemon: any;
  pokemonSpecies: any;
}

// Constants
const MAX_POKEMON_ID = 1025; // Pecharunt currently the highest pokemon in the nat'l dex

// Helper funcs
function getTypeColor(type: string): string {
  const colors: { [key: string]: string } = {
    normal: 'bg-gray-400', fire: 'bg-red-500', water: 'bg-blue-500',
    electric: 'bg-yellow-400', grass: 'bg-green-500', ice: 'bg-blue-300',
    fighting: 'bg-red-700', poison: 'bg-purple-500', ground: 'bg-yellow-600',
    flying: 'bg-indigo-300', psychic: 'bg-pink-500', bug: 'bg-green-600',
    rock: 'bg-yellow-700', ghost: 'bg-purple-700', dragon: 'bg-indigo-600',
    dark: 'bg-gray-800', steel: 'bg-gray-500', fairy: 'bg-pink-300',
  };
  return colors[type] || 'bg-gray-400';
}

function formatStatName(statName: string): string {
  const statNameMap: { [key: string]: string } = {
    'hp': 'HP', 'attack': 'Attack', 'defense': 'Defense',
    'special-attack': 'Sp. Atk', 'special-defense': 'Sp. Def', 'speed': 'Speed'
  };
  return statNameMap[statName] || statName;
}

export default function PokemonDetail({ pokemon, pokemonSpecies }: PokemonDetailProps) {
  // State Vars
  const [isLeftLightOn, setIsLeftLightOn] = useState(false);
  const [isRightLightOn, setIsRightLightOn] = useState(false);
  const [activeTopLight, setActiveTopLight] = useState(0); // 0=red, 1=yellow, 2=green

  // Light cycling effect
  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveTopLight(prev => (prev + 1) % 3);
    }, 750);
    return () => clearInterval(intervalId);
  }, []);

  // Gameboy hover lights
  const handleInteraction = (lightsToAffect: ('left' | 'right')[], turnOn: boolean) => {
    if (lightsToAffect.includes('left')) setIsLeftLightOn(turnOn);
    if (lightsToAffect.includes('right')) setIsRightLightOn(turnOn);
  };

  if (!pokemon || !pokemonSpecies) {
    return <div className="mx-auto p-4">Loading...</div>;
  }

  // Description--1st flavor text entry isn't always English, so we'll grab the first one.
  const descriptionText = pokemonSpecies?.flavor_text_entries?.find(
    (entry: { flavor_text: string; language: { name: string } }) =>
      entry.language.name === 'en'
  ).flavor_text.replace(/[\n\f]/g, ' ');

  const cryUrl = pokemon?.cries?.latest;
  const playCry = () => {
    if (cryUrl) {
      const audio = new Audio(cryUrl);
      audio.play().catch(error => {
      console.error("Error playing cry:", error);
      });
    } else {
      console.warn("No cry URL available for this Pokemon.");
      setIsLeftLightOn(false);
      setIsRightLightOn(false);
    }
  };

  // Style helpers
  const commonButtonStyles = "px-4 py-1 rounded-md shadow-sm transition-colors flex items-center";
  const focusRingStyles = "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#d1d5db]";

  const screenLightBaseStyle = "w-2.5 h-2.5 rounded-full border border-black/50 transition-all duration-100";
  const screenLightOffStyle = "bg-red-800/80";
  const screenLightOnStyle = "bg-red-500 shadow-[0_0_4px_1px_rgba(255,50,50,0.7)]";

  const topLightBase = "w-2.5 h-2.5 rounded-full border border-black/40 transition-all duration-150";
  const topLightRedOff = "bg-red-900/80";
  const topLightYellowOff = "bg-yellow-900/80";
  const topLightGreenOff = "bg-green-900/80";
  const topLightRedOn = "bg-red-500 shadow-[0_0_4px_1px_rgba(255,100,100,0.7)]";
  const topLightYellowOn = "bg-yellow-400 shadow-[0_0_4px_1px_rgba(255,255,100,0.7)]";
  const topLightGreenOn = "bg-green-500 shadow-[0_0_4px_1px_rgba(100,255,100,0.7)]";

  return (
    <div id='pokemon-detail-content'>
      
      {/* Lens/Logo */}
      <div id='lens-container' className="absolute top-1.5 left-1.5 z-20 group cursor-pointer" title="FS Button (Decorative)">
        <div className="bg-gradient-to-br from-gray-400 via-gray-500 to-gray-700 rounded-full p-1 shadow-md shadow-black/30">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center relative overflow-hidden shadow-[inset_0_2px_5px_rgba(0,0,0,0.4)]"
            style={{
              backgroundImage: 'radial-gradient(circle at 50% 45%, rgba(120, 180, 255, 0.9) 0%, rgba(59, 130, 246, 1) 60%, rgba(29, 78, 216, 1) 100%)',
            }}
          >
            <div
                className="absolute top-[6px] left-1/2 -translate-x-1/2 w-[70%] h-[40%] bg-white/40 rounded-[50%_50%_50%_50%/80%_80%_20%_20%] opacity-80 blur-[1px] rotate-[-5deg]"
                aria-hidden="true"
            >
            </div>
            <span className="font-bold text-xl relative z-10 select-none drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]">
              FS
              <span
                className="absolute bottom-[2px] left-0 h-[2px] bg-white w-0 group-hover:w-full transition-[width] duration-400 ease-in-out"
                aria-hidden="true"
              >
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* Rest of NavBar */}
      <div className="pokedex-ridge-wrapper">
        <div className="pokedex-navbar-ridge"></div>
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 z-10">

          <h1 className="text-4xl tracking-wider pl-20 drop-shadow-[1px_1px_1px_rgba(0,0,0,0.5)]">
              FrameSetDex
          </h1>

          <div className="flex items-center space-x-2">
              <div className={`${topLightBase} ${activeTopLight === 0 ? topLightRedOn : topLightRedOff}`}></div>
              <div className={`${topLightBase} ${activeTopLight === 1 ? topLightYellowOn : topLightYellowOff}`}></div>
              <div className={`${topLightBase} ${activeTopLight === 2 ? topLightGreenOn : topLightGreenOff}`}></div>
          </div>

        </div>
      </div>

      {/* Page content */}
      <div className="pt-4 pb-8 px-4">

        {/* Screen border w/ lights, screen, nav buttons */}
        <div className="gameboy-screen-container mb-4">
          <div className="gameboy-screen-border relative">
            <div className="absolute top-2 left-0 right-0 flex justify-center items-center space-x-10 z-10">
                <div
                    className={`${screenLightBaseStyle} ${isLeftLightOn ? screenLightOnStyle : screenLightOffStyle}`}
                    aria-hidden="true"
                ></div>
                <div
                    className={`${screenLightBaseStyle} ${isRightLightOn ? screenLightOnStyle : screenLightOffStyle}`}
                    aria-hidden="true"
                ></div>
            </div>
            <div className="gameboy-screen-content-area pt-8">
              <GameboyScreen
                imageUrl={pokemon.sprites?.other?.['official-artwork']?.front_default ?? '/placeholder.png'}
                alt={pokemon.name ?? 'Pokemon'}
                pokemonName={pokemon.name ?? 'Unknown'}
                pokemonNumber={pokemon.id ?? 0}
                pokemonDesc={descriptionText}
              />
              <div className="flex justify-center items-center gap-3 mt-3">
                {pokemon.id > 1 ? (
                  <Link
                    href={`/pokemon/${pokemon.id - 1}`}
                    className={`${commonButtonStyles} ${focusRingStyles} justify-center bg-blue-600 hover:bg-blue-500 focus:ring-blue-700 h-9 w-16 text-xl`}
                    aria-label="Previous Pokemon"
                    onMouseEnter={() => handleInteraction(['left'], true)}
                    onMouseLeave={() => handleInteraction(['left'], false)}
                    onMouseDown={() => handleInteraction(['left'], true)}
                    onMouseUp={() => handleInteraction(['left'], false)}
                  >
                    ←
                  </Link>
                ) : (
                  <div className={`${commonButtonStyles} invisible h-9 w-16`} aria-hidden="true"></div>
                )}
                {cryUrl ? (
                  <button
                    onClick={playCry}
                    className={`${commonButtonStyles} ${focusRingStyles} gap-2 bg-yellow-400 text-black/80 hover:bg-yellow-300 focus:ring-yellow-400 h-9 w-auto px-4 text-lg`} // Increased text size
                    aria-label={`Play ${pokemon.name} cry`}
                    onMouseEnter={() => handleInteraction(['left', 'right'], true)}
                    onMouseLeave={() => handleInteraction(['left', 'right'], false)}
                    onMouseDown={() => handleInteraction(['left', 'right'], true)}
                    onMouseUp={() => handleInteraction(['left', 'right'], false)}
                  >
                    CRY
                  </button>
                ) : (
                  (pokemon.id > 1 && pokemon.id < MAX_POKEMON_ID) && <div className={`${commonButtonStyles} invisible h-9 w-auto px-4`} aria-hidden="true"></div>
                )}
                {pokemon.id < MAX_POKEMON_ID ? (
                  <Link
                    href={`/pokemon/${pokemon.id + 1}`}
                    className={`${commonButtonStyles} ${focusRingStyles} justify-center bg-blue-600 hover:bg-blue-500 focus:ring-blue-700 h-9 w-16 text-xl`}
                    aria-label="Next Pokemon"
                    onMouseEnter={() => handleInteraction(['right'], true)}
                    onMouseLeave={() => handleInteraction(['right'], false)}
                    onMouseDown={() => handleInteraction(['right'], true)}
                    onMouseUp={() => handleInteraction(['right'], false)}
                  >
                    →
                  </Link>
                ) : (
                  <div className={`${commonButtonStyles} invisible h-9 w-16`} aria-hidden="true"></div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Types */}
        <div className="flex justify-center gap-2 mb-4">
          {pokemon.types?.map((typeInfo: any) => (
            <span
              key={typeInfo.type.name}
              className={`px-3 py-1 rounded-full text-sm font-semibold uppercase tracking-wider shadow ${getTypeColor(typeInfo.type.name)}`}
            >
              {typeInfo.type.name}
            </span>
          ))}
        </div>

        {/* Height/Weight */}
        <div className="grid grid-cols-2 gap-4 mb-4 text-center max-w-[500px] mx-auto">
          <div>
            <h2 className="text-xl font-semibold uppercase tracking-wide mb-1">Height</h2>
            <p className="text-lg">{pokemon.height ? (pokemon.height / 10).toFixed(1) + ' m' : 'N/A'}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold uppercase tracking-wide mb-1">Weight</h2>
            <p className="text-lg">{pokemon.weight ? (pokemon.weight / 10).toFixed(1) + ' kg' : 'N/A'}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="max-w-[500px] mx-auto">
          <h2 className="text-2xl font-semibold mb-3 text-center uppercase tracking-wide">Base Stats</h2>
          {pokemon.stats?.map((stat: any) => (
            <div key={stat.stat.name} className="mb-2.5">
              <div className="flex justify-between text-lg mb-1">
                <span className="uppercase">{formatStatName(stat.stat.name)}</span>
                <span>{stat.base_stat}</span>
              </div>
              <div className="w-full rounded-full h-3 dark:bg-gray-700 overflow-hidden border border-black/20">
                <div
                  className="bg-green-400 h-3"
                  style={{ width: `${Math.min(100, (stat.base_stat / 255) * 100)}%` }} 
                  // 255 is highest base stat (e.g. Blissey #242)
                ></div>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </div> 
  );
}