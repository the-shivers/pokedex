// src/app/pokemon/[id]/page.tsx
import PokemonDetail from '@/components/PokemonDetail';

async function getPokemon(id: string) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  if (!res.ok) throw new Error('Failed to fetch Pokemon');
  return res.json();
}

async function getPokemonSpecies(id: string) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
  if (!res.ok) throw new Error('Failed to fetch Pokemon Species');
  return res.json();
}

export default async function PokemonPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const pokemon = await getPokemon(id);
  const pokemonSpecies = await getPokemonSpecies(id)
  
  return <PokemonDetail pokemon={pokemon} pokemonSpecies={pokemonSpecies} />;
}