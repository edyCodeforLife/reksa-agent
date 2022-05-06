import {ProductBank} from '../product/product';

export interface MainHistorical {
  fundPk: number;
  productName: string;
  productType: string;
  productImage: string;
  lastNav: number;
  currency: string;
  oneDay: number;
  threeDay: number;
  oneWeek: number;
  oneMonth: number;
  threeMonth: number;
  sixMonth: number;
  nineMonth: number;
  yearToDate: number;
  oneYear: number;
  threeYear: number;
  sharpeOneYear: number;
  sharpeThreeYear: number;
  sharpeFiveYear: number;
  stdOneYear: number;
  stdThreeYear: number;
  stdFiveYear: number;
  beta: number;
  treynor: number;
  jenssen: number;
  fromInception: number;
  aum: number;
  invMId: number;
  invMName: string;
  minInitInvest: number;
  subsFee: number;
  redemptFee: number;
  switchFee: number;
  inceptionDate: Date;
  canSell: boolean;
  canBuy: boolean;
  canSwitch: boolean;
  minSubs: number;
  minReds: number;
  minBalRedsAmt: number;
  minBalRedsUnit: number;
  productBanks: ProductBank[];
  pDate: Date;
  createdAt: Date;
  version: number;
}

export interface MainHistoricalChart {
    fundPk: number;
    type: number;
    label: string[];
    value: number[];
    extractDate: Date;
    version: number;
}

export interface MainHistoricalResponse {
    histories: MainHistorical[];
    version: number;
    lastUpdate: Date;
    gain: number;
    lost: number;
    profitableProduct: string;
}

export interface MainHistoricalChartResponse {
    productId: number;
    type: number;
    label: string[];
    value: number[];
    extractDate: Date;
    version: number;
}