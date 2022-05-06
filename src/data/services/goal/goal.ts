export interface GoalCalculator {
  id: string;
  userId: string;
  riskProfile: number;
  goalLabel: string;
  goalDescription: string;
  initialInvestment: number;
  annualExpectation: number;
  period: number;
  investmentExpectation: number;
  topUpMonthly: number;
  settings: UserGoalCalculatorSetting[];
  cart: UserCart[];
  status: number;
  createdAt: Date;
  discardedAt: Date;
  goalCompletedAt: Date;
  goalStartAt: Date;
  goalEndAt: Date;
  settingCompletedAt: Date;
}
export interface GoalCalculatorSetting {
  productType: number;
  percentage: number;
  allocation: number;
  riskProfile: number;
}
export interface UserGoalCalculatorSetting {
  productSelected: UserCart[];
}