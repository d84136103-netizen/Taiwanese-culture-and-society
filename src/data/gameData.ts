export interface BilingualText {
  zh: string;
  en: string;
}

export interface Clue {
  tag: [string, string];
  title: [string, string];
  zh: string;
  en: string;
  note: [string, string];
}

export interface FoodItem {
  id: string;
  icon: string;
  name: [string, string];
  micro: [string, string];
  lead: [string, string];
  trace: Array<[string, string]>;
  clues: Clue[];
  tension: [string, string];
  sample: [string, string];
  exp: [string, string];
  overseas: [string, string];
  source: string;
  isFocal?: boolean;
  focalRationale?: [string, string];
  urbanSpace?: [string, string];
  southeastAsiaCase?: [string, string];
  diasporaVoice?: [string, string];
}

export interface TaskChoice {
  text: [string, string];
  tag: string;
  feedback: [string, string];
}

export interface MissionTask {
  label: [string, string];
  question: [string, string];
  choices: Array<[[string, string], string, [string, string]]>;
}

export interface FoodMission {
  place: [string, string];
  history: [string, string];
  tasks: MissionTask[];
  overseas: [string, string];
  source: string;
}

export interface Persona {
  id: string;
  name: [string, string];
  subtitle: [string, string];
  paragraph: [string, string];
  question: [string, string];
  portrait: string;
  color: string;
  glyph: string;
  keywords: [string[], string[]];
}

export interface DilemmaOption {
  tag: string;
  title: [string, string];
  detail: [string, string];
}

