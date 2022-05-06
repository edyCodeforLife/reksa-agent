import {UserSummaryResponse} from './user-summary-response';
import {AxiosPromise} from 'axios';
import {DataService} from '../config';

export interface IUserSummaryDataService {
    GetUserSummary() : AxiosPromise<UserSummaryResponse>;
}

export class UserSummaryDataService implements IUserSummaryDataService {
    GetUserSummary(): AxiosPromise<UserSummaryResponse> {
        return DataService.get("/wallet/availablebalance");
    }
}