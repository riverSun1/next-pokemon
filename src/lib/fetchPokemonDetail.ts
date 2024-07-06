export const fetchPokemonDetail = async (id: string) => {
  try {
    const response = await fetch(
      `https://pokemon-sun1.netlify.app/api/pokemons/${id}`
    );
    const pokemon = await response.json();
    return pokemon;
  } catch (error) {
    console.error(error);
    return null;
  }
};