export const FOODS: FoodItem[] = [
  {
    id: 'bubble',
    icon: '🧋',
    name: ['珍珠奶茶', 'Bubble tea'],
    micro: ['一杯飲料，三個時代', 'A drink across three eras'],
    lead: [
      '茶葉從田裡到杯裡，粉圓從甜點走進飲品；一杯珍奶又從臺灣走進世界。',
      'Tea leaves, tapioca pearls, a new way of drinking—and then a cup travelling around the world.'
    ],
    trace: [
      ['1980年代的臺灣', '1980s Taiwan'],
      ['街頭手搖飲文化', 'Take-away tea culture'],
      ['海外的 boba 店', 'Boba shops abroad']
    ],
    clues: [
      {
        tag: ['時間', 'TIME'],
        title: ['不是一夜爆紅', 'It did not happen overnight'],
        zh: '臺灣珍珠奶茶在1980年代逐漸興起。臺中春水堂和臺南翰林茶館，都與其起源敘事相關。',
        en: 'Bubble tea rose in Taiwan during the 1980s. Chun Shui Tang in Taichung and Hanlin Tea Room in Tainan both feature in accounts of its origins.',
        note: ['沒有必要把有爭議的發明故事剪成單一版本。', 'A disputed origin need not become a single certainty on camera.']
      },
      {
        tag: ['改造', 'CHANGE'],
        title: ['茶也能「用咬的」', 'Tea you can chew'],
        zh: '傳統泡茶、冰茶與加入粉圓的喝法結合，改變飲料的口感，也改變了喝茶的日常。',
        en: 'Traditional tea habits, iced tea, and tapioca pearls met in one cup, changing both texture and everyday tea culture.',
        note: ['改變製作方式，也是在改變生活方式。', 'Changing a recipe can change a routine.']
      },
      {
        tag: ['跨海', 'ABROAD'],
        title: ['Boba 成了自己的語言', '“Boba” becomes its own language'],
        zh: '珍奶從臺灣手搖飲文化走向海外市場。旅客、品牌與社群分享，使它不再只有一種喝法。',
        en: 'Bubble tea moved from Taiwan’s take-away drink culture into overseas markets. Travellers, brands, and online sharing created new ways to drink it.',
        note: ['全球化不是複製貼上，而是反覆調整。', 'Global circulation is repeated adaptation, not copy-and-paste.']
      }
    ],
    tension: [
      '海外店家要推出「香草冰淇淋珍奶」，原店員擔心茶味被蓋住，留學生卻說那是朋友願意嘗試的第一步。',
      'An overseas shop wants to sell vanilla-ice-cream boba. A barista fears the tea will disappear; a student says it may be the first version her friends will try.'
    ],
    sample: ['一杯珍奶可以有多少種故鄉？', 'How many hometowns can one cup hold?'],
    exp: ['手搖飲店員', 'a bubble tea barista'],
    overseas: ['海外飲料店', 'an overseas drink shop'],
    source: 'https://www.archives.gov.tw/tw/arctw/69-1894.html',
    isFocal: true,
    focalRationale: [
      '期中報告三大核心案例之一：探討從1980年代臺灣手搖飲文化到全球青年社交空間與創業載體的文化流動。',
      'One of 3 focal cases: examines evolution from 1980s Taiwanese tea culture to global youth social hubs and diasporic entrepreneurship.'
    ],
    urbanSpace: [
      '都市空間視角：手搖杯從臺中泡沫紅茶店的「騎樓坐聊」空間，延伸至臺北捷運人手一杯的「通勤流動」消費，再到臺南茶飲老店的慢調氛圍；都市空間的步行節奏直接塑造了手搖杯的封口杯與吸管技術革命。',
      'Urban Space: Hand-shaken tea evolved from Taichung’s covered arcade hangout culture into Taipei transit commuter rhythm, then into Tainan’s relaxed tea parlours. Street mobility accelerated sealing and straw innovations.'
    ],
    southeastAsiaCase: [
      '東南亞跨境案例（泰國/印尼/越南）：珍奶在曼谷與泰式奶茶的濃茶煉乳風味混血，誕生「泰奶珍珠」；在印尼雅加達則融入黑糖厚奶風潮，成為穆斯林青年聚會熱門無酒精飲品；同時臺北車站「印尼街」與臺中「第一廣場（東協廣場）」也成為東南亞移工品嚐臺灣珍奶與家鄉飲品的文化交匯點。',
      'Southeast Asian Diaspora (Thailand/Indonesia/Vietnam): In Bangkok, boba fused with Thai milk tea sweetened with condensed milk; in Jakarta, brown sugar boba became a staple non-alcoholic youth hangout beverage. Meanwhile, "Little Indonesia" near Taipei Main Station and Taichung ASEAN Square serve as reciprocal hubs.'
    ],
    diasporaVoice: [
      '海外臺灣人視角（美國留學生五年經驗）：「在紐約念書這幾年，珍奶店是我們想家時必去的聚點。雖然一杯要六七塊美金，加了香草冰淇淋和布丁也不如臺灣便宜，但當你跟外國同學站在菜單前介紹微糖微冰時，那種『我能分享我的文化』的自豪與鄉愁是交織在一起的。」',
      'Overseas Taiwanese Student Perspective: “Studying in New York for 5 years, boba shops are our prime refuge from homesickness. Even with vanilla ice cream and pudding at $7, introducing sweetness levels to classmates gives a deep mix of cultural pride and nostalgia.”'
    ]
  },
  {
    id: 'stinky',
    icon: '🧊',
    name: ['臭豆腐', 'Stinky tofu'],
    micro: ['有些人聞到回憶，有些人只聞到臭味', 'Nostalgia to some; shock to others'],
    lead: [
      '一種發酵食物，在臺灣夜市變成酥脆、泡菜、蒸煮和地方口味的集合。',
      'A fermented food gains many lives at Taiwan’s night markets: crispy, steamed, pickled, local.'
    ],
    trace: [
      ['發酵豆腐傳統', 'Fermented tofu traditions'],
      ['臺灣夜市的多種吃法', 'Taiwanese night-market variations'],
      ['海外影片的味覺挑戰', 'Reaction videos overseas']
    ],
    clues: [
      {
        tag: ['傳說', 'LEGEND'],
        title: ['王致和的傳說', 'The Wang Zhihe legend'],
        zh: '臭豆腐常見的起源說法涉及清代王致和的故事；這是流傳的故事，不能當成毫無疑義的確定史實。',
        en: 'A popular origin tale names Wang Zhihe in the Qing era. It is a circulated story—not an unquestionable historical fact.',
        note: ['連「起源」本身也可能是一種文化敘事。', 'An origin story can itself be a cultural narrative.']
      },
      {
        tag: ['在地', 'LOCAL'],
        title: ['一樣臭，不一樣吃', 'Same smell, many ways'],
        zh: '臺灣夜市常見油炸臭豆腐，不同地方也有蒸煮、醬汁與泡菜搭配等變化。',
        en: 'Fried stinky tofu is familiar at Taiwanese night markets, but steaming, sauces, and pickles vary by locality.',
        note: ['「臺灣人的吃法」其實有很多種。', 'There is no single Taiwanese way to eat it.']
      },
      {
        tag: ['鏡頭', 'LENS'],
        title: ['第一口的表情', 'The first-bite face'],
        zh: '從在地小吃變成海外影音常見的挑戰題材，食物有時只剩下「敢不敢吃」的敘事。',
        en: 'As a food-challenge subject in overseas videos, the dish can be reduced to a single question: “Would you dare eat it?”',
        note: ['影片放大了反應，也可能縮小了人。', 'A camera can magnify reaction while shrinking the people behind it.']
      }
    ],
    tension: [
      '你想拍朋友第一次吃的驚恐表情。攤主說：「笑可以，但能不能也拍一下我每天凌晨備料的樣子？」',
      'You want your friend’s shocked first bite. The vendor says, “Laugh if you like—but could you also film me preparing food before dawn?”'
    ],
    sample: ['觀眾看到的是食物，還是被鏡頭安排的驚嚇？', 'Do viewers see food—or a surprise arranged by the camera?'],
    exp: ['臭豆腐攤主', 'a stinky tofu vendor'],
    overseas: ['海外試吃影片', 'an overseas taste-test video'],
    source: 'https://dict.th.gov.tw/Print.aspx?ID=2313'
  },
  {
    id: 'noodle',
    icon: '🍜',
    name: ['牛肉麵', 'Beef noodle soup'],
    micro: ['異鄉的味道，如何成為臺灣味？', 'How an immigrant dish became Taiwanese'],
    lead: [
      '一碗牛肉麵的湯裡，可能同時有移民記憶、地方變化與關於「正宗」的爭論。',
      'One bowl can hold migration, local change, and competing ideas of what counts as authentic.'
    ],
    trace: [
      ['戰後移民與麵食傳統', 'Postwar migration and noodle traditions'],
      ['臺灣南北不同口味', 'Regional Taiwanese styles'],
      ['觀光與海外臺灣餐館', 'Tourism and overseas Taiwanese eateries']
    ],
    clues: [
      {
        tag: ['移動', 'MIGRATION'],
        title: ['不是只有一條來路', 'More than one route'],
        zh: '戰後不同地區移民帶來麵食傳統，清燉與紅燒牛肉麵的歷史線索涉及不同社群與做法。',
        en: 'Postwar migrants brought different noodle traditions; clear broth and red-braised styles have connections to different communities and techniques.',
        note: ['一道國民美食，可能來自多個人的離鄉。', 'A national icon may contain several journeys from home.']
      },
      {
        tag: ['爭議', 'DISPUTE'],
        title: ['紅燒牛肉麵從哪裡開始？', 'Where did red-braised soup begin?'],
        zh: '牛肉麵起源有岡山和臺南等不同看法，不能硬把多條線索剪成唯一發明者。',
        en: 'Accounts differ over whether Taiwanese red-braised beef noodles began in Gangshan or Tainan. Do not flatten contested histories into one inventor.',
        note: ['史料留下空白時，懸念比武斷更有力量。', 'When records leave gaps, uncertainty can be stronger than false certainty.']
      },
      {
        tag: ['認同', 'IDENTITY'],
        title: ['過去的禁忌，今天的招牌', 'From taboo to signature'],
        zh: '臺灣早期農家依靠牛耕作，部分長者有不吃牛的習慣；今日牛肉麵又被視為代表料理。',
        en: 'Oxen once powered agriculture, and some older Taiwanese avoided beef; today beef noodle soup is widely regarded as a signature dish.',
        note: ['同一個社會對同一食材的意義也會改變。', 'A society can change what one ingredient means.']
      }
    ],
    tension: [
      '一位老人說：「以前我們家不吃牛。」年輕老闆卻說：「我靠牛肉麵養大一家人。」你只剩一分鐘片長。',
      'An elder says, “We never ate beef at home.” A young owner replies, “Beef noodles raised my family.” You have one minute left.'
    ],
    sample: ['一碗牛肉麵，要從誰的家鄉開始說？', 'Whose hometown begins this bowl?'],
    exp: ['牛肉麵店老闆', 'a noodle shop owner'],
    overseas: ['海外臺灣麵館', 'an overseas Taiwanese noodle shop'],
    source: 'https://fae.moa.gov.tw/map/food_item.php?id=259&type=AS08',
    isFocal: true,
    focalRationale: [
      '期中報告三大核心案例之二：探討戰後移民麵食記憶、地方融合與由農耕禁忌到國民美食的認同變遷。',
      'One of 3 focal cases: traces postwar migration, regional adaptation, and shift from agrarian taboo to national signature dish.'
    ],
    urbanSpace: [
      '都市空間視角：牛肉麵的起源深植於眷村聚落、老兵麵攤與都市違建拆遷的歷史空間。從高雄岡山空軍眷村的豆瓣醬，到臺北市信義路、延平南路違章麵攤街，牛肉麵見證了戰後臺北地景的重建與族群口味融合。',
      'Urban Space: Beef noodle soup is rooted in military dependents’ villages (Juan-cun), veteran noodle carts, and informal urban settlements in Taipei and Gangshan, bearing witness to spatial rebuilding and migration cuisine.'
    ],
    diasporaVoice: [
      '海外臺灣人視角（美國留學生五年經驗）：「在加州聖蓋博谷和紐約法拉盛，牛肉麵招牌滿街都是。老外點餐時常常分不清紅燒和清燉，但對我們來說，那口酸菜和牛骨湯的香氣，就是週末跑二十英里高速公路也要吃到的鄉愁。」',
      'Overseas Taiwanese Student Perspective: “Across the San Gabriel Valley and Flushing, Taiwanese beef noodle signs are everywhere. American friends don’t distinguish braised vs clear broth, but that pickled mustard aroma is home.”'
    ]
  },
  {
    id: 'xiaolong',
    icon: '🥟',
    name: ['小籠包', 'Xiaolongbao'],
    micro: ['手工與國際品牌之間', 'Between craftsmanship and global brand'],
    lead: [
      '從中式點心傳統到臺灣餐飲品牌的國際展店，湯包走入了更多人的餐桌。',
      'From Chinese dumpling traditions to a Taiwanese restaurant brand’s global reach, soup dumplings meet new audiences.'
    ],
    trace: [
      ['江南一帶的湯包傳統', 'Jiangnan soup-dumpling traditions'],
      ['臺灣餐飲的精緻化', 'Refinement in Taiwan'],
      ['國際品牌與海外餐桌', 'Global brands and overseas diners']
    ],
    clues: [
      {
        tag: ['轉折', 'TURN'],
        title: ['油行轉成小籠包店', 'An oil shop becomes a dumpling shop'],
        zh: '鼎泰豐1958年在臺北從油行起家，1972年前後轉向小籠包餐飲；這是品牌歷史，不等於小籠包由該店發明。',
        en: 'Din Tai Fung began as a Taipei oil shop in 1958 and moved toward xiaolongbao dining around 1972. That is a brand story—not the invention of soup dumplings.',
        note: ['品牌故事和食物起源，是不同的兩件事。', 'A brand’s story is not the origin of the food.']
      },
      {
        tag: ['手藝', 'CRAFT'],
        title: ['十八摺與工序', 'Eighteen folds and process'],
        zh: '鼎泰豐以講究摺數與手工工序聞名，讓細節成為品牌可辨識的語言。',
        en: 'Din Tai Fung has made careful folds and handwork a visible part of its global brand identity.',
        note: ['一個工序，也能被拍成文化符號。', 'A production step can become a cultural symbol on camera.']
      },
      {
        tag: ['海外', 'GLOBAL'],
        title: ['同一道點心，不同店門', 'One dumpling, many doorways'],
        zh: '鼎泰豐從臺灣走向日本、美國、新加坡等市場；地方飲食因此進入國際服務與品牌體系。',
        en: 'Din Tai Fung expanded from Taiwan into markets including Japan, the U.S., and Singapore, placing a local food experience into global service and branding systems.',
        note: ['跨國傳播不只有味道，還有服務和形象。', 'Global circulation spreads service and imagery as well as taste.']
      }
    ],
    tension: [
      '國外分店的主廚說「要每一顆都一模一樣」，外婆卻說「我家包的從來沒有兩顆一樣」。誰的「傳統」值得入鏡？',
      'An overseas chef wants every dumpling identical. A grandmother says no two handmade dumplings in her home ever looked the same. Whose “tradition” goes on screen?'
    ],
    sample: ['當手藝成為品牌，什麼被留下？', 'When craft becomes a brand, what remains?'],
    exp: ['點心師傅', 'a dumpling chef'],
    overseas: ['國際連鎖餐廳', 'an international restaurant branch'],
    source: 'https://www.dintaifung.com.tw/about.php'
  },
  {
    id: 'porkrice',
    icon: '🍚',
    name: ['滷肉飯', 'Braised pork rice'],
    micro: ['名字可以不同，記憶會一樣嗎？', 'One comfort food, many names'],
    lead: [
      '滷肉飯、肉燥飯與爌肉飯的稱呼和形態在臺灣各地有所不同。',
      'Names and forms of braised pork rice, minced pork rice, and thick-cut pork rice vary around Taiwan.'
    ],
    trace: [
      ['臺灣各地家常飯食', 'Everyday rice dishes in Taiwan'],
      ['南北名稱與肉型差異', 'Regional names and cuts'],
      ['海外餐館與家庭食譜', 'Overseas restaurants and home recipes']
    ],
    clues: [
      {
        tag: ['語言', 'NAMES'],
        title: ['一個名字，兩種點法', 'A name can order two dishes'],
        zh: '在臺灣不同地方，滷肉飯、肉燥飯等名稱與肉的形態不一定完全對應。',
        en: 'Across Taiwan, labels such as lu rou fan and rou zao fan do not always map onto the same meat preparation.',
        note: ['名稱不只是菜單，也可以是地方認同。', 'A menu word can carry regional identity.']
      },
      {
        tag: ['日常', 'EVERYDAY'],
        title: ['家常味沒有唯一配方', 'No one family recipe'],
        zh: '肉與醬汁配飯的日常做法會依家庭、區域和店家出現差異。',
        en: 'Pork and sauce over rice changes from household to household, region to region, and shop to shop.',
        note: ['日常重複的味道，往往比名店更有記憶。', 'Everyday repetition can hold more memory than a famous shop.']
      },
      {
        tag: ['跨海', 'ABROAD'],
        title: ['海外菜單怎麼翻？', 'Translating a menu abroad'],
        zh: '把地方菜名翻成英文時，菜名往往需要另加說明。遊戲中的海外店家是虛構情境，用來呈現翻譯取捨。',
        en: 'Local food names often need extra explanation in English. The overseas shop here is a fictional scenario built to explore translation choices.',
        note: ['「翻譯」有時會保留味道，卻省略地方差異。', 'Translation can preserve flavour but erase regional difference.']
      }
    ],
    tension: [
      '臺北客人說：「這是滷肉飯。」南部熟客搖頭：「我們會叫肉燥飯。」海外店家問你：「英文菜單到底該寫什麼？」',
      'A Taipei customer says “lu rou fan.” A southern regular says “We call it rou zao fan.” An overseas owner asks what the English menu should say.'
    ],
    sample: ['一道平民料理，有沒有唯一的名字？', 'Can a comfort dish have one correct name?'],
    exp: ['家常飯店老闆', 'a rice shop owner'],
    overseas: ['海外臺灣小吃店', 'an overseas Taiwanese eatery'],
    source: 'https://fae.moa.gov.tw/theme_data.php?id=4376&sub_theme=knowledge&theme=topics'
  },
  {
    id: 'chicken',
    icon: '🍗',
    name: ['鹽酥雞', 'Taiwanese popcorn chicken'],
    micro: ['美式炸雞的影子，臺式宵夜的靈魂', 'From fried chicken to late-night ritual'],
    lead: [
      '切成小塊、撒胡椒鹽、搭配九層塔，鹽酥雞成為臺灣夜晚熟悉的味道。',
      'Small pieces, pepper salt, fragrant basil: a familiar rhythm of Taiwan after dark.'
    ],
    trace: [
      ['1970年代的不同起源說法', 'Competing 1970s origin accounts'],
      ['夜市與宵夜攤', 'Night markets and late-night stands'],
      ['臺式炸物的海外店面', 'Taiwanese fried-snack shops abroad']
    ],
    clues: [
      {
        tag: ['分歧', 'DEBATE'],
        title: ['到底從哪裡開始？', 'Who began it?'],
        zh: '有說法把鹽酥雞指向1970年代臺北，也有說法指向臺南。起源尚有多種敘事，不宜聲稱已唯一確定。',
        en: 'Some origin stories point to 1970s Taipei; others to Tainan. There is more than one account, so a single definitive inventor would overstate the evidence.',
        note: ['不確定的地方，正好能拍出不同人的記憶。', 'Disagreement can reveal whose memories get counted.']
      },
      {
        tag: ['改造', 'TRANSFORM'],
        title: ['把大塊變成一口', 'A bite-size reinvention'],
        zh: '常見敘事將它與美式炸雞影響相連，但臺灣攤販發展出小塊醃製、香料及多種炸物搭配。',
        en: 'Common accounts link it partly to American fried-chicken influence, while Taiwanese vendors developed bite-size pieces, seasoning, and mixed fried snacks.',
        note: ['改造外來食物，也能變成自己的日常。', 'Adapting an imported form can make it a local everyday food.']
      },
      {
        tag: ['夜生活', 'NIGHT'],
        title: ['一包炸物，一群朋友', 'A paper bag and a group of friends'],
        zh: '鹽酥雞與夜市、宵夜、分享吃法緊密相關；在海外店面，也可能被重新包裝成臺式速食。',
        en: 'Popcorn chicken is tied to night markets, late-night snacking, and sharing; abroad it may be reframed as Taiwanese fast food.',
        note: ['食物出海時，可能連吃它的時間與場合都改變。', 'When food travels, the time and setting of eating can change too.']
      }
    ],
    tension: [
      '老攤主說他記得最早的鹽酥雞做法；另一位研究者拿出不同城市的說法。剪輯只有十秒能交代起源。',
      'An old vendor remembers one origin story; a researcher offers an account from another city. You have ten seconds for the origin scene.'
    ],
    sample: ['把起源剪成一句話，會不會少了太多？', 'What vanishes when history becomes one sentence?'],
    exp: ['炸物攤主', 'a fried-food vendor'],
    overseas: ['海外臺式炸物店', 'an overseas Taiwanese fried-snack shop'],
    source: 'https://channelplus.ner.gov.tw/episode/03e30e36-d108-4191-95e5-597b32e77828'
  },
  {
    id: 'danbing',
    icon: '🍳',
    name: ['蛋餅', 'Egg pancake'],
    micro: ['早餐店裡藏著戰後社會史', 'The breakfast grill holds history'],
    lead: [
      '粉漿、餅皮、加蛋、加起司，蛋餅的變化也是臺灣早餐外食文化的變化。',
      'Batter or wrappers, egg or cheese: changing pancakes tell a story of breakfast and daily life.'
    ],
    trace: [
      ['戰後移民與麵食文化', 'Postwar migration and wheat-based foods'],
      ['美援麵粉與早餐店興起', 'Flour aid and breakfast shops'],
      ['便利化與創意蛋餅', 'Convenience and creative versions']
    ],
    clues: [
      {
        tag: ['歷史', 'HISTORY'],
        title: ['早餐曾經不長這樣', 'Breakfast used to look different'],
        zh: '戰前臺灣不少家庭早餐以粥、飯等為主；戰後移民與小麥、麵粉的普及影響了早餐飲食。',
        en: 'Porridge and rice were common breakfasts in earlier Taiwan. Postwar migration and greater access to wheat flour reshaped breakfast habits.',
        note: ['早餐不只是口味，也跟產業與政策有關。', 'Breakfast is shaped by policy and industry, not just taste.']
      },
      {
        tag: ['技法', 'TECHNIQUE'],
        title: ['粉漿派還是餅皮派？', 'Batter or wrapper?'],
        zh: '臺灣蛋餅常見粉漿與現成餅皮等不同做法，各店形成不同口感與販售節奏。',
        en: 'Egg pancakes can be made from batter or prepared wrappers, creating different textures and working rhythms for shops.',
        note: ['備料方式的變化，映照時間和勞動。', 'Changing techniques can reflect time and labour.']
      },
      {
        tag: ['生活', 'ROUTINE'],
        title: ['趕上班的那一口', 'The commuter’s breakfast'],
        zh: '早餐店作為都市外食空間，在不同世代的生活節奏中扮演不同角色。',
        en: 'Breakfast shops have served changing roles as urban eating-out habits and work schedules evolved.',
        note: ['比配方更難帶走的，可能是清晨的生活節奏。', 'A morning rhythm may be harder to export than a recipe.']
      }
    ],
    tension: [
      '老闆說粉漿蛋餅要慢慢煎才對味；學生趕上課，只求三分鐘拿到起司蛋餅。你要拍誰？',
      'An owner insists batter needs slow cooking; a student rushing to class wants a cheese egg pancake in three minutes. Whose story do you film?'
    ],
    sample: ['當早餐變快，文化是不是也變了？', 'If breakfast speeds up, does the culture change too?'],
    exp: ['早餐店老闆', 'a breakfast shop owner'],
    overseas: ['海外臺式早餐企劃', 'a fictional overseas Taiwanese breakfast concept'],
    source: 'https://www.iseetaiwan.org/feature/%E4%B8%BB%E9%A1%8C%E6%8E%A2%E7%B4%A2/pp3fRMNfER'
  },
  {
    id: 'pineapple',
    icon: '🍍',
    name: ['鳳梨酥', 'Pineapple cake'],
    micro: ['「旺來」的祝福與一塊餅的身份', 'A lucky gift with a changing filling'],
    lead: [
      '這一塊伴手禮裡，藏著冬瓜、鳳梨、臺語諧音與食品品牌化的故事。',
      'Inside a souvenir cake are winter melon, pineapple, a Hokkien pun, and a story about branding.'
    ],
    trace: [
      ['糕餅、冬瓜餡與祝福', 'Pastry, winter-melon filling and good luck'],
      ['土鳳梨餡風潮', 'Pineapple-rich filling trends'],
      ['國際旅客的臺灣伴手禮', 'A Taiwanese souvenir for visitors']
    ],
    clues: [
      {
        tag: ['祝福', 'LUCK'],
        title: ['鳳梨為什麼叫「旺來」？', 'Why “prosperity comes”?'],
        zh: '「旺來」是鳳梨的臺語諧音意涵，讓鳳梨酥常與送禮及祝福連結。',
        en: 'In Taiwanese Hokkien, pineapple sounds like “prosperity comes,” linking pineapple cakes to gifts and good wishes.',
        note: ['食物的名字，有時比配方更有故事。', 'A food name can hold more than a recipe.']
      },
      {
        tag: ['餡料', 'FILLING'],
        title: ['冬瓜還是土鳳梨？', 'Winter melon or pineapple?'],
        zh: '臺灣鳳梨酥餡料曾大量採用冬瓜與鳳梨混合的做法，後來也流行酸香纖維感較強的土鳳梨餡。',
        en: 'Traditional pineapple cakes often use winter melon with pineapple; later pineapple-rich fillings with sharper flavour and texture became popular.',
        note: ['誰說改過配方就不是真正的傳統？', 'Who decides a changed filling is no longer traditional?']
      },
      {
        tag: ['旅途', 'TRAVEL'],
        title: ['從點心變成臺灣禮物', 'A cake becomes a Taiwan gift'],
        zh: '鳳梨酥成為知名伴手禮，隨旅行與贈禮流向海外，也讓「臺灣味」變成可攜帶的禮物。',
        en: 'Pineapple cakes became iconic souvenirs carried abroad through travel and gifting, turning “Taiwanese flavour” into a portable present.',
        note: ['當文化被裝進盒子，哪些意義還在？', 'What survives when culture fits inside a box?']
      }
    ],
    tension: [
      '旅客只想買「百分百純鳳梨」；老顧客卻說「我記得的鳳梨酥就是冬瓜餡」。你要把哪個放在標題？',
      'A visitor demands “100% real pineapple”; a longtime customer says the winter-melon filling is the taste of childhood. Which gets the headline?'
    ],
    sample: ['改掉的餡，是改掉傳統，還是創造新傳統？', 'Does a new filling erase tradition—or make another one?'],
    exp: ['糕餅師傅', 'a pastry maker'],
    overseas: ['海外伴手禮店', 'an overseas gift shop'],
    source: 'https://fae.moa.gov.tw/map/food_item.php?id=160&type=AS08'
  },
  {
    id: 'guabao',
    icon: '🥙',
    name: ['刈包', 'Gua bao'],
    micro: ['從尾牙到紐約、倫敦的白色蒸包', 'From year-end ritual to global bao'],
    lead: [
      '一個白色蒸包，曾承載尾牙與地方吃法，也跨海成為時尚街頭料理。',
      'A fluffy white bun connects Taiwanese year-end traditions with global street-food reinvention.'
    ],
    trace: [
      ['臺灣刈包與尾牙文化', 'Taiwanese gua bao and year-end customs'],
      ['紐約的餐飲風潮', 'New York restaurant scene'],
      ['倫敦與各地 bao 店', 'London and global bao eateries']
    ],
    clues: [
      {
        tag: ['習俗', 'CUSTOM'],
        title: ['一個像錢包的蒸包', 'A bun shaped like a purse'],
        zh: '刈包與臺灣尾牙等習俗有所連結，也常被聯想成象徵財運的「虎咬豬」。',
        en: 'Gua bao is linked to Taiwanese year-end rituals, and its folded shape is sometimes associated with a purse and prosperity.',
        note: ['食物不只裝肉，也裝進祝福。', 'Food can carry blessings as well as fillings.']
      },
      {
        tag: ['紐約', 'NEW YORK'],
        title: ['出海後改了名字', 'A new name overseas'],
        zh: '2000年代刈包在美國餐飲圈受到注意，2009年紐約 Baohaus 也讓臺式刈包被更多人看見。',
        en: 'Gua bao drew wider attention in American dining during the 2000s; New York’s Baohaus, opened in 2009, helped spotlight the Taiwanese version.',
        note: ['一個料理在國外走紅，創作者與移民的角色都值得追問。', 'When a dish goes global, the roles of chefs and migrants matter.']
      },
      {
        tag: ['倫敦', 'LONDON'],
        title: ['在倫敦，大家叫它 Bao', 'In London, just “bao”'],
        zh: '倫敦 Bao 品牌於2014年起步；刈包在海外往往被重新命名與定位，傳播時也可能和其他亞洲蒸包混淆。',
        en: 'London’s Bao began in 2014. Abroad, gua bao has often been renamed, repackaged, and sometimes confused with other Asian buns.',
        note: ['流行起來後，來源反而可能越來越模糊。', 'Popularity can make origins less visible.']
      }
    ],
    tension: [
      '倫敦餐車把刈包寫成「Asian taco」。臺灣留學生說「好懂但怪怪的」。老闆問你：「外國客人不懂刈包，我該怎麼賣？」',
      'A London food truck calls gua bao an “Asian taco.” A Taiwanese student finds it understandable but strange. The owner asks how else to sell it to newcomers.'
    ],
    sample: ['讓人聽得懂的翻譯，會失去什麼？', 'What gets lost in a translation that sells?'],
    exp: ['刈包攤主', 'a gua bao vendor'],
    overseas: ['倫敦的蒸包店', 'a London bao shop'],
    source: 'https://www.cna.com.tw/news/firstnews/201809010190.aspx',
    isFocal: true,
    focalRationale: [
      '期中報告三大核心案例之三：探討從尾牙「虎咬豬」習俗到紐約、倫敦時尚街頭小吃與「Asian taco」翻譯取捨。',
      'One of 3 focal cases: explores journey from year-end ritual to NY/London dining and the “Asian taco” naming dilemma.'
    ],
    urbanSpace: [
      '都市空間視角：刈包在臺灣往往棲身於廟口老街與傳統夜市小吃攤，伴隨蒸籠白霧與年終商行尾牙的民俗地緣；跨海後，它進駐紐約東村與倫敦 Soho 區的極簡設計潮店，成為都市中產與年輕文青的街頭快餐符號。',
      'Urban Space: Gua bao originated near temple entrances, traditional night markets and commercial year-end rituals in Taiwan, before transforming into minimalist trendy storefronts in NYC’s East Village and London’s Soho.'
    ],
    diasporaVoice: [
      '海外臺灣人視角（美國留學生五年經驗）：「在紐約看到外國人排隊買一個十塊美金的刈包，還說這是『亞洲塔可』時，心情真的很微妙。一方面高興臺灣美食被看見，但另一方面又很想衝過去告訴他們：這不是塔可，這是我們尾牙吃的虎咬豬，裡面裝的是一整年的圓滿和發財！」',
      'Overseas Taiwanese Student Perspective: “Watching people queue in NYC paying $10 for a gua bao calling it ‘Asian taco’ brings mixed feelings. Proud it’s popular, yet wanting to explain: this isn’t a taco, it’s our year-end tiger-bites-pig blessing!”'
    ]
  },
  {
    id: 'scallion',
    icon: '🫓',
    name: ['蔥抓餅', 'Scallion pancake'],
    micro: ['手一抓，餅皮也換了身份', 'A technique changes the dish'],
    lead: [
      '與中國山東麵食有關的做法，在臺灣成為酥脆、鬆散又能自由加料的街頭小吃。',
      'A northern Chinese dough tradition became a flaky, pulled-apart Taiwanese street snack with flexible fillings.'
    ],
    trace: [
      ['山東麵食傳統', 'Shandong wheat-dough traditions'],
      ['臺灣蔥抓餅的抓鬆技法', 'Taiwanese pull-and-fluff technique'],
      ['市場、超市與新的配料', 'Markets, supermarkets and new toppings']
    ],
    clues: [
      {
        tag: ['來源', 'ROOTS'],
        title: ['從山東到臺灣', 'From Shandong to Taiwan'],
        zh: '交通部觀光署介紹蔥抓餅源於中國山東，傳入臺灣後成為常見街頭小吃。',
        en: 'Taiwan’s Tourism Administration describes scallion pull-apart pancakes as originating from Shandong and later becoming popular in Taiwan.',
        note: ['移動之後的料理可以長出新的地方身份。', 'A migrated dish can develop a new local identity.']
      },
      {
        tag: ['手勢', 'TECHNIQUE'],
        title: ['「抓」才是靈魂', 'The pull matters'],
        zh: '蔥抓餅以手把餅皮抓鬆，形成與一般蔥油餅不同的膨鬆層次。',
        en: 'The cook pulls and fluffs the dough, creating a layered texture distinct from many ordinary scallion pancakes.',
        note: ['文化可以藏在一個做菜的動作裡。', 'Culture can hide in a cooking gesture.']
      },
      {
        tag: ['現在', 'TODAY'],
        title: ['加蛋、加起司，還算傳統嗎？', 'Egg and cheese—still traditional?'],
        zh: '在臺灣，蔥抓餅常搭配蛋、起司、九層塔等配料，也能在夜市與超市看到。',
        en: 'In Taiwan, eggs, cheese, and basil are common additions, and the food appears in both night markets and supermarkets.',
        note: ['傳統會不會就是一直能被改造？', 'Could tradition also mean the ability to adapt?']
      }
    ],
    tension: [
      '老闆手抓餅皮時說：「這個要靠手感。」孩子卻想把餅皮做成冷凍包寄到海外。兩個做法都在延續同一家店嗎？',
      'The vendor says pulling dough needs a practiced hand. Her child wants to sell frozen packs abroad. Could both be ways of continuing the same shop?'
    ],
    sample: ['手藝離開了手，還是原來的手藝嗎？', 'When craft leaves the hand, is it the same craft?'],
    exp: ['蔥抓餅師傅', 'a scallion pancake maker'],
    overseas: ['海外冷凍食品市場（情境）', 'an overseas frozen-food market (hypothetical)'],
    source: 'https://collections.nmth.gov.tw/article.aspx?a=244'
  }
];

