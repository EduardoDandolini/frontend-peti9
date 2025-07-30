import { useState } from 'react';
import { getAnimalById, getAnimalByName } from '../Service/BackendPeti9API';
import type { AnimalResponse } from '../Interface/AnimalResponse';
import "./AnimalConsultPage.css"

const AnimalConsultPage = () => {
  const [animalId, setAnimalId] = useState<number | null>(null);
  const [animalName, setAnimalName] = useState<string>('');
  const [animals, setAnimals] = useState<AnimalResponse[] | null>(null);

  const handleConsultById = async () => {
    if (animalId) {
      try {
        const response = await getAnimalById(animalId);
        setAnimals([response]);
      } catch (error) {
        console.error('Erro ao consultar animal por ID:', error);
      }
    }
  };

  const handleConsultByName = async () => {
    if (animalName) {
      try {
        const response = await getAnimalByName(animalName);
        setAnimals(response);
      } catch (error) {
        console.error('Erro ao consultar animal por nome:', error);
      }
    }
  };

  return (
    <div>
      <h2>Consulta de Animal</h2>
      <form>
        <label>ID do Animal:</label>
        <input type="number" value={animalId !== null ? animalId.toString() : ''} onChange={(e) => setAnimalId(Number(e.target.value))}/>
        <button type="button" onClick={handleConsultById}>Consultar por ID</button>
      </form>
      <form>
        <label>Nome do Animal:</label>
        <input type="text" value={animalName} onChange={(e) => setAnimalName(e.target.value)} />
        <button type="button" onClick={handleConsultByName}>Consultar por Nome</button>
      </form>
      {animals && (
        <div>
          <h3>Dados do Animal</h3>
          <ul>
            {animals.map((animal) => (
              <li key={animal.id}>
                <p>ID: {animal.id}</p>
                <p>Nome: {animal.name}</p>
                <p>Raça: {animal.race}</p>
                <p>Data de Nascimento: {animal.birthDate}</p>
                <p>Cor: {animal.color}</p>
                <p>Peso: {animal.weight}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AnimalConsultPage;