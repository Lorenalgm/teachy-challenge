import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Table from '../components/Table';
import { fetchCharacters } from '../services/swapiService';
import { infiniteScroll } from '../utils/infiniteScroll';

export default function Home() {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [preloading, setPreloading] = useState(false);

  const loadCharacters = async (page) => {
    setLoading(true);
    setError(null);
    try {
      const newCharacters = await fetchCharacters(page);
      setCharacters((prev) => [...prev, ...newCharacters]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCharacters(page);
  }, [page]);

  useEffect(() => {
    const prefetchNextPage = async () => {
      if (preloading) return;
      setPreloading(true);
      try {
        const nextPage = page + 1;
        const newCharacters = await fetchCharacters(nextPage);
        setCharacters((prev) => [...prev, ...newCharacters]);
        setPage(nextPage);
      } catch (err) {
        // console.error(err.message);
      } finally {
        setPreloading(false);
      }
    };

    const removeScrollListener = infiniteScroll(prefetchNextPage, 300);
    return () => removeScrollListener();
  }, [page, preloading]);

  const headers = ["Nome", "Altura", "N° de espaçonaves", "Filmes"];

  const renderRow = (character, index) => (
    <>
      <div>{character.name}</div>
      <div>{character.height}m</div>
      <div>{character.starships.length}</div>
      <div>
        {character.films.map(film => film.title).join(', ')}
      </div>
    </>
  );

  return (
    <Layout>
      <h1 className="text-xl font-bold mb-4">Personagens dos filmes de Star Wars</h1>
      {error && <p className="text-red-500">{error}</p>}
      <Table headers={headers} items={characters} renderRow={renderRow} />
      {loading && <p className="text-center mt-4">Carregando...</p>}
    </Layout>
  );
}
