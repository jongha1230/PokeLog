import {
  Ability,
  AbilityDetail,
  Name,
  PokemonType,
  Species,
  Stat,
  StatDetail,
  TypeDetail,
} from "@/types/PokemonType";
import axios from "axios";

const translateToKorean = async (
  speciesUrl: string,
  types: PokemonType[],
  defaultName: string,
  abilities?: Ability[],
  stats?: Stat[]
): Promise<{
  koreanName: string;
  koreanTypes: (PokemonType & { type: { korean_name: string } })[];
  koreanAbilities: (Ability & {
    ability: { korean_name: string | undefined };
  })[];
  koreanStats: (Stat & { stat: { korean_name: string | undefined } })[];
}> => {
  const speciesResponse = await axios.get<Species>(speciesUrl);
  const koreanName =
    speciesResponse.data.names.find((name: Name) => name.language.name === "ko")
      ?.name || defaultName;

  const koreanTypes = await Promise.all(
    types.map(async (type) => {
      const typeDetailResponse = await axios.get<TypeDetail>(type.type.url);
      const koreanTypeName =
        typeDetailResponse.data.names.find(
          (name: Name) => name.language.name === "ko"
        )?.name || type.type.name;
      return { ...type, type: { ...type.type, korean_name: koreanTypeName } };
    })
  );

  const koreanAbilities = abilities
    ? await Promise.all(
        abilities.map(async (ability) => {
          const abilityDetailResponse = await axios.get<AbilityDetail>(
            ability.ability.url
          );
          const koreanAbilityName =
            abilityDetailResponse.data.names.find(
              (name: Name) => name.language.name === "ko"
            )?.name || ability.ability.name;
          return {
            ...ability,
            ability: { ...ability.ability, korean_name: koreanAbilityName },
          };
        })
      )
    : [];

  const koreanStats = stats
    ? await Promise.all(
        stats.map(async (stat) => {
          const statDetailResponse = await axios.get<StatDetail>(stat.stat.url);
          const koreanStatName =
            statDetailResponse.data.names.find(
              (name: Name) => name.language.name === "ko"
            )?.name || stat.stat.name;
          return {
            ...stat,
            stat: { ...stat.stat, korean_name: koreanStatName },
          };
        })
      )
    : [];

  return { koreanName, koreanTypes, koreanAbilities, koreanStats };
};

export default translateToKorean;
