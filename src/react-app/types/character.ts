
export enum Rarity {
  N = "N",
  R = "R",
  SR = "SR",
  SSR = "SSR",
  UR = "UR",
}

export interface Character {
  id: string;
  name: string;
  tags?: string[];
  va?: string;
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


export async function fetchCharacters(): Promise<Character[]> {
  const res = await fetch("/characters/index.txt");
  const text = await res.text();
  const blocks = text.replace(/\r\n/g, "\n").split(/\n\n+/);
  const list = blocks
    .map(block => block.trim())
    .filter(block => block.length > 0)
    .map(block => {
      const [header, vaLine, tagsLine, cardLine, avatarLine] = block.split("\n");
      const parts = header.split("|");
      const id = parts[0];
      const name = parts[1];
      const rarityStr = parts[2];
      const priorityStr = parts[3];
      const rarity = (rarityStr && rarityStr in Rarity)
        ? Rarity[rarityStr as keyof typeof Rarity]
        : Rarity.N;
      const priority = (priorityStr) ? Number(priorityStr) : 1;
      const va = (vaLine && vaLine !== "##") ? vaLine.trim() : undefined;
      const tags = (tagsLine && tagsLine !== "##")
        ? tagsLine.trim().split(",").map(t => t.trim()).filter(Boolean)
        : [];
      const card = (cardLine && cardLine !== "##") ? cardLine.trim() : undefined;
      const avatar = (avatarLine && avatarLine !== "##") ? avatarLine.trim() : undefined;
      return { id, name, rarity, priority, va, tags, img: { card, avatar } } as Character;
    });
  return list.sort((a, b) => {
    const pa = a.priority === 0 ? Infinity : (a.priority ?? 1);
    const pb = b.priority === 0 ? Infinity : (b.priority ?? 1);
    return pb - pa;
  });
}
