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
  desc?: string;
}

export interface Script {
  id: string;
  chapter: string;
  title: string;
  status: string;
  desc?: string;
  actors?: string[];
  clips?: string[];
}

export interface Song {
    title: string;
    subtitle?: string;
    lyrics?: string;
}