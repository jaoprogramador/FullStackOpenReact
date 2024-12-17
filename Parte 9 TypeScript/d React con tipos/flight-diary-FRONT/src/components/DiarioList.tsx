import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NonSensitiveDiaryEntry, Weather, Visibility } from '../types';

const DiarioList: React.FC = () => {
  const [diarios, setDiarios] = useState<NonSensitiveDiaryEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [newEntry, setNewEntry] = useState({
    date: '',
    weather: Weather.Sunny,
    visibility: Visibility.Good,
    comment: '',
  });

  useEffect(() => {
    axios
      .get<NonSensitiveDiaryEntry[]>('http://localhost:3000/api/diaries')
      .then(response => {
        setDiarios(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Error al obtener los diarios');
        setLoading(false);
        console.error('Error al obtener los diarios', error);
      });
  }, []);

  // Manejo de cambios en el formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewEntry(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Manejo del envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Realizar la solicitud POST para agregar la nueva entrada
    axios
      .post('http://localhost:3000/api/diaries', newEntry)
      .then(response => {
        setDiarios([...diarios, response.data]); // Actualizar la lista de diarios
        setNewEntry({ date: '', weather: Weather.Sunny, visibility: Visibility.Good, comment: '' }); // Limpiar el formulario
        setError(''); // Limpiar cualquier error previo
      })
      .catch((axiosError) => {
        if (axiosError.response) {
          setError(`Error: ${axiosError.response.data || 'Algo salió mal al agregar la entrada del diario.'}`);
        } else if (axiosError.request) {
          setError('Error: No se recibió respuesta del servidor.');
        } else {
          setError(`Error: ${axiosError.message}`);
        }
        console.error('Error al agregar nueva entrada:', axiosError);
      });
  };

  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <div>
      <h1>Agregar Diarios de Vuelo</h1>

      {/* Mostrar errores si los hay */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Formulario para agregar una nueva entrada */}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="date">Fecha:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={newEntry.date}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Clima con radio buttons */}
        <div>
          <label>Clima:</label>
          {Object.values(Weather).map(weather => (
            <div key={weather}>
              <input
                type="radio"
                id={weather}
                name="weather"
                value={weather}
                checked={newEntry.weather === weather}
                onChange={handleInputChange}
              />
              <label htmlFor={weather}>{weather.charAt(0).toUpperCase() + weather.slice(1)}</label>
            </div>
          ))}
        </div>

        {/* Visibilidad con radio buttons */}
        <div>
          <label>Visibilidad:</label>
          {Object.values(Visibility).map(visibility => (
            <div key={visibility}>
              <input
                type="radio"
                id={visibility}
                name="visibility"
                value={visibility}
                checked={newEntry.visibility === visibility}
                onChange={handleInputChange}
              />
              <label htmlFor={visibility}>{visibility.charAt(0).toUpperCase() + visibility.slice(1)}</label>
            </div>
          ))}
        </div>

        <div>
          <label htmlFor="comment">Comentario:</label>
          <textarea
            id="comment"
            name="comment"
            value={newEntry.comment}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit">Agregar Diario</button>
      </form>

      {/* Mostrar la lista de diarios */}
      <h1>Diarios de Vuelo</h1>
      <ul>
        {diarios.map(d => (
          <li key={d.id}>
            <h2>{d.date}</h2>
            <p>Clima: {d.weather}</p>
            <p>Visibilidad: {d.visibility}</p>
            <ComentarioPorId id={d.id} />
          </li>
        ))}
      </ul>
    </div>
  );
};

// Componente para obtener y mostrar el comentario completo de un diario
const ComentarioPorId: React.FC<{ id: number }> = ({ id }) => {
  const [comentario, setComentario] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/diaries/${id}`)
      .then(response => {
        setComentario(response.data.comment);
      })
      .catch(error => {
        console.error('Error al obtener el comentario del diario', error);
      });
  }, [id]);

  return comentario ? <p>Comentario: {comentario}</p> : <p>Cargando comentario...</p>;
};

export default DiarioList;
