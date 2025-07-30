import React, { useState } from 'react';
import './AnimalPage.css';
import {
  saveAnimal,
  getAnimalById,
  updateAnimal,
  deleteAnimalById
} from '../Service/BackendPeti9API';

const AnimalPage: React.FC = () => {
  const [form, setForm] = useState({
    name: '',
    race: '',
    birthDate: '',
    color: '',
    weight: '',
    animalGuardianId: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [action, setAction] = useState('salvar');
  const [animalId, setAnimalId] = useState<number | null>(null);
  const [showIdModal, setShowIdModal] = useState(false);
  const [inputAnimalId, setInputAnimalId] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      if (action === 'salvar') {
        await saveAnimal({
          ...form,
          weight: parseFloat(form.weight),
          animalGuardianId: parseInt(form.animalGuardianId)
        });
      } else if (action === 'editar' && animalId !== null) {
        await updateAnimal(animalId, {
          ...form,
          weight: parseFloat(form.weight),
          animalGuardianId: parseInt(form.animalGuardianId)
        });
      } else if (action === 'excluir' && animalId !== null) {
        await deleteAnimalById(animalId);
        setForm({
          name: '',
          race: '',
          birthDate: '',
          color: '',
          weight: '',
          animalGuardianId: ''
        });
      }
      setSuccess(true);
    } catch (error) {
      console.error('Erro ao realizar ação:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleActionChange = (selectedAction: string) => {
    setAction(selectedAction);
    if (selectedAction === 'editar' || selectedAction === 'excluir') {
      setInputAnimalId('');
      setShowIdModal(true);
    } else {
      setAnimalId(null);
      setForm({
        name: '',
        race: '',
        birthDate: '',
        color: '',
        weight: '',
        animalGuardianId: ''
      });
    }
  };

  const handleConfirmId = async () => {
    if (!inputAnimalId) return;

    const id = parseInt(inputAnimalId);
    setAnimalId(id);
    setShowIdModal(false);

    if (action === 'editar') {
      try {
        const response = await getAnimalById(id);
        setForm({
          name: response.name,
          race: response.race,
          birthDate: response.birthDate,
          color: response.color,
          weight: response.weight.toString(),
          animalGuardianId: response.animalGuardianId != null ? response.animalGuardianId.toString() : ''
        });
      } catch (error) {
        console.error('Animal não encontrado', error);
        alert('Animal não encontrado com esse ID.');
      }
    }
  };

  return (
    <div>
      <div className="container">
        <h1>Gerenciar Animal</h1>
        <div className="actions">
          <button onClick={() => handleActionChange('salvar')}>Salvar</button>
          <button onClick={() => handleActionChange('editar')}>Editar</button>
          <button onClick={() => handleActionChange('excluir')}>Excluir</button>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <label>Nome:</label>
          <input name="name" value={form.name} onChange={handleChange} required />

          <label>Raça:</label>
          <input name="race" value={form.race} onChange={handleChange} required />

          <label>Data de Nascimento:</label>
          <input
            name="birthDate"
            value={form.birthDate}
            onChange={handleChange}
            placeholder="dd/MM/yyyy"
            required
          />

          <label>Cor:</label>
          <input name="color" value={form.color} onChange={handleChange} required />

          <label>Peso (kg):</label>
          <input
            name="weight"
            type="number"
            step="0.01"
            value={form.weight}
            onChange={handleChange}
            required
          />

          <label>ID do Tutor:</label>
          <input
            name="animalGuardianId"
            type="number"
            value={form.animalGuardianId}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? 'Salvando...' : action === 'excluir' ? 'Excluir' : 'Salvar'}
          </button>

          {success && <p className="success-msg">Ação realizada com sucesso!</p>}
        </form>
      </div>

      {showIdModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{action === 'editar' ? 'Editar Animal' : 'Excluir Animal'}</h2>
            <label>Digite o ID do animal:</label>
            <input
              type="number"
              value={inputAnimalId}
              onChange={(e) => setInputAnimalId(e.target.value)}
            />
            <div className="modal-buttons">
              <button onClick={handleConfirmId}>Confirmar</button>
              <button onClick={() => setShowIdModal(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnimalPage;
