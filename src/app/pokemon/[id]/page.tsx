import Image from 'next/image';

async function getPokemon(id: string) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (!res.ok) throw new Error('Failed to fetch Pokemon');
    return res.json();
  }
  
  export default async function PokemonPage({ params }: { params: { id: string } }) {
    const { id } = await params
    const pokemon = await getPokemon(id);
    
    return (
      <div>
        <h1 className="text-2xl font-bold capitalize">{pokemon.name}</h1>
        <p>Pokemon #{pokemon.id}</p>
        
        {/* We'll add more content here later */}
        <Image 
            src={pokemon.sprites.other["official-artwork"].front_default}
            width={400}
            height={400}
            alt={pokemon.name}
        />
      </div>
    );
  }