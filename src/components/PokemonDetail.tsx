import Image from 'next/image';
import Link from 'next/link';

interface PokemonDetailProps {
  pokemon: any; // We'll use 'any' for now and refine this later
}

export default function PokemonDetail({ pokemon }: PokemonDetailProps) {
  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        {/* Header with name and number */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold capitalize">{pokemon.name}</h1>
          <span className="text-xl text-gray-500">#{pokemon.id.toString().padStart(3, '0')}</span>
        </div>
        
        {/* Pokemon image */}
        <div className="flex justify-center mb-6">
          <Image 
            src={pokemon.sprites.other["official-artwork"].front_default}
            width={400}
            height={400}
            alt={pokemon.name}
            priority
          />
        </div>
        
        {/* Type badges */}
        <div className="flex gap-2 mb-6">
          {pokemon.types.map((typeInfo: any) => (
            <span 
              key={typeInfo.type.name}
              className={`px-3 py-1 rounded-full text-white capitalize ${getTypeColor(typeInfo.type.name)}`}
            >
              {typeInfo.type.name}
            </span>
          ))}
        </div>
        
        {/* Basic info */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <h2 className="text-lg font-semibold">Height</h2>
            <p>{(pokemon.height / 10).toFixed(1)} m</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Weight</h2>
            <p>{(pokemon.weight / 10).toFixed(1)} kg</p>
          </div>
        </div>
        
        {/* Stats */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Stats</h2>
          {pokemon.stats.map((stat: any) => (
            <div key={stat.stat.name} className="mb-2">
              <div className="flex justify-between">
                <span className="capitalize">{formatStatName(stat.stat.name)}</span>
                <span>{stat.base_stat}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${Math.min(100, (stat.base_stat / 255) * 100)}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Navigation */}
        <div className="flex justify-between">
          {pokemon.id > 1 && (
            <Link href={`/pokemon/${pokemon.id - 1}`} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
              Previous
            </Link>
          )}
          <Link href={`/pokemon/${pokemon.id + 1}`} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
            Next
          </Link>
        </div>
      </div>
    </div>
  );
}

// Helper functions
function getTypeColor(type: string): string {
  const colors: {[key: string]: string} = {
    normal: 'bg-gray-400',
    fire: 'bg-red-500',
    water: 'bg-blue-500',
    electric: 'bg-yellow-400',
    grass: 'bg-green-500',
    ice: 'bg-blue-300',
    fighting: 'bg-red-700',
    poison: 'bg-purple-500',
    ground: 'bg-yellow-600',
    flying: 'bg-indigo-300',
    psychic: 'bg-pink-500',
    bug: 'bg-green-600',
    rock: 'bg-yellow-700',
    ghost: 'bg-purple-700',
    dragon: 'bg-indigo-600',
    dark: 'bg-gray-800',
    steel: 'bg-gray-500',
    fairy: 'bg-pink-300',
  };
  
  return colors[type] || 'bg-gray-400';
}

function formatStatName(statName: string): string {
  const statNameMap: {[key: string]: string} = {
    'hp': 'HP',
    'attack': 'Attack',
    'defense': 'Defense',
    'special-attack': 'Sp. Atk',
    'special-defense': 'Sp. Def',
    'speed': 'Speed'
  };
  
  return statNameMap[statName] || statName;
}