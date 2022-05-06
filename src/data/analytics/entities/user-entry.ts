export interface NewEntryRequest {
  SessionId:string;
  UserId:string;
}

export interface EntryExchangeIdRequest {
  SessionId:string;
  UserId:string;
}

export interface TrackRequest {
  SessionId: string
  Track: UserTrack
}

export interface UserTrack {
  Page: string;
  Url: string;
  ACat: string;
  Action: string;
  AddInfo: string;
  At: Date;
  IsError: boolean;
  ErrorTicket: string;
}