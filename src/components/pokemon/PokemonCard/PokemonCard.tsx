import TypeChip, { ValidType } from "@/components/common/TypeChip/TypeChip";
import { Pokemon } from "@/types/PokemonType";
import { PropsWithChildren } from "react";

type PokemonCardProps = {
  pokemon: Pokemon;
};

const PokemonCard = ({ pokemon }: PropsWithChildren<PokemonCardProps>) => {
  const spriteUrl = pokemon.sprites?.front_default || "";
  const koreanName = pokemon.korean_name || pokemon.name;

  const typeChips = pokemon.types?.map((type) => {
    const typeName =
      (type.type.korean_name as ValidType) || type.type.name || "없음";
    return <TypeChip key={type.type.name} name={typeName} type={typeName} />;
  }) || <TypeChip name="없음" type="없음" />;

  return (
    <div className="pokemon-card flex flex-col items-center">
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
      <h3 className="pokemon-name ">{koreanName}</h3>

      <div className="pokemon-types flex mt-2 gap-2.5">{typeChips}</div>
    </div>
  );
};

export default PokemonCard;
