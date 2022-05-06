export interface CheckoutRequest {
    productId: number;
    bankId: number;
    amount: number;
    unit: number;
    transactionType: number;
    code: string;
    usePin: boolean;
    bitRedemptionAll: boolean;
    paymentDate: Date;
}