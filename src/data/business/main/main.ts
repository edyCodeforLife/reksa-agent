import {IMainHistoricalDataService, MainHistoricalDataService} from '../../services/main/main';
import { MainHistoricalChart, MainHistoricalResponse } from '../../services/main/main-historical';
import {HandleError, IResponseError} from '../../services/error/response';

export interface IMainHistoricalService {
  GetMainHistorical(handler: IMainHistoricalResponse, id?: number) : void;
  GetMainChart(type: number, productId: number, handler: IMainChartResponse) : void;
}

interface IMainHistoricalResponse extends IResponseError {
  Success?: (data: MainHistoricalResponse) => void;
}

interface IMainChartResponse extends IResponseError {
  Success?: (data: MainHistoricalChart) => void;
}

export class MainHistoricalService {
  private _main: IMainHistoricalDataService;

  constructor() {
    this._main = new MainHistoricalDataService();
  }

  async GetMainHistorical(handler: IMainHistoricalResponse, id?: number )  {
    try{
      let data = await this._main.GetMainHistorical(id);
      return await handler.Success(data.data);
    } catch(e) {
      await HandleError(e, handler);
    }
  }

  async GetMainChart(type: number, productId: number, handler: IMainChartResponse) {
    try {
      let data = await this._main.GetMainHistoricalChart(type, productId);
      return await handler.Success(data.data);
    } catch(e) {
      await HandleError(e, handler);
    }
  }
}