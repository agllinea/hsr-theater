import { TXT } from "./text";

export interface Script {
    id: string;
    series: TXT;
    title: TXT;
    tags?: string[];
    actors?: string[];
    cover?: string;
}

export async function fetchScript(): Promise<Script[]> {
    const text = await fetch("/scripts/index.txt").then((res) => res.text());
    return text
        .replace(/\r/g, "")
        .split(/\n\n+/)
        .filter((block) => block.trim())
        .map((block) => {
            const [line1, line2, line3, line4] = block.trim().split("\n");
            const [id, series_d, title_d] = line1.split("|");
            const [series_c, title_c] = line2.split("|");
            const tags = line3 ? line3.split("|").map((t) => t.trim()) : undefined;
            const actors = line4 ? line4.split("|") : undefined;
            return {
                id,
                series: { c: series_c, d: series_d },
                title: { c: title_c, d: title_d },
                tags,
                actors,
                cover: `${id}.webp`,
            };
        });
}
