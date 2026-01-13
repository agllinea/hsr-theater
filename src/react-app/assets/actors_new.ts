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
        { id: "trailblazer", name: "穹", va: "秦且歌", rarity: "ur" },
        { id: "march-7th", name: "三月七", va: "诺亚", rarity: "ssr" },
        { id: "dan-heng", name: "丹恒", va: "李春胤", rarity: "ssr" },
        { id: "himeko", name: "姬子", va: "林簌", rarity: "ssr" },
        { id: "welt", name: "瓦尔特", va: "彭博", rarity: "ssr" },
        { id: "", name: "帕姆", va: "蒋丽", rarity: "ssr" },
        { id: "sunday", name: "星期日", va: "徐翔", rarity: "ssr" },
    ],
    stellaron_hunters: [
        {
            id: "firefly",
            name: "流萤",
            va: "宋媛媛",
            rarity: "ur",
        },
        { id: "kafka", name: "卡芙卡", va: "徐慧", rarity: "ssr" },
        { id: "blade", name: "刃", va: "刘以嘉", rarity: "ssr" },
        { id: "silver-wolf", name: "银狼", va: "Hanser", rarity: "ssr" },
    ],
    aeon: [{ id: "", name: "纳努克", rarity: "ur" }],
    genius_society: [
        { id: "the-herta", name: "黑塔", va: "侯小菲", rarity: "ur" },
        { id: "ruan-mei", name: "阮 · 梅", va: "张文钰", rarity: "ssr" },
        { id: "herta", name: "黑塔（人偶）", va: "侯小菲", rarity: "ssr" },
    ],
    lord_ravager: [
        { id: "", name: "幻胧", va: "", rarity: "ur" },
        { id: "tingyun", name: "停云（幻胧）", va: "蒋丽", rarity: "ssr" },
    ],
    amphoreus: [
        { id: "cyrene", name: "昔涟", va: "宴宁", rarity: "ur" },
        { id: "phainon", name: "白厄", va: "秦且歌", rarity: "ur" },
        { id: "aglaea", name: "阿格莱雅", va: "楚越", rarity: "ur" },
        { id: "cipher", name: "赛飞儿", va: "王雅欣", rarity: "ur" },
        { id: "castorice", name: "遐蝶", va: "阮从青", rarity: "ur" },
        { id: "tribbie", name: "缇宝/缇安/缇宁/…", va: "蔡书瑾", rarity: "ur" },
        { id: "mydei", name: "万敌", va: "赵成晨", rarity: "ssr" },
        { id: "anaxa", name: "那刻夏", va: "钱文青", rarity: "ssr" },
        { id: "hyacine", name: "风堇", va: "静宸", rarity: "ssr" },
        { id: "cerydra", name: "刻律德菈", va: "时欣蕾", rarity: "ssr" },
        { id: "hysilens", name: "海瑟音", va: "浮梦若薇", rarity: "ssr" },
        { id: "evernight", name: "长夜月", va: "诺亚", rarity: "ssr" },
    ],
    xianzhou_alliance: [
        { id: "jing-yuan", name: "景元", va: "孙晔", rarity: "ur" },
        { id: "feixiao", name: "飞霄", va: "叶知秋", rarity: "ur" },
        { id: "jingliu", name: "镜流", va: "杜冥鸦", rarity: "ssr" },
        { id: "fu-xuan", name: "符玄", va: "花玲", rarity: "ssr" },
        { id: "jiaoqiu", name: "椒丘", va: "陈张太康", rarity: "ssr" },
        { id: "yanqing", name: "彦卿", va: "喵酱", rarity: "ssr" },
        { id: "tingyun", name: "停云（幻胧）", va: "蒋丽", rarity: "ssr" },
        { id: "yukong", name: "驭空", va: "钟可", rarity: "sr" },
        { id: "lingsha", name: "灵砂", va: "饶梓君", rarity: "sr" },
        { id: "moze", name: "貊泽", va: "黄进泽", rarity: "sr" },
        { id: "qingque", name: "青雀", va: "刘十四", rarity: "sr" },
        { id: "yunli", name: "云璃", va: "刘雯", rarity: "sr" },
        { id: "fugue", name: "停云", va: "蒋丽", rarity: "sr" },
        { id: "bailu", name: "白露", va: "时欣蕾", rarity: "sr" },
        { id: "sushang", name: "素裳", va: "陈婷婷", rarity: "sr" },
        { id: "xueyi", name: "雪衣", va: "溯浔", rarity: "npc" },
        { id: "hanya", name: "寒鸦", va: "张雨曦", rarity: "npc" },
        { id: "huohuo", name: "藿藿", va: "葛子瑞", rarity: "npc" },
        { id: "guinaifen", name: "桂乃芬", va: "小敢", rarity: "npc" },
    ],
    interastral_peace_appliances: [
        { id: "jade", name: "翡翠", va: "张若瑜", rarity: "ssr" },
        { id: "topaz-numby", name: "托帕", va: "陆敏悦", rarity: "ssr" },
        { id: "aventurine", name: "砂金", va: "杨超然", rarity: "ssr" },
    ],
    galaxy_rangers: [
        { id: "boothill", name: "波提欧", va: "彭博", rarity: "ssr" },
        { id: "rappa", name: "乱破", va: "金娜", rarity: "ssr" },
    ],
    garden_of_recollection: [{ id: "black-swan", name: "黑天鹅", va: "杨梦露", rarity: "ur" }],
    intelligentsia_guild: [{ id: "dr-ratio", name: "真理医生", va: "桑毓泽", rarity: "ssr" }],
    knights_of_beauty: [{ id: "argenti", name: "银枝", va: "梁达伟", rarity: "ssr" }],
    self_annihilators: [{ id: "acheron", name: "黄泉", va: "菊花花", rarity: "ur" }],
    penacony: [
        { id: "robin", name: "知更鸟", va: "钱琛", rarity: "ur" },
        { id: "sunday", name: "星期日", va: "徐翔", rarity: "ssr" },
        { id: "misha", name: "米沙", va: "柳知萧", rarity: "ssr" },
        { id: "gallagher", name: "加拉赫", va: "马语非", rarity: "ssr" },
    ],
    the_cremators: [{ id: "the-dahlia", name: "大丽花", va: "阮从青", rarity: "ssr" }],
    masked_fools: [
        { id: "sparkle", name: "花火", va: "赵爽", rarity: "ssr" },
        { id: "sampo", name: "桑博", va: "刘圣博", rarity: "ssr" },
    ],
    herta_space_station: [
        { id: "the-herta", name: "黑塔", va: "侯小菲", rarity: "ur" },
        { id: "herta", name: "黑塔（人偶）", va: "侯小菲", rarity: "ssr" },
        { id: "asta", name: "艾丝妲", va: "龟娘", rarity: "sr" },
        { id: "arlan", name: "阿兰", va: "陶典", rarity: "npc" },
    ],

    belobog: [
        { id: "bronya", name: "布洛妮娅", va: "谢莹", rarity: "ssr" },
        { id: "sampo", name: "桑博", va: "刘圣博", rarity: "ssr" },
        { id: "seele", name: "希儿", va: "唐雅菁", rarity: "sr" },
        { id: "", name: "可可利亚", va: "", rarity: "sr" },
        { id: "gepard", name: "杰帕德", va: "马洋", rarity: "sr" },
        { id: "serval", name: "希露瓦", va: "穆雪婷", rarity: "sr" },
        { id: "natasha", name: "娜塔莎", va: "秦紫翼", rarity: "sr" },
        { id: "clara", name: "克拉拉", va: "紫苏九月", rarity: "sr" },
        { id: "", name: "史瓦罗", va: "王宇航", rarity: "sr" },
        { id: "pela", name: "佩拉", va: "宴宁", rarity: "npc" },
        { id: "lynx", name: "玲可", va: "米糊", rarity: "npc" },
        { id: "luka", name: "卢卡", va: "萧翟", rarity: "npc" },
        { id: "hook", name: "虎克", va: "王晓彤", rarity: "npc" },
    ],
    unknown: [{ id: "luocha", name: "罗刹", va: "赵路", rarity: "ssr" }],
};

export const actors: Actor[] = Object.values(
    Object.entries(actors_by_fraction)
        .flatMap(([fraction, list]) => list.map((a) => ({ ...a, tags: [fraction] })))
        .reduce<Record<string, any>>((acc, a) => {
            acc[a.id] ??= { ...a, tags: [] };
            acc[a.id].tags.push(...a.tags);
            return acc;
        }, {})
);
