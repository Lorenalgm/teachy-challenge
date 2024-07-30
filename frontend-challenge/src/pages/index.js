import { useState, useEffect, useCallback } from 'react';
import Layout from '../components/Layout';
import Table from '../components/Table';
import { infiniteScroll } from '../utils/infiniteScroll';
import { loadCharacters } from '../services/characterService';

export default function Home() {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [preloading, setPreloading] = useState(false);

  const handleLoadCharacters = useCallback(async (initial = false) => {
    if (!initial && preloading) return;
    if (!initial) setPreloading(true);
    await loadCharacters(page, setCharacters, setPage, setLoading, setError, setPreloading);
  }, [page, preloading]);

  useEffect(() => {
    handleLoadCharacters(true);
    const removeScrollListener = infiniteScroll(handleLoadCharacters, 300);
    return () => removeScrollListener();
  }, [handleLoadCharacters]);

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
