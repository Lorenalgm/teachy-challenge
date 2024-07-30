import { fetchCharacters } from '../services/swapiService';

const updateCharacters = (prev, newCharacters) => {
  const uniqueCharacters = new Set(prev.map(character => character.name));
  return [...prev, ...newCharacters.filter(character => !uniqueCharacters.has(character.name))];
};

export const loadCharacters = async (page, setCharacters, setPage, setLoading, setError, setPreloading) => {
  setLoading(true);
  if (setError) setError(null);
  try {
    const newCharacters = await fetchCharacters(page);
    setCharacters((prev) => updateCharacters(prev, newCharacters));
    setPage(page + 1);
  } catch (err) {
    if (setError) setError(err.message);
  } finally {
    setLoading(false);
    if (setPreloading) setPreloading(false);
  }
};
