type GenerationLimits = {
  [key: number]: { start: number; end: number };
};

const generationLimits: GenerationLimits = {
  1: { start: 1, end: 151 },
  2: { start: 152, end: 251 },
  3: { start: 252, end: 386 },
  4: { start: 387, end: 493 },
  5: { start: 494, end: 649 },
  6: { start: 650, end: 721 },
  7: { start: 722, end: 809 },
  8: { start: 810, end: 898 },
  9: { start: 899, end: 1010 },
  10: { start: 1011, end: 1025 },
};

export default generationLimits;
