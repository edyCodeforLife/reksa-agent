import Cookies from 'js-cookie';
import axios from 'axios';

import { cookiesDetailName, cookiesName } from '../../global/variables';

import {AuthCode, AuthResultResponse, LocalAuthenticationContext} from '../../services/auth/user';
import {HandleError, IResponseError} from '../../services/error/response';
import {AuthDataService, IAuthLoginDataService} from '../../services/auth/login';
import {AnalyticsEntryDataService, IAnalyticsEntryDataService} from '../../analytics/data/entry';
import {ActionLog} from '../../analytics/action/action';
export interface IUserLoginService {
    Login(req: LocalAuthenticationContext, handler: IUserLoginResponse) : Promise<any>;
    Logout(handler: IUserLogoutResponse) : Promise<any>;
}
export interface IUserLoginResponse extends IResponseError {
    Success? : (res: AuthResultResponse) => void;
    WrongPassword? : () => void;
    Locked?: (res: any) => void;
    Suspended?: () => void;
}
export interface IUserLogoutResponse extends  IResponseError {
    Success?: () => void;
}

export class UserLoginService implements IUserLoginService {
    private _login: IAuthLoginDataService;
    private _an: IAnalyticsEntryDataService;

    constructor() {
        this._login = new AuthDataService();
        this._an = new AnalyticsEntryDataService();
    }

    async Login(req: LocalAuthenticationContext, handler: IUserLoginResponse) {
        try {
            let res = await this._login.Login(req);

            if(res.data == null) {
              this._an.Track(ActionLog.login, "WrongPassword");
              return await handler.WrongPassword();
            }

            if (res.data.authCode === AuthCode.Success) {
                // save token and detail to cookies
                Cookies.set(cookiesDetailName, res.data.user);
                Cookies.set(cookiesName, res.data.authToken);
                axios.defaults.headers.common['md-token'] = res.data.authToken;
              this._an.Exchange(res.data.user.email).then(() => {
                  this._an.Track(ActionLog.login);
              });
            }

            switch(res.data.authCode) {
                case(AuthCode.Success): return await handler.Success(res.data);
                case(AuthCode.UserNotActive): return await handler.Suspended();
                case (AuthCode.UserIsLocked): return await handler.Locked(res.data);
                default:{
                  this._an.Track(ActionLog.login, "WrongPassword");
                  return await handler.WrongPassword();
                }
            }

        } catch(err) {
            return await HandleError(err, handler);
        }
    }
    async Logout(handler: IUserLogoutResponse) {
        try {
            Cookies.remove(cookiesDetailName);
            Cookies.remove(cookiesName);

            return await handler.Success();
        }catch(err){
            return await HandleError(err, handler);
        }
    }
}