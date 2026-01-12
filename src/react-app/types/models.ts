export interface Actor {
  name: string;
  tags: string[];
  va: string;
}

export interface Video {
  title: string;
  genre: string;
  url: string;
  needed: boolean;
  cover?: string;
}
