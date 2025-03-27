import PokemonDetail from '@/components/PokemonDetail';

class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
  }
}

class FetchError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FetchError';
  }
}

async function getPokemonData(id: string) {
  const pokemonRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  if (pokemonRes.status === 404) {
    throw new NotFoundError(`Pokémon with ID ${id} not found.`);
  }
  if (!pokemonRes.ok) {
    throw new FetchError(`Failed to fetch Pokémon data (Status ${pokemonRes.status}).`);
  }

  const speciesRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
  if (speciesRes.status === 404) {
     throw new NotFoundError(`Pokémon Species data for ID ${id} not found.`);
  }
  if (!speciesRes.ok) {
    throw new FetchError(`Failed to fetch Pokémon Species data (Status ${speciesRes.status}).`);
  }

  const pokemon = await pokemonRes.json();
  const pokemonSpecies = await speciesRes.json();

  return { pokemon, pokemonSpecies };
}

export default async function PokemonPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const { pokemon, pokemonSpecies } = await getPokemonData(id);
  return <PokemonDetail pokemon={pokemon} pokemonSpecies={pokemonSpecies} />;
}