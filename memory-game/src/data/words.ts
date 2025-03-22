export interface WordPair {
  english: string;
  chinese: string;
}

// 定义所有可用的单词对
export const allWords: WordPair[] = [
  { english: "Charge", chinese: "电荷" },
  { english: "Electron", chinese: "电子" },
  { english: "Battery", chinese: "电池" },
  { english: "Circuit", chinese: "电路" },
  { english: "Current", chinese: "电流" },
  { english: "Voltage", chinese: "电压" },
  { english: "Ammeter", chinese: "电流表" },
  { english: "Voltmeter", chinese: "电压表" },
  { english: "Switch", chinese: "开关" },
  { english: "Load", chinese: "负载" },
  { english: "Resistance", chinese: "电阻" },
  { english: "Conductor", chinese: "导体" },
  { english: "Insulator", chinese: "绝缘体" }
];

// 使用 Fisher-Yates 洗牌算法进行随机抽取
const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const getRandomWords = (count: number = 8): WordPair[] => {
  // 确保不要求超过可用单词数量
  const safeCount = Math.min(count, allWords.length);
  // 使用 Fisher-Yates 洗牌算法随机打乱并取前 count 个
  return shuffleArray(allWords).slice(0, safeCount);
}; 