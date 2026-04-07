'use client'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { getCharacterById } from '@/services/api'
import { Character } from '@/types/character'
import LoadingState from '@/components/LoadingState'
import Link from 'next/link'

export default function CharacterDetailsPage() {
  const { id } = useParams()
  const router = useRouter()
  const [character, setCharacter] = useState<Character | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    async function fetchDetails() {
      try {
        const data = await getCharacterById(Number(id))
        setCharacter(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar detalles')
      } finally {
        setLoading(false)
      }
    }
    fetchDetails()
  }, [id])

  if (loading) return <div className="container"><LoadingState /></div>
  if (error) return <div className="container"><p style={{ color: 'red' }}>{error}</p><button onClick={() => router.back()}>Volver</button></div>
  if (!character) return <div className="container"><p>No se encontró el personaje</p></div>

  return (
    <div className="container animate-in">
      <Link href="/" className="back-link">
        &larr; Volver a la lista
      </Link>
      
      <div className="detail-layout">
        <img 
          src={character.image} 
          alt={character.name} 
          className="detail-img"
        />
        <div className="detail-content">
          <h2>{character.name}</h2>
          
          <div className="info-item">
            <span className="info-label">Estado</span>
            <div className="status-box">
              <span className={`dot ${character.status.toLowerCase()}`}></span>
              <span>{character.status}</span>
            </div>
          </div>
          
          <div className="info-item">
            <span className="info-label">Especie</span>
            <span>{character.species}</span>
          </div>

          <div className="info-item">
            <span className="info-label">Género</span>
            <span>{character.gender}</span>
          </div>

          <div className="info-item">
            <span className="info-label">Origen</span>
            <span>{character.origin.name}</span>
          </div>

          <div className="info-item">
            <span className="info-label">Ubicación</span>
            <span>{character.location.name}</span>
          </div>

          <div className="info-item">
            <span className="info-label">Episodios</span>
            <span>Aparece en {character.episode.length} capítulos</span>
          </div>
        </div>
      </div>
    </div>
  )
}
