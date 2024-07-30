const BASE_URL = 'https://swapi.dev/api';

export async function fetchCharacters(page) {
  const response = await fetch(`${BASE_URL}/people/?page=${page}`);
  
  if (!response.ok) {
    throw new Error('Erro ao buscar personagens! Tente novamente mais tarde.');
  }
  const data = await response.json();

  const charactersResponse = await Promise.all(
    data.results.map(async (character) => {
      const starshipsResponse = await Promise.all(
        character.starships.map((url) => fetch(url).then((response) => response.json()))
      );
      const filmsResponse = await Promise.all(
        character.films.map((url) => fetch(url).then((response) => response.json()))
      );
      return {
        ...character,
        starships: starshipsResponse,
        films: filmsResponse,
      };
    })
  );

  return charactersResponse;
}
