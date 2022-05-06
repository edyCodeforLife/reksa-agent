import {AuthDataService, IAuthPasswordDataService} from '../../services/auth/login';
import {HandleError, IResponseError} from '../../services/error/response';
import {AuthCode, ChangeForgotPasswordRequest} from '../../services/auth/user';

export interface IForgotPasswordResponse extends IResponseError {
    Success?: () => void;
    UserNotExists?: () => void;
}
export interface IForgotVerifyPasswordResponse extends IResponseError {
    Success?: () => void;
    CodeNotValid?: () => void;
}
export interface IForgotPasswordService {
    ForgotPassword(email: string, handler: IForgotPasswordResponse): Promise<any>;
    VerifyForgotPasswordUsingCode(code: string, email: string, handler: IForgotVerifyPasswordResponse): Promise<any>;
    VerifyForgotPasswordUsingLink(hashCode: string, email: string, handler: IForgotVerifyPasswordResponse): Promise<any>;
    ChangeForgotPassword(req: ChangeForgotPasswordRequest, handler: IForgotVerifyPasswordResponse) : Promise<any>;
}

export class ForgotPasswordService implements IForgotPasswordService {
    private _forgot: IAuthPasswordDataService;

    constructor() {
        this._forgot = new AuthDataService();
    }

    async ForgotPassword(email: string, handler: IForgotPasswordResponse) {
        try {
            let data = await this._forgot.ForgotPassword(email);
            if (data == null) return handler.UserNotExists();
            if (data.data == AuthCode.Success) return await handler.Success();
            return await handler.UserNotExists();
        } catch (err) {
            return await HandleError(err, handler);
        }
    }

    async VerifyForgotPasswordUsingCode(code: string, email: string, handler: IForgotVerifyPasswordResponse) {
        try {
            let data = await this._forgot.ForgotPasswordVerifyUsingCode(code, email);
            if (data == null) return await handler.CodeNotValid();
            if (data.data == AuthCode.Success) return await handler.Success();

            return await handler.CodeNotValid();
        } catch (err) {
            return await HandleError(err, handler);
        }
    }

    async VerifyForgotPasswordUsingLink(hashCode: string, email: string, handler: IForgotVerifyPasswordResponse) {
        try {
            let data = await this._forgot.ForgotPasswordVerifyUsingLink(hashCode, email);
            if (data == null) return await handler.CodeNotValid();
            if (data.data == AuthCode.Success) return await handler.Success();
            return await handler.CodeNotValid();
        } catch (err) {
            return await HandleError(err, handler);
        }
    }

    async ChangeForgotPassword(req: ChangeForgotPasswordRequest, handler: IForgotVerifyPasswordResponse) {
        try {
            let data = await this._forgot.ChangeForgotPassword(req.code, req.email, req.newPassword);
            if(data == null) return await handler.CodeNotValid();
            if(data.data == AuthCode.Success) return await handler.Success();
            return await handler.CodeNotValid();
        } catch (err) {
            return await HandleError(err, handler);
        }
    }
}