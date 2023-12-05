export type ColorName =
  | "rose"
  | "pink"
  | "fuchsia"
  | "purple"
  | "violet"
  | "indigo"
  | "blue"
  | "sky"
  | "cyan"
  | "teal"
  | "emerald"
  | "green"
  | "lime"
  | "yellow"
  | "amber"
  | "orange"
  | "red"
  | "stone"
  | "neutral"
  | "zinc"
  | "gray"
  | "slate";
export type ColorLevel =
  | 50
  | 100
  | 200
  | 300
  | 400
  | 500
  | 600
  | 700
  | 800
  | 900
  | 950;

export type VariantProps = {
  variantColor?: ColorName;
  variantColorLevel?: ColorLevel;
  variantBg?: ColorName;
  variantBgLevel?: ColorLevel;
};
