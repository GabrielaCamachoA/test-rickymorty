import { Character } from "@/types/character";
import Link from "next/link";

interface CharacterCardProps {
  character: Character;
}

export default function CharacterCard({ character }: CharacterCardProps) {
  const { id, name, status, species, image } = character;
  return (
    <div className="character-card animate-in">
      <div className="card-img-container">
        <img src={image} alt={name} className="card-img" />
      </div>
      <div className="card-body">
        <h2 className="character-name">{name}</h2>
        <div className="status-box">
          <span className={`dot ${status.toLowerCase()}`}></span>
          <span>{status} — {species}</span>
        </div>
        <Link 
          href={`/character/${id}`}
          className="btn-more"
        >
          Ver biografía completa →
        </Link>
      </div>
    </div>
  )
}
