import React, { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Actors from "./Actors";
import AnimatedShorts from "./AnimatedShorts";
import Scripts from "./Scripts";
import "./main.css";

// Types
interface Actor {
  name: string;
  tags: string[];
  va: string;
}

interface Video {
  title: string;
  genre: string;
  url: string;
  needed: boolean;
}

interface Script {
  id: number;
  title: string;
  author: string;
  description: string;
}

// Sample Data
const actors: Actor[] = [
  { name: "卡芙卡", tags: ["星核猎手"], va: "徐慧" },
  { name: "流萤", tags: ["星核猎手"], va: "宋媛媛" },
  { name: "刃", tags: ["星核猎手"], va: "刘以嘉" },
  { name: "银狼", tags: ["星核猎手"], va: "Hanser" },
  { name: "丹恒", tags: ["星穹列车"], va: "李春胤" },
  { name: "姬子", tags: ["星穹列车"], va: "林簌" },
  { name: "帕姆", tags: ["星穹列车"], va: "蒋丽" },
  { name: "穹", tags: ["星穹列车"], va: "秦且歌" },
  { name: "三月七", tags: ["星穹列车"], va: "诺亚" },
  { name: "瓦尔特", tags: ["星穹列车"], va: "彭博" },
  { name: "阿兰", tags: ["空间站「黑塔」"], va: "陶典" },
  { name: "艾丝妲", tags: ["空间站「黑塔」"], va: "龟娘" },
  {
    name: "黑塔（人偶）",
    tags: ["天才俱乐部", "空间站「黑塔」"],
    va: "侯小菲",
  },
  { name: "纳努克", tags: ["星神"], va: "" },
  { name: "黑塔", tags: ["天才俱乐部", "空间站「黑塔」"], va: "侯小菲" },
  { name: "阮 · 梅", tags: ["天才俱乐部"], va: "张文钰" },
  { name: "黑天鹅", tags: ["流光忆庭"], va: "杨梦露" },
  { name: "布洛妮娅", tags: ["贝洛伯格"], va: "谢莹" },
  { name: "虎克", tags: ["贝洛伯格"], va: "王晓彤" },
  { name: "杰帕德", tags: ["贝洛伯格"], va: "马洋" },
  { name: "可可利亚", tags: ["贝洛伯格"], va: "" },
  { name: "克拉拉", tags: ["贝洛伯格"], va: "紫苏九月" },
  { name: "玲可", tags: ["贝洛伯格"], va: "米糊" },
  { name: "卢卡", tags: ["贝洛伯格"], va: "萧翟" },
  { name: "娜塔莎", tags: ["贝洛伯格"], va: "秦紫翼" },
  { name: "佩拉", tags: ["贝洛伯格"], va: "宴宁" },
  { name: "桑博", tags: ["假面愚者", "贝洛伯格"], va: "刘圣博" },
  { name: "史瓦罗", tags: ["贝洛伯格"], va: "王宇航" },
  { name: "希儿", tags: ["贝洛伯格"], va: "唐雅菁" },
  { name: "希露瓦", tags: ["贝洛伯格"], va: "穆雪婷" },
  { name: "花火", tags: ["假面愚者"], va: "赵爽" },
  { name: "白露", tags: ["仙舟「罗浮」"], va: "时欣蕾" },
  { name: "符玄", tags: ["仙舟「罗浮」"], va: "花玲" },
  { name: "桂乃芬", tags: ["仙舟「罗浮」"], va: "小敢" },
  { name: "寒鸦", tags: ["仙舟「罗浮」"], va: "张雨曦" },
  { name: "藿藿", tags: ["仙舟「罗浮」"], va: "葛子瑞" },
  { name: "景元", tags: ["仙舟「罗浮」"], va: "孙晔" },
  { name: "镜流", tags: ["仙舟「罗浮」"], va: "杜冥鸦" },
  { name: "灵砂", tags: ["仙舟「罗浮」"], va: "饶梓君" },
  { name: "青雀", tags: ["仙舟「罗浮」"], va: "刘十四" },
  { name: "素裳", tags: ["仙舟「罗浮」"], va: "陈婷婷" },
  { name: "停云", tags: ["仙舟「罗浮」"], va: "蒋丽" },
  { name: "停云（幻胧）", tags: ["仙舟「罗浮」", "绝灭大君"], va: "蒋丽" },
  { name: "雪衣", tags: ["仙舟「罗浮」"], va: "溯浔" },
  { name: "彦卿", tags: ["仙舟「罗浮」"], va: "喵酱" },
  { name: "驭空", tags: ["仙舟「罗浮」"], va: "钟可" },
  { name: "翡翠", tags: ["星际和平公司"], va: "张若瑜" },
  { name: "砂金", tags: ["星际和平公司"], va: "杨超然" },
  { name: "托帕", tags: ["星际和平公司"], va: "陆敏悦" },
  { name: "幻胧", tags: ["绝灭大君"], va: "" },
  { name: "飞霄", tags: ["仙舟「曜青」"], va: "叶知秋" },
  { name: "椒丘", tags: ["仙舟「曜青」"], va: "陈张太康" },
  { name: "貊泽", tags: ["仙舟「曜青」"], va: "黄进泽" },
  { name: "云璃", tags: ["仙舟「朱明」"], va: "刘雯" },
  { name: "加拉赫", tags: ["匹诺康尼"], va: "马语非" },
  { name: "米沙", tags: ["匹诺康尼", "星穹列车"], va: "柳知萧" },
  { name: "星期日", tags: ["匹诺康尼", "星穹列车"], va: "徐翔" },
  { name: "知更鸟", tags: ["匹诺康尼"], va: "钱琛" },
  { name: "银枝", tags: ["纯美骑士团"], va: "梁达伟" },
  { name: "真理医生", tags: ["博识学会"], va: "桑毓泽" },
  { name: "黄泉", tags: ["自灭者"], va: "菊花花" },
  { name: "波提欧", tags: ["巡海游侠"], va: "彭博" },
  { name: "乱破", tags: ["巡海游侠"], va: "金娜" },
  { name: "大丽花", tags: ["焚化工"], va: "阮从青" },
  { name: "尾巴", tags: ["岁阳"], va: "刘北辰" },
  { name: "阿格莱雅", tags: ["翁法罗斯"], va: "楚越" },
  { name: "白厄", tags: ["翁法罗斯"], va: "秦且歌" },
  { name: "风堇", tags: ["翁法罗斯"], va: "静宸" },
  { name: "海瑟音", tags: ["翁法罗斯"], va: "浮梦若薇" },
  { name: "刻律德菈", tags: ["翁法罗斯"], va: "时欣蕾" },
  { name: "那刻夏", tags: ["翁法罗斯"], va: "钱文青" },
  { name: "赛飞儿", tags: ["翁法罗斯"], va: "王雅欣" },
  { name: "缇宝/缇安/缇宁/…", tags: ["翁法罗斯"], va: "蔡书瑾" },
  { name: "万敌", tags: ["翁法罗斯"], va: "赵成晨" },
  { name: "昔涟", tags: ["翁法罗斯"], va: "宴宁" },
  { name: "遐蝶", tags: ["翁法罗斯"], va: "阮从青" },
  { name: "长夜月", tags: ["翁法罗斯"], va: "诺亚" },
  { name: "罗刹", tags: [""], va: "赵路" },
];

const videos: Video[] = [
  {
    title: "有关星空的寓言集•其一",
    genre: "千星纪游",
    url: "https://www.bilibili.com/video/BV1EM4y1h7Vm/",
    needed: true,
  },
  {
    title: "仙舟通鉴•帝弓七天将",
    genre: "千星纪游",
    url: "https://www.bilibili.com/video/BV19o4y1x7tX/",
    needed: true,
  },
  {
    title: "飞光",
    genre: "动画短片",
    url: "https://www.bilibili.com/video/BV16g4y157Zc/",
    needed: true,
  },
  {
    title: "耶佩拉叛乱：第47场",
    genre: "千星纪游",
    url: "https://www.bilibili.com/video/BV1Nu411H7C6/",
    needed: true,
  },
  {
    title: "仙舟通鉴•五龙远徙",
    genre: "千星纪游",
    url: "https://www.bilibili.com/video/BV1nu4y1D7Ex/",
    needed: true,
  },
  {
    title: "玄黄",
    genre: "动画短片",
    url: "https://www.bilibili.com/video/BV1Th4y1S7KF/",
    needed: true,
  },
  {
    title: "云骑武经•说剑",
    genre: "千星纪游",
    url: "https://www.bilibili.com/video/BV12N4y1o7ET/",
    needed: false,
  },
  {
    title: "星际和平导览：甄选、规划和机遇",
    genre: "千星纪游",
    url: "https://www.bilibili.com/video/BV1ny4y1P7SN/",
    needed: true,
  },
  {
    title: "绥园伏鬼记",
    genre: "千星纪游",
    url: "https://www.bilibili.com/video/BV1Xw411K7Mg/",
    needed: false,
  },
  {
    title: "阮声落华裳，梅出似点妆",
    genre: "千星纪游",
    url: "https://www.bilibili.com/video/BV1pb4y1V7Qw/",
    needed: false,
  },
  {
    title: "永火一夜：第33场",
    genre: "千星纪游",
    url: "https://www.bilibili.com/video/BV1UK411e7tY/",
    needed: true,
  },
  {
    title: "滴答！一起来梦游吧！",
    genre: "动画短片",
    url: "https://www.bilibili.com/video/BV1iC4y1C7KV/",
    needed: false,
  },
  {
    title: "旧梦重温",
    genre: "千星纪游",
    url: "https://www.bilibili.com/video/BV1FZ421z7PE/",
    needed: false,
  },
  {
    title: "《花火》：幕后纪录",
    genre: "千星纪游",
    url: "https://www.bilibili.com/video/BV1cC411W7pH/",
    needed: false,
  },
  {
    title: "永劫轮舞",
    genre: "动画短片",
    url: "https://www.bilibili.com/video/BV1aC411h7e6/",
    needed: true,
  },
  {
    title: "虚谭•浮世三千一刀缭断",
    genre: "千星纪游",
    url: "https://www.bilibili.com/video/BV16m411R78H/",
    needed: false,
  },
  {
    title: "假若有一双翅膀",
    genre: "千星纪游",
    url: "https://www.bilibili.com/video/BV1wz421U7LZ/",
    needed: false,
  },
  {
    title: "此刻，在同一片星空下",
    genre: "千星纪游",
    url: "https://www.bilibili.com/video/BV16s421u7NP/",
    needed: true,
  },
  {
    title: "格拉默的余烬",
    genre: "动画短片",
    url: "https://www.bilibili.com/video/BV1us421u7sp/",
    needed: true,
  },
  {
    title: "塔塔洛夫向你致意",
    genre: "千星纪游",
    url: "https://www.bilibili.com/video/BV1fx4y147PH/",
    needed: false,
  },
  {
    title: "石心誓环•天平两端",
    genre: "千星纪游",
    url: "https://www.bilibili.com/video/BV1xE4m1R78a/",
    needed: false,
  },
  {
    title: "天干剑燥，小心火炉",
    genre: "千星纪游",
    url: "https://www.bilibili.com/video/BV1xi421a7mg/",
    needed: false,
  },
  {
    title: "飞镝追星",
    genre: "千星纪游",
    url: "https://www.bilibili.com/video/BV1TT421z7e3/",
    needed: false,
  },
  {
    title: "清闲自在身",
    genre: "动画短片",
    url: "https://www.bilibili.com/video/BV1WvpTekEPQ/",
    needed: false,
  },
  {
    title: "银河忍法帖•乱武驱魔破邪斩月之卷",
    genre: "动画短片",
    url: "https://www.bilibili.com/video/BV13pyPYSEar/",
    needed: false,
  },
  {
    title: "太阳落下之后",
    genre: "千星纪游",
    url: "https://www.bilibili.com/video/BV1ZBzhYREVs/",
    needed: false,
  },
  {
    title: "不似一片浮云",
    genre: "千星纪游",
    url: "https://www.bilibili.com/video/BV12xkMYjEio/",
    needed: false,
  },
  {
    title: "群星静默如谜",
    genre: "千星纪游",
    url: "https://www.bilibili.com/video/BV1dCr3YqEtT/",
    needed: false,
  },
  {
    title: "大 黑 塔 的 魔 法 厨 房",
    genre: "动画短片",
    url: "https://www.bilibili.com/video/BV1cErqYDEGC/",
    needed: false,
  },
  {
    title: "翁法罗斯英雄纪",
    genre: "千星纪游",
    url: "https://www.bilibili.com/video/BV1GeUUYREXy/",
    needed: true,
  },
  {
    title: "论泰坦与地上万邦",
    genre: "千星纪游",
    url: "https://www.bilibili.com/video/BV1uf6tYBEWN/",
    needed: true,
  },
  {
    title: "诸神尽喑之歌",
    genre: "千星纪游",
    url: "https://www.bilibili.com/video/BV1KbcNepEzt/",
    needed: true,
  },
  {
    title: "命运的第一个黎明",
    genre: "千星纪游",
    url: "https://www.bilibili.com/video/BV1sZAnevEsh/",
    needed: true,
  },
  {
    title: "那安息的长夜",
    genre: "动画短片",
    url: "https://www.bilibili.com/video/BV16io9YTEqH/",
    needed: true,
  },
  {
    title: "生命从夜中醒来",
    genre: "千星纪游",
    url: "https://www.bilibili.com/video/BV18hZ1YaEuM/",
    needed: true,
  },
  {
    title: "有关星空的寓言集•其二",
    genre: "千星纪游",
    url: "https://www.bilibili.com/video/BV1HsKbznEZg/",
    needed: true,
  },
  {
    title: "听！狂欢在那神佑的山巅",
    genre: "动画短片",
    url: "https://www.bilibili.com/video/BV1twgSzhEo8/",
    needed: true,
  },
  {
    title: "开拓者",
    genre: "千星纪游",
    url: "https://www.bilibili.com/video/BV19RhAzcEdU/",
    needed: false,
  },
  {
    title: "亲爱的三月七",
    genre: "千星纪游",
    url: "https://www.bilibili.com/video/BV1uopiz8E9B/",
    needed: false,
  },
  {
    title: "跋涉",
    genre: "动画短片",
    url: "https://www.bilibili.com/video/BV1BpJrz7EUL/",
    needed: true,
  },
  {
    title: "翁法罗斯英雄纪",
    genre: "千星纪游",
    url: "https://www.bilibili.com/video/BV1R5JyzJE9Y/",
    needed: true,
  },
  {
    title: "故事之外：第8场",
    genre: "千星纪游",
    url: "https://www.bilibili.com/video/BV1xzs1zDEFi/",
    needed: true,
  },
  {
    title: "再见，昔涟",
    genre: "千星纪游",
    url: "https://www.bilibili.com/video/BV1yXyaBGEVR/",
    needed: false,
  },
  {
    title: "你好，世界",
    genre: "动画短片",
    url: "https://www.bilibili.com/video/BV14G1kB5Evp/",
    needed: true,
  },
];

const scripts: Script[] = [
  {
    id: 1,
    title: "Eternal Sunset",
    author: "Jane Doe",
    description:
      "A poignant drama about finding hope in the darkest moments of life.",
  },
  {
    id: 2,
    title: "Digital Dreams",
    author: "John Smith",
    description:
      "A sci-fi thriller exploring the intersection of technology and consciousness.",
  },
  {
    id: 3,
    title: "Forgotten Melodies",
    author: "Sarah Johnson",
    description: "A musical journey through memory, loss, and rediscovery.",
  },
  {
    id: 4,
    title: "The Silent Observer",
    author: "Michael Chen",
    description:
      "A psychological mystery that blurs the line between reality and perception.",
  },
  {
    id: 5,
    title: "Crimson Horizon",
    author: "Emily Rose",
    description:
      "An epic adventure set in a world on the brink of transformation.",
  },
];

const allTags = Array.from(new Set(actors.flatMap((actor) => actor.tags)));

// Cover Component
const Cover: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { amount: 0.1 });

  useEffect(() => {
    console.log("Cover", isInView);
    if (isInView && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [isInView]);

  return (
    <section ref={ref} className="cover">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="cover-title"
      >
        SR Theater
      </motion.h1>
    </section>
  );
};

// Main Component
const Main: React.FC = () => {
  // const ref = useRef<HTMLDivElement>(null);
  // const isInView = useInView(ref, { amount: 0.1 });

  // useEffect(() => {
  //   console.log("Main", isInView)
  //   if (isInView && ref.current) {
  //     ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  //   }
  // }, [isInView]);

  return (
    <section className="main">
      <Actors actors={actors} allTags={allTags} />
      <AnimatedShorts videos={videos} />
      <Scripts scripts={scripts} />
    </section>
  );
};

// Footer Component
const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <p className="footer-text">
        &copy; 2026 SR Theater. All rights reserved. | Design by Creative
        Studios
      </p>
    </footer>
  );
};

// Main App Component
const App: React.FC = () => {
  return (
    <body className="app">
      <Cover />
      <Main />
      <Footer />
    </body>
  );
};

export default App;
