import {UserProduct} from './userProduct';
import {AxiosPromise} from 'axios';
import {FilterRequest} from '../filter/filterRequest';
import {DataService} from '../config';

export interface IPortfolioDataService {
    UserProductPortfolio(req: FilterRequest) : AxiosPromise<UserProduct[]>
}

export class PortfolioDataService implements  IPortfolioDataService {
    UserProductPortfolio(req: FilterRequest): AxiosPromise<UserProduct[]> {
        return DataService.post("/product/histories", req);
    }
}