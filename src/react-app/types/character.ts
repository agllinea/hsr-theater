export interface Character {
  id: string;
  name: string | MultilingualText;
  tags?: string[];
  va?: string | MultilingualText;
  img?: CharacterDisplayImage;
  priority?: number;
}

export interface MultilingualText {
  zh?: string;
}

export interface CharacterDisplayImage {
  card_colored?: string;
  card_bw_lined?: string;
}
