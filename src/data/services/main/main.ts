import {MainHistoricalChart, MainHistoricalResponse} from './main-historical';
import axios, {AxiosPromise} from 'axios';
import {DataService} from '../config';

export interface IMainHistoricalDataService {
    GetMainHistorical(id?: number) : AxiosPromise<MainHistoricalResponse>;
    GetMainHistoricalChart(type: number, productId: number) : AxiosPromise<MainHistoricalChart>;
}

export class MainHistoricalDataService implements IMainHistoricalDataService {
    GetMainHistorical(id?: number): AxiosPromise<MainHistoricalResponse> {
        return DataService.get<MainHistoricalResponse>("/main/today", {params: { id }});
    }

    GetMainHistoricalChart(type: number, productId: number): AxiosPromise<MainHistoricalChart> {
        return DataService.get("/chart/history", {params: {"type": type, "productId": productId} });
    }
}