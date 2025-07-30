import type { AnimalResponse } from "./AnimalResponse";

export interface AnimalGuardianResponse {
  id: number;
  name: string;
  surname: string;
  birthDate: string; // formato: "dd/MM/yyyy"
  animals: AnimalResponse[];
}
