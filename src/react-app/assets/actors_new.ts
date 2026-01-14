import { Actor } from "../types/models";

export const actors_by_fraction: {
  [fraction: string]: Actor[];
} = {
  astral_express: [
    { id: "trailblazer", name: "穹", va: "秦且歌", rarity: "Ω", favorite: true },
    { id: "march-7th", name: "三月七", va: "诺亚", rarity: "EX", favorite: true  },
    { id: "dan-heng", name: "丹恒", va: "李春胤", rarity: "EX", favorite: true  },
    { id: "himeko", name: "姬子", va: "林簌", rarity: "S" },
    { id: "welt", name: "瓦尔特", va: "彭博", rarity: "S" },
    { id: "", name: "帕姆", va: "蒋丽", rarity: "EX" },
    { id: "sunday", name: "星期日", va: "徐翔", rarity: "EX" },
  ],
  stellaron_hunters: [
    { id: "", name: "艾利欧", rarity: "Ω" },
    { id: "firefly", name: "流萤", va: "宋媛媛", rarity: "EX", favorite: true  },
    { id: "kafka", name: "卡芙卡", va: "徐慧", rarity: "EX" },
    { id: "blade", name: "刃", va: "刘以嘉", rarity: "EX" },
    { id: "silver-wolf", name: "银狼", va: "Hanser", rarity: "EX" },
  ],
  aeon: [{ id: "", name: "纳努克", rarity: "Ω" }],
  genius_society: [
    { id: "the-herta", name: "黑塔", va: "侯小菲", rarity: "EX", favorite: true  },
    { id: "herta", name: "黑塔（人偶）", va: "侯小菲", rarity: "S" },
    { id: "ruan-mei", name: "阮 · 梅", va: "张文钰", rarity: "EX" },
  ],
  lord_ravager: [
    { id: "", name: "幻胧", va: "", rarity: "EX" },
    { id: "tingyun", name: "停云（幻胧）", va: "蒋丽", rarity: "S" },
  ],
  amphoreus: [
    { id: "cyrene", name: "昔涟", va: "宴宁", rarity: "Ω", favorite: true  },
    { id: "phainon", name: "白厄", va: "秦且歌", rarity: "EX" },
    { id: "aglaea", name: "阿格莱雅", va: "楚越", rarity: "S", favorite: true  },
    { id: "cipher", name: "赛飞儿", va: "王雅欣", rarity: "S" },
    { id: "castorice", name: "遐蝶", va: "阮从青", rarity: "S", favorite: true  },
    { id: "tribbie", name: "缇宝/缇安/缇宁/…", va: "蔡书瑾", rarity: "S" },
    { id: "mydei", name: "万敌", va: "赵成晨", rarity: "S" },
    { id: "anaxa", name: "那刻夏", va: "钱文青", rarity: "S" },
    { id: "hyacine", name: "风堇", va: "静宸", rarity: "S" },
    { id: "cerydra", name: "刻律德菈", va: "时欣蕾", rarity: "S" },
    { id: "hysilens", name: "海瑟音", va: "浮梦若薇", rarity: "S" },
    { id: "evernight", name: "长夜月", va: "诺亚", rarity: "EX" },
  ],
  xianzhou_alliance: [
    { id: "jing-yuan", name: "景元", va: "孙晔", rarity: "EX" },
    { id: "feixiao", name: "飞霄", va: "叶知秋", rarity: "EX" },
    { id: "jingliu", name: "镜流", va: "杜冥鸦", rarity: "EX" },
    { id: "fu-xuan", name: "符玄", va: "花玲", rarity: "S" },
    { id: "jiaoqiu", name: "椒丘", va: "陈张太康", rarity: "S" },
    { id: "yanqing", name: "彦卿", va: "喵酱", rarity: "S" },
    { id: "tingyun", name: "停云（幻胧）", va: "蒋丽", rarity: "S" },
    { id: "yukong", name: "驭空", va: "钟可", rarity: "A" },
    { id: "lingsha", name: "灵砂", va: "饶梓君", rarity: "A" },
    { id: "moze", name: "貊泽", va: "黄进泽", rarity: "A" },
    { id: "qingque", name: "青雀", va: "刘十四", rarity: "A" },
    { id: "yunli", name: "云璃", va: "刘雯", rarity: "A" },
    { id: "fugue", name: "停云", va: "蒋丽", rarity: "A" },
    { id: "bailu", name: "白露", va: "时欣蕾", rarity: "A" },
    { id: "sushang", name: "素裳", va: "陈婷婷", rarity: "A" },
    { id: "xueyi", name: "雪衣", va: "溯浔", rarity: "NPC" },
    { id: "hanya", name: "寒鸦", va: "张雨曦", rarity: "NPC" },
    { id: "huohuo", name: "藿藿", va: "葛子瑞", rarity: "NPC" },
    { id: "guinaifen", name: "桂乃芬", va: "小敢", rarity: "NPC" },
  ],
  interastral_peace_appliances: [
    { id: "jade", name: "翡翠", va: "张若瑜", rarity: "S" },
    { id: "topaz-numby", name: "托帕", va: "陆敏悦", rarity: "S" },
    { id: "aventurine", name: "砂金", va: "杨超然", rarity: "S" },
  ],
  galaxy_rangers: [
    { id: "boothill", name: "波提欧", va: "彭博", rarity: "S" },
    { id: "rappa", name: "乱破", va: "金娜", rarity: "S" },
  ],
  garden_of_recollection: [
    { id: "black-swan", name: "黑天鹅", va: "杨梦露", rarity: "EX" },
  ],
  intelligentsia_guild: [
    { id: "dr-ratio", name: "真理医生", va: "桑毓泽", rarity: "S" },
  ],
  knights_of_beauty: [
    { id: "argenti", name: "银枝", va: "梁达伟", rarity: "S" },
  ],
  self_annihilators: [
    { id: "acheron", name: "黄泉", va: "菊花花", rarity: "EX", favorite: true  },
  ],
  penacony: [
    { id: "robin", name: "知更鸟", va: "钱琛", rarity: "S", favorite: true  },
    { id: "sunday", name: "星期日", va: "徐翔", rarity: "EX" },
    { id: "misha", name: "米沙", va: "柳知萧", rarity: "S" },
    { id: "gallagher", name: "加拉赫", va: "马语非", rarity: "S" },
  ],
  the_cremators: [
    { id: "the-dahlia", name: "大丽花", va: "阮从青", rarity: "S" },
  ],
  masked_fools: [
    { id: "sparkle", name: "花火", va: "赵爽", rarity: "S" },
    { id: "sampo", name: "桑博", va: "刘圣博", rarity: "S" },
  ],
  herta_space_station: [
    { id: "the-herta", name: "黑塔", va: "侯小菲", rarity: "EX" },
    { id: "herta", name: "黑塔（人偶）", va: "侯小菲", rarity: "S" },
    { id: "asta", name: "艾丝妲", va: "龟娘", rarity: "A" },
    { id: "arlan", name: "阿兰", va: "陶典", rarity: "NPC" },
  ],

  belobog: [
    { id: "bronya", name: "布洛妮娅", va: "谢莹", rarity: "S" },
    { id: "sampo", name: "桑博", va: "刘圣博", rarity: "S" },
    { id: "seele", name: "希儿", va: "唐雅菁", rarity: "A" },
    { id: "", name: "可可利亚", va: "", rarity: "A" },
    { id: "gepard", name: "杰帕德", va: "马洋", rarity: "A" },
    { id: "serval", name: "希露瓦", va: "穆雪婷", rarity: "A" },
    { id: "natasha", name: "娜塔莎", va: "秦紫翼", rarity: "A" },
    { id: "clara", name: "克拉拉", va: "紫苏九月", rarity: "A" },
    { id: "", name: "史瓦罗", va: "王宇航", rarity: "A" },
    { id: "pela", name: "佩拉", va: "宴宁", rarity: "NPC" },
    { id: "lynx", name: "玲可", va: "米糊", rarity: "NPC" },
    { id: "luka", name: "卢卡", va: "萧翟", rarity: "NPC" },
    { id: "hook", name: "虎克", va: "王晓彤", rarity: "NPC" },
  ],
  unknown: [{ id: "luocha", name: "罗刹", va: "赵路", rarity: "S" }],
};

export const rarities = ["Ω", "EX", "S", "A", "NPC"];
export const rarity_order = (a:Actor, b:Actor) => (rarities.indexOf(a.rarity ?? "NPC") - rarities.indexOf(b.rarity ?? "NPC"));

export const actors: Actor[] = Object.values(
  Object.entries(actors_by_fraction)
    .flatMap(([fraction, list]) =>
      list.map((a) => ({ ...a, tags: [fraction] }))
    )
    .reduce<Record<string, any>>((acc, a) => {
      acc[a.id] ??= { ...a, tags: [] };
      acc[a.id].tags.push(...a.tags);
      return acc;
    }, {})
);


export const favorite_actors: Actor[] = Object.values(
  Object.entries(actors_by_fraction)
    .flatMap(([fraction, list]) =>
      list.filter((a) => a.favorite).map((a) => ({ ...a, tags: [fraction] }))
    )
    .reduce<Record<string, any>>((acc, a) => {
      acc[a.id] ??= { ...a, tags: [] };
      acc[a.id].tags.push(...a.tags);
      return acc;
    }, {})
);
