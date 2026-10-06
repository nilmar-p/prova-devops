import { useEffect, useState } from 'react';

// /api é redirecionado pelo nginx para a api (http://api:3005) dentro da network do compose
const API_URL = '/api/artworks';

function App() {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function carregar() {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`Erro ${response.status}`);
        const data = await response.json();
        setArtworks(data);
      } catch (err) {
        setError('Não foi possível carregar as obras. ' + err.message);
      } finally {
        setLoading(false);
      }
    }
    carregar();
  }, []);

  return (
    <main className="container">
      <h1>Obras de Arte</h1>

      {loading && <p>Carregando...</p>}
      {error && <p className="erro">{error}</p>}

      {!loading && !error && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Artista</th>
              <th>Ano</th>
              <th>Preço</th>
            </tr>
          </thead>
          <tbody>
            {artworks.length === 0 ? (
              <tr>
                <td colSpan="5">Nenhuma obra cadastrada</td>
              </tr>
            ) : (
              artworks.map((obra) => (
                <tr key={obra.id}>
                  <td>{obra.id}</td>
                  <td>{obra.title}</td>
                  <td>{obra.artist}</td>
                  <td>{obra.year}</td>
                  <td>
                    {Number(obra.price).toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </main>
  );
}

export default App;
