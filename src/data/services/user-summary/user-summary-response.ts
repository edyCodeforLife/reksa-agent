import {UserProduct} from '../portfolio/userProduct';

export interface UserSummaryResponse {
    avaliableBalance: number;
    outstandingBalance: number;
    totalInvestment: number;
    pendingTransaction: number;
    pendingKyc: boolean;
    userProducts: UserProduct[];
    isMaintenance: boolean;
    maintenanceDescription: string;
    isCutOff: boolean;
}

