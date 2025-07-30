export interface AnimalRequest {
  id?: number;
  name: string;
  race: string;
  birthDate: string; // formato: "dd/MM/yyyy"
  color: string;
  weight: number;
  animalGuardianId: number;
}
