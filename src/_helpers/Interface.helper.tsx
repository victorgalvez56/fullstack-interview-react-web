export interface BoardInterface {
  board: string[];
}
export interface BoardObjectInterface {
  id: number;
  board: string;
  selected?: boolean;
}
export interface PointsInterface {
  x: number;
  y: number;
}

export interface DictionaryInterface {
  words: string[];
}
