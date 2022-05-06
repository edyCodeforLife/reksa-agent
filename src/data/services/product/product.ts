import {AxiosPromise} from "axios";
import {DataService} from '../config';

export interface Product {
    id: string;
    fundPK: number;
    historyPK: number;
    status: number;
    notes: string;
    ID: string;
    name: string;
    currencyPK: number;
    type: string;
    bankBranchPK: number;
    maxUnits: number;
    totalUnits: number;
    nav: number;
    effectiveDate: Date;
    maturityDate: Date;
    custodyFeePercent: number;
    managementFeePercent: number;
    subscriptionFeePercent: number;
    redemptionFeePercent: number;
    switchingFeePercent: number;
    navDecimalPlaces: number;
    navRoundingMode: number;
    unitDecimalPlaces: number;
    unitRoundingMode: number;
    nkpdName: string;
    sInvestCode: string;
    lastUpdate: Date;
    lastUpdateDB: Date;
    counterpart: ProductCounterpart;
    productNews: ProductNews[];
    productPromotions: ProductPromo[];
    productBanks: ProductBank[];
    productSwitch: number[];
    productImage: string;
    productFundFact: string;
    productProspectus: string;
    canSwitch: boolean;
    lastNAV: number;
    navDate: Date;
    riskProfile: number;
    minSubs: number;
    minReds: number;
    minBalRedsAmt: number;
    minBalRedsUnit: number;
}
export interface ProductCounterpart {
    id: string;
    name: string;
}
export interface ProductNews {
    fundPK: number;
    title: string;
    content: string;
    from: Date;
    to: Date;
    isActive: boolean;
}
export interface ProductBank {
    fundPK: number;
    productBankId: number;
    bankAccountNo: string;
    bankAccountName: string;
    bankName: string;
    address: string;
    city: number;
}
export interface ProductPromo {}
export interface ProductSwitchList {
    fundFromPK: number;
    fundToPK: number;
}

export interface MainProductResponse {
  subscriptionFeePercent: number;
  redemptionFeePercent: number;
  switchingFeePercent: number;
  counterpart: ProductCounterpart;
  productNews: ProductNews[];
  productPromotions: ProductPromo[];
  productBanks: ProductBank[];
  productBankCustodies: ProductBank[];
  productImage: string;
  productFundFact: string;
  productProspectus: string;
  lastNAV: number;
  navDate: Date;
  ffs: string;
  riskProfile: number;
  minSubs: number;
  maxVaTransfer: number;
}

export interface IProductDataService {
    ProductBank(id: number) : AxiosPromise<ProductBank>;
    ProductDetail(id: number) : AxiosPromise<MainProductResponse>;
}
export class ProductDataService implements IProductDataService {
    ProductBank(id: number): AxiosPromise<ProductBank> {
        return DataService.get("/product/bank", {params: {id: id}});
    }

    ProductDetail(id: number) : AxiosPromise<MainProductResponse>{
        return DataService.get("/main/getdetailproduct",{params: {id: id}})
    }
}