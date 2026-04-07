import { APIResponse, Character } from "@/types/character";

const API_BASE_URL = "https://rickandmortyapi.com/api";

export async function getCharacters(page: number = 1): Promise<APIResponse<Character>> {
  const response = await fetch(`${API_BASE_URL}/character?page=${page}`);
  if (!response.ok) {
    throw new Error(`Error fetching characters: ${response.statusText}`);
  }
  return response.json();
}

export async function getCharacterById(id: number): Promise<Character> {
  const response = await fetch(`${API_BASE_URL}/character/${id}`);
  if (!response.ok) {
    throw new Error(`Error fetching character with id ${id}: ${response.statusText}`);
  }
  return response.json();
}
