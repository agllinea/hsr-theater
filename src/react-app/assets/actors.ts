

import { Actor } from '../types/models';
import { cardTypeCodes } from './card_types';

export const actors_by_fraction: {
  [fraction: string]: Actor[];
} = {
  astral_express: [
    {
      id: "trailblazer",
      name: "穹",
      va: "秦且歌",
      cardType: "cta",
      favorite: true,
    },
    {
      id: "march-7th",
      name: "三月七",
      va: "诺亚",
      cardType: "cta",
      favorite: true,
    },
    {
      id: "dan-heng",
      name: "丹恒",
      va: "李春胤",
      cardType: "cta",
      favorite: true,
    },
    { id: "himeko", name: "姬子", va: "林簌", cardType: "ctc" },
    { id: "welt", name: "瓦尔特", va: "彭博", cardType: "ctc" },
    { id: "pom-pom", name: "帕姆", va: "蒋丽", cardType: "ctc" },
    { id: "sunday", name: "星期日", va: "徐翔", cardType: "ctc" },
  ],
  stellaron_hunters: [
    { id: "elio", name: "艾利欧", cardType: "ctd" },
    { id: "firefly", name: "流萤", va: "宋媛媛", cardType: "cta", favorite: true },
    { id: "kafka", name: "卡芙卡", va: "徐慧", cardType: "ctd" },
    { id: "blade", name: "刃", va: "刘以嘉", cardType: "ctd" },
    { id: "silver-wolf", name: "银狼", va: "Hanser", cardType: "ctd" },
  ],
  aeon: [
    { id: "aha", name: "阿哈", cardType: "ctf" },
    { id: "akivili", name: "阿基维利", cardType: "ctf" },
    { id: "ena", name: "太一", cardType: "ctf" },
    { id: "fuli", name: "浮黎", cardType: "ctf" },
    { id: "hooh", name: "互", cardType: "ctf" },
    { id: "IX", name: "Ⅸ", cardType: "ctf" },
    { id: "idrila", name: "伊德莉拉", cardType: "ctf" },
    { id: "lan", name: "岚", cardType: "ctf" },
    { id: "long", name: "龙", cardType: "ctf" },
    { id: "mythus", name: "迷思", cardType: "ctf" },
    { id: "nanook", name: "纳努克", cardType: "ctf" },
    { id: "nous", name: "博识尊", cardType: "ctf" },
    { id: "oroboros", name: "奥博洛斯", cardType: "ctf" },
    { id: "qlipoth", name: "克里珀", cardType: "ctf" },
    { id: "tayzzyronth", name: "塔伊兹育罗斯", cardType: "ctf" },
    { id: "terminus", name: "末王", cardType: "ctf" },
    { id: "xipe", name: "希佩", cardType: "ctf" },
    { id: "yaoshi", name: "药师", cardType: "ctf" },
  ],
  genius_society: [
    {
      id: "the-herta",
      name: "黑塔",
      va: "侯小菲",
      cardType: "cta",
      favorite: true,
    },
    { id: "herta", name: "黑塔（人偶）", va: "侯小菲", cardType: "ctc" },
    { id: "ruan-mei", name: "阮 · 梅", va: "张文钰", cardType: "ctc" },
  ],
  lord_ravager: [
    { id: "phantylia", name: "幻胧", va: "", cardType: "ctb" },
    { id: "archforger", name: "铸王", va: "", cardType: "ctb" },
    { id: "asat-pramad", name: "归寂", va: "", cardType: "ctb" },
    { id: "celenova", name: "星啸", va: "", cardType: "ctb" },
    { id: "luxbane", name: "光逝", va: "", cardType: "ctb" },
    { id: "zephyro", name: "焚风", va: "", cardType: "ctb" },
    { id: "irontomb", name: "铁墓", va: "", cardType: "ctb" },
    { id: "zulo", name: "诛罗", va: "", cardType: "ctb" },
    { id: "tingyun", name: "停云（幻胧）", va: "蒋丽", cardType: "ctb" },
  ],
  amphoreus: [
    { id: "cyrene", name: "昔涟", va: "宴宁", cardType: "cta", favorite: true },
    { id: "phainon", name: "白厄", va: "秦且歌", cardType: "cta" },
    { id: "aglaea", name: "阿格莱雅", va: "楚越", cardType: "cta", favorite: true },
    { id: "cipher", name: "赛飞儿", va: "王雅欣", cardType: "cta" },
    {
      id: "castorice",
      name: "遐蝶",
      va: "阮从青",
      cardType: "cta",
      favorite: true,
    },
    { id: "tribbie", name: "缇宝/缇安/缇宁/…", va: "蔡书瑾", cardType: "ctc" },
    { id: "mydei", name: "万敌", va: "赵成晨", cardType: "ctc" },
    { id: "anaxa", name: "那刻夏", va: "钱文青", cardType: "ctc" },
    { id: "hyacine", name: "风堇", va: "静宸", cardType: "ctc" },
    { id: "cerydra", name: "刻律德菈", va: "时欣蕾", cardType: "ctc" },
    { id: "hysilens", name: "海瑟音", va: "浮梦若薇", cardType: "ctc" },
    { id: "evernight", name: "长夜月", va: "诺亚", cardType: "ctc" },
  ],
  xianzhou_alliance: [
    { id: "jing-yuan", name: "景元", va: "孙晔", cardType: "ctc" },
    { id: "feixiao", name: "飞霄", va: "叶知秋", cardType: "ctc" },
    { id: "jingliu", name: "镜流", va: "杜冥鸦", cardType: "ctd" },
    { id: "fu-xuan", name: "符玄", va: "花玲", cardType: "ctc" },
    { id: "jiaoqiu", name: "椒丘", va: "陈张太康", cardType: "ctc" },
    { id: "yanqing", name: "彦卿", va: "喵酱", cardType: "ctc" },
    { id: "tingyun", name: "停云（幻胧）", va: "蒋丽", cardType: "ctb" },
    { id: "yukong", name: "驭空", va: "钟可", cardType: "ctc" },
    { id: "lingsha", name: "灵砂", va: "饶梓君", cardType: "ctc" },
    { id: "moze", name: "貊泽", va: "黄进泽", cardType: "ctc" },
    { id: "qingque", name: "青雀", va: "刘十四", cardType: "ctc" },
    { id: "yunli", name: "云璃", va: "刘雯", cardType: "ctc" },
    { id: "fugue", name: "停云", va: "蒋丽", cardType: "ctc" },
    { id: "bailu", name: "白露", va: "时欣蕾", cardType: "ctc" },
    { id: "sushang", name: "素裳", va: "陈婷婷", cardType: "ctc" },
    { id: "xueyi", name: "雪衣", va: "溯浔", cardType: "ctc" },
    { id: "hanya", name: "寒鸦", va: "张雨曦", cardType: "ctc" },
    { id: "huohuo", name: "藿藿", va: "葛子瑞", cardType: "ctc" },
    { id: "guinaifen", name: "桂乃芬", va: "小敢", cardType: "ctc" },
  ],
  interastral_peace_appliances: [
    { id: "jade", name: "翡翠", va: "张若瑜", cardType: "ctc" },
    { id: "topaz-numby", name: "托帕", va: "陆敏悦", cardType: "ctc" },
    { id: "aventurine", name: "砂金", va: "杨超然", cardType: "ctc" },
  ],
  galaxy_rangers: [
    { id: "boothill", name: "波提欧", va: "彭博", cardType: "ctc" },
    { id: "rappa", name: "乱破", va: "金娜", cardType: "ctc" },
  ],
  garden_of_recollection: [
    { id: "black-swan", name: "黑天鹅", va: "杨梦露", cardType: "ctc" },
  ],
  intelligentsia_guild: [
    { id: "dr-ratio", name: "真理医生", va: "桑毓泽", cardType: "ctc" },
  ],
  knights_of_beauty: [
    { id: "argenti", name: "银枝", va: "梁达伟", cardType: "ctc" },
  ],
  self_annihilators: [
    { id: "acheron", name: "黄泉", va: "菊花花", cardType: "ctc", favorite: true },
  ],
  penacony: [
    { id: "robin", name: "知更鸟", va: "钱琛", cardType: "cta", favorite: true },
    { id: "sunday", name: "星期日", va: "徐翔", cardType: "ctd" },
    { id: "misha", name: "米沙", va: "柳知萧", cardType: "ctc" },
    { id: "gallagher", name: "加拉赫", va: "马语非", cardType: "ctc" },
  ],
  the_cremators: [
    { id: "the-dahlia", name: "大丽花", va: "阮从青", cardType: "ctc" },
  ],
  masked_fools: [
    { id: "sparkle", name: "花火", va: "赵爽", cardType: "ctc" },
    { id: "sampo", name: "桑博", va: "刘圣博", cardType: "ctc" },
  ],
  herta_space_station: [
    { id: "the-herta", name: "黑塔", va: "侯小菲", cardType: "cta" },
    { id: "herta", name: "黑塔（人偶）", va: "侯小菲", cardType: "ctc" },
    { id: "asta", name: "艾丝妲", va: "龟娘", cardType: "ctc" },
    { id: "arlan", name: "阿兰", va: "陶典", cardType: "ctc" },
  ],

  belobog: [
    { id: "bronya", name: "布洛妮娅", va: "谢莹", cardType: "ctc" },
    { id: "sampo", name: "桑博", va: "刘圣博", cardType: "ctc" },
    { id: "seele", name: "希儿", va: "唐雅菁", cardType: "ctc" },
    { id: "cocolia", name: "可可利亚", va: "", cardType: "ctb" },
    { id: "gepard", name: "杰帕德", va: "马洋", cardType: "ctc" },
    { id: "serval", name: "希露瓦", va: "穆雪婷", cardType: "ctc" },
    { id: "natasha", name: "娜塔莎", va: "秦紫翼", cardType: "ctc" },
    { id: "clara", name: "克拉拉", va: "紫苏九月", cardType: "ctc" },
    { id: "svarog", name: "史瓦罗", va: "王宇航", cardType: "ctc" },
    { id: "pela", name: "佩拉", va: "宴宁", cardType: "ctc" },
    { id: "lynx", name: "玲可", va: "米糊", cardType: "ctc" },
    { id: "luka", name: "卢卡", va: "萧翟", cardType: "ctc" },
    { id: "hook", name: "虎克", va: "王晓彤", cardType: "ctc" },
  ],
  unknown: [{ id: "luocha", name: "罗刹", va: "赵路", cardType: "ctd" }],
};

export const rarity_order = (a: Actor, b: Actor) =>
  cardTypeCodes.indexOf(a.cardType ?? "cte") - cardTypeCodes.indexOf(b.cardType ?? "cte");

export const actors: Actor[] = Object.values(
  Object.entries(actors_by_fraction)
    .flatMap(([fraction, list]) =>
      list.map((a) => ({ ...a, tags: [fraction] })),
    )
    .reduce<Record<string, any>>((acc, a) => {
      acc[a.id] ??= { ...a, tags: [] };
      acc[a.id].tags.push(...a.tags);
      return acc;
    }, {}),
);

export const favorite_actors: Actor[] = Object.values(
  Object.entries(actors_by_fraction)
    .flatMap(([fraction, list]) =>
      list.filter((a) => a.favorite).map((a) => ({ ...a, tags: [fraction] })),
    )
    .reduce<Record<string, any>>((acc, a) => {
      acc[a.id] ??= { ...a, tags: [] };
      acc[a.id].tags.push(...a.tags);
      return acc;
    }, {}),
);

export const actors_map: Record<string, Actor> = Object.values(
  actors_by_fraction,
)
  .flat()
  .reduce<Record<string, Actor>>((map, actor) => {
    map[actor.id] = actor;
    return map;
  }, {});
