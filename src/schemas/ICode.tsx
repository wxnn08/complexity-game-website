export interface ICode {
  code: string;
  explanation: string;
  time_complexity: string;
  space_complexity: string;
  language: string;
}

export interface UserResponse {
  leftCode: ICode;
  rightCode: ICode;
  userAnswer: string;
  isCorrect?: boolean;
  correctAnswer?: string;
  computedCosts?: {
    leftCost: number;
    rightCost: number;
  };
}