export const MISSIONS: Record<string, FoodMission> = {
  bubble: {
    place: ['臺灣 → 加拿大多倫多／越南胡志明市', 'Taiwan → Toronto, Canada / Ho Chi Minh City, Vietnam'],
    history: [
      '1980年代臺灣手搖茶文化逐漸成熟；春水堂與翰林茶館都有起源主張。跨境流通後，boba 成為年輕人聚會與移民社群創業的一部分。',
      'Taiwanese hand-shaken tea expanded in the 1980s, with competing origin accounts. Abroad, boba became part of youth hangouts and diasporic entrepreneurship.'
    ],
    tasks: [
      {
        label: ['調一杯出海的珍奶', 'Mix an export-ready drink'],
        question: ['多倫多的店員問：第一次接觸珍奶的客人，甜度該怎麼介紹？', 'A Toronto barista asks: How do we introduce sweetness to newcomers?'],
        choices: [
          [['只賣全糖，因為這樣才正宗', 'Only full sugar—it must stay authentic'], 'archivist', ['你保留了熟悉的配方，但另一位客人說她無法喝完。', 'You kept a familiar recipe, but a guest says it is too sweet for her.']],
          [['提供糖度選擇，保留茶底介紹', 'Offer sugar levels and explain the tea base'], 'translator', ['店員多花十秒介紹茶，客人終於知道珍奶不只是甜點。', 'Ten extra seconds help customers see more than a sugary treat.']],
          [['推出香草冰淇淋口味吸引嘗鮮', 'Add a vanilla-ice-cream special'], 'spotlight', ['新品很好拍；老顧客卻問：我們還能喝到原味嗎？', 'It photographs well, but regulars ask whether the original remains.']]
        ]
      },
      {
        label: ['珍珠究竟代表什麼？', 'What do pearls mean?'],
        question: ['海外學生說：「這杯飲料讓我和朋友有話聊。」茶師說：「別忘了茶。」你把哪段話放進影片？', 'A student says boba brings friends together. A tea master says not to forget tea. Which line stays?'],
        choices: [
          [['手搖師傅的製茶日常', 'The tea maker’s daily craft'], 'archivist', ['茶不再只是背景材料。', 'Tea stops being mere background.']],
          [['兩個人都保留，對照他們的記憶', 'Keep both voices and contrast memories'], 'editor', ['觀眾看到同一杯茶的兩種身分。', 'Viewers see two identities in one cup.']],
          [['只留下店外排隊的盛況', 'Focus on the viral queues'], 'spotlight', ['畫面很熱鬧，但社群故事被擠出八分鐘之外。', 'The frame looks lively; the stories leave the cut.']]
        ]
      }
    ],
    overseas: [
      '一位加拿大第二代臺裔說，珍奶店像是朋友聚會的公共空間；一位越南店員則想知道，為什麼「臺灣味」的招牌越來越國際化。',
      'A second-generation Taiwanese Canadian describes the boba shop as a social meeting place; a Vietnamese barista wonders why “Taiwanese flavour” looks so international.'
    ],
    source: 'https://www.utsc.utoronto.ca/projects/torontofood/taiwanese-bubble-tea/'
  },
  stinky: {
    place: ['臺灣夜市 → 香港／海外反應影片', 'Taiwan night markets → Hong Kong / overseas reaction videos'],
    history: [
      '發酵豆腐有華人飲食脈絡；臺灣夜市常見酥炸配泡菜，也有蒸煮、麻辣等做法。海外常透過試吃挑戰認識它。',
      'Fermented tofu has varied Chinese culinary contexts. Taiwan features fried tofu with pickles, as well as steamed and spicy versions, while overseas viewers often meet it as a taste challenge.'
    ],
    tasks: [
      {
        label: ['決定要拍哪一種臭豆腐', 'Choose the tofu preparation'],
        question: ['攝影師想要最誇張的味道，攤販拿出炸、蒸、麻辣三種。你要先讓觀眾看到什麼？', 'Your camera friend wants maximum shock. The vendor offers fried, steamed and spicy versions. What comes first?'],
        choices: [
          [['炸臭豆腐與臺式泡菜', 'Fried tofu with Taiwanese pickles'], 'translator', ['外國朋友說香脆很好入口，開始理解和氣味的反差。', 'A newcomer enjoys the crunchy contrast with the smell.']],
          [['蒸臭豆腐的湯汁與調味', 'Steamed tofu, broth and seasoning'], 'archivist', ['一名熟客說：這才是他家餐桌上的味道。', 'A regular says it reminds them of home.']],
          [['只拍捏鼻子的誇張特寫', 'Only close-ups of shocked faces'], 'spotlight', ['影片很有笑點，但攤販悄悄收回準備介紹的菜單。', 'A funny cut; the vendor quietly puts away the menu she hoped to explain.']]
        ]
      },
      {
        label: ['國外觀眾的疑問', 'An overseas viewer asks'],
        question: ['留言：「你們是不是每個人都愛吃這個？」你如何安排下一個畫面？', 'Comment: “Do ALL Taiwanese people love this?” What is your next shot?'],
        choices: [
          [['找三位喜好不同的在地人', 'Ask three locals with different tastes'], 'editor', ['不同意見在同一片段裡出現。', 'Contrasting local opinions coexist on screen.']],
          [['介紹發酵與地方口味差異', 'Explain fermentation and regional styles'], 'translator', ['觀眾聽見了一段不只是獵奇的故事。', 'Viewers get a story beyond shock.']],
          [['乾脆再拍一個更刺激的挑戰', 'Film an even bolder challenge'], 'spotlight', ['觀眾更多了，但刻板印象也被重複。', 'The views rise; so does the repetition of a stereotype.']]
        ]
      }
    ],
    overseas: [
      '香港的臭豆腐和臺灣夜市做法並不完全相同。影片裡的一次驚訝，不能代表整個文化群體的口味。',
      'Hong Kong and Taiwan do not prepare stinky tofu in identical ways. One shocked reaction cannot represent the tastes of a whole society.'
    ],
    source: 'https://eng.taiwan.net.tw/m1.aspx?sno=0024013'
  },
  noodle: {
    place: ['四川與戰後移民記憶 → 臺灣 → 洛杉磯', 'Sichuan / postwar migration → Taiwan → Los Angeles'],
    history: [
      '戰後移居臺灣者帶來多地麵食技法，紅燒、清燉與地方食材在臺灣交會；海外臺灣餐館又讓它變成移民的家常味。',
      'Postwar migrants brought multiple noodle traditions. Braised and clear-broth styles met local ingredients in Taiwan; overseas restaurants made the dish a taste of migrant home.'
    ],
    tasks: [
      {
        label: ['拼出一碗跨世代的牛肉麵', 'Build a multigenerational bowl'],
        question: ['你只有三張素材卡：外省老兵回憶、在地牛肉湯、年輕店家的新做法。怎麼拼？', 'You have three footage cards: a veteran’s memory, local beef soup, and a young chef’s changes. What leads?'],
        choices: [
          [['先拍老兵當年的離鄉', 'Begin with a migrant’s journey'], 'archivist', ['一碗湯變得有了時間深度。', 'The broth acquires a longer memory.']],
          [['三張素材分屏，讓歷史相遇', 'Split-screen three histories'], 'editor', ['觀眾開始明白「起源」不是單數。', 'Viewers see that origin need not be singular.']],
          [['直接拍最濃郁的紅燒湯頭', 'Start with the richest red broth'], 'spotlight', ['食慾大開；仍有人問清燉為何消失了。', 'It looks delicious; viewers still ask where clear broth went.']]
        ]
      },
      {
        label: ['替海外客人說明何謂臺灣牛肉麵', 'Describe Taiwanese beef noodles abroad'],
        question: ['洛杉磯店家想寫「正宗臺灣牛肉麵」。你要補上什麼？', 'An LA menu says “authentic Taiwanese beef noodle soup.” What would you add?'],
        choices: [
          [['只保留正宗二字', 'Keep “authentic” alone'], 'spotlight', ['簡單有力，但故事變短了。', 'Punchy—but a shorter story.']],
          [['介紹移民與地方融合', 'Mention migration and local adaptation'], 'translator', ['客人知道它如何變成臺灣味。', 'Customers discover how it became Taiwanese.']],
          [['讓不同世代的家庭說自己的版本', 'Let families tell different versions'], 'editor', ['菜單背後不再只有一位作者。', 'There is more than one author behind the menu.']]
        ]
      }
    ],
    overseas: [
      '海外移民店家把「臺灣味」寫在招牌上；老客人記得家鄉的湯，下一代則在新城市建立自己的口味。',
      'An immigrant shop calls itself “Taiwanese”; older customers remember home broth, while younger diners build new taste memories in another city.'
    ],
    source: 'https://taiwanreview.nat.gov.tw/AMP/Culture/Top-News/24443/Taiwanese-cuisine-reflects-nation%27s-historical-odyssey'
  },
  xiaolong: {
    place: ['江南點心傳統 → 臺灣餐飲 → 日本與美國', 'Jiangnan dumpling traditions → Taiwan → Japan & the U.S.'],
    history: [
      '小籠包與江南點心有關，臺灣餐飲品牌將精密工序與服務體驗帶向國際；不要把品牌成功誤認成食物的起源。',
      'Xiaolongbao has roots in Jiangnan food traditions; Taiwanese restaurants globalized a meticulous production and service experience. Brand success is not the dish’s invention.'
    ],
    tasks: [
      {
        label: ['包一顆給海外分店的湯包', 'Fold a dumpling for an overseas branch'],
        question: ['分店要把手工技法標準化，老廚師卻怕失去手感。你如何呈現？', 'An overseas branch wants consistent techniques; the chef worries that a craft cannot be fully standardized. How will you show both?'],
        choices: [
          [['放大鏡頭拍師傅的手', 'Close-ups of the chef’s hands'], 'archivist', ['人們看到技術也是記憶。', 'Craft becomes visible as memory.']],
          [['把工序與服務並排呈現', 'Show craft and service side by side'], 'translator', ['一顆湯包不只是摺數，也是世界餐飲經驗。', 'Dumplings become more than pleats: a global dining experience.']],
          [['只展示整齊排隊與名店光環', 'Focus on the famous brand and queue'], 'spotlight', ['人氣很明顯，江南與臺灣的歷史連結卻不見了。', 'Brand visibility rises; historical connections disappear.']]
        ]
      },
      {
        label: ['向海外觀眾解釋起源', 'Explain origins to overseas viewers'],
        question: ['觀眾說：「臺灣發明了小籠包！」你要如何處理這句話？', 'A viewer says: “Taiwan invented soup dumplings!” What now?'],
        choices: [
          [['保留，這樣比較好懂', 'Leave it: a clean headline'], 'spotlight', ['句子很短，但會誤導觀眾。', 'A short line, but a misleading one.']],
          [['補上江南源流與臺灣品牌推廣', 'Add Jiangnan roots and Taiwanese branding'], 'translator', ['觀眾知道傳播不等於發明。', 'The audience sees that circulation is not invention.']],
          [['讓兩地廚師各自描述', 'Let cooks from both places speak'], 'editor', ['觀眾聽見多個歷史位置。', 'Multiple historical positions become audible.']]
        ]
      }
    ],
    overseas: [
      '日本與美國的分店讓不少人第一次認識小籠包，卻也可能把某家臺灣品牌誤認成這種食物的唯一來源。',
      'Branches in Japan and the U.S. introduced many diners to soup dumplings, while also risking confusion between a Taiwanese brand and the dish’s origin.'
    ],
    source: 'https://www.scmp.com/lifestyle/food-drink/article/3097791/history-xiaolongbao-or-soup-dumplings-outskirts-shanghai'
  },
  porkrice: {
    place: ['臺灣家常飯食 → 紐約／洛杉磯的臺式餐館', 'Taiwanese home rice dishes → New York / Los Angeles eateries'],
    history: [
      '滷肉飯從惜食與家常料理走到臺灣小吃招牌；名稱、肉型與甜鹹在島內就有地方差異，海外又會因食材供應調整。',
      'Born of everyday frugality, braised pork rice has multiple Taiwanese names, cuts and sweetness levels. Overseas suppliers invite further adaptations.'
    ],
    tasks: [
      {
        label: ['替海外菜單選一個名字', 'Name a dish on an overseas menu'],
        question: ['客人看不懂「滷肉飯」，另一位臺灣顧客又說北中南叫法不同。你會怎麼寫？', 'A guest cannot read “lu rou fan”; a Taiwanese diner says names vary by region. What goes on the menu?'],
        choices: [
          [['Taiwanese Pork Rice，簡單好懂', '“Taiwanese Pork Rice,” clear and simple'], 'spotlight', ['好點餐，地方差異卻被簡化。', 'Easy to order; regional variation gets flattened.']],
          [['滷肉飯 Lu Rou Fan＋食材註解', '“Lu Rou Fan” plus a brief ingredient note'], 'translator', ['名稱保留，也有理解的橋。', 'The name remains, with a bridge for newcomers.']],
          [['加入「店家版本」與南北說法', 'Explain the shop’s regional version'], 'archivist', ['這不是唯一版本，而是某個人的家常味。', 'It is one household’s version, not the only version.']]
        ]
      },
      {
        label: ['改變肉的切法算失去傳統嗎？', 'Does a new cut erase tradition?'],
        question: ['海外廚房只能取得不同部位的豬肉。店家準備調整比例。你會怎麼拍？', 'An overseas kitchen can source a different cut of pork, so the chef plans to adjust the recipe. How would you film it?'],
        choices: [
          [['對照臺灣與海外兩種實作', 'Compare both kitchens'], 'translator', ['你拍到變形的原因而非只看差異。', 'You show why it changed, not merely how.']],
          [['記錄廚師的家族食譜', 'Record the family recipe'], 'archivist', ['一道飯保存了代際記憶。', 'A bowl carries generational memory.']],
          [['只用「不正宗」做標題', 'Headline: “Not authentic!”'], 'spotlight', ['爭論拉高熱度，也遮住了採買的現實。', 'The argument goes viral; sourcing constraints vanish.']]
        ]
      }
    ],
    overseas: [
      '美國大城市的臺式餐館既是新鮮體驗，也是部分海外臺裔尋找家鄉味的空間；同一道飯可能同時服務兩種期待。',
      'Taiwanese eateries in large U.S. cities can be new discoveries for some and comforting spaces for diasporic Taiwanese; one bowl can serve different needs.'
    ],
    source: 'https://guide.michelin.com/tw/en/article/travel/taiwanese-cuisine-michein-restaurants-across-the-world'
  },
  chicken: {
    place: ['臺灣夜市 → 海外臺式炸雞品牌', 'Taiwanese night markets → overseas Taiwanese fried-chicken shops'],
    history: [
      '鹽酥雞常見甜薯粉外皮、九層塔和胡椒鹽；國際市場可能改成套餐、三明治或配飲料。起源年份與發明者常有爭議。',
      'Taiwanese popcorn chicken often uses sweet-potato starch, basil and pepper salt; abroad it may become a combo meal or branded fast food. Single-inventor stories remain uncertain.'
    ],
    tasks: [
      {
        label: ['組一份不同城市的鹽酥雞', 'Assemble popcorn chicken for two cities'],
        question: ['國外快餐店想把九層塔換成乾燥香草，也想改成無骨大份量。你怎麼介紹？', 'An overseas shop considers dried herbs instead of fresh basil and larger boneless portions. How do you explain the change?'],
        choices: [
          [['介紹配料取得與成本', 'Explain ingredient availability and cost'], 'translator', ['你拍到料理變形是有脈絡的。', 'Adaptation now has context.']],
          [['拍原攤主如何炸九層塔', 'Film the original vendor frying basil'], 'archivist', ['製作技巧在鏡頭裡變得珍貴。', 'The technique becomes visible.']],
          [['只下標「外國把鹽酥雞毀了」', 'Headline: “They ruined it!”'], 'spotlight', ['吸睛，卻把不同做法變成對立。', 'A hook that turns variations into enemies.']]
        ]
      },
      {
        label: ['起源有兩個不同說法', 'Two origin stories conflict'],
        question: ['兩家店都說自己是最早的，你會怎麼剪？', 'Two shops each claim to be first. How do you edit them?'],
        choices: [
          [['兩個人都入鏡並標示「說法」', 'Keep both as competing accounts'], 'editor', ['沒有強行替歷史下定論。', 'You avoid forcing certainty onto the record.']],
          [['找到市場變遷與夜食文化的脈絡', 'Place the claims in changing night-life context'], 'archivist', ['故事不再只剩名號。', 'The history becomes bigger than credit.']],
          [['宣布人氣更高者才是真祖先', 'Declare the more popular one the inventor'], 'spotlight', ['你得到一個主角，也省略了反證。', 'You get a hero while excluding contradiction.']]
        ]
      }
    ],
    overseas: [
      '海外「臺式炸雞」的菜單和套餐形式可能借用當地速食文化；不是每一種變形都意味著失去原本的文化身分。',
      'Overseas “Taiwanese fried chicken” can adopt local fast-food meal formats; variation does not automatically erase cultural identity.'
    ],
    source: 'https://guide.michelin.com/tw/en/article/travel/must-try-street-food-taiwan'
  },
  danbing: {
    place: ['戰後臺灣麵食轉變 → 海外臺灣早餐店（情境）', 'Postwar Taiwanese wheat culture → overseas Taiwanese breakfast shop (fictional)'],
    history: [
      '戰後移民與美援麵粉促成臺灣早餐麵食發展。蛋餅逐漸形成粉漿、現成餅皮與加料等做法；海外早餐店情節為虛構模擬。',
      'Postwar migration and U.S. flour aid reshaped Taiwanese breakfasts. Batter-based and wrapper-based egg pancakes developed; the overseas shop in this scene is fictional.'
    ],
    tasks: [
      {
        label: ['經營一個清晨時段', 'Run a breakfast rush'],
        question: ['7:40 排隊十個人。粉漿版較費時，現成餅皮較快。你要選哪種流程？', 'Ten customers queue at 7:40. Batter takes longer; prepared wrappers move faster. Which workflow?'],
        choices: [
          [['做粉漿版並告知需要等', 'Make batter pancakes and explain the wait'], 'archivist', ['客人看見了手藝與時間。', 'Customers notice craft and time.']],
          [['兩種做法各留一個窗口', 'Offer two queues and explain the styles'], 'editor', ['不同時間需求都被看見。', 'Different time needs are recognized.']],
          [['只求出餐速度，當它就是唯一標準', 'Make speed the only rule'], 'spotlight', ['出餐很快，老闆想講的歷史被擱下。', 'Orders fly out; the history stays untold.']]
        ]
      },
      {
        label: ['海外菜單怎麼介紹蛋餅？', 'Explain dan bing abroad'],
        question: ['店家打算寫「Taiwanese breakfast burrito」。你會怎麼補一句？', 'A shop plans to call it a “Taiwanese breakfast burrito.” What would you add?'],
        choices: [
          [['保留蛋餅名並說明粉漿或餅皮', 'Keep “dan bing” and explain batter/wrapper'], 'translator', ['既好懂又不完全失去原名。', 'Accessible while retaining its name.']],
          [['把老闆的移民與家庭記憶寫進卡片', 'Include the owner’s family story'], 'archivist', ['客人得到一段比翻譯更長的故事。', 'Customers get a story beyond translation.']],
          [['只寫 burrito，不提臺灣', 'Just call it a burrito'], 'spotlight', ['客人比較熟悉，來源卻消失了。', 'Familiarity rises; origins vanish.']]
        ]
      }
    ],
    overseas: [
      '這是一個虛構的海外早餐店情境，用來想像早餐節奏與臺灣食物在新城市的翻譯問題，不是有考據的單一店家史實。',
      'This fictional overseas breakfast-shop scene explores daily rhythms and translation, not the documented history of a specific shop.'
    ],
    source: 'https://collections.nmth.gov.tw/article.aspx?a=244'
  },
  pineapple: {
    place: ['臺灣糕餅 → 日本伴手禮市場／國際旅客', 'Taiwanese pastry → Japanese souvenir market / international visitors'],
    history: [
      '鳳梨酥由糕餅與鳳梨、冬瓜餡逐步演化，2000年代後土鳳梨餡風潮擴大。送禮與「旺來」的諧音是文化意義的一部分。',
      'Pineapple cakes evolved through local pastry and mixed pineapple/winter-melon fillings; pineapple-rich variants rose later. Gifting and the “prosperity comes” pun are part of their meaning.'
    ],
    tasks: [
      {
        label: ['替一盒鳳梨酥選內餡', 'Choose a filling for a gift box'],
        question: ['海外旅客只想要「100% 鳳梨」，阿嬤卻愛冬瓜混合餡。你選哪一盒放主視覺？', 'Tourists want “100% pineapple”; grandmother loves the winter-melon blend. Which goes on the front label?'],
        choices: [
          [['純鳳梨餡，標清楚酸香與纖維', 'Pineapple-rich, labeled tart and fibrous'], 'translator', ['新選擇有特色，但不是唯一的傳統。', 'A distinctive choice, not the only tradition.']],
          [['冬瓜混合餡與老店記憶', 'Classic mixed filling and older memories'], 'archivist', ['旅客第一次聽見冬瓜的理由。', 'Visitors learn why winter melon was used.']],
          [['兩盒並列，標示年代與風味', 'Offer both with histories and flavours'], 'editor', ['差異變成文化線索，而不是對錯題。', 'Variation becomes a clue, not a right/wrong test.']]
        ]
      },
      {
        label: ['把「旺來」翻到海外', 'Translate “prosperity comes”'],
        question: ['日本客人想知道為何新年送鳳梨酥。你會怎麼說？', 'A Japanese visitor asks why people gift pineapple cakes for New Year. How will you explain it?'],
        choices: [
          [['用臺語諧音與祝福卡介紹', 'Include the Hokkien pun and a blessing card'], 'translator', ['一個聲音連起了一種送禮關係。', 'A word sound connects to a social relationship.']],
          [['訪問收到禮物的不同家人', 'Ask relatives what receiving it means'], 'editor', ['祝福不只是一句口號。', 'A blessing means different things to different people.']],
          [['只寫「臺灣必買」', 'Label simply “Taiwan must-buy”'], 'spotlight', ['賣點清楚，語言文化卻沒有出場。', 'A clear sales pitch; the linguistic story disappears.']]
        ]
      }
    ],
    overseas: [
      '旅客將鳳梨酥帶出臺灣時，也帶著對「臺灣味」的想像；不同內餡與送禮理由會讓故事改寫。',
      'When visitors carry pineapple cakes abroad, they also carry an imagined “taste of Taiwan”; fillings and gifting contexts reshape the story.'
    ],
    source: 'https://www.taiwanngo.tw/Post/84265'
  },
  guabao: {
    place: ['閩南與臺灣尾牙 → 紐約 Baohaus → 倫敦 BAO', 'Fujian and Taiwanese year-end rituals → New York Baohaus → London BAO'],
    history: [
      '刈包與閩南飲食及臺灣尾牙等習俗有連結；2009年 Baohaus 及倫敦 BAO 等案例讓蒸包進入國際時尚餐飲。海外配料與命名會變。',
      'Gua bao connects Fujian foodways and Taiwanese year-end customs. Baohaus in New York and BAO in London popularized new forms and names abroad.'
    ],
    tasks: [
      {
        label: ['幫倫敦餐車設計菜單', 'Design a London bao menu'],
        question: ['店家想把刈包叫做「Asian taco」。你有五秒讓客人理解。', 'The owner calls gua bao an “Asian taco.” You have five seconds to explain it.'],
        choices: [
          [['直接用 Asian taco 就好', 'Only use “Asian taco”'], 'spotlight', ['好賣，但來源更模糊。', 'It sells; the origin grows fuzzier.']],
          [['寫 Gua Bao，附蒸包與食材說明', 'Keep “Gua Bao” with a description'], 'translator', ['新客人能點餐，也看得見名字。', 'Newcomers can order without losing the name.']],
          [['留下店主的移民家族故事', 'Add the owner’s family migration story'], 'archivist', ['菜單變成跨代的敘事。', 'The menu carries generations.']]
        ]
      },
      {
        label: ['跨國配料實驗', 'An international filling experiment'],
        question: ['國外顧客想要豆腐與蘑菇版本，老客人偏愛滷五花肉。你會怎麼拍？', 'A diner asks for tofu and mushroom; another wants braised pork belly. How do you frame the two?'],
        choices: [
          [['新舊都拍，讓兩種需求互相回答', 'Film both and let them answer each other'], 'editor', ['文化不是只有複製，也包含接納。', 'Culture can include both continuity and inclusion.']],
          [['研究兩種做法各自的使用情境', 'Explore where each version belongs'], 'translator', ['變形有了社會脈絡。', 'Adaptation gains context.']],
          [['只拍最誇張的創新餡料', 'Show only the wildest filling'], 'spotlight', ['吸睛，卻忘了尾牙與「虎咬豬」。', 'It grabs attention but forgets year-end rituals.']]
        ]
      }
    ],
    overseas: [
      '在紐約和倫敦，「bao」變得很熟悉，卻有時讓人忘記它的閩南及臺灣飲食脈絡；翻譯與品牌化既能打開入口，也會改變來源印象。',
      'In New York and London, “bao” became familiar, sometimes at the cost of obscuring Fujianese and Taiwanese context; translation and branding both open doors and reshape origin stories.'
    ],
    source: 'https://nspp.mofa.gov.tw/nsppe/print.php?post=222004&unit=410'
  },
  scallion: {
    place: ['山東與戰後麵食傳統 → 臺灣夜市 → 海外冷凍市場（情境）', 'Northern wheat traditions → Taiwanese night markets → overseas frozen-food market (fictional)'],
    history: [
      '臺灣蔥抓餅重視抓鬆麵皮的口感；麵食習慣與戰後臺灣的移民、麵粉取得和街頭生活變化有關。海外冷凍販售場景為設計情境。',
      'Taiwanese scallion pancakes highlight pull-apart layers; wheat culture intersects with postwar migration, flour access, and street life. The frozen-food export scene is fictional.'
    ],
    tasks: [
      {
        label: ['抓鬆麵皮還是機械量產？', 'Hand-pulled texture or factory production?'],
        question: ['海外訂單太多，工廠想把手抓工序改成機械製作。你怎麼展示？', 'Demand is high abroad, and a factory proposes mechanizing the pull-apart step. How will you show it?'],
        choices: [
          [['慢鏡拍師傅手上的抓鬆動作', 'Slow-motion the vendor’s hand technique'], 'archivist', ['技術變成有溫度的文化記憶。', 'The technique becomes tactile memory.']],
          [['並列手工與冷凍產品的口感', 'Compare handmade and frozen versions'], 'translator', ['觀眾理解成本與手藝的取捨。', 'Viewers see craft and access costs.']],
          [['只講「工廠毀掉傳統」', 'Headline: “Factories kill tradition”'], 'spotlight', ['流量高，但外國消費者的需求被忽略。', 'Engagement rises; overseas needs disappear.']]
        ]
      },
      {
        label: ['國外搭配新配料', 'New toppings abroad'],
        question: ['起司、雞蛋與香料醬成為熱門加料。老師傅問：「這還算蔥抓餅嗎？」', 'Cheese, egg and new sauces become popular. The elder asks: “Is it still scallion pancake?”'],
        choices: [
          [['訪問不同年齡的顧客', 'Interview customers of different ages'], 'editor', ['傳統的邊界由不同人一起討論。', 'The boundary of tradition becomes a conversation.']],
          [['介紹原本技法，再展示新配料', 'Show the original method then adaptations'], 'translator', ['手藝與新口味可以同框。', 'Craft and novelty share the frame.']],
          [['宣布只有原味才有資格', 'Declare only the original legitimate'], 'spotlight', ['說法很響亮，但關閉了文化變動的空間。', 'A strong verdict, but little room for change.']]
        ]
      }
    ],
    overseas: [
      '海外冷凍蔥抓餅是本遊戲的虛構小任務，用來思考手工技術如何在跨國供應鏈下變形，而非指涉單一真實公司的歷史。',
      'The overseas frozen-pancake segment is a fictional task to explore how manual technique adapts to supply chains, not the history of a specific real company.'
    ],
    source: 'https://collections.nmth.gov.tw/article.aspx?a=244'
  }
};

