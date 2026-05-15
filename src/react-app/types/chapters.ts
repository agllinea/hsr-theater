import { TXT } from "./text";

export const ChapterStatus = {
    IN_PROGRESS: { c: "In Progress", d: "进行中" },
    COMPLETED: { c: "Completed", d: "已完成" },
} as const;

export interface Chapter {
    chapter: TXT;
    title: TXT;
    series: TXT;
    cover?: string;
    status: (typeof ChapterStatus)[keyof typeof ChapterStatus];
    actors?: string[];
    clips?: string[];
    desc?: string;
}
