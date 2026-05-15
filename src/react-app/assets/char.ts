import { Character, Rarity } from "../types/character";

const chars: Character[] = [
  // astral_express
  { id: "Trailblazer", name: "穹", va: "秦且歌", tags: ["astral_express"], img: { card: "/character_card/trailblazer.webp",avatar:"/characters/trailblazer-character_icon.webp" }, priority: 0, rarity: Rarity.UR },
  { id: "MarchSeventh", name: "三月七", va: "诺亚", tags: ["astral_express"], img: { card: "/character_card/march-7th.webp",avatar:"/characters/march-7th-character_icon.webp" }, priority: 1, rarity: Rarity.N },
  { id: "DanHeng", name: "丹恒", va: "李春胤", tags: ["astral_express"], img: { card: "/character_card/dan-heng.webp",avatar:"/characters/dan-heng-character_icon.webp" }, priority: 1, rarity: Rarity.N },
  { id: "Himeko", name: "姬子", va: "林簌", tags: ["astral_express"], img: { card: "/character_card/himeko.webp",avatar:"/characters/himeko-character_icon.webp" }, priority: 1, rarity: Rarity.N },
  { id: "Welt", name: "瓦尔特", va: "彭博", tags: ["astral_express"], img: { card: "/character_card/welt.webp",avatar:"/characters/welt-character_icon.webp" }, priority: 1, rarity: Rarity.N },
  { id: "PomPom", name: "帕姆", va: "蒋丽", tags: ["astral_express"], img: { card: "/character_card/pom-pom.webp",avatar:"/characters/pom-pom-character_icon.webp" }, priority: 1, rarity: Rarity.N },
  // astral_express + penacony
  { id: "Sunday", name: "星期日", va: "徐翔", tags: ["astral_express", "penacony"], img: { card: "/character_card/sunday.webp",avatar:"/characters/sunday-character_icon.webp" }, priority: 1, rarity: Rarity.N },

  // stellaron_hunters
  { id: "Firefly", name: "流萤", va: "宋媛媛", tags: ["stellaron_hunters"], img: { card: "/character_card/firefly.webp",avatar:"/characters/firefly-character_icon.webp" }, priority: 1, rarity: Rarity.N },
  { id: "Kafka", name: "卡芙卡", va: "徐慧", tags: ["stellaron_hunters"], img: { card: "/character_card/kafka.webp",avatar:"/characters/kafka-character_icon.webp" }, priority: 1, rarity: Rarity.N },
  { id: "Blade", name: "刃", va: "刘以嘉", tags: ["stellaron_hunters"], img: { card: "/character_card/blade.webp",avatar:"/characters/blade-character_icon.webp" }, priority: 1, rarity: Rarity.N },
  { id: "SilverWolf", name: "银狼", va: "Hanser", tags: ["stellaron_hunters"], img: { card: "/character_card/silver-wolf.webp",avatar:"/characters/silver-wolf-character_icon.webp" }, priority: 1, rarity: Rarity.N },

  // genius_society + herta_space_station
  { id: "TheHerta", name: "黑塔", va: "侯小菲", tags: ["genius_society", "herta_space_station"], img: { card: "/character_card/the-herta.webp",avatar:"/characters/the-herta-character_icon.webp" }, priority: 1, rarity: Rarity.N },
  { id: "Herta", name: "黑塔（人偶）", va: "侯小菲", tags: ["genius_society", "herta_space_station"], img: { card: "/character_card/herta.webp",avatar:"/characters/herta-character_icon.webp" }, priority: 1, rarity: Rarity.N },
  { id: "RuanMei", name: "阮 · 梅", va: "张文钰", tags: ["genius_society"], img: { card: "/character_card/ruan-mei.webp",avatar:"/characters/ruan-mei-character_icon.webp" }, priority: 1, rarity: Rarity.N },

  // amphoreus
  { id: "Cyrene", name: "昔涟", va: "宴宁", tags: ["amphoreus"], img: { card: "/character_card/cyrene.webp",avatar:"/characters/cyrene-character_icon.webp" }, priority: 0, rarity: Rarity.UR },
  { id: "Phainon", name: "白厄", va: "秦且歌", tags: ["amphoreus"], img: { card: "/character_card/phainon.webp",avatar:"/characters/phainon-character_icon.webp" }, priority: 1, rarity: Rarity.N },
  { id: "Aglaea", name: "阿格莱雅", va: "楚越", tags: ["amphoreus"], img: { card: "/character_card/aglaea.webp",avatar:"/characters/aglaea-character_icon.webp" }, priority: 1, rarity: Rarity.N },
  { id: "Cipher", name: "赛飞儿", va: "王雅欣", tags: ["amphoreus"], img: { card: "/character_card/cipher.webp",avatar:"/characters/cipher-character_icon.webp" }, priority: 1, rarity: Rarity.N },
  { id: "Castorice", name: "遐蝶", va: "阮从青", tags: ["amphoreus"], img: { card: "/character_card/castorice.webp",avatar:"/characters/castorice-character_icon.webp" }, priority: 1, rarity: Rarity.N },
  { id: "Tribbie", name: "缇宝/缇安/缇宁/…", va: "蔡书瑾", tags: ["amphoreus"], img: { card: "/character_card/tribbie.webp",avatar:"/characters/tribbie-character_icon.webp" }, priority: 1, rarity: Rarity.N },
  { id: "Mydei", name: "万敌", va: "赵成晨", tags: ["amphoreus"], img: { card:"/character_card/mydei.webp",avatar:"/characters/mydei-character_icon.webp" }, priority: 1, rarity: Rarity.N },
  { id: "Anaxa", name: "那刻夏", va:"钱文青", tags:["amphoreus"], img:{ card:"/character_card/anaxa.webp",avatar:" /characters/anaxa-character_icon.webp" }, priority:1,rarity:Rarity.N },
  { id: "Hyacine", name: "风堇", va: "静宸", tags: ["amphoreus"], img: { card: "/character_card/hyacine.webp",avatar:"/characters/hyacine-character_icon.webp" }, priority: 1, rarity: Rarity.N },
  { id: "Cerydra", name: "刻律德菈", va: "时欣蕾", tags: ["amphoreus"], img: { card: "/character_card/cerydra.webp",avatar:"/characters/cerydra-character_icon.webp" }, priority: 1, rarity: Rarity.N },
  { id: "Hysilens", name: "海瑟音", va: "浮梦若薇", tags: ["amphoreus"], img: { card: "/character_card/hysilens.webp",avatar:"/characters/hysilens-character_icon.webp" }, priority: 1, rarity: Rarity.N },
  { id: "Evernight", name: "长夜月", va: "诺亚", tags: ["amphoreus"], img: { card: "/character_card/evernight.webp",avatar:"/characters/evernight-character_icon.webp" }, priority: 1, rarity: Rarity.N },

  // xianzhou_alliance
  { id: "JingYuan", name: "景元", va: "孙晔", tags: ["xianzhou_alliance"], img: { card: "/character_card/jing-yuan.webp",avatar:"/characters/jing-yuan-character_icon.webp" }, priority: 1, rarity: Rarity.N },
  { id: "Feixiao", name: "飞霄", va: "叶知秋", tags: ["xianzhou_alliance"], img: { card: "/character_card/feixiao.webp",avatar:"/characters/feixiao-character_icon.webp" }, priority: 1, rarity: Rarity.N },
  { id: "Jingliu", name: "镜流", va: "杜冥鸦", tags: ["xianzhou_alliance"], img:{ card:"/character_card/jingliu.webp",avatar:" /characters/jingliu-character_icon.webp" }, priority:1,rarity:Rarity.N },
  { id: "FuXuan", name: "符玄", va: "花玲", tags: ["xianzhou_alliance"], img:{ card:"/character_card/fu-xuan.webp",avatar:" /characters/fu-xuan-character_icon.webp" }, priority:1,rarity:Rarity.N },
  { id: "Jiaoqiu", name: "椒丘", va: "陈张太康", tags: ["xianzhou_alliance"], img: { card: "/character_card/jiaoqiu.webp",avatar:"/characters/jiaoqiu-character_icon.webp" }, priority: 1, rarity: Rarity.N },
  { id: "Yanqing", name: "彦卿", va: "喵酱", tags: ["xianzhou_alliance"], img: { card: "/character_card/yanqing.webp",avatar:"/characters/yanqing-character_icon.webp" }, priority: 1, rarity: Rarity.N },
  { id: "Yukong", name: "驭空", va: "钟可", tags: ["xianzhou_alliance"], img: { card: "/character_card/yukong.webp",avatar:"/characters/yukong-character_icon.webp" }, priority: 1, rarity: Rarity.N },
  { id: "Lingsha", name: "灵砂", va: "饶梓君", tags: ["xianzhou_alliance"], img: { card: "/character_card/lingsha.webp",avatar:"/characters/lingsha-character_icon.webp" }, priority: 1, rarity: Rarity.N },
  { id: "Moze", name: "貊泽", va: "黄进泽", tags: ["xianzhou_alliance"], img: { card: "/character_card/moze.webp",avatar:"/characters/moze-character_icon.webp" }, priority: 1, rarity: Rarity.N },
  { id: "Qingque", name: "青雀", va: "刘十四", tags: ["xianzhou_alliance"], img: { card: "/character_card/qingque.webp",avatar:"/characters/qingque-character_icon.webp" }, priority: 1, rarity: Rarity.N },
  { id: "Yunli", name: "云璃", va: "刘雯", tags: ["xianzhou_alliance"], img: { card:"/character_card/yunli.webp",avatar:" /characters/yunli-character_icon.webp" }, priority:1,rarity:Rarity.N },
  { id: "Tingyun", name: "停云", va: "蒋丽", tags: ["xianzhou_alliance"], img:{ card:"/character_card/tingyun.webp",avatar:" /characters/tingyun-character_icon.webp" }, priority:1,rarity:Rarity.N },
  { id: "Bailu", name: "白露", va:"时欣蕾", tags:["xianzhou_alliance"], img:{ card:"/character_card/bailu.webp",avatar:" /characters/bailu-character_icon.webp" }, priority:1,rarity:Rarity.N },
  { id: "Sushang", name: "素裳", va:"陈婷婷", tags:["xianzhou_alliance"], img:{ card:"/character_card/sushang.webp",avatar:" /characters/sushang-character_icon.webp" }, priority:1,rarity:Rarity.N },
  { id: "Xueyi", name: "雪衣", va: "溯浔", tags: ["xianzhou_alliance"], img: { card: "/character_card/xueyi.webp",avatar:"/characters/xueyi-character_icon.webp" }, priority: 1, rarity: Rarity.N },
  { id: "Hanya", name: "寒鸦", va: "张雨曦", tags: ["xianzhou_alliance"], img: { card: "/character_card/hanya.webp",avatar:"/characters/hanya-character_icon.webp" }, priority: 1, rarity: Rarity.N },
  { id: "Huohuo", name: "藿藿", va: "葛子瑞", tags: ["xianzhou_alliance"], img: { card: "/character_card/huohuo.webp",avatar:"/characters/huohuo-character_icon.webp" }, priority: 1, rarity: Rarity.N },
  { id: "Guinaifen", name: "桂乃芬", va: "小敢", tags: ["xianzhou_alliance"], img: { card: "/character_card/guinaifen.webp",avatar:"/characters/guinaifen-character_icon.webp" }, priority: 1, rarity: Rarity.N },

  // interastral_peace_appliances
  { id: "Jade", name: "翡翠", va: "张若瑜", tags: ["interastral_peace_appliances"], img: { card: "/character_card/jade.webp",avatar:"/characters/jade-character_icon.webp" }, priority: 1, rarity: Rarity.N },
  { id: "Topaz", name: "托帕", va: "陆敏悦", tags: ["interastral_peace_appliances"], img: { card: "/character_card/topaz-numby.webp",avatar:"/characters/topaz-numby-character_icon.webp" }, priority: 1, rarity: Rarity.N },
  { id: "Aventurine", name: "砂金", va: "杨超然", tags: ["interastral_peace_appliances"], img: { card: "/character_card/aventurine.webp",avatar:"/characters/aventurine-character_icon.webp" }, priority:1,rarity:Rarity.N },

  // galaxy_rangers
  { id: "Boothill", name: "波提欧", va: "彭博", tags: ["galaxy_rangers"], img: { card: "/character_card/boothill.webp",avatar:"/characters/boothill-character_icon.webp" }, priority: 1, rarity: Rarity.N },
  { id: "Rappa", name: "乱破", va: "金娜", tags: ["galaxy_rangers"], img: { card: "/character_card/rappa.webp",avatar:"/characters/rappa-character_icon.webp" }, priority: 1, rarity: Rarity.N },

  // garden_of_recollection
  { id: "BlackSwan", name: "黑天鹅", va: "杨梦露", tags: ["garden_of_recollection"], img: { card: "/character_card/black-swan.webp",avatar:"/characters/black-swan-character_icon.webp" }, priority: 1, rarity: Rarity.N },

  // intelligentsia_guild
  { id: "DrRatio", name: "真理医生", va: "桑毓泽", tags: ["intelligentsia_guild"], img: { card: "/character_card/dr-ratio.webp",avatar:"/characters/dr-ratio-character_icon.webp" }, priority: 1, rarity: Rarity.N },

  // knights_of_beauty
  { id: "Argenti", name: "银枝", va: "梁达伟", tags: ["knights_of_beauty"], img: { card: "/character_card/argenti.webp",avatar:"/characters/argenti-character_icon.webp" }, priority: 1, rarity: Rarity.N },

  // self_annihilators
  { id: "Acheron", name: "黄泉", va: "菊花花", tags: ["self_annihilators"], img: { card: "/character_card/acheron.webp",avatar:"/characters/acheron-character_icon.webp" }, priority: 1, rarity: Rarity.N },

  // penacony
  { id: "Robin", name: "知更鸟", va: "钱琛", tags: ["penacony"], img: { card: "/character_card/robin.webp",avatar:"/characters/robin-character_icon.webp" }, priority: 1, rarity: Rarity.N },
  { id: "Misha", name: "米沙", va: "柳知萧", tags: ["penacony"], img: { card: "/character_card/misha.webp",avatar:"/characters/misha-character_icon.webp" }, priority: 1, rarity: Rarity.N },
  { id: "Gallagher", name: "加拉赫", va: "马语非", tags: ["penacony"], img: { card: "/character_card/gallagher.webp",avatar:"/characters/gallagher-character_icon.webp" }, priority: 1, rarity: Rarity.N },

  // the_cremators
  { id: "TheDahlia", name: "大丽花", va: "阮从青", tags: ["the_cremators"], img: { card: "/character_card/the-dahlia.webp",avatar:"/characters/the-dahlia-character_icon.webp" }, priority: 1, rarity: Rarity.N },

  // masked_fools
  { id: "Sparkle", name: "花火", va: "赵爽", tags: ["masked_fools"], img: { card: "/character_card/sparkle.webp",avatar:"/characters/sparkle-character_icon.webp" }, priority: 1, rarity: Rarity.N },
  // masked_fools + belobog
  { id: "Sampo", name: "桑博", va: "刘圣博", tags: ["masked_fools", "belobog"], img: { card: "/character_card/sampo.webp",avatar:"/characters/sampo-character_icon.webp" }, priority: 1, rarity: Rarity.N },

  // herta_space_station
  { id: "Asta", name: "艾丝妲", va: "龟娘", tags: ["herta_space_station"], img: { card: "/character_card/asta.webp",avatar:"/characters/asta-character_icon.webp" }, priority: 1, rarity: Rarity.N },
  { id: "Arlan", name: "阿兰", va: "陶典", tags: ["herta_space_station"], img: { card: "/character_card/arlan.webp",avatar:"/characters/arlan-character_icon.webp" }, priority: 1, rarity: Rarity.N },

  // belobog
  { id: "Bronya", name: "布洛妮娅", va: "谢莹", tags: ["belobog"], img: { card: "/character_card/bronya.webp",avatar:"/characters/bronya-character_icon.webp" }, priority: 1, rarity: Rarity.N },
  { id: "Seele", name: "希儿", va: "唐雅菁", tags: ["belobog"], img: { card: "/character_card/seele.webp",avatar:"/characters/seele-character_icon.webp" }, priority: 1, rarity: Rarity.N },
  { id: "Cocolia", name: "可可利亚", tags: ["belobog"], img: { card: "/character_card/cocolia.webp",avatar:"/characters/cocolia-character_icon.webp" }, priority: 1, rarity: Rarity.N },
  { id: "Gepard", name: "杰帕德", va: "马洋", tags: ["belobog"], img: { card: "/character_card/gepard.webp",avatar:"/characters/gepard-character_icon.webp" }, priority: 1, rarity: Rarity.N },
  { id: "Serval", name: "希露瓦", va: "穆雪婷", tags: ["belobog"], img: { card: "/character_card/serval.webp",avatar:"/characters/serval-character_icon.webp" }, priority: 1, rarity: Rarity.N },
  { id: "Natasha", name: "娜塔莎", va: "秦紫翼", tags: ["belobog"], img: { card: "/character_card/natasha.webp",avatar:"/characters/natasha-character_icon.webp" }, priority: 1, rarity: Rarity.N },
  { id: "Clara", name: "克拉拉", va: "紫苏九月", tags: ["belobog"], img: { card: "/character_card/clara.webp",avatar:"/characters/clara-character_icon.webp" }, priority: 1,rarity: Rarity.N },
  { id: "Svarog", name: "史瓦罗", va: "王宇航", tags: ["belobog"], img: { card: "/character_card/svarog.webp",avatar:" /characters/svarog-character_icon.webp" },priority: 1,rarity: Rarity.N },
  { id: "Pela", name: "佩拉", va: "宴宁", tags: ["belobog"], img: { card: "/character_card/pela.webp",avatar:"/characters/pela-character_icon.webp" }, priority: 1, rarity: Rarity.N },
  { id: "Lynx", name: "玲可", va: "米糊", tags: ["belobog"], img: { card: "/character_card/lynx.webp",avatar:"/characters/lynx-character_icon.webp" }, priority: 1, rarity: Rarity.N },
  { id: "Luka", name: "卢卡", va: "萧翟", tags: ["belobog"], img: { card: "/character_card/luka.webp",avatar:"/characters/luka-character_icon.webp" }, priority: 1, rarity: Rarity.N },
  { id: "Hook", name: "虎克", va: "王晓彤", tags: ["belobog"], img: { card: "/character_card/hook.webp",avatar:"/characters/hook-character_icon.webp" }, priority: 1, rarity: Rarity.N },

  // unknown
  { id: "Luocha", name: "罗刹", va: "赵路", tags: [], img: { card: "/character_card/luocha.webp",avatar:"/characters/luocha-character_icon.webp" }, priority: 1, rarity: Rarity.N },
];

export default chars;
export const chars_map: Record<string, Character> = chars
  .reduce<Record<string, Character>>((map, char) => {
    map[char.id] = char;
    return map;
  }, {});
