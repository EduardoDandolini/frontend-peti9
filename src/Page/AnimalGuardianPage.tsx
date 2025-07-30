import React, { useState } from "react";
import { saveAnimalGuardian } from "../Service/BackendPeti9API";
import type { AnimalGuardianRequest } from "../Interface/AnimalGuardianRequest";
import "./AnimalGuardianPage.css"

const AnimalGuardianPage = () => {
  const [form, setForm] = useState<AnimalGuardianRequest>({
    name: "",
    surname: "",
    birthDate: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await saveAnimalGuardian(form);
      alert("Tutor cadastrado com sucesso!");
      setForm({ name: "", surname: "", birthDate: "" });
    } catch (error) {
      alert("Erro ao cadastrar tutor.");
    }
  };

  return (
    <div className={"container"}>
      <h2>Cadastrar Tutor</h2>
      <form onSubmit={handleSubmit} className={"form"}>
        <label>Nome:</label>
        <input name="name" value={form.name} onChange={handleChange} required />

        <label>Sobrenome:</label>
        <input name="surname" value={form.surname} onChange={handleChange} required />

        <label>Data de nascimento:</label>
        <input
          type="text"
          name="birthDate"
          placeholder="dd/MM/yyyy"
          value={form.birthDate}
          onChange={handleChange}
          required
        />

        <button type="submit">Salvar</button>
      </form>
    </div>
  );
};

export default AnimalGuardianPage;
