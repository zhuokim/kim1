export interface WordPair {
  english: string;
  chinese: string;
}

const words: WordPair[] = [
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

export const getRandomWords = (count: number): WordPair[] => {
  const shuffled = [...words].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

export default words; 