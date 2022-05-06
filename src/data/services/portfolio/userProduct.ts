import {Product} from '../product/product';

export interface UserProduct {
    id: string;
    productId: number;
    userId: string;
    fundClientId: number;
    fundClientPositionId: number;
    unit: number;
    isHide: boolean;
    outstandingUnit: number;
    lastNAV: number;
    updatedAt: Date;
    product: Product;
}
export interface UserProductResponse {
    id: string;
    productId: number;
    userId: string;
    fundClientId: number;
    fundClientPositionId: number;
    unit: string;
    isHide: boolean;
    outstandingUnit: number;
    lastNAV: number;
    updatedAt: Date;
}
export interface UserProductHistories {
    transactionPk: string;
    transactionType: number;
    transactionStatus: number;
}