import { Actor } from "../types/models";

export const actors_by_fraction: {
  [fraction: string]: {
    id: string;
    name: string;
    va?: string;
    rarity?: string;
  }[];
} = {
  astral_express: [
    { id: "trailblazer", name: "穹", va: "秦且歌",rarity:"sr" },
    { id: "march-7th", name: "三月七", va: "诺亚" },
    { id: "dan-heng", name: "丹恒", va: "李春胤" },
    { id: "himeko", name: "姬子", va: "林簌" },
    { id: "welt", name: "瓦尔特", va: "彭博" },
    { id: "", name: "帕姆", va: "蒋丽" },
    { id: "sunday", name: "星期日", va: "徐翔" },
  ],
  stellaron_hunters: [
    { id: "kafka", name: "卡芙卡", va: "徐慧" },
    {
      id: "firefly",
      name: "流萤",
      va: "宋媛媛",
      rarity: "ur",
    },
    { id: "blade", name: "刃", va: "刘以嘉" },
    { id: "silver-wolf", name: "银狼", va: "Hanser" },
  ],
  herta_space_station: [
    { id: "arlan", name: "阿兰", va: "陶典" },
    { id: "asta", name: "艾丝妲", va: "龟娘" },
    {
      id: "herta",
      name: "黑塔（人偶）",
      va: "侯小菲",
    },
    {
      id: "the-herta",
      name: "黑塔",
      va: "侯小菲",
    },
  ],
  genius_society: [
    {
      id: "herta",
      name: "黑塔（人偶）",
      va: "侯小菲",
    },
    {
      id: "the-herta",
      name: "黑塔",
      va: "侯小菲",
    },
    {
      id: "ruan-mei",
      name: "阮 · 梅",
      va: "张文钰",
    },
  ],
  aeon: [{ id: "", name: "纳努克" }],
  garden_of_recollection: [{ id: "black-swan", name: "黑天鹅", va: "杨梦露" }],
  belobog: [
    { id: "bronya", name: "布洛妮娅", va: "谢莹" },
    { id: "hook", name: "虎克", va: "王晓彤" },
    { id: "gepard", name: "杰帕德", va: "马洋" },
    { id: "", name: "可可利亚", va: "" },
    { id: "clara", name: "克拉拉", va: "紫苏九月" },
    { id: "lynx", name: "玲可", va: "米糊" },
    { id: "luka", name: "卢卡", va: "萧翟" },
    { id: "natasha", name: "娜塔莎", va: "秦紫翼" },
    { id: "pela", name: "佩拉", va: "宴宁" },
    { id: "sampo", name: "桑博", va: "刘圣博" },
    { id: "", name: "史瓦罗", va: "王宇航" },
    { id: "seele", name: "希儿", va: "唐雅菁" },
    { id: "serval", name: "希露瓦", va: "穆雪婷" },
  ],
  masked_fools: [
    { id: "sampo", name: "桑博", va: "刘圣博" },
    { id: "sparkle", name: "花火", va: "赵爽" },
  ],
  xianzhou_alliance: [
    { id: "bailu", name: "白露", va: "时欣蕾" },
    { id: "fu-xuan", name: "符玄", va: "花玲" },
    { id: "guinaifen", name: "桂乃芬", va: "小敢" },
    { id: "hanya", name: "寒鸦", va: "张雨曦" },
    { id: "huohuo", name: "藿藿", va: "葛子瑞" },
    { id: "jing-yuan", name: "景元", va: "孙晔" },
    { id: "jingliu", name: "镜流", va: "杜冥鸦" },
    { id: "lingsha", name: "灵砂", va: "饶梓君" },
    { id: "qingque", name: "青雀", va: "刘十四" },
    { id: "sushang", name: "素裳", va: "陈婷婷" },
    { id: "fugue", name: "停云", va: "蒋丽" },
    { id: "tingyun", name: "停云（幻胧）", va: "蒋丽" },
    { id: "xueyi", name: "雪衣", va: "溯浔" },
    { id: "yanqing", name: "彦卿", va: "喵酱" },
    { id: "yukong", name: "驭空", va: "钟可" },
    { id: "feixiao", name: "飞霄", va: "叶知秋" },
    { id: "jiaoqiu", name: "椒丘", va: "陈张太康" },
    { id: "moze", name: "貊泽", va: "黄进泽" },
    { id: "yunli", name: "云璃", va: "刘雯" },
  ],
  lord_ravager: [
    { id: "", name: "幻胧", va: "" },
    { id: "tingyun", name: "停云（幻胧）", va: "蒋丽" },
  ],
  interastral_peace_appliances: [
    { id: "jade", name: "翡翠", va: "张若瑜" },
    { id: "aventurine", name: "砂金", va: "杨超然" },
    { id: "topaz-numby", name: "托帕", va: "陆敏悦" },
  ],
  penacony: [
    { id: "gallagher", name: "加拉赫", va: "马语非" },
    { id: "misha", name: "米沙", va: "柳知萧" },
    { id: "sunday", name: "星期日", va: "徐翔" },
    { id: "robin", name: "知更鸟", va: "钱琛" },
  ],
  intelligentsia_guild: [{ id: "dr-ratio", name: "真理医生", va: "桑毓泽" }],
  knights_of_beauty: [{ id: "argenti", name: "银枝", va: "梁达伟" }],
  self_annihilators: [{ id: "acheron", name: "黄泉", va: "菊花花" }],
  galaxy_rangers: [
    { id: "boothill", name: "波提欧", va: "彭博" },
    { id: "rappa", name: "乱破", va: "金娜" },
  ],
  the_cremators: [{ id: "the-dahlia", name: "大丽花", va: "阮从青" }],
  amphoreus: [
    { id: "aglaea", name: "阿格莱雅", va: "楚越" },
    { id: "phainon", name: "白厄", va: "秦且歌" },
    { id: "hyacine", name: "风堇", va: "静宸" },
    { id: "hysilens", name: "海瑟音", va: "浮梦若薇" },
    { id: "cerydra", name: "刻律德菈", va: "时欣蕾" },
    { id: "anaxa", name: "那刻夏", va: "钱文青" },
    { id: "cipher", name: "赛飞儿", va: "王雅欣" },
    { id: "tribbie", name: "缇宝/缇安/缇宁/…", va: "蔡书瑾" },
    { id: "mydei", name: "万敌", va: "赵成晨" },
    { id: "cyrene", name: "昔涟", va: "宴宁" },
    { id: "castorice", name: "遐蝶", va: "阮从青" },
    { id: "evernight", name: "长夜月", va: "诺亚" },
  ],
  unknown: [{ id: "luocha", name: "罗刹", va: "赵路" }],
};

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
