import {AnalyticsDataService, AnalyticsLocalStorage} from '../config';
import {EntryExchangeIdRequest, NewEntryRequest, TrackRequest, UserTrack} from '../entities/user-entry';
import * as ls from "local-storage";
import {AxiosPromise} from 'axios';

export interface IAnalyticsEntryDataService {
  CreateNewEntry(req: NewEntryRequest): AxiosPromise<string>;
  Exchange(userEmail: string): Promise<any>;
  Track(req: UserTrack, additionalInfo?: string): Promise<any>;
  TrackWithError(req: UserTrack, errorId: string): Promise<any>;
}

export class AnalyticsEntryDataService implements IAnalyticsEntryDataService {
  CreateNewEntry(req: NewEntryRequest) : AxiosPromise<string> {
    return AnalyticsDataService.post<string>("/entry/new", req);
  }

  async Exchange(userEmail: string) {
    return await AnalyticsDataService.post("/entry/exchange",
      {userId: userEmail, sessionId: ls.get(AnalyticsLocalStorage)});
  }

  async Track(req: UserTrack, additionalInfo?: string) {
    return await AnalyticsDataService.post("/entry/track", <TrackRequest> {
      SessionId: ls.get(AnalyticsLocalStorage),
      Track: req
    });
  }

  async TrackWithError(req: UserTrack, errorId: string) {
    req.ErrorTicket = errorId;
    req.IsError = true;
    return await AnalyticsDataService.post("/entry/track", <TrackRequest> {
      SessionId: ls.get(AnalyticsLocalStorage),
      Track: req
    });
  }

}