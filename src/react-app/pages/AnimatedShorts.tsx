import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import './AnimatedShorts.css';
import { AutoScroll } from './auto_scroll';

interface Video {
  title: string;
  genre: string;
  url: string;
  display: boolean;
  desc?: string;
}
interface AnimatedShortsProps {
}

const videos: Video[] = [
  {
    "title": "有关星空的寓言集•其一",
    "genre": "千星纪游",
    "url": "https://www.bilibili.com/video/BV1EM4y1h7Vm/",
    "display": false,
    "desc": "「无数流星划过今夜的天空…如果选中了正确的那一颗，它将把你的愿望带向千百个世界。」\r\n\r\n中文CV：\r\n「忆者」黑天鹅——杨梦露\r\n\r\n日文CV：\r\n「忆者」黑天鹅——生天目仁美\r\n\r\n英文CV：\r\n「忆者」黑天鹅——Arryn Zech\r\n\r\n韩文CV：\r\n「忆者」黑天鹅——김하영"
  },
  {
    "title": "仙舟通鉴•帝弓七天将",
    "genre": "千星纪游",
    "url": "https://www.bilibili.com/video/BV19o4y1x7tX/",
    "display": false,
    "desc": "星汉做关河，张弓奏棹歌。\r\n军锋和金柝，破阵仗神戈。\r\n前途迢递孱颜险，旌旆蔽天讨寿魔。\r\n\r\n中文CV：\r\n公输师傅——邹亮\r\n景元——孙晔\r\n罗刹——赵路\r\n\r\n日文CV：\r\n公输师傅——近藤浩德\r\n景元——小野大辅\r\n罗刹——石田彰\r\n\r\n英文CV：\r\n公输师傅——Michael Sorich\r\n景元——Alejandro Saab\r\n罗刹——Craig Lee Thomas\r\n\r\n韩文CV：\r\n公输师傅——김용\r\n景元——류승곤\r\n罗刹——신용우"
  },
  {
    "title": "飞光",
    "genre": "动画短片",
    "url": "https://www.bilibili.com/video/BV16g4y157Zc/",
    "display": true,
    "desc": "星历7380年，前代罗浮剑首「镜流」身堕魔阴，云骑聚星槎海战之，不知其所踪。——《仙舟通鉴•云骑战事纪要》\n星历8096年，神策府演武考校，士卒彦卿得魁，擢拔骁卫。——《神策府通录》\n\n「飞光飞光，劝尔一杯酒。」\n飞光，是师徒间交错的剑锋，是天地间汹涌的时间。\n究竟过去多久了呢？\n与师父的交锋，已是七百多年前的往事了，却像在昨天。\n遇到眼前的孩子，收他做弟子，大概不过几年，却恍如隔世。\n时间如野马、如掣电、如剔骨钢刀穿肠而过，却又一切如故。\n\n出品：miHoYo Anime\n联合制作：幻想师动画、Studio ppuri\n原创音乐：HOYO-MiX @HOYO-MiX \n\n中文CV：\n景元——孙晔\n少年景元——钟可\n镜流——杜冥鸦\n彦卿——喵酱\n\n日文CV：\n景元——小野大辅\n少年景元——松见优花\n镜流——桑岛法子\n彦卿——井上麻里奈\n\n英文CV：\n景元——Alejandro Saab\n少年景元——Brenna Larsen\n镜流——AmaLee\n彦卿——Amber May\n\n韩文CV：\n景元——류승곤\n少年景元——김예림\n镜流——박이서\n彦卿——이새아"
  },
  {
    "title": "耶佩拉叛乱：第47场",
    "genre": "千星纪游",
    "url": "https://www.bilibili.com/video/BV1Nu411H7C6/",
    "display": false,
    "desc": "第47场。\n内景。耶佩拉宫——黄昏。毁灭。\n女人微笑着看向审判席，迎接他们的判词……\n\n中文CV：\n卡芙卡——徐慧\n萨姆——淦子齐\n耶佩拉罚判者——赵梓涵\n\n日文CV：\n卡芙卡——伊藤静\n萨姆——笠间淳\n耶佩拉罚判者——藤井启辅\n\n英文CV：\n卡芙卡——Cheryl Texiera\n萨姆——Adin Rudd\n耶佩拉罚判者——Steven Kelly\n\n韩文CV：\n卡芙卡——사문영\n萨姆——장서화\n耶佩拉罚判者——장서화"
  },
  {
    "title": "仙舟通鉴•五龙远徙",
    "genre": "千星纪游",
    "url": "https://www.bilibili.com/video/BV1nu4y1D7Ex/",
    "display": false,
    "desc": "「祂绘出一个完美的圆，如命运般周而复始，从来处来，到去处去。」\n\n中文CV：\n「龙师」涛然——许棕哲\n「执笔者」奥本海默——李程远\n\n日文CV：\n「龙师」涛然——上别府仁资\n「执笔者」奥本海默——伊藤有希\n\n英文CV：\n「龙师」涛然——Daman Mills\n「执笔者」奥本海默——Frank Todaro\n\n韩文CV：\n「龙师」涛然——김용\n「执笔者」奥本海默——구지원"
  },
  {
    "title": "玄黄",
    "genre": "动画短片",
    "url": "https://www.bilibili.com/video/BV1Th4y1S7KF/",
    "display": true,
    "desc": "星历4800年，会持明五脉盟于玉阙，载书誓曰：金石可铄，此誓不破。——《仙舟通鉴•五龙远徙》\n星历7379年，饮月君丹枫衅乱，危及若木。云骑会持明龙师共击之。——《仙舟通鉴•云骑战事纪要》\n\n「荡荡龙君，受天至灵。云行雨施，品物流形。」\n……\n他梦见自己膺承职责，舞雩如仪，封印建木。\n他梦见自己踏足锋镝流坠的战场，自天降罚。\n他梦见自己被玉柱牵锁，长针贯身，镇入黑暗。\n他梦见自己在黑暗中徘徊无措，被逡巡的影子追逐。\n……\n在所有梦中，他是龙，是英雄，是罪囚，唯独不是和他们一样有着爱恨悲欢的人。\n\n出品：miHoYo Anime\n联合制作：幻想师动画、RED DOG CULTURE HOUSE\n原创音乐：HOYO-MiX \n\n中文CV：\n丹恒——李春胤\n丹枫——杨超然\n应星/刃——刘以嘉\n景元——孙晔\n镜流——杜冥鸦\n白珩——陶典\n姬子——林簌\n瓦尔特——彭博\n三月七——诺亚\n帕姆——蒋丽\n\n日文CV：\n丹恒——伊东健人\n丹枫——间岛淳司\n应星/刃——三木真一郎\n景元——小野大辅\n镜流——桑岛法子\n白珩——末柄里惠\n姬子——田中理惠\n瓦尔特——细谷佳正\n三月七——小仓唯\n帕姆——长泽美树\n\n英文CV：\n丹恒——Nicholas Leung\n丹枫——Yong Yea\n应星/刃——Daman Mills\n景元——Alejandro Saab\n镜流——AmaLee\n白珩——Montse Hernandez\n姬子——Cia Court\n瓦尔特——Corey Landis\n三月七——Skyler Davenport\n帕姆——Christine Sposato\n\n韩文CV：\n丹恒——김혜성\n丹枫——권성혁\n应星/刃——곽윤상\n景元——류승곤\n镜流——박이서\n白珩——김이안\n姬子——김보나\n瓦尔特——한신\n三月七——정혜원\n帕姆——윤아영"
  },
  {
    "title": "云骑武经•说剑",
    "genre": "千星纪游",
    "url": "https://www.bilibili.com/video/BV12N4y1o7ET/",
    "display": false,
    "desc": "「『直之无前，举之无上，案之无下，运之无旁。上决浮云，下绝地纪。』…这便是我汲汲所求的剑。」\n「可这样的剑，世间真的存在吗？」\n\n剑，长三尺七寸，轻如无物。\n它并非凡铁熔铸，而是一截坚冰凝成，幽幽含光，如握一线月光在手。\n中文CV：\n镜流——杜冥鸦\n彦卿——喵酱\n\n日文CV：\n镜流——桑岛法子\n彦卿——井上麻里奈\n\n英文CV：\n镜流——AmaLee\n彦卿——Amber May\n\n韩文CV：\n镜流——박이서\n彦卿——이새아"
  },
  {
    "title": "星际和平导览：甄选、规划和机遇",
    "genre": "千星纪游",
    "url": "https://www.bilibili.com/video/BV1ny4y1P7SN/",
    "display": false,
    "desc": "嘿，你！没错，我们正在找你。\r\n琥珀王的巨锤已经落下，无人能够置身事外……\r\n\r\n中文CV：\r\n叽米——刘北辰\r\n\r\n日文CV：\r\n叽米——名村幸太朗\r\n\r\n英文CV：\r\n叽米——Bill Butts\r\n\r\n韩文CV：\r\n叽米——강호철"
  },
  {
    "title": "绥园伏鬼记",
    "genre": "千星纪游",
    "url": "https://www.bilibili.com/video/BV1Xw411K7Mg/",
    "display": false,
    "desc": "世间如有恶鬼出现，十王判官便会下山擒伏。\n执旗呼号，书符降召，以驱赶鬼怪邪恶，保生灵平安。\n且说那日，小小判官接了法旨，要受命伏魔……\n\n中文CV：\n尾巴——刘北辰\n藿藿——葛子瑞\n小道士（藿藿 饰演）——葛子瑞\n僵尸（雪衣 饰演）——溯浔\n女鬼（寒鸦 饰演）——张雨曦\n\n\n日文CV：\n尾巴——平林刚\n藿藿——长绳麻理亚\n小道士（藿藿 饰演）——长绳麻理亚\n僵尸（雪衣 饰演）——河濑茉希\n女鬼（寒鸦 饰演）——铃代纱弓\n\n英文CV：\n尾巴—— Adam Michael Gold\n藿藿——Courtney Lin\n小道士（藿藿 饰演）——Courtney Lin\n僵尸（雪衣 饰演）——Jenny Yokobori\n女鬼（寒鸦 饰演）——Suzie Yeung\n\n韩文CV：\n尾巴——한복현\n藿藿——김채린\n小道士（藿藿 饰演）——김채린\n僵尸（雪衣 饰演）——박리나\n女鬼（寒鸦 饰演）——윤은서"
  },
  {
    "title": "阮声落华裳，梅出似点妆",
    "genre": "千星纪游",
    "url": "https://www.bilibili.com/video/BV1pb4y1V7Qw/",
    "display": false,
    "desc": "煮水沁眉，绣枕华发，轻拢微火烤，\r\n烤那信中淡意多多，浓情少少。\r\n落笔点枝，湖水蘸绿，\r\n她抹去一指琼绸碎玉，冰雪玎玲，\r\n旧章皆烬。\r\n\r\n中文CV：\r\n阮•梅——张文钰\r\n\r\n日文CV：\r\n阮•梅——大西沙织\r\n\r\n英文CV：\r\n阮•梅——Emi Lo\r\n\r\n韩文CV：\r\n阮•梅——윤여진"
  },
  {
    "title": "永火一夜：第33场",
    "genre": "千星纪游",
    "url": "https://www.bilibili.com/video/BV1UK411e7tY/",
    "display": false,
    "desc": "第33场。\n内景。永火官邸——夜。毁灭。\n炽热的火焰说道：「美梦燃烧了我的花朵，我的死亡。」\n\n中文CV：\n冥火大公——孟祥龙\n「调音师」阿卡什——赵梓涵\n「书吏」杜布拉——苏子芜\n「枷锁」卡翠娜——李蝉妃\n「大丽花」康士坦丝——阮从青\n\n日文CV：\n冥火大公——丹泽晃之\n「调音师」阿卡什——新垣樽助\n「书吏」杜布拉——野口瑠璃子\n「枷锁」卡翠娜——三瓶由布子\n「大丽花」康士坦丝——佐佐木未来\n\n英文CV：\n冥火大公——Bob Johnson\n「调音师」阿卡什——Talon Warburton\n「书吏」杜布拉——Kayli Mills\n「枷锁」卡翠娜——Arianna Ratner\n「大丽花」康士坦丝——Jennifer Losi\n\n韩文CV：\n冥火大公——이주승\n「调音师」阿卡什——백승철\n「书吏」杜布拉——김이안\n「枷锁」卡翠娜——이새벽\n「大丽花」康士坦丝——김도희"
  },
  {
    "title": "滴答！一起来梦游吧！",
    "genre": "动画短片",
    "url": "https://www.bilibili.com/video/BV1iC4y1C7KV/",
    "display": false,
    "desc": "谁能想到呢？在广袤的星空中，还有这样一个奇妙的地方：\n这里的人们闭上了眼睛，夜半却无一人入眠；\n这里的城市金迷纸醉，钱物却被视作秽土。\n\n各位尊贵的来宾，欢迎来到「匹诺康尼」——跟上你们有趣的向导「钟表小子」，和我们一同踏入这颗无与伦比的美梦之星！\n\n中文CV：\n钟表小子——秦且歌\n仓鼠球骑士——Kinsen\n\n日文CV：\n钟表小子——柳晃平\n仓鼠球骑士——风间万裕子\n\n英文CV：\n钟表小子——Niko Gerentes\n仓鼠球骑士——Jacob Craner\n\n韩文CV：\n钟表小子——이주승\n仓鼠球骑士——김수영"
  },
  {
    "title": "旧梦重温",
    "genre": "千星纪游",
    "url": "https://www.bilibili.com/video/BV1FZ421z7PE/",
    "display": false,
    "desc": "一件失物，一声巨响，一缕冥火……\n记忆的洪流奔涌而过，盈满整座星球\n——在盛会开始前，有些秘密已被沉入海底。\n\n中文CV：\n黑天鹅——杨梦露\n知更鸟——钱琛 \n\n日文CV：\n黑天鹅——生天目仁美\n知更鸟——名冢佳织\n\n英文CV：\n黑天鹅——Arryn Zech\n知更鸟——Alice Himora\n\n韩文CV：\n黑天鹅——김하영\n知更鸟——신온유"
  },
  {
    "title": "《花火》：幕后纪录",
    "genre": "千星纪游",
    "url": "https://www.bilibili.com/video/BV1cC411W7pH/",
    "display": false,
    "desc": "当你察觉这只是一场戏，便想离开这个舞台……\r\n却发现《花火》的舞台之外，什么也没有。\r\n\r\n中文CV：\r\n花火——赵爽\r\n\r\n日文CV：\r\n花火——上田丽奈\r\n\r\n英文CV：\r\n花火——Lizzie Freeman\r\n\r\n韩文CV：\r\n花火——성예원"
  },
  {
    "title": "永劫轮舞",
    "genre": "动画短片",
    "url": "https://www.bilibili.com/video/BV1aC411h7e6/",
    "display": true,
    "desc": "两颗行星交织着彼此悲惨的宿命，围绕一轮漆黑的大日跳着永恒的轮舞。\n\n最初，其中一颗行星孕育出了人类，他们俯首，将脚下的土地唤作「出云」；又抬头，指天上的世界为「高天原」。\n于史无载的某日，「八百万神」自高天原垂迹。以神为名的恶兽使天穹倾覆、海川燃烧、大地崩毁——人们惊觉，那并非是为了统治、支配或掠夺的入侵，凶神仅为猎杀而来。\n\n存亡之际，出云踏上「神刈」的道路，穷举国之力斩落大祸「都牟刈神」，将其兽体锻造成最初的「诏刀」。\n以彼之道还施彼身，通过吟诵蕴含于刀身中的真言，持刀者便可将高天原的神业握在手中，以之对抗恶神，救天下苍生。\n由此，出云国开始了漫长的征伐，以不可胜数的牺牲换来一位又一位神明的陨落，尽折人间万千剑，终铸成「护世诏刀」十二柄。\n\n在残酷的生存战争中，仅用不足十个琥珀纪，出云国便借诏刀伟力，将未开化的黑暗世界点亮。\n建立起虹霓缭乱的城邦，那过去遥不可及的高天神国，也已近在咫尺、唾手可得——\n但历史在这一刻戛然而止，两颗行星的存在于旦夕间灰飞烟灭，消失得无影无踪。\n\n如今，边星「出云」的过去只能在宇宙的只言片语中寻得。针对它的消亡，学者们众说纷纭，任谁也无法解开谜团。\n出云的历史本应是条流淌的长河，可它却被一刀斩断，种种过往与将来皆消失在空无的彼岸。\n难道它不曾存在，只是一段被虚构的故事？难道它未曾发生，被搁浅在倒果为因的海滩？这是「原始博士」又一场惨绝人寰的实验，还是「贪饕」从银河尽头归来的预兆？\n\n只有那轮漆黑的大日知道答案。然而祂沉默，从不言说。\n因为所发生的一切必将归于终结，而已终结的一切必将再度发生。宇宙在祂的阴影下永劫回归，出云不过是一个省略号的注脚。\n\n中文CV：\n黑天鹅——杨梦露\n黄泉——菊花花\n\n日文CV：\n黑天鹅——生天目仁美\n黄泉——泽城美雪\n\n英文CV：\n黑天鹅——Arryn Zech\n黄泉——Allegra Clark\n\n韩文CV：\n黑天鹅——김하영\n黄泉——박지윤"
  },
  {
    "title": "虚谭•浮世三千一刀缭断",
    "genre": "千星纪游",
    "url": "https://www.bilibili.com/video/BV16m411R78H/",
    "display": false,
    "desc": "两颗行星交织着彼此悲惨的宿命，天岩户间散落着一段故去的歌谣。\n那歌谣无始无终、无声无息，来自无人之口，传往无人之耳。它如是写道：\n\n高天原万里迢迢一如出云，原乃是极乐净土天成地平。\n天地变漆黑大日引动潮汐，似迁徙众神垂迹来势沄沄。\n八百万祸神显世屠戮无情，怎料想无上权柄反遭窃行。\n出云国折剑七万三十三柄，铸为尊护世诏刀一十二名。\n\n其一为「真」，斩「都牟刈神」所铸，可令凡人遍观法理，解构万象再造神迹；\n其二为「天」，斩「天常立尊」所铸，可令高天变作墙垣，祸津众神穿行维艰；\n其三为「鸣」，斩「建御雷神」所铸，可令雷光撕裂长空，星流霆击施罚天刑；\n其四为「岚」，斩「志那都彦」所铸，可令裂风摧折大地，云奔雨啸狂飙不息；\n其五为「霜」，斩「天之冬衣」所铸，可令时序霜结凝滞，冻土无垠刹那难逝；\n其六为「命」，斩「石长比卖」所铸，可令荒冢遍开花丛，生生死死流转无踪；\n其七为「烈」，斩「迦具土命」所铸，可令炽火燃烧尘寰，赫赫炎炎烛天燎原；\n其八为「觉」，斩「八意思兼」所铸，可令水镜鉴往知来，不见虚实千秋万代；\n其九为「础」，斩「大山津见」所铸，可令列岛高悬天边，山坼地裂崩碎阵前；\n其十为「千」，斩「大己贵命」所铸，可令凡众连缀成络，形影无数潮起潮落；\n十一为「束」，斩「久那止神」所铸，可令歧途尽入樊笼，邪祟诸恶咫尺皆空；\n十二为「喰」，斩「八十枉津」所铸，可令常世剥蚀朽坏，神鬼难辨四魂两拆。\n\n而后幽世皆扫，鸣金罢鏖，尽断十二寒耀；\n空余荒魂鼓噪，黑日昭昭，终铸负世二刀。\n其一为「始」，其二为「终」；以人为始，以鬼为终。\n寸断声止，落花枯荣，败者归无，胜者…成空。\n\n跛脚的僧侣唱着不成调的歌，持柄神力者，亦向着众神退行。\n在大日的见证下，那曾经名为「出云」的土地上，人、神、鬼…皆已无处可寻。\n\n中文CV：\n「白发鬼」——秦且歌\n后被称为「黄泉」的少女——菊花花\n\n日文CV：\n「白发鬼」——日野聪\n后被称为「黄泉」的少女——泽城美雪\n\n英文CV：\n「白发鬼」——Sean Lynch\n后被称为「黄泉」的少女——Allegra Clark\n\n韩文CV：\n「白发鬼」——윤용식\n后被称为「黄泉」的少女——박지윤"
  },
  {
    "title": "假若有一双翅膀",
    "genre": "千星纪游",
    "url": "https://www.bilibili.com/video/BV1wz421U7LZ/",
    "display": false,
    "desc": "假若有一双翅膀，我们便会飞向天空\r\n——即使，注定有坠落的那一刻。\r\n\r\n不必贪恋永恒，不必畏惧刹那。\r\n\r\n中文CV：\r\n知更鸟——钱琛 / 歌：Chevy\r\n\r\n日文CV：\r\n知更鸟——名冢佳织 / 歌：Chevy\r\n\r\n英文CV：\r\n知更鸟——Alice Himora / Song vocals: Chevy\r\n\r\n韩文CV：\r\n知更鸟——신온유/ 노래: Chevy"
  },
  {
    "title": "此刻，在同一片星空下",
    "genre": "千星纪游",
    "url": "https://www.bilibili.com/video/BV16s421u7NP/",
    "display": false,
    "desc": "「格拉默军规第1条，骑士应为自己的诞生感到荣耀。」\n\n中文CV：\nAR-26710 &「萨姆」——宋媛媛&淦子齐\nAR-214 &「萨姆」——木子橙&淦子齐\nAR-53935 &「萨姆」——斑马&淦子齐\nAR-1368 &「萨姆」——金娜&淦子齐\n\n日文CV：\nAR-26710 &「萨姆」——楠木灯&笠间淳\nAR-214 &「萨姆」——涩谷彩乃&笠间淳\nAR-53935 &「萨姆」——草野太一&笠间淳\nAR-1368 &「萨姆」——藤原夏海&笠间淳\n\n英文CV：\nAR-26710 &「萨姆」——Analesa Fisher&Adin Rudd\nAR-214 &「萨姆」——Meggie-Elise&Adin Rudd\nAR-53935 &「萨姆」——Anne Yatco&Adin Rudd\nAR-1368 &「萨姆」——Kelsey Jaffer&Adin Rudd\n\n韩文CV：\nAR-26710 &「萨姆」——유혜지&장서화\nAR-214 &「萨姆」——윤은서&장서화\nAR-53935 &「萨姆」——이재현&장서화\nAR-1368 &「萨姆」——이은조&장서화"
  },
  {
    "title": "格拉默的余烬",
    "genre": "动画短片",
    "url": "https://www.bilibili.com/video/BV1us421u7sp/",
    "display": true,
    "desc": "「格拉默军规第22条，骑士应将一切献给女皇陛下——包括死亡。」\n\n中文CV：\n火萤Ⅳ型战略强袭装甲，「萨姆」——淦子齐\nAR-26710，流萤——宋媛媛\n卡芙卡——徐慧\n\n日文CV：\n火萤Ⅳ型战略强袭装甲，「萨姆」——笠间淳 \nAR-26710，流萤——楠木灯\n卡芙卡——伊藤静\n\n英文CV：\n火萤Ⅳ型战略强袭装甲，「萨姆」—— Adin Rudd \nAR-26710，流萤——Analesa Fisher\n卡芙卡——Cheryl Texiera\n\n韩文CV：\n火萤Ⅳ型战略强袭装甲，「萨姆」—— 장서화\nAR-26710，流萤——유혜지\n卡芙卡——사문영"
  },
  {
    "title": "塔塔洛夫向你致意",
    "genre": "千星纪游",
    "url": "https://www.bilibili.com/video/BV1fx4y147PH/",
    "display": false,
    "desc": "「你还是个孩子的时候，也尝试过投石入水，并乐在其中吧？」\n「那有没有想过，既然涟漪总会散去，我们到底是为了什么才丢出石头？」\n「答案很简单。只有投石者才清楚，丢下的石子会荡开怎样的波澜——而水面上的倒影，又会因此扭曲出怎样的快乐。」\n\n中文CV：\n花火——赵爽\n\n日文CV：\n花火——上田丽奈\n\n英文CV：\n花火——Lizzie Freeman\n\n韩文CV：\n花火——성예원"
  },
  {
    "title": "石心誓环•天平两端",
    "genre": "千星纪游",
    "url": "https://www.bilibili.com/video/BV1xE4m1R78a/",
    "display": false,
    "desc": "战略投资部的主管「钻石」极少公开露面，代替其人站在台前的是名为「石心十人」的团体。\n而在关乎团队生存的重大议题上，「钻石」则允许十位精英以独立、平等的方式完成决策，即投票表决。\n琥珀、玛瑙、托帕、舒俱、砂金、真珠、苍刚、翡翠、龙晶、欧泊——\n而今，一枚基石破碎，砝码仅余其九。下一个被摆上台桌的问题，只能以「倾倒」作结……\n‍\n中文CV：\n真珠——苏婉\n砂金——杨超然\n舒俱——唐子晰\n托帕——陆敏悦\n翡翠——张若瑜\n龙晶——洪海天\n欧泊——Kinsen\n‍\n日文CV：\n真珠——安野希世乃\n砂金——河西健吾\n舒俱——高桥广树\n托帕——南条爱乃\n翡翠——三石琴乃\n龙晶——上坂堇\n欧泊——岸尾大辅\n‍\n英文CV：\n真珠——Cat Protano\n砂金——Camden Sutkowski\n舒俱——AJ Beckles\n托帕——Sam Slade\n翡翠——Faye Mata\n龙晶——Erin Yvette\n欧泊——Paul Castro Jr.\n‍\n韩文CV：\n真珠——여윤미\n砂金——박준원\n舒俱——홍범기\n托帕——방시우\n翡翠——김순미\n龙晶——강새봄\n欧泊——정의택"
  },
  {
    "title": "天干剑燥，小心火炉",
    "genre": "千星纪游",
    "url": "https://www.bilibili.com/video/BV1xi421a7mg/",
    "display": false,
    "desc": "且说那熔兵剑炉所在之处，偶有浓烈火光，混有无言寂静的哀嚎残响。\n‌\n「叫破喉咙也不会有人理你的，魔剑。」\n「破喉咙、破喉咙……」\n‍\n中文CV：\n云璃——刘雯\n怀炎——李昊甲\n‍\n日文CV：\n云璃——若山诗音\n怀炎——宫泽正\n‍\n英文CV：\n云璃——Brenna Larsen\n怀炎——J. Michael Tatum\n‍\n韩文CV：\n云璃——이주은\n怀炎——조민수"
  },
  {
    "title": "飞镝追星",
    "genre": "千星纪游",
    "url": "https://www.bilibili.com/video/BV1TT421z7e3/",
    "display": false,
    "desc": "无尾无命九死无生之人，没有选择，只能向前。\n向前，是为逃离死地，奔向新生。\n向前，只因飞星照路，渴求希望。\n \n双重脉搏纠缠抵牾之人，注定鏖战不休，永不驻足。\n一脉赋其灵智，决事如雷。\n一脉催其怒火，匹敌万军。\n \n她是帝弓离弦之箭——一箭指向猎物，一箭指向自己。\n \n中文CV：\n飞霄——叶知秋\n \n日文CV：\n飞霄——小松未可子\n \n韩文CV：\n飞霄——손정민"
  },
  {
    "title": "清闲自在身",
    "genre": "动画短片",
    "url": "https://www.bilibili.com/video/BV1WvpTekEPQ/",
    "display": false,
    "desc": "晨起，将军们抓住转瞬将逝的清闲光阴，开始了各自的一日之计。这一刻他们与罗浮上的芸芸众生并无不同。\n\n中文CV：\n飞霄——叶知秋\n景元——孙晔\n椒丘——陈张太康\n怀炎——李昊甲\n\n日文CV：\n飞霄——小松未可子\n景元——小野大辅\n椒丘——丰永利行\n怀炎——宫泽正\n\n韩文CV：\n飞霄——손정민\n景元——류승곤\n椒丘——이정민\n怀炎——조민수"
  },
  {
    "title": "银河忍法帖•乱武驱魔破邪斩月之卷",
    "genre": "动画短片",
    "url": "https://www.bilibili.com/video/BV13pyPYSEar/",
    "display": false,
    "desc": "浩渺银海横无际涯，万千邪祟藏匿其下。边陲村落沦于邪祟征伐，就连天上明月也化作恶霸。\n「何人捍卫世间正法？何人勘破声色犬马？何人来将恶党抹杀？何人护全灯火万家？」\n弱者的质问被奸笑覆压，只剩一声哀伤的叹吒。但当人们抬首仰察，天外的飞星已给出回答——\n缭乱的异火流洒，将要破除此界的凶煞。此乃末法之世的天罚，巡狩于星海的忍侠。\n ‌\n中文CV：\n缭乱忍侠•乱破 —— 金娜\n \n日文CV：\n缭乱忍侠•乱破 —— 潘惠美\n \n英文CV：\n缭乱忍侠•乱破 —— Kendell Byrd\n \n韩文CV：\n缭乱忍侠•乱破 —— 김유림"
  },
  {
    "title": "太阳落下之后",
    "genre": "千星纪游",
    "url": "https://www.bilibili.com/video/BV1ZBzhYREVs/",
    "display": false,
    "desc": "一只鸟盘旋梦中，一只鸟飞向天空。\n一只鸟扇动双翅，一只鸟闭目低头。\n \n「愿你的天空永远星光灿烂。」\n \n中文CV：\n星期日——徐翔\n知更鸟——钱琛\n \n日文CV：\n星期日——大冢刚央\n知更鸟——名冢佳织\n \n英文CV：\n星期日——Griffin Puatu\n知更鸟——Alice Himora\n \n韩文CV：\n星期日——강성우\n知更鸟——신온유"
  },
  {
    "title": "不似一片浮云",
    "genre": "千星纪游",
    "url": "https://www.bilibili.com/video/BV12xkMYjEio/",
    "display": false,
    "desc": "她的生命并非一声巨响，也非一阵呜咽。\n在那条「向生」或「毁灭」的择路中，她听见了自己的声音——\n「向前去吧，切莫回头。」\n \n「这星海间万千世界，我还远远未看够呢……」\n \n中文CV：\n阮•梅——张文钰\n停云——蒋丽\n \n日文CV：\n阮•梅——大西沙织\n停云——高田忧希\n \n英文CV：\n阮•梅——Emi Lo\n停云——Anya Floris\n \n韩文CV：\n阮•梅——윤여진\n停云——이명호"
  },
  {
    "title": "群星静默如谜",
    "genre": "千星纪游",
    "url": "https://www.bilibili.com/video/BV1dCr3YqEtT/",
    "display": false,
    "desc": "解答1+1=2的那一分钟\n推翻等号必然存在的那一分钟\n白昼黑夜发生规律的那一分钟\n吸气与呼气停止交替的那一分钟\n生命的第六十一秒发生的那一分钟\n恒星闪耀与熄灭后静默的那一分钟\n \n无数的「问题」在宇宙闪烁，唯有生命才能将好奇浇熄。\n \n中文CV：\n黑塔——侯小菲\n \n日文CV：\n黑塔——山崎遥\n \n英文CV：\n黑塔——PJ Mattson\n \n韩文CV：\n黑塔——김서영"
  },
  {
    "title": "大 黑 塔 的 魔 法 厨 房",
    "genre": "动画短片",
    "url": "https://www.bilibili.com/video/BV1cErqYDEGC/",
    "display": false,
    "desc": "在世人难以探索到的宇宙边境，一位天才开始思考……\n「如果42个魔法都无法做出一块令人闻到其香就感到幸福、不自觉微笑的蛋糕……」\n「那么足以证明，这是一项还未被研究透彻的科学理论。」\n \n中文CV：\n黑塔——侯小菲\n阮•梅——张文钰\n \n日文CV：\n黑塔——山崎遥\n阮•梅——大西沙织\n \n英文CV：\n黑塔——PJ Mattson\n阮•梅——Emi Lo\n \n韩文CV：\n黑塔——김서영\n阮•梅——윤여진"
  },
  {
    "title": "翁法罗斯英雄纪",
    "genre": "千星纪游",
    "url": "https://www.bilibili.com/video/BV1GeUUYREXy/",
    "display": false,
    "desc": "翁法罗斯！我并非陡然地呼唤你的名字。\n我来此，是为了讲述历史——\n末日的黑潮降临大地，神明堕入疯狂，凡人举戈相向。\n但仍有逐火的英雄，在创世的伟业中先行。\n ‌\n此世，他们将燃烧的金血熔进身躯。\n来日的命运，可会记得他们的姓名？\n阿格莱雅、缇宝、那刻夏、风堇、万敌、赛飞儿、遐蝶、白厄、海瑟音、████、██、刻律德菈……\n \n酣睡在黄昏的记忆，请不要忘记——翁法罗斯的名字。\n \n中文CV：\n「金织」阿格莱雅——楚越\n黑塔——侯小菲\n名为「昔涟」的少女——宴宁\n \n日文CV：\n「金织」阿格莱雅——远藤绫\n黑塔——山崎遥\n名为「昔涟」的少女——井上麻里奈\n \n英文CV：\n「金织」阿格莱雅——Morgan Lauré\n黑塔——PJ Mattson\n名为「昔涟」的少女——Aiden Dawn\n \n韩文CV：\n「金织」阿格莱雅——오로아\n黑塔——김서영\n名为「昔涟」的少女——조경이"
  },
  {
    "title": "论泰坦与地上万邦",
    "genre": "千星纪游",
    "url": "https://www.bilibili.com/video/BV1uf6tYBEWN/",
    "display": false,
    "desc": "「永恒圣城」奥赫玛、「千门之城」雅努萨波利斯、「贤者之乡」神悟树庭、「蛮都」悬锋城、「海畔明珠」斯缇科西亚、「雪城」哀地里亚......\n在古老的黄金年代，翁法罗斯大地上曾有万邦毗邻，如今绝大多数都已被黑潮吞没......\n \n于危难中，天父刻法勒负日擎天，庇护圣城一方光明。但要重塑破碎的世界，英雄们必须搜集古老泰坦的火种——即便这意味着，狩猎诸神。\n\n中文CV：\n讲述者 —— 刘若班\n \n日文CV：\n讲述者 —— 喜山 茂雄\n \n英文CV：\n讲述者 —— Circus-Szalewski\n \n韩文CV：\n讲述者 —— 윤세하"
  },
  {
    "title": "诸神尽喑之歌",
    "genre": "千星纪游",
    "url": "https://www.bilibili.com/video/BV1KbcNepEzt/",
    "display": false,
    "desc": "岁月的长河逆流而行，将未来的风景送至眼前：\n在那无人记得的永恒之地，「开拓」的神话将要开篇。\n \n「与我一同，成为英雄吧！」\n \n中文CV：\n黑天鹅——杨梦露\n白厄——秦且歌\n阿格莱雅——楚越\n遐蝶——阮从青\n缇安——蔡书瑾\n卡芙卡——徐慧\n \n日文CV：\n黑天鹅——生天目仁美\n白厄——日野聪\n阿格莱雅——远藤绫\n遐蝶——斋藤千和\n缇安——远野光\n卡芙卡——伊藤静\n \n英文CV：\n黑天鹅——Arryn Zech\n白厄——Joshua Waters\n阿格莱雅——Morgan Lauré\n遐蝶——Melody Muze\n缇安——Hayden Daviau\n卡芙卡——Cheryl Texiera\n \n韩文CV：\n黑天鹅——김하영\n白厄——윤용식\n阿格莱雅——오로아\n遐蝶——이세레나\n缇安——방연지\n卡芙卡——사문영"
  },
  {
    "title": "命运的第一个黎明",
    "genre": "千星纪游",
    "url": "https://www.bilibili.com/video/BV1sZAnevEsh/",
    "display": false,
    "desc": "天空划过晦暗的闪电。\n最初的半神到达群山之巅，聆听命运的谏言。\n最末的流星划破永夜，成为抵御厄运的刀剑。\n \n彼时的他们仍在等候：\n或是一颗韬光养晦的棋子，\n一首浪的余音，\n一截尚未缝纫的裙摆，\n一枚双面不一的金币。\n或是一只停在枝头的蝶，\n一句悖谬的抗言，\n一缕温暖的微光，\n一头迁徙的狮子，\n一把无名的剑。\n……\n \n开启「门径」的黄金裔，\n你的灵魂必遭歧路分离\n——但黎明将要到来。\n \n中文CV：\n缇里西庇俄丝——蔡书瑾\n \n日文CV：\n缇里西庇俄丝——远野光\n \n英文CV：\n缇里西庇俄丝——Hayden Daviau\n \n韩文CV：\n缇里西庇俄丝——방연지"
  },
  {
    "title": "那安息的长夜",
    "genre": "动画短片",
    "url": "https://www.bilibili.com/video/BV16io9YTEqH/",
    "display": true,
    "desc": "穿戴起令生命止步的王冠\n死神也钟爱于低垂的眼帘\n行过欢送的宫殿\n与亡者的世界相连\n \n在寒溟与葬仪声中\n夜以继日地\n俯身在这片雪土\n成为此处唯一的歌\n \n所有的叹息都从她的指尖涌出\n所有的慰语都因她的手被阻隔\n所有的恸哭都被她吞咽在掌心\n \n——写作名为「哀地里亚的圣女」的诗\n \n中文CV：\n遐蝶——阮从青\n \n日文CV：\n遐蝶——斋藤千和\n \n英文CV：\n遐蝶——Melody Muze\n \n韩文CV：\n遐蝶——이세레나"
  },
  {
    "title": "生命从夜中醒来",
    "genre": "千星纪游",
    "url": "https://www.bilibili.com/video/BV18hZ1YaEuM/",
    "display": false,
    "desc": "在触碰与离别之间\n我看到，世间的\n风雪在掌心间融化\n神明在春天闭上眼\n \n我知道，他们的\n遗憾在拥抱后温存\n苦难在爱情里燃烧\n哀悼在世界下喧嚣\n \n我听见，他们说\n为了反抗不断垂下的手\n为了反抗浸透悲哀的黄金\n为了反抗没有语言的黑水\n \n为了反抗死亡，他们歌唱\n为了持存记忆的生命歌唱\n歌唱通往遥远花海的航线\n说，命运就该从那里离去\n \n『我也想伸出双手』\n只因我想恳求，请不要\n不要停留在，触碰与离别的瞬息\n \n——那名为「遐蝶」的诗，将由何人来写作\n \n中文CV：\n遐蝶——阮从青\n阿格莱雅——楚越\n缇宝——蔡书瑾\n那刻夏——钱文青\n白厄——秦且歌\n万敌——赵成晨\n风堇——静宸\n赛飞儿——王雅欣\n \n日文CV：\n遐蝶——斋藤千和\n阿格莱雅——远藤绫\n缇宝——远野光\n那刻夏——内田雄马\n白厄——日野聪\n万敌——阿座上洋平\n风堇——羊宫妃那\n赛飞儿——伊藤彩沙\n \n英文CV：\n遐蝶——Melody Muze\n阿格莱雅——Morgan Lauré\n缇宝——Hayden Daviau\n那刻夏——Stephen Fu\n白厄——Joshua Waters\n万敌——Gabriel Warburton\n风堇——Holly Earl\n赛飞儿——Shea Fairaday\n \n韩文CV：\n遐蝶——이세레나\n阿格莱雅——오로아\n缇宝——방연지\n那刻夏——이상준\n白厄——윤용식\n万敌——안효민\n风堇——김연우\n赛飞儿——미소"
  },
  {
    "title": "有关星空的寓言集•其二",
    "genre": "千星纪游",
    "url": "https://www.bilibili.com/video/BV1HsKbznEZg/",
    "display": false,
    "desc": "在厄兆先锋中，流传着名为「四末说」的预言：四条命途会将银河推向「终末」的结局。\n其一为「毁灭」，纳努克的火焰吞没一切。于热寂中，宇宙迎来第一种结局：永恒的终结。\n人们在惶恐中发问，祂的原动力究竟来自何处？是对生命的蔑视？对宇宙的怜悯？还是对列神的否定与憎恨？答案无人知晓，但在「毁灭」的尽头，文明、生灵、所有命途与星神，也都将如群星般被焚作尘埃。\n \n中文CV：\n镜流——杜冥鸦\n景元——孙晔\n椒丘——陈张太康\n飞霄——叶知秋\n黄泉——菊花花\n血罪灵——王肖兵\n来古士——赵君毅\n绝灭大君•星啸——喵酱\n绝灭大君•幻胧——黄莺\n绝灭大君•归寂——张胡子\n绝灭大君•焚风——程智超\n \n日文CV：\n镜流——桑岛法子\n景元——小野大辅\n椒丘——丰永利行\n飞霄——小松未可子\n黄泉——泽城美雪\n血罪灵——塾一久\n来古士——唐户俊太郎\n绝灭大君•星啸——原由实\n绝灭大君•幻胧——日野由利加\n绝灭大君•归寂——花轮英司\n绝灭大君•焚风——田所阳向\n \n英文CV：\n镜流——AmaLee\n景元——Alejandro Saab\n黄泉——Allegra Clark\n血罪灵——David Shatraw\n来古士——Blythe Melin\n绝灭大君•星啸——Erica Mendez\n绝灭大君•幻胧——Tara Langella\n绝灭大君•归寂——Joe Hernandez\n绝灭大君•焚风——Sean Chiplock\n \n韩文CV：\n镜流——박이서\n景元——류승곤\n椒丘——이정민\n飞霄——손정민\n黄泉——박지윤\n血罪灵——이정민\n来古士——박기욱\n绝灭大君•星啸——이지영\n绝灭大君•幻胧——유보라\n绝灭大君•归寂——신경선\n绝灭大君•焚风——서원석"
  },
  {
    "title": "听！狂欢在那神佑的山巅",
    "genre": "动画短片",
    "url": "https://www.bilibili.com/video/BV1twgSzhEo8/",
    "display": true,
    "desc": "你还记得吗，无缘黎明的卡厄斯兰那？\n在那酣醉的迷梦中，山高而陡峻，你看见了自己。\n \n插曲：《耀斑》\n演唱者：YMIR\n \n中文CV：\n白厄——秦且歌\n幼年白厄——弭洋\n \n日文CV：\n白厄——日野聪\n幼年白厄——蓝原琴美\n \n英文CV：\n白厄——Joshua Waters\n幼年白厄——Justine Huxley\n \n韩文CV：\n白厄——윤용식\n幼年白厄——박하진"
  },
  {
    "title": "开拓者",
    "genre": "千星纪游",
    "url": "https://www.bilibili.com/video/BV19RhAzcEdU/",
    "display": false,
    "desc": "「你知道么？人往往只有在绝望和希望等量的时候，才会拼尽全力去做一件事。」\n「这听起来并不浪漫。」\n「开拓本就和浪漫无关——」\n「——只有那些明知不可为而为之的，才是浪漫。」"
  },
  {
    "title": "亲爱的三月七",
    "genre": "千星纪游",
    "url": "https://www.bilibili.com/video/BV1uopiz8E9B/",
    "display": false,
    "desc": "亲爱的三月七，\n \n抵达翁法罗斯，并非一场意外。\n我们要做的事，也与过往无异。\n \n往前看，是杳无人烟的败城，哭天抢地的生灵，看不见未来的眼睛。\n向后望，是融化记忆的罅隙，窥觎非望的窃贼，无法逃离的过去。\n \n「我该如何向前走，继续开拓未来…」\n \n很简单，就像我为你做的那样\n——让「忘却」令「记忆」安息。\n \n晚安。\n \n中文CV：\n长夜月——诺亚\n \n日文CV：\n长夜月——小仓唯\n \n英文CV：\n长夜月——Skyler Davenport\n \n韩文CV：\n长夜月——정혜원"
  },
  {
    "title": "跋涉",
    "genre": "动画短片",
    "url": "https://www.bilibili.com/video/BV1BpJrz7EUL/",
    "display": true,
    "desc": "「古老的圣树，将你的根系借给我吧。用我背负的火种，与这片陆地共鸣。」\n「以天地为横轴，以时光为纵轴，我将找到那唯一的一点。」\n「哪怕要用我的双脚，遍历这山川大地的每一处角落……」\n「我都会带你回家。」\n \n※建议体验3.6版本开拓任务后观看本视频。\n \n中文CV：\n丹恒•腾荒——李春胤\n女开拓者——陈婷婷\n \n日文CV：\n丹恒•腾荒——伊东健人\n女开拓者——石川由依\n \n英文CV：\n丹恒•腾荒——Nicholas Leung\n女开拓者——Chloe Eves\n \n韩文CV：\n丹恒•腾荒——김혜성\n女开拓者——김하루"
  },
  {
    "title": "翁法罗斯英雄纪",
    "genre": "千星纪游",
    "url": "https://www.bilibili.com/video/BV1R5JyzJE9Y/",
    "display": false,
    "desc": "翁法罗斯！我并非陡然地呼唤你的名字。\n我来此，是为了讲述历史——\n「毁灭」的黑潮降临大地，末日的数算在远方响起。\n但仍有逐火的巨人，在「开拓」的伟业中先行。\n \n此世，他们将燃烧的金血熔进身躯。\n来日的命运，可会记得他们的姓名？\n \n阿格莱雅、缇宝、那刻夏、风堇、万敌、赛飞儿、遐蝶、白厄、海瑟音、三月七、丹恒、刻律德菈……\n \n苏醒在黎明的记忆，请不要忘记——翁法罗斯的名字。\n \n中文CV：\n女开拓者——陈婷婷\n \n日文CV：\n女开拓者——石川由依\n \n英文CV：\n女开拓者——Chloe Eves\n \n韩文CV：\n女开拓者——김하루"
  },
  {
    "title": "故事之外：第8场",
    "genre": "千星纪游",
    "url": "https://www.bilibili.com/video/BV1xzs1zDEFi/",
    "display": false,
    "desc": "外景。翁法罗斯——夜。记忆。智识。毁灭。\n很久之前，女人曾向主人公说道：「接下来，你的选择会将命运一分为二。」\n如今，██的终末逼近，但「选择」仍然存在。\n \n中文CV：\n流萤——宋媛媛\n银狼——Hanser\n卡芙卡——徐慧\n刃——刘以嘉\n昔涟——宴宁\n \n日文CV：\n流萤——楠木灯\n银狼——阿澄佳奈\n卡芙卡——伊藤静\n刃——三木真一郎\n昔涟——井上麻里奈\n \n英文CV：\n流萤——Analesa Fisher\n银狼——Melissa Fahn\n卡芙卡——Cheryl Texiera\n刃——Daman Mills\n昔涟——Aiden Dawn\n \n韩文CV：\n流萤——유혜지\n银狼——장미\n卡芙卡——사문영\n刃——곽윤상\n昔涟——조경이"
  },
  {
    "title": "再见，昔涟",
    "genre": "千星纪游",
    "url": "https://www.bilibili.com/video/BV1yXyaBGEVR/",
    "display": false,
    "desc": "那是\n家，麦香，哼唱的甲虫，老人的祝语，大树，木纹\n \n还有\n门前，麦垛做床，孩子王的木雕；眼，发光的烧瓶，禁忌的书；手指，鞋跟湿漉漉，针线\n绕指的草，马马嘟嘟骑，彩色泡泡；歌，未完成的歌，半颗珍珠；尾巴，会说话的山，土壤\n纸飞机，那一簇小发辫，很大的门；旗帜，天平的锈迹，王座；夜呀，机灵的眼睛，黯淡的镜\n捉迷藏，被盗的奖品，葡萄；嘎吱嘎吱的酒窖，荣誉的疤痕，香料；安提灵花，抱抱，再抱抱\n \n最后\n光，刺眼的光，红色的光，模糊的光，从过去向我跑来的光\n流星，一颗流星，两颗流星，不存在的流星\n \n……\n \n关于这个世界的一切，无论多么细小的一切，\n我都想讲给你听呀。\n \n中文CV：\n昔涟——宴宁\n \n日文CV：\n昔涟——井上麻里奈\n ‌\n英文CV：\n昔涟——Aiden Dawn\n ‌\n韩文CV：\n昔涟——조경이"
  },
  {
    "title": "你好，世界",
    "genre": "动画短片",
    "url": "https://www.bilibili.com/video/BV14G1kB5Evp/",
    "display": true,
    "desc": "在和美丽的世界告别前，她向未来回首。\n \n光遍洒世间，人们在啼哭中迎来新生。\n再没有遗憾，再没有告别，他们会相逢、拥抱、成长，直至生命与银河相连。\n \n是啊，那是「记忆」无缘亲历的来日。\n但她相信，「开拓」会带着往昔，驶向永恒。\n最后这一页，以全世的爱，她为因果画下「◦」——\n \n如同回环的涟漪，守候在昨日的岁月。\n如同开拓的罗盘，指引明天滚滚向前。\n \n※建议体验3.7版本开拓任务后观看本视频。\n \n插曲：「昔涟 Ripples of Past Reverie」\n中文演唱者：张韶涵\n英文演唱者：Cassie Wei from Mili\n \n中文CV：\n昔涟——宴宁\n \n日文CV：\n昔涟——井上麻里奈\n \n英文CV：\n昔涟——Aiden Dawn\n \n韩文CV：\n昔涟——조경이"
  }
]
const extractBVID = (url: string): string | null => {
  const match = url.match(/BV[a-zA-Z0-9]+/);
  return match ? match[0] : null;
};
const VideoClipCard: React.FC<{ video: Video }> = ({ video }) => {
  const bvid = extractBVID(video.url);
  const descRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const element = descRef.current;
    if (!element) return;

    const lines = (video.desc ?? "").split('\n');

    // Start with all lines and remove from the end until it fits
    let fitsWithLineRemoval = false;
    for (let i = lines.length; i > 0; i--) {
      element.textContent = lines.slice(0, i).join('\n');

      if (element.scrollHeight <= element.clientHeight) {
        fitsWithLineRemoval = true;
        break;
      }
    }
    while (element.scrollHeight > element.clientHeight) {
      const text = element.textContent || '';
      element.textContent = text.slice(0, -10) + '...';
    }
  }, [video.desc]);
  return (
    <motion.div
      key={video.url}
      className="clip-item"
      onClick={() => window.open(video.url)}
    >
      <div className="clip-cover" style={{
        backgroundImage: `url("/animated_short_cover/${bvid}.jpg")`,
      }}>
      </div>
      <div className="clip-info">
        <div className="clip-title">{video.title}</div>
        <div ref={descRef} className="clip-desc">{video.desc}</div>
      </div>
    </motion.div>
  );

}
const AnimatedShorts: React.FC<AnimatedShortsProps> = () => {

  // Extract BV ID from Bilibili URL

  const [showAll, setShowAll] = useState(false);
  return (
    <section className="section-container">
      {
        showAll ? videos.map((video) => <VideoClipCard key={video.url} video={video} />) : <>
          {videos.filter(video => video.display).map((video) => <VideoClipCard key={video.url} video={video} />)}
          <button onClick={() => setShowAll(true)}>show all</button></>
      }


    </section>
  );
};

export default AnimatedShorts;
