export interface Script {
  id: string;
  chapter: string;
  title: string;
  status: string;
  desc?: string;
  actors?: string[];
  clips?: string[];
  lock?: boolean;
  stats?: {
    totalTalkLineCount: number;
    plainTalkAmount: number;
  };
}

export const scripts: Script[] = [
  {
    "id": "0-01",
    "chapter": "序幕・空间站「黑塔」",
    "title": "今天是昨天的明天",
    "status": "In Progress",
    "actors": [
      "kafka",
      "silver-wolf",
      "herta",
      "trailblazer",
      "asta",
      "dan-heng",
      "march-7th",
      "nanook",
      "arlan",
      "himeko",
      "welt",
    ],
    "clips": [],
    "stats": {
      "totalTalkLineCount": 217,
      "plainTalkAmount": 18.89
    },
    "lock": true
  },
  {
    "id": "1-01",
    "chapter": "第一幕・雅利洛-Ⅵ・其一",
    "title": "激「冻」人心的大冒险",
    "status": "In Progress",
    "actors": [
      "march-7th",
      "himeko",
      "trailblazer",
      "pom-pom",
      "dan-heng",
      "welt",
      "herta",
      "gepard",
      "sampo",
      "cocolia",
      "bronya",
      "serval"
    ],
    "clips": [
      "有关星空的寓言集•其一"
    ],
    "stats": {
      "totalTalkLineCount": 270,
      "plainTalkAmount": 12.59
    },
    "lock": true
  },
  {
    "id": "1-02",
    "chapter": "第一幕・雅利洛-Ⅵ・其二",
    "title": "寒潮之「下」",
    "status": "In Progress",
    "actors": [
      "dan-heng",
      "march-7th",
      "pela",
      "bronya",
      "cocolia",
      "trailblazer",
      "sampo",
      "natasha",
      "hook",
      "svarog",
      "seele",
      "clara"
    ],
    "clips": [],
    "stats": {
      "totalTalkLineCount": 289,
      "plainTalkAmount": 32.53
    },
    "lock": true
  },
  {
    "id": "1-03",
    "chapter": "第一幕・雅利洛-Ⅵ・其三",
    "title": "她等待刀尖已经太久",
    "status": "In Progress",
    "actors": [
      "march-7th",
      "dan-heng",
      "bronya",
      "cocolia",
      "seele",
      "natasha",
      "clara",
      "svarog"
    ],
    "clips": [],
    "stats": {
      "totalTalkLineCount": 268,
      "plainTalkAmount": 25
    },
    "lock": true
  },
  {
    "id": "1-04",
    "chapter": "第一幕・雅利洛-Ⅵ・其四",
    "title": "腐烂或燃烧",
    "status": "In Progress",
    "actors": [
      "seele",
      "hook",
      "march-7th",
      "dan-heng",
      "sampo",
      "svarog",
      "bronya",
      "clara",
      "natasha",
      "cocolia",
      "serval",
      "gepard"
    ],
    "clips": [],
    "stats": {
      "totalTalkLineCount": 398,
      "plainTalkAmount": 29.65
    },
    "lock": true
  },
  {
    "id": "1-05",
    "chapter": "第一幕・雅利洛-Ⅵ・其五",
    "title": "朗道的选择",
    "status": "In Progress",
    "actors": [
      "cocolia",
      "bronya",
      "march-7th",
      "dan-heng",
      "seele",
      "sampo",
      "serval",
      "gepard",
      "svarog",
      "pela"
    ],
    "clips": [],
    "stats": {
      "totalTalkLineCount": 305,
      "plainTalkAmount": 28.52
    },
    "lock": true
  },
  {
    "id": "1-06",
    "chapter": "第一幕・雅利洛-Ⅵ・其六",
    "title": "野火",
    "status": "In Progress",
    "actors": [
      "serval",
      "seele",
      "cocolia",
      "march-7th",
      "gepard",
      "dan-heng",
      "bronya",
      "qlipoth",
      "himeko",
      "welt",
      "svarog",
      "natasha",
      "trailblazer",
      "clara",
      "hook",
      "pom-pom",
      "sampo"
    ],
    "clips": [],
    "stats": {
      "totalTalkLineCount": 355,
      "plainTalkAmount": 19.44
    },
    "lock": true
  },
  {
    "id": "2-01",
    "chapter": "第二幕・仙舟「罗浮」・其一",
    "title": "乘槎驭风仙舟游，紫府通谒神策筹",
    "status": "In Progress",
    "actors": [
      "dan-heng",
      "yanqing",
      "jing-yuan",
      "march-7th",
      "pom-pom",
      "kafka",
      "trailblazer",
      "himeko",
      "welt",
      "blade",
      "tingyun",
      "yukong",
      "fu-xuan"
    ],
    "clips": [
      "耶佩拉叛乱：第47场",
      "仙舟通鉴•帝弓七天将"
    ],
    "stats": {
      "totalTalkLineCount": 214,
      "plainTalkAmount": 15.89
    },
    "lock": true
  },
  {
    "id": "2-02",
    "chapter": "第二幕・仙舟「罗浮」・其二",
    "title": "迴星周旋寻猎手，螣蛇追思影婆娑",
    "status": "In Progress",
    "actors": [
      "tingyun",
      "yukong",
      "march-7th",
      "welt",
      "kafka",
      "dan-heng",
      "trailblazer",
      "himeko",
      "sushang",
      "luocha",
      "fu-xuan",
      "jing-yuan",
      "bailu",
      "qingque"
    ],
    "clips": [
      "仙舟通鉴•五龙远徙"
    ],
    "stats": {
      "totalTalkLineCount": 182,
      "plainTalkAmount": 18.68
    },
    "lock": true
  },
  {
    "id": "2-03",
    "chapter": "第二幕・仙舟「罗浮」・其三",
    "title": "神木重萌掣天地，极数问玄话阴谋",
    "status": "In Progress",
    "actors": [
      "qingque",
      "welt",
      "march-7th",
      "tingyun",
      "trailblazer",
      "fu-xuan",
      "jing-yuan",
      "yanqing",
      "blade",
      "jingliu",
      "kafka",
      "dan-heng",
      "luocha",
      "sushang",
      "xueyi"
    ],
    "clips": [],
    "stats": {
      "totalTalkLineCount": 215,
      "plainTalkAmount": 42.79
    },
    "lock": true
  },
  {
    "id": "2-04",
    "chapter": "第二幕・仙舟「罗浮」・其四",
    "title": "剑客归舟试霜刃，玲珑工巧鹿盘虬",
    "status": "In Progress",
    "actors": [
      "fu-xuan",
      "jing-yuan",
      "march-7th",
      "kafka",
      "qingque",
      "tingyun",
      "welt",
      "trailblazer",
      "jingliu",
      "yanqing",
      "blade"
    ],
    "clips": [],
    "stats": {
      "totalTalkLineCount": 211,
      "plainTalkAmount": 39.81
    },
    "lock": true
  },
  {
    "id": "2-05",
    "chapter": "第二幕・仙舟「罗浮」・其五",
    "title": "药王密谋大君现，风云汇集聚龙宫",
    "status": "In Progress",
    "actors": [
      "jingliu",
      "yanqing",
      "blade",
      "march-7th",
      "tingyun",
      "welt",
      "jing-yuan",
      "fu-xuan",
      "yukong",
      "kafka",
      "phantylia",
      "dan-heng",
      "sushang",
      "luocha",
    ],
    "clips": [],
    "stats": {
      "totalTalkLineCount": 210,
      "plainTalkAmount": 21.9
    },
    "lock": true
  },
  {
    "id": "2-06",
    "chapter": "第二幕・仙舟「罗浮」・其六",
    "title": "弹铗飞光现龙影，不死仙骸亦有终",
    "status": "In Progress",
    "actors": [
      "dan-heng",
      "blade",
      "kafka",
      "yanqing",
      "jing-yuan",
      "jingliu",
      "phantylia",
      "fu-xuan",
      "march-7th",
      "welt",
      "trailblazer"
    ],
    "clips": [],
    "stats": {
      "totalTalkLineCount": 189,
      "plainTalkAmount": 3.17
    },
    "lock": true
  },
  {
    "id": "2-07",
    "chapter": "第二幕・仙舟「罗浮」・其七",
    "title": "大衍穷观前尘断，劫波渡尽战云收",
    "status": "In Progress",
    "actors": [
      "phantylia",
      "march-7th",
      "jing-yuan",
      "dan-heng",
      "welt",
      "fu-xuan",
      "trailblazer",
    ],
    "clips": [],
    "stats": {
      "totalTalkLineCount": 348,
      "plainTalkAmount": 76.72
    },
    "lock": true
  },
  {
    "id": "2-08",
    "chapter": "第二幕・仙舟「罗浮」・其八",
    "title": "持明古海镇遗祸，安灵正首向青丘",
    "status": "In Progress",
    "actors": [
      "dan-heng",
      "bailu",
      "jing-yuan",
      "trailblazer",
      "yukong",
      "xueyi",
      "welt",
      "fu-xuan",
      "march-7th",
      "himeko",
      "luocha",
      "jingliu"
    ],
    "clips": [],
    "stats": {
      "totalTalkLineCount": 277,
      "plainTalkAmount": 53.43
    },
    "lock": true
  },
  {
    "id": "2-09",
    "chapter": "第二幕・仙舟「罗浮」・其九",
    "title": "故地重游鳞渊会，云消梦醒不复归",
    "status": "In Progress",
    "actors": [
      "dan-heng",
      "blade",
      "jing-yuan",
      "jingliu",
      "yanqing",
      "luocha",
      "bailu",
    ],
    "clips": [
      "飞光",
      "玄黄"
    ],
    "stats": {
      "totalTalkLineCount": 242,
      "plainTalkAmount": 52.89
    },
    "lock": true
  }
];