export const PERSONAS: Record<string, Persona> = {
  archivist: {
    id: 'archivist',
    name: ['街角的紀錄者', 'The Street-Corner Archivist'],
    subtitle: ['你收藏的是城市沒說完的話', 'You collect the sentences a city never finished'],
    paragraph: [
      '你留意細小的日常、被忽略的聲音與相互矛盾的記憶。你的影像像一份仍可補寫的地方誌，不急於給出大結論，而是守護時間留下的真實痕跡。',
      'You notice quiet routines, overlooked voices, and contradictory memories. Your films become an unfinished local archive, preserving genuine traces of time rather than forcing quick conclusions.'
    ],
    question: ['誰會在十年後，重新解讀你留下的鏡頭？', 'Who might reinterpret your footage ten years from now?'],
    portrait: 'lin',
    color: '#ffca90',
    glyph: '◈',
    keywords: [['日常細節', '微觀歷史', '素人記憶'], ['Mundane details', 'Micro-history', 'Grassroots memory']]
  },
  translator: {
    id: 'translator',
    name: ['跨海的文化翻譯者', 'The Cross-Sea Translator'],
    subtitle: ['你知道改變不必等於失去', 'You know change is not always loss'],
    paragraph: [
      '你總想追問：一道食物出了海，為什麼換了名字與做法？你善於讓兩種文化碰面，但也開始警覺翻譯可能省略的細節。',
      'You ask why a food changes its name and method after crossing the sea. You connect cultures—and notice what translation may leave behind.'
    ],
    question: ['讓兩邊都聽得懂時，你願意保留哪些不容易翻譯的部分？', 'When both sides can understand, what will you refuse to simplify?'],
    portrait: 'maya',
    color: '#bde5ef',
    glyph: '⌁',
    keywords: [['跨國流動', '文化適應', '翻譯倫理'], ['Transnational flow', 'Cultural adaptation', 'Translation ethics']]
  },
  spotlight: {
    id: 'spotlight',
    name: ['聚光燈下的說故事者', 'The Spotlight Storyteller'],
    subtitle: ['你讓陌生人願意停下來看', 'You know how to make a stranger look'],
    paragraph: [
      '你善於捕捉第一眼的驚喜，懂得節奏、標題與反應的力量。更多人因此看見臺灣，但你也開始發現，點開影片不等於看見全部。',
      'You capture moments of wonder, and understand hooks, titles and reactions. More people look toward Taiwan through your films—but a click is not the full picture.'
    ],
    question: ['當觀眾停下來後，你要把鏡頭轉向誰？', 'Once you have their attention, whom will you turn the camera toward?'],
    portrait: 'alex',
    color: '#f7b497',
    glyph: '✷',
    keywords: [['破圈傳播', '敘事節奏', '反思凝視'], ['Viral reach', 'Pacing & hooks', 'Interrogating gaze']]
  },
  editor: {
    id: 'editor',
    name: ['多聲音的編輯者', 'The Many-Voiced Editor'],
    subtitle: ['你願意把畫面留給別人', 'You leave space in the frame for others'],
    paragraph: [
      '你不急著替每個人說出答案，反而更願意讓不同立場的人彼此回應。你的作品可能不夠整齊，但那些不一致，正是它的生命力。',
      'You resist speaking for everyone, preferring to let people answer each other. Your work may be untidy—but disagreement gives it life.'
    ],
    question: ['下一位還沒有機會開口的人，是誰？', 'Who still has not been invited to speak?'],
    portrait: 'xiao',
    color: '#bdeac8',
    glyph: '✺',
    keywords: [['複調對話', '權力下放', '異質並存'], ['Polyphonic dialogue', 'Decentralized voice', 'Pluralism']]
  },
  between: {
    id: 'between',
    name: ['兩地之間的旅人', 'The In-Between Traveller'],
    subtitle: ['你的歸屬不需要只有一個答案', 'Belonging need not have one answer'],
    paragraph: [
      '你越理解臺灣，越發現自己也正在改變。你不必在「外國人」與「自己人」之間二選一；矛盾與熟悉，可以一起出現在同一個鏡頭裡。',
      'The more you understand Taiwan, the more you notice your own changes. You need not choose between outsider and insider; familiarity and uncertainty can share one frame.'
    ],
    question: ['下一次有人問「你是哪裡人」，你會先說哪個故事？', 'Next time someone asks where you are from, which story will you tell first?'],
    portrait: 'maya',
    color: '#c3b5f2',
    glyph: '◇',
    keywords: [['身分協商', '邊界游移', '多元歸屬'], ['Identity negotiation', 'Borderland mobility', 'Multiple belonging']]
  },
  questioner: {
    id: 'questioner',
    name: ['未完的提問者', 'The Unfinished Questioner'],
    subtitle: ['你把結局留成一扇門', 'You leave the ending open like a door'],
    paragraph: [
      '你不想用一支影片替文化蓋棺論定。歷史可能有分歧、觀眾可能會誤解，而你的任務是帶著新的疑問繼續走。',
      'You do not want one video to pronounce the final word on a culture. Histories diverge, viewers misunderstand, and you keep walking with better questions.'
    ],
    question: ['如果這支影片是一個起點，你下一次會問什麼？', 'If this film is only a beginning, what would you ask next?'],
    portrait: 'alex',
    color: '#f8dca4',
    glyph: '✧',
    keywords: [['未完成態', '反思詰問', '開放結局'], ['Incompletion', 'Critical inquiry', 'Open endings']]
  }
};

