'use client'
import { getCharacters } from "@/services/api"
import { useEffect, useState } from "react"
import CharacterCard from "@/components/CharacterCard"
import { Character } from "@/types/character"
import LoadingState from "@/components/LoadingState"

export default function Home() {
  const [characters, setCharacters] = useState<Character[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadCharacters() {
      try {
        const data = await getCharacters()
        setCharacters(data.results || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error unknown")
      } finally {
        setLoading(false)
      }
    }
    loadCharacters()
  }, [])

  if (loading) return <div className="container"><LoadingState /></div>
  if (error) return <p style={{ textAlign: 'center', color: 'red', padding: '2rem' }}>Error: {error}</p>

  return (
    <main className="container animate-in">
      <h1>Rick and Morty Explorer</h1>
      <div className="character-grid">
        {characters.map((char) => (
          <CharacterCard
            key={char.id}
            character={char}
          />
        ))}
      </div>
    </main>
  )
}
