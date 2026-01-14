export interface Actor {
  id: string;
  name: string;
  tags?: string[];
  va?: string;
  rarity: "Ω" | "EX" | "S" | "A" | "NPC";
  favorite?: boolean;
}

export interface Video {
  title: string;
  genre: string;
  url: string;
  display: boolean;
  cover?: string;
}
