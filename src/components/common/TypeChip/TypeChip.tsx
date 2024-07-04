import { VariantProps, cva } from "class-variance-authority";

export const chipVariants = cva(
  [
    "text-sm",
    "border",
    "rounded-full",
    "px-3",
    "py-0.5",
    "hover:opacity-50",
    "transition-opacity",
    "font-semibold",
  ],
  {
    variants: {
      type: {
        노말: "bg-gray-400 border-gray-300 text-white",
        격투: "bg-brown-500 border-brown-500 text-white",
        비행: "bg-sky-300 border-sky-300 text-white",
        독: "bg-purple-800 border-purple-800 text-white",
        땅: "bg-yellow-800 border-yellow-800 text-white",
        바위: "bg-brown-700 border-brown-700 text-white",
        벌레: "bg-green-400 border-green-400 text-white",
        고스트: "bg-purple-900 border-purple-900 text-white",
        강철: "bg-gray-500 border-gray-500 text-white",
        불꽃: "bg-red-500 border-red-500 text-white",
        물: "bg-blue-500 border-blue-500 text-white",
        풀: "bg-green-600 border-green-600 text-white",
        전기: "bg-yellow-400 border-yellow-400 text-white",
        에스퍼: "bg-pink-400 border-pink-400 text-white",
        얼음: "bg-cyan-300 border-cyan-300 text-white",
        드래곤: "bg-indigo-800 border-indigo-800 text-white",
        악: "bg-gray-800 border-gray-800 text-white",
        페어리: "bg-pink-300 border-pink-300 text-white",
        없음: "bg-gray-200 border-gray-200 text-black",
        스텔라: "bg-gray-300 border-gray-500 text-white",
      },
    },
  }
);

type ChipVariantsType = VariantProps<typeof chipVariants>;

export type ValidType =
  | "노말"
  | "격투"
  | "비행"
  | "독"
  | "땅"
  | "바위"
  | "벌레"
  | "고스트"
  | "강철"
  | "불꽃"
  | "물"
  | "풀"
  | "전기"
  | "에스퍼"
  | "얼음"
  | "드래곤"
  | "악"
  | "페어리"
  | "없음"
  | "스텔라";

type ChipProps = {
  name: string;
  type: ValidType;
} & ChipVariantsType;

function TypeChip({ name, type }: ChipProps) {
  return <div className={chipVariants({ type })}>{name}</div>;
}

export default TypeChip;