export const UI_STRINGS = {
  zh: {
    start: '開始遊戲體驗',
    continue: '繼續上一局',
    restart: '重新探索另一道料理',
    download: '下載創作者故事卡 (PNG)',
    export: '匯出遊玩路徑 (JSON)',
    copy: '複製結局文字',
    lang: 'English',
    menu: '主頁',
    go: '推進下一步',
    choose: '選擇這道美食',
    opening: '今晚，你的鏡頭會跟隨哪一道味道？',
    foodhint: '十條不同的食物與文化遷徙路線。每道料理皆連結一組歷史檔案與當代爭議。',
    ch1: '第一章 · 夜市裡的文化旅行',
    ch2: '第二章 · 鏡頭裡的自己',
    route: '漂洋過海的流變軌跡',
    clues: '翻閱兩張線索檔案卡，探索背後的人群與時間',
    found: '已解鎖檔案',
    view: '閱讀檔案',
    read: '收入素材庫',
    ready: '已獲取足夠線索！前往攤位現場開啟對話。',
    act: '導演決定下一個鏡頭',
    chooseReply: '你會如何給予回應？',
    result: '這段素材已被剪進你的母帶中',
    nextChapter: '進入第二章：鏡頭回望自身',
    aside: '在另一個人的鏡頭裡，你也可能成為被觀看的對象。',
    labelVideo: '正在剪接 · 首部紀錄短片',
    post: '社群預覽',
    fiction: '角色人物、個別海外店鋪與留言為教學情境創作；歷史源流與研究論文皆附完整考據來源。',
    source: '查閱學術考據與製作手記',
    notes: '歷史考據與學術筆記',
    sourceDesc: '下列文獻支持本遊戲中的歷史背景與社會學議題。爭議史實不作武斷裁決，保留多元記憶空間。',
    yourway: '你抵達了一個獨特的觀看視角，而非標準答案。',
    echo: '每一次重訪選擇，都將拍攝出截然不同的臺灣故事。',
    saved: '創作者故事卡已儲存至裝置！',
    copied: '結局摘要已複製到剪貼簿',
    close: '關閉',
    chapPreview: '下章預告：當你用鏡頭凝視臺灣，臺灣的生活也開始凝視你。',
    replay: '換一條食物路線重玩',
    coverNote: '從夜市攤位到跨海餐桌，從異鄉旅客到長期移居——你的每次鏡頭調度，都在雕塑一種臺灣記憶。',
    share: '保存你的創作者視角海報',
    log: '遊玩歷程數據',
    unlocked: '已收錄',
    chapterEnd: '章節完成',
    storyScope: '本故事為文化社會學情境敘事，不映射任何特定真實 YouTuber 或公眾人物。'
  },
  en: {
    start: 'Begin Game Experience',
    continue: 'Resume Journey',
    restart: 'Explore Another Food',
    download: 'Download Creator Card (PNG)',
    export: 'Export Route Data (JSON)',
    copy: 'Copy Ending Summary',
    lang: '繁體中文',
    menu: 'Home',
    go: 'Proceed',
    choose: 'Follow This Flavour',
    opening: 'Which flavour will your camera follow tonight?',
    foodhint: 'Ten culinary and diasporic trajectories. Each dish unlocks archival research and contemporary dilemmas.',
    ch1: 'CHAPTER I · Night-Market Trajectories',
    ch2: 'CHAPTER II · The Self in the Frame',
    route: 'How Flavour Travelled Across Borders',
    clues: 'Open at least two archival clue cards to understand the people and histories behind it.',
    found: 'Archived clues',
    view: 'Inspect clue',
    read: 'Add to film reel',
    ready: 'You have gathered enough clues! Head to the stall to start filming.',
    act: 'Director’s Next Shot',
    chooseReply: 'How will you respond?',
    result: 'This sequence has been added to your master timeline',
    nextChapter: 'Begin Chapter II: The Mirror',
    aside: 'In someone else’s viewfinder, you too are framed.',
    labelVideo: 'NOW EDITING · Short Doc Episode 1',
    post: 'Social Preview',
    fiction: 'Characters, hypothetical overseas shops, and comment threads are fictional pedagogical scenarios; culinary histories and studies are grounded in verified sources.',
    source: 'Sources & Academic Research',
    notes: 'Historical Sources & Scholarly Notes',
    sourceDesc: 'The following citations support historical contexts and sociological inquiries. Contested histories remain contested without forced singular verdicts.',
    yourway: 'You arrived at a distinct creative perspective, not a rigid right-or-wrong verdict.',
    echo: 'A different decision frames an entirely different Taiwan.',
    saved: 'Story Card downloaded to your device!',
    copied: 'Summary copied to clipboard',
    close: 'Close',
    chapPreview: 'Next chapter preview: As your lens frames Taiwan, everyday life here begins to frame you.',
    replay: 'Play again with another food route',
    coverNote: 'From street stalls to overseas menus, from tourist shock to everyday residency—your directorial choices shape what remains.',
    share: 'Save Your Director Persona Poster',
    log: 'Journey Playlog',
    unlocked: 'Collected',
    chapterEnd: 'Chapter Complete',
    storyScope: 'A cultural sociological narrative work; not representative of any specific real-world creator.'
  }
};

