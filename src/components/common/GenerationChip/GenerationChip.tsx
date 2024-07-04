import { VariantProps, cva } from "class-variance-authority";

const chipVariants = cva(
  [
    "text-sm",
    "border",
    "rounded-full",
    "px-3",
    "py-0.5",
    "hover:opacity-50",
    "transition-opacity",
    "font-semibold",
    "cursor-pointer",
  ],
  {
    variants: {
      selected: {
        true: "",
        false: "text-white",
      },
      generation: {
        1: "bg-red-500 border-red-500",
        2: "bg-green-500 border-green-500",
        3: "bg-pink-500 border-pink-500",
        4: "bg-blue-500 border-blue-500",
        5: "bg-gray-500 border-gray-500",
        6: "bg-indigo-500 border-indigo-500",
        7: "bg-orange-500 border-orange-500",
        8: "bg-teal-500 border-teal-500",
        9: "bg-yellow-500",
      },
    },
    compoundVariants: [
      {
        selected: true,
        generation: 1,
        className: "text-red-500 bg-white border-red-500",
      },
      {
        selected: true,
        generation: 2,
        className: "text-green-500 bg-white border-green-500",
      },
      {
        selected: true,
        generation: 3,
        className: "text-pink-500  bg-white/100 border-pink-500",
      },
      {
        selected: true,
        generation: 4,
        className: "text-blue-500 bg-white border-blue-500",
      },
      {
        selected: true,
        generation: 5,
        className: "text-gray-500 bg-white border-gray-500",
      },
      {
        selected: true,
        generation: 6,
        className: "text-indigo-500 bg-white/100 border-indigo-500",
      },
      {
        selected: true,
        generation: 7,
        className: "text-orange-500 bg-white/100 border-orange-500",
      },
      {
        selected: true,
        generation: 8,
        className: "text-teal-500 bg-white/100 border-teal-500",
      },
      {
        selected: true,
        generation: 9,
        className: "text-yellow-500  bg-gray-50   border-yellow-500",
      },
    ],
  }
);

type ChipVariantsType = VariantProps<typeof chipVariants>;

export type Generation = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

type GenerationChipProps = {
  generation: Generation;
  isSelected: boolean;
  onToggle: (generation: Generation) => void;
} & ChipVariantsType;

function GenerationChip({
  generation,
  isSelected,
  onToggle,
}: GenerationChipProps) {
  return (
    <div
      className={chipVariants({ selected: isSelected, generation })}
      onClick={() => onToggle(generation)}
    >
      {`${generation}세대`}
    </div>
  );
}

export default GenerationChip;
