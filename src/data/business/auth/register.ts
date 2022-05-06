import {AuthDataService, IAuthRegisterDataService} from '../../services/auth/login';
import {UserRegistrationRequest, UserConfirmRequest, AuthCode} from '../../services/auth/user';
import {
    HandleError, IResponseError, IResponseExceptionError,
    IResponseValidationError
} from '../../services/error/response';
export interface IUserRegisterService {
    IsEmailRegistered(email: string, emailNotRegistered: () => void,
                      emailRegisteredButNotVerified: () => void, emailRegistered: () => void): Promise<any>;
    IsPhoneRegistered(phone: string, phoneRegistered: () => void, phoneNotRegistered: () => void): Promise<any>;
    RegisterUser(data: UserRegistrationRequest, res: IUserRegisterResponse) : Promise<any>;
    RegisterResendActivationCode(email: string, res: IResendMailResponse) : Promise<any>;
    SendConfirmation(data: UserConfirmRequest, handler: IUserConfirmResponse) : Promise<any>;
}

export interface IUserRegisterResponse extends IResponseError {
    registerSuccess?: () => void,
    registerNotSuccess?: (response: any) => void,
}

export interface IUserConfirmResponse extends IResponseError {
    confirmSuccess?: (response: any) => void,
    confirmNotSuccess?: (response: any) => void,
}

export interface IResendMailResponse extends IResponseError {
    success?:(count: number) => void;
    tooManyRequest?: () => void;
}

export class UserRegisterService implements IUserRegisterService {
    private _register: IAuthRegisterDataService;

    constructor() {
        this._register = new AuthDataService();
    }

    async IsEmailRegistered(email: string, emailNotRegistered: () => void,
                            emailRegisteredButNotVerified: () => void, emailRegistered: () => void) {
        let isRegistered = await this._register.IsRegistered(email);
        if (isRegistered.data == 0) return await emailNotRegistered();
        if (isRegistered.data == 26) return await emailRegisteredButNotVerified();
        if (isRegistered.data == 1) return await emailRegistered();
        if (isRegistered.data == 4) return await emailRegistered();
    }

    async IsPhoneRegistered(phone: string, phoneRegistered: () => void, phoneNotRegistered: () => void) {
        let data = await this._register.IsPhoneRegistered(phone, "62");
        if (data.data || data == null) return await phoneRegistered();
        if (!data.data) return await phoneNotRegistered();
    }

    async RegisterUser(data: UserRegistrationRequest, input: IUserRegisterResponse) : Promise<void> {
        try  {
            let res = await this._register.Register(data);
            if (res.data == 0) return await input.registerSuccess();
            return await input.registerNotSuccess(res);
        } catch (err) {
            return await input.registerNotSuccess(err);
        }
    }

    async SendConfirmation(data: UserConfirmRequest, handler: IUserConfirmResponse) {
        try  {
            let res = await this._register.RegisterVerifyUsingCode(data);
            switch(res.data.authCode) {
                case(AuthCode.Success): return await handler.confirmSuccess(res.data);
                case(AuthCode.NotVerified): return await handler.confirmNotSuccess(res.data);
            }
        } catch (err) {
            return await handler.confirmNotSuccess(err);
        }
    }

  async RegisterResendActivationCode(email: string, handler: IResendMailResponse): Promise<any> {
        try {
            let res = await this._register.RegisterResendActivationCode(email);
            if(res.data.Count <= 3) return await handler.success(res.data.Count);
            return await handler.tooManyRequest();
        } catch(err){
            return await HandleError(err, handler);
        }
  }

}