export interface GameRuleStep {
  step: string;
  title: [string, string];
  desc: [string, string];
  icon: string;
}

export const GAME_RULES: {
  title: [string, string];
  subtitle: [string, string];
  intro: [string, string];
  steps: GameRuleStep[];
  controls: Array<{ key: string; action: [string, string] }>;
  disclaimer: [string, string];
} = {
  title: ['《臺灣印象製作所》遊戲規則與導演指南', 'Framing Taiwan: Director’s Rules & Field Guide'],
  subtitle: ['「華人文化與社會」雙語互動敘事網頁遊戲 · 目標體驗約 20 分鐘', 'Bilingual Cultural Sociological Documentary Game · ~20 Min Target Experience'],
  intro: [
    '歡迎來到《臺灣印象製作所》。你將扮演外籍紀錄片創作者 Alex，帶著攝影機走入臺灣夜市與街頭日常。你並非單純觀光，而是透過 10 道料理的跨境身世與身邊多元朋友的生活，探問「臺灣味由誰定義？自己人由誰決定？」。在開機前，請先閱讀以下四大核心規則：',
    'Welcome to Framing Taiwan. You will play as Alex, an international documentary creator exploring Taiwanese street foods and everyday life. Rather than passive sightseeing, your choices explore who defines "Taiwanese taste" and "belonging." Please review these 4 core guidelines before filming:'
  ],
  steps: [
    {
      step: '01',
      title: ['選擇小吃與查閱檔案 (2-5 分鐘)', 'Food Route & Archival Investigation (2-5m)'],
      desc: [
        '從 10 道常見小吃中選擇一條拍攝路線（特別推薦聚焦珍奶、牛肉麵、刈包三大期中核心案例）。翻閱至少兩份歷史線索，了解食材如何因都市空間、移民與跨國流動而演變。',
        'Choose 1 of 10 street foods (especially the 3 core cases: Boba, Beef Noodles, Gua Bao). Inspect at least 2 archival clues exploring how urban spaces and migration shaped recipes.'
      ],
      icon: 'Search'
    },
    {
      step: '02',
      title: ['動手調製與跨海變形 (3-5 分鐘)', 'Culinary Adaptation & Transnational Passport (3-5m)'],
      desc: [
        '在工坊中親手平衡料理風味與商業決策，見證臺灣小吃傳播至東南亞（泰國、印尼）及美歐後的本土化轉譯與命名取捨。',
        'Hands-on balance of flavor profiles and branding. Witness how Taiwanese street snacks hybridize in Southeast Asia (Thailand, Indonesia) and the West.'
      ],
      icon: 'Sliders'
    },
    {
      step: '03',
      title: ['攤位拍攝、剪輯與生活對談 (8-10 分鐘)', 'Filming, Editing & Diverse Resident Voices (8-10m)'],
      desc: [
        '面對攤主的清晨勞動與點擊率衝突，完成首集 8 分鐘剪輯。第二章回到鏡頭外的生活，面對語言障礙、同桌對談（印尼留學生 Rani、長居者 Maya、旅美臺灣留學生 Leo）與字幕微調。',
        'Navigate vendor labor vs. viral hooks. In Chapter 2, step outside the lens to face language barriers, dining dialogues (Rani, Maya, Leo), and subtitle ethics.'
      ],
      icon: 'Film'
    },
    {
      step: '04',
      title: ['鏡頭回望、自訂留白與人格卡 (2-3 分鐘)', 'The Mirror, Personal Quote & Persona Card (2-3m)'],
      desc: [
        '在片尾留下自己對於「文化歸屬」的一句話，解鎖 6 種非評分式的創作者視角結局卡，並可下載 2K 高畫質故事海報或匯出遊玩紀錄數據。',
        'Leave a personal sentence on what belonging means to you. Unlock 1 of 6 non-judgmental director personas, download a 2K story poster, or export your playlog.'
      ],
      icon: 'Sparkles'
    }
  ],
  controls: [
    { key: '1 / 2 / 3', action: ['鍵盤數字鍵快速選定決策選項', 'Select option 1, 2, or 3'] },
    { key: 'Space', action: ['空白鍵快速前進至下一環節', 'Proceed / Advance to next step'] },
    { key: 'M', action: ['靜音 / 開啟夜市原生合成音效', 'Mute / Unmute synthesized audio'] },
    { key: 'L', action: ['一鍵切換繁體中文 / 英文雙語', 'Toggle Traditional Chinese / English'] },
    { key: 'Esc', action: ['關閉所有彈窗或導覽', 'Close any active modal'] }
  ],
  disclaimer: [
    '本作品為華人文化與社會互動敘事專題，所有角色、情境與留言為教育反思情境創作，不映射任何特定真實 YouTuber 或公眾人物；歷史文獻皆附來源。',
    'A cultural sociological narrative work for research and pedagogical inquiry; characters and comments are fictional scenarios, not representative of any real individuals.'
  ]
};

