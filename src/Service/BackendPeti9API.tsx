import axios from "axios";
import type { AnimalGuardianRequest } from "../Interface/AnimalGuardianRequest";
import type { AnimalGuardianResponse } from "../Interface/AnimalGuardianResponse";
import type { AnimalRequest } from "../Interface/AnimalRequest";
import type { AnimalResponse } from "../Interface/AnimalResponse";

const apiClient = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const saveAnimalGuardian = async (
  request: AnimalGuardianRequest
): Promise<void> => {
  try {
    await apiClient.post<void>("api/v1/animal-guardian", request);
    console.log("Responsável salvo com sucesso!");
  } catch (error) {
    console.error("Erro ao salvar responsável:", error);
    throw error;
  }
};

export const getAnimalGuardianById = async (
  id: number
): Promise<AnimalGuardianResponse> => {
  try {
    const response = await apiClient.get<AnimalGuardianResponse>(
      `api/v1/animal-guardian/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar responsável por ID:", error);
    throw error;
  }
};

export const getAnimalGuardianByName = async (
  name: string
): Promise<AnimalGuardianResponse[]> => {
  try {
    const response = await apiClient.get<AnimalGuardianResponse[]>(
      `api/v1/animal-guardian/name/${name}`
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar responsáveis por nome:", error);
    throw error;
  }
};

export const saveAnimal = async (
  request: AnimalRequest
): Promise<void> => {
  try {
    await apiClient.post<void>("api/v1/animals", request);
    console.log("Animal salvo com sucesso!");
  } catch (error) {
    console.error("Erro ao salvar animal:", error);
    throw error;
  }
};

export const getAnimalById = async (
  id: number
): Promise<AnimalResponse> => {
  try {
    const response = await apiClient.get<AnimalResponse>(`api/v1/animals/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar animal por ID:", error);
    throw error;
  }
};

export const getAnimalByName = async (
  name: string
): Promise<AnimalResponse[]> => {
  try {
    const response = await apiClient.get<AnimalResponse[]>(`api/v1/animals/name/${name}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar animais por nome:", error);
    throw error;
  }
};

export const updateAnimal = async (
  id: number,
  request: AnimalRequest
): Promise<void> => {
  try {
    await apiClient.put<void>(`api/v1/animals/${id}`, request);
    console.log("Animal atualizado com sucesso!");
  } catch (error) {
    console.error("Erro ao atualizar animal:", error);
    throw error;
  }
};

export const deleteAnimalById = async (id: number): Promise<void> => {
  try {
    await apiClient.delete<void>(`api/v1/animals/${id}`);
    console.log("Animal deletado com sucesso!");
  } catch (error) {
    console.error("Erro ao deletar animal:", error);
    throw error;
  }
};
