import {
  AuthResultResponse, ChangePasswordRequest, LocalAuthenticationContext, ResendEmailResponse, UserConfirmRequest,
  UserRegistrationRequest
} from './user';
import {AxiosPromise} from 'axios';
import {DataService} from '../config';

export interface IAuthRegisterDataService {
    Register(data: UserRegistrationRequest) : AxiosPromise<number>;
    RegisterVerifyUsingLink(hashCode: string, email: string) : AxiosPromise<AuthResultResponse>;
    RegisterVerifyUsingCode(params: UserConfirmRequest) : AxiosPromise<AuthResultResponse>;
    RegisterResendActivationCode(email: string) : AxiosPromise<ResendEmailResponse>;
    IsRegistered(email: string): AxiosPromise<number>;
    IsPhoneRegistered(phone: string, code: string): AxiosPromise<boolean>;
}
export interface IAuthPasswordDataService {
    ChangePassword(data: ChangePasswordRequest): AxiosPromise<number>;
    ForgotPassword(email: string): AxiosPromise<number>;
    ForgotPasswordVerifyUsingLink(hashCode: string, email: string) : AxiosPromise<number>;
    ForgotPasswordVerifyUsingCode(code: string, email: string): AxiosPromise<number>;
    ChangeForgotPassword(code:string, email: string, newPassword: string): AxiosPromise<number>;
}
export interface IAuthLoginDataService {
    Login(data: LocalAuthenticationContext) : AxiosPromise<AuthResultResponse>;
    Logout() : AxiosPromise;
}

export class AuthDataService implements IAuthLoginDataService, IAuthPasswordDataService, IAuthRegisterDataService {

    ChangeForgotPassword(code:string, email: string, newPassword: string): AxiosPromise<number> {
        return DataService.post("/auth/ChangeForgotPassword", {code, email, password: newPassword});
    }

    RegisterVerifyUsingLink(hashCode: string, email: string): AxiosPromise<AuthResultResponse> {
        return DataService.get("/auth/VerifyRegistration", {params: {code: hashCode, email: email}});
    }

    RegisterVerifyUsingCode(params: UserConfirmRequest): AxiosPromise<AuthResultResponse> {
        return DataService.post("/auth/VerifyRegistration", {code: params.code, email: params.email});
    }

    ForgotPassword(email: string): AxiosPromise<number> {
        return DataService.post("/auth/ForgotPassword", { email });
    }

    ForgotPasswordVerifyUsingLink(hashCode: string, email: string) : AxiosPromise<number> {
        return DataService.get<number>("/auth/VerifyForgot", {params: {code: hashCode, email: email}});
    }

    ForgotPasswordVerifyUsingCode(code: string, email: string) : AxiosPromise<number> {
        return DataService.post<number>("/auth/VerifyForgot", {params: {code: code, email: email}});
    }

    ChangePassword(data: ChangePasswordRequest): AxiosPromise<number> {
        return DataService.post<number>("/auth/changepassword", data);
    }

    Login(data: LocalAuthenticationContext): AxiosPromise<AuthResultResponse> {
        return DataService.post<AuthResultResponse>("/auth/login", data);
    }

    Register(data: UserRegistrationRequest): AxiosPromise<number> {
        return DataService.post<number>("/auth/register", data);
    }

    RegisterResendActivationCode(email: string) : AxiosPromise<ResendEmailResponse> {
        return DataService.post<ResendEmailResponse>("/auth/resendregistration", { email } )
    }

    IsRegistered(email: string): AxiosPromise<number> {
        return DataService.get("/auth/IsRegistered", {params: {email: email}});
    }

    IsPhoneRegistered(phone: string, code: string): AxiosPromise<boolean> {
        return DataService.get("/auth/isPhoneRegistered", {params: {phone: phone, code: code}});
    }

    Logout(): AxiosPromise {
        return DataService.post("/auth/logout");
    }
}