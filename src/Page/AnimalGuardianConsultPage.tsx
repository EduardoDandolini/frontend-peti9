import { useState } from 'react';
import { getAnimalGuardianById, getAnimalGuardianByName } from '../Service/BackendPeti9API';
import type { AnimalGuardianResponse } from '../Interface/AnimalGuardianResponse';
import "./AnimalGuardianConsultPage.css"

const AnimalGuardianConsultPage = () => {
  const [animalGuardianId, setAnimalGuardianId] = useState<number | null>(null);
  const [animalGuardianName, setAnimalGuardianName] = useState<string>('');
  const [animalGuardians, setAnimalGuardians] = useState<AnimalGuardianResponse[] | null>(null);

  const handleConsultById = async () => {
    if (animalGuardianId) {
      try {
        const response = await getAnimalGuardianById(animalGuardianId);
        setAnimalGuardians([response]);
      } catch (error) {
        console.error('Erro ao consultar responsável por ID:', error);
      }
    }
  };

  const handleConsultByName = async () => {
    if (animalGuardianName) {
      try {
        const response = await getAnimalGuardianByName(animalGuardianName);
        setAnimalGuardians(response);
      } catch (error) {
        console.error('Erro ao consultar responsável por nome:', error);
      }
    }
  };

  return (
    <div>
      <h2>Consulta de Responsável</h2>
      <form>
        <label>ID do Responsável:</label>
        <input type="number" value={animalGuardianId !== null ? animalGuardianId.toString() : ''} onChange={(e) => setAnimalGuardianId(Number(e.target.value))}/>
        <button type="button" onClick={handleConsultById}>Consultar por ID</button>
      </form>
      <form>
        <label>Nome do Responsável:</label>
        <input type="text" value={animalGuardianName} onChange={(e) => setAnimalGuardianName(e.target.value)} />
        <button type="button" onClick={handleConsultByName}>Consultar por Nome</button>
      </form>
      {animalGuardians && (
        <div>
          <h3>Dados do Responsável</h3>
          <ul>
            {animalGuardians.map((guardian) => (
              <li key={guardian.id}>
                <p>ID: {guardian.id}</p>
                <p>Nome: {guardian.name}</p>
                <p>Sobrenome: {guardian.surname}</p>
                <p>Data de Nascimento: {guardian.birthDate}</p>
                <p>Animais:</p>
                <ul>
                  {guardian.animals.map((animal) => (
                    <li key={animal.id}>{animal.name}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AnimalGuardianConsultPage;