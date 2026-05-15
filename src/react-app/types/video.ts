export interface VideoEntry {
  id: string;
  title: string;
  genre?: string;
  display?:boolean;
  description?: string;
  img?: { cover?: string };
  themeColor?: string; // "R G B" space-separated, for CSS variable
  url?: string;
  priority?: number;
}
