export interface Actor {
  id:string;
  name: string;
  tags: string[];
  va: string;
  rarity?: "sr" | "ssr" | "ur";
}

export interface Video {
  title: string;
  genre: string;
  url: string;
  needed: boolean;
  cover?: string;
}
