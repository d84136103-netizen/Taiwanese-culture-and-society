export interface EvaluationQuestion {
  id: string;
  category: 'adaptation' | 'media_framing' | 'belonging';
  question: [string, string];
  options: Array<[string, string]>;
  bestAnswerIndices: number[]; // Indices that demonstrate nuanced cultural understanding
  explanation: [string, string];
}

export interface QualitativePrompt {
  id: string;
  prompt: [string, string];
  placeholder: [string, string];
}

export const PRE_POST_QUESTIONS: EvaluationQuestion[] = [
  {
    id: 'adaptation',
    category: 'adaptation',
    question: [
      '當一道臺灣小吃（如珍奶、刈包、牛肉麵）傳播到海外時，最常因下列哪些原因發生變化？',
      'When a Taiwanese food (such as boba, gua bao, or beef noodles) travels abroad, which reasons most commonly cause it to change?'
    ],
    options: [
      [
        '僅僅是外國廚師不尊重正宗食譜，導致做法失傳',
        'Foreign chefs simply disrespect authentic recipes, causing traditions to be lost'
      ],
      [
        '跨國供應鏈中的食材可得性與成本考量，以及當地消費者的飲食習慣',
        'Ingredient availability and cost in transnational supply chains, along with local culinary habits'
      ],
      [
        '不同移民社群將自身家鄉記憶與當地社交空間結合的再創造',
        'Reinvention by diasporic communities weaving their memories into new local social spaces'
      ],
      [
        '商業品牌為快速打入新市場而調整的命名與套餐策略（如寫成 Asian taco）',
        'Branding strategies adapting names and combo meals for market entry (e.g. labeling as "Asian taco")'
      ]
    ],
    bestAnswerIndices: [1, 2, 3],
    explanation: [
      '文化流變並非「複製貼上」失敗，而是原料限制、社群記憶與市場定位下的動態重構。',
      'Cultural flow is not failed copy-pasting, but dynamic reconfiguration under material constraints, community memory, and marketing.'
    ]
  },
  {
    id: 'media_framing',
    category: 'media_framing',
    question: [
      '在影音媒體（如 YouTube、短影音）中，下列哪種情況最容易讓外籍創作者的受訪者被「符號化」或「刻板化」？',
      'In digital video media, which scenario is most likely to reduce interviewees to stereotypes or exotic symbols?'
    ],
    options: [
      [
        '把長居者的猶豫與含蓄發言剪成「我永遠不屬於這裡！」等強烈標題與字幕',
        'Editing a resident’s subtle reflection into dramatic subtitles like “I NEVER belong here!”'
      ],
      [
        '過度放大吃第一口時的震驚表情，卻完全略過攤販凌晨備料的手藝與勞動脈絡',
        'Magnifying the first-bite shocked reaction while omitting the vendor’s dawn preparation and craft'
      ],
      [
        '讓不同身分的在臺外籍學生與工作者並列發言，對照彼此的不同經驗',
        'Letting international students and migrant workers speak alongside each other, contrasting experiences'
      ],
      [
        '預設所有住在臺灣的外國人都有相同的生活經驗與觀點',
        'Assuming all non-Taiwanese residents share identical experiences and viewpoints'
      ]
    ],
    bestAnswerIndices: [0, 1, 3],
    explanation: [
      '鏡頭剪輯與聳動字幕不是中立的，它們往往為了點擊率而簡化了受訪者複雜的真實處境。',
      'Editing and clickbait subtitles are never neutral; they often compress complex lived realities for engagement.'
    ]
  },
  {
    id: 'belonging',
    category: 'belonging',
    question: [
      '關於「文化歸屬感」（Belonging），下列哪種描述最符合當代社會學的理解？',
      'Regarding "cultural belonging", which description best aligns with contemporary sociological understanding?'
    ],
    options: [
      [
        '歸屬感完全由護照國籍或血緣血統決定，不可隨生活改變',
        'Belonging is strictly defined by passport, nationality or ancestry, unchanging over time'
      ],
      [
        '歸屬感可能包含日常實踐（如搭捷運、買早餐、就醫）、人際互動與跨地記憶的流動歷程',
        'Belonging involves daily practices (transit, breakfast, healthcare), social relationships, and mobile memories'
      ],
      [
        '一個人可以同時屬於不只一個地方，文化認同不一定是二選一的排他標籤',
        'An individual can belong to multiple places simultaneously; identity need not be an either/or label'
      ],
      [
        '友善的誇獎（如「你中文真好」）有時也可能無意間劃出一道「客人 vs 自己人」的微小界線',
        'Friendly compliments (like “Your Chinese is so good”) may sometimes unintentionally mark an “outsider vs insider” line'
      ]
    ],
    bestAnswerIndices: [1, 2, 3],
    explanation: [
      '文化認同不是固定不變的硬標籤，而是在日常交往、跨界移動與生活經驗中持續協商的過程。',
      'Cultural identity is not a static label, but an ongoing negotiation across daily interactions, mobility, and lived experiences.'
    ]
  }
];

export const QUALITATIVE_PROMPTS: QualitativePrompt[] = [
  {
    id: 'character_shift',
    prompt: [
      '在遊戲過程中，哪個角色的觀點（例如攤主、Maya、Rani、小安、Alex）最觸動你或改變了你的想法？為什麼？',
      'During the game, which character’s viewpoint (e.g. the vendor, Maya, Rani, Xiao-An, Alex) challenged or shifted your thinking most, and why?'
    ],
    placeholder: [
      '對我來說，Rani / Maya 的這段話讓我發現……',
      'For me, Rani’s / Maya’s perspective made me realize...'
    ]
  },
  {
    id: 'unheard_voice',
    prompt: [
      '如果這支影片是一個開端，你認為在鏡頭內外，還有誰的故事尚未被充分看見與討論？',
      'If this documentary is just a beginning, whose story still remains unseen and needs to be told?'
    ],
    placeholder: [
      '我還想深入了解……',
      'I also want to understand more about...'
    ]
  }
];
