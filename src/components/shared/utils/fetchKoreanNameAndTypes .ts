import { Name, PokemonType, Species, TypeDetail } from "@/types/PokemonType";
import axios from "axios";

export const fetchKoreanNameAndTypes = async (
  speciesUrl: string,
  types: PokemonType[],
  defaultName: string
): Promise<{ koreanName: string; koreanTypes: PokemonType[] }> => {
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

  return { koreanName, koreanTypes };
};