export interface CharacterDialogueProbe {
  id: string;
  name: [string, string];
  role: [string, string];
  avatar: string;
  quote: [string, string];
  probes: Array<{
    question: [string, string];
    response: [string, string];
  }>;
}

export const CHARACTER_PERSPECTIVES: CharacterDialogueProbe[] = [
  {
    id: 'rani',
    name: ['Rani', 'Rani'],
    role: ['印尼研究生（臺北留學第二年）', 'Indonesian Grad Student (2nd Yr in Taipei)'],
    avatar: 'R',
    quote: [
      '上課時我用英文沒問題，但租屋、醫院和市場常要講中文。有時我聽不懂，會不好意思一直麻煩朋友。週末我最常去臺北車站旁的印尼街，在那裡我能吃到熟悉的家鄉菜，也能買到臺灣的珍珠奶茶。',
      'English works in university classes, but renting, clinics, and markets require Chinese. I feel awkward constantly asking friends. On weekends I visit "Little Indonesia" near Taipei Main Station—where I can enjoy home food and Taiwanese boba together.'
    ],
    probes: [
      {
        question: ['在臺灣生活，遇到最棘手的語言障礙是什麼？', 'What is the hardest linguistic barrier you face in Taiwan?'],
        response: [
          '是公務表格和行政櫃檯！很多名詞連字典都查不到，櫃檯人員說話又很快。大家都很熱心，但「需要一直求助」有時會讓自己覺得像個負擔。',
          'Administrative forms and service counters! The jargon isn’t in simple dictionaries, and staff speak rapidly. People are helpful, but having to ask for help constantly makes you feel like a burden.'
        ]
      },
      {
        question: ['你怎麼看大家把外國人當成同一種群體？', 'How do you view being lumped into a generic "foreigner" category?'],
        response: [
          '很多人提到「外國人」只想到歐美白人。像我們東南亞學生或移工，在臺北的生活處境其實很不一樣，希望能看見更立體的我們。',
          'Many people hear "foreigner" and only picture Western expats. Southeast Asian students and workers live in very different socio-economic realities in Taiwan; we hope to be seen in our own complexity.'
        ]
      }
    ]
  },
  {
    id: 'maya',
    name: ['Maya', 'Maya'],
    role: ['在臺長居創作者（居留六年）', 'Long-term Resident Creator (6 Yrs)'],
    avatar: 'M',
    quote: [
      '我喜歡臺灣，也早已習慣追垃圾車、騎機車鑽小巷。但當我的影片被要求只能拍「外國人第一次吃臭豆腐被嚇到」時，我覺得我的生活被簡化成了一場永遠在驚訝的表演。',
      'I love Taiwan and have long mastered garbage truck routes and scooter lanes. But when platforms demand endless "shocked foreigner tries stinky tofu" clips, my real life is reduced to a perpetual exotic performance.'
    ],
    probes: [
      {
        question: ['為什麼「你中文講得很好」會讓人有距離感？', 'Why does "Your Chinese is so good!" sometimes create emotional distance?'],
        response: [
          '因為它隱含著「你本來不應該會中文」的預設。如果我住了一年，那是讚美；但我住了六年，每天買菜還被當成新遊客稱讚時，它提醒你：大家永遠把你當成客人。',
          'Because it carries the assumption that you don’t belong here. In year 1 it’s a sweet compliment; in year 6, being complimented buying cabbage every day reminds you: you are permanently framed as a tourist.'
        ]
      },
      {
        question: ['在剪輯上，聳動標題和保留原意該如何取捨？', 'How do you balance dramatic clickbait titles with nuanced truth in editing?'],
        response: [
          '這是一場永恆的拉扯。演算法偏好極端情緒，但如果為了點閱率扭曲受訪者的猶豫，你就在消耗別人對你的信任。',
          'It is a constant tug of war. Algorithms favor extreme emotion, but when you sacrifice nuance for clicks, you burn the trust people placed in your lens.'
        ]
      }
    ]
  },
  {
    id: 'xiaoan',
    name: ['小安', 'Xiao-An'],
    role: ['臺灣在地朋友（空間與文化愛好者）', 'Taiwanese Friend (Urban Culture Enthusiast)'],
    avatar: '安',
    quote: [
      '我從小在夜市附近長大。對我來說，夜市不只是觀光宣傳手冊上的美食清單，它是攤販凌晨三點披星戴月的備料勞動，也是城市裡最靈活的微型地租經濟。',
      'I grew up near night markets. To me, night markets are not just tourist listicles; they represent vendors prepping at 3 AM and the city’s most resilient micro-spatial economy.'
    ],
    probes: [
      {
        question: ['臺灣南北夜市在空間和口味上有什麼差別？', 'How do night markets differ in space and flavor across northern and southern Taiwan?'],
        response: [
          '差別很大！臺北寧夏夜市經過管委會自治管理、油煙防制；臺中逢甲夜市是緊鄰大學城的新品試驗場；臺南花園夜市則是每週固定幾天開張的流動格狀地緣，口味也明顯偏甜帶羹湯。',
          'Vastly different! Taipei’s Ningxia is municipal and managed; Taichung’s Fengjia is an innovation testbed near campuses; Tainan’s Garden Market is a weekly mobile grid with sweeter, thicker broths.'
        ]
      },
      {
        question: ['在地人會如何看待外籍 YouTuber 拍的臺灣？', 'How do locals view Taiwan as filmed by international creators?'],
        response: [
          '看到臺灣被國際看見當然很高興，但有時也希望大家不要只停留在「臺灣好有人情味、東西好好吃」的童話表面，也能看見勞動者真實的辛苦。',
          'We love seeing Taiwan recognized globally, but we also hope representations go beyond fairytale tropes of "so friendly and delicious" to honor the hard labor behind the scenes.'
        ]
      }
    ]
  },
  {
    id: 'leo',
    name: ['Leo', 'Leo'],
    role: ['旅美臺灣留學生（留學五年，雙向適應視角）', 'Taiwanese Graduate Student in US (5 Yrs Abroad)'],
    avatar: 'L',
    quote: [
      '在美國這五年，我常常在法拉盛和加州尋找家鄉味。以前在臺灣覺得理所當然的牛肉麵和刈包，在海外成為我們辨識彼此的密碼。看到美國朋友排隊買刈包說這是「亞洲塔可」，我的心情很複雜——文化在移動中被重新定義，是雙向的。',
      'Living in the US for five years, I constantly hunt for hometown flavors in Flushing and California. Foods taken for granted in Taiwan became cultural codes abroad. Watching Americans queue for gua bao calling it "Asian taco," I realized cultural adaptation flows both ways.'
    ],
    probes: [
      {
        question: ['長期生活在海外，如何看待「正宗臺灣味」？', 'Living abroad long-term, how do you reflect on "authentic Taiwanese taste"?'],
        response: [
          '以前我很執著於配方一定要跟臺灣一模一樣。後來我發現，海外店主為了生存調整肉質或甜度，這何嘗不是另一種臺灣移民堅韌的生命力？正宗不該是一張僵化的考卷。',
          'I used to be dogmatic about identical recipes. Later I realized overseas vendors adapting ingredients to survive embody diasporic resilience. Authenticity shouldn’t be a rigid test.'
        ]
      },
      {
        question: ['雙向文化適應對你的身分認同有什麼影響？', 'How has this two-way adaptation reshaped your own cultural identity?'],
        response: [
          '外國人在臺灣適應，我們在海外也在適應。當你離開家鄉越遠，你反而越清楚自己身上有哪些臺灣痕跡；同時你也學會理解別人初來乍到的孤獨與不安。',
          'Foreigners adapt in Taiwan, and we adapt abroad. The farther you travel from home, the clearer your Taiwanese roots become—and the better you empathize with newcomers everywhere.'
        ]
      }
    ]
  }
];

