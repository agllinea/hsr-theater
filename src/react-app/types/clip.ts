export interface Clip {
  id: string;
  title: string;
  tags?: string[];
  description?: string;
  img?: { cover?: string };
  url?: string;
  previewUrl?: string;
}

export async function fetchClip(): Promise<Clip[]> {
  const text = await fetch("/clips/index.txt").then((res) => res.text());
  return text
    .replace(/\r\n/g, "\n")
    .split(/\n\n+/)
    .filter((block) => block.trim())
    .map((block) => {
      const [line1, tagsLine, url, cover, desc, preview] = block.split("\n");
      const [id, title] = line1.split("|");
      return {
        id,
        title,
        url,
        tags: tagsLine ? tagsLine.split("|").map((tag) => tag.trim()) : [],
        img: cover ? { cover } : undefined,
        description: desc ? desc.replace(/\\r\\n/g, "\r\n").replace(/\\n/g, "\n") : undefined,
        previewUrl: preview,
      };
    });
}
