export enum Rarity {
  N = "N",
  R = "R",
  SR = "SR",
  SSR = "SSR",
  UR = "UR",
}

export interface Character {
  id: string;
  name: string | MultilingualText;
  tags?: string[];
  va?: string | MultilingualText;
  img?: CharacterDisplayImage;
  priority?: number;
  rarity?: Rarity;
}

export interface MultilingualText {
  zh?: string;
}

export interface CharacterDisplayImage {
  card?: string;
  avatar?: string;
}
