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
      "trailblazer",
      "march-7th",
      "dan-heng",
      "himeko",
      "welt",
      "kafka",
      "silver-wolf",
      "nanook",
      "herta",
      "asta",
      "arlan",
      "pom-pom"
    ],
    "clips": [],
    "stats": {
      "totalTalkLineCount": 217,
      "plainTalkAmount": 18.89
    },
    "lock": false
  },
  {
    "id": "1-01",
    "chapter": "第一幕・雅利洛-Ⅵ・其一",
    "title": "激「冻」人心的大冒险",
    "status": "In Progress",
    "actors": [
      "trailblazer",
      "march-7th",
      "dan-heng",
      "himeko",
      "welt",
      "pom-pom",
      "sampo",
      "bronya",
      "cocolia",
      "gepard",
      "serval"
    ],
    "clips": [
      "有关星空的寓言集•其一"
    ],
    "stats": {
      "totalTalkLineCount": 270,
      "plainTalkAmount": 12.59
    },
    "lock": false
  },
  {
    "id": "1-02",
    "chapter": "第一幕・雅利洛-Ⅵ・其二",
    "title": "寒潮之「下」",
    "status": "In Progress",
    "actors": [
      "trailblazer",
      "march-7th",
      "dan-heng",
      "long",
      "qlipoth",
      "sampo",
      "bronya",
      "seele",
      "cocolia",
      "natasha",
      "clara",
      "svarog",
      "pela",
      "hook"
    ],
    "clips": [],
    "stats": {
      "totalTalkLineCount": 300,
      "plainTalkAmount": 35
    },
    "lock": false
  },
  {
    "id": "1-03",
    "chapter": "第一幕・雅利洛-Ⅵ・其三",
    "title": "她等待刀尖已经太久",
    "status": "In Progress",
    "actors": [
      "march-7th",
      "dan-heng",
      "hooh",
      "bronya",
      "seele",
      "cocolia",
      "natasha",
      "clara",
      "svarog"
    ],
    "clips": [],
    "stats": {
      "totalTalkLineCount": 268,
      "plainTalkAmount": 25
    },
    "lock": false
  },
  {
    "id": "1-04",
    "chapter": "第一幕・雅利洛-Ⅵ・其四",
    "title": "腐烂或燃烧",
    "status": "In Progress",
    "actors": [
      "march-7th",
      "dan-heng",
      "sampo",
      "bronya",
      "seele",
      "cocolia",
      "gepard",
      "serval",
      "natasha",
      "clara",
      "svarog",
      "hook"
    ],
    "clips": [],
    "stats": {
      "totalTalkLineCount": 404,
      "plainTalkAmount": 30.69
    },
    "lock": false
  },
  {
    "id": "1-05",
    "chapter": "第一幕・雅利洛-Ⅵ・其五",
    "title": "朗道的选择",
    "status": "In Progress",
    "actors": [
      "march-7th",
      "dan-heng",
      "himeko",
      "qlipoth",
      "sampo",
      "bronya",
      "seele",
      "cocolia",
      "gepard",
      "serval",
      "svarog",
      "pela"
    ],
    "clips": [],
    "stats": {
      "totalTalkLineCount": 305,
      "plainTalkAmount": 28.52
    },
    "lock": false
  },
  {
    "id": "1-06",
    "chapter": "第一幕・雅利洛-Ⅵ・其六",
    "title": "野火",
    "status": "In Progress",
    "actors": [
      "trailblazer",
      "march-7th",
      "dan-heng",
      "himeko",
      "welt",
      "pom-pom",
      "ena",
      "nanook",
      "qlipoth",
      "sampo",
      "bronya",
      "seele",
      "cocolia",
      "gepard",
      "serval",
      "natasha",
      "clara",
      "svarog",
      "hook"
    ],
    "clips": [],
    "stats": {
      "totalTalkLineCount": 355,
      "plainTalkAmount": 14.37
    },
    "lock": false
  },
  {
    "id": "2-01",
    "chapter": "第二幕・仙舟「罗浮」・其一",
    "title": "乘槎驭风仙舟游，紫府通谒神策筹",
    "status": "In Progress",
    "desc": "系统时间23时44分59秒，一个陌生的女人来到空间站「黑塔」……",
    "actors": [
      "trailblazer",
      "march-7th",
      "dan-heng",
      "himeko",
      "welt",
      "pom-pom",
      "elio",
      "kafka",
      "blade",
      "silver-wolf",
      "lan",
      "the-herta",
      "jing-yuan",
      "fu-xuan",
      "yanqing",
      "yukong",
      "fugue",
      "pela"
    ],
    "clips": [
      "耶佩拉叛乱：第47场",
      "仙舟通鉴•帝弓七天将"
    ],
    "stats": {
      "totalTalkLineCount": 214,
      "plainTalkAmount": 15.89
    },
    "lock": false
  }
];
