import { Pokemon } from "@/types/PokemonType";
import { PropsWithChildren } from "react";

type PokemonCardProps = {
  pokemon: Pokemon;
};

const PokemonCard = ({ pokemon }: PropsWithChildren<PokemonCardProps>) => {
  const spriteUrl = pokemon.sprites?.front_default || "";
  const koreanName = pokemon.korean_name || pokemon.name;
  const types =
    pokemon.types?.map((type) => type.type.korean_name).join(", ") || "Unknown";

  return (
    <div className="pokemon-card">
      {spriteUrl ? (
        <img
          src={spriteUrl}
          alt={koreanName}
          width={96}
          height={96}
          className="pokemon-image"
        />
      ) : (
        <div className="pokemon-image-placeholder">No Image</div>
      )}
      <h3 className="pokemon-name">{koreanName}</h3>
      <p className="pokemon-id">{`도감 번호: ${pokemon.id}`}</p>
      <p className="pokemon-types">{`타입: ${types}`}</p>
    </div>
  );
};

export default PokemonCard;
