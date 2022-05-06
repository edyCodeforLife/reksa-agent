export interface LocalAuthenticationContext {
    userEmail : string,
    userPassword: string
}

export interface AuthenticationClaim {
    uid: string;
    loginSalt: string;
    email: string;
    name: string;
    phoneCountryCode: string;
    phone: string;
    accountType: number;
    validDate: Date;
    lastLoginDate: Date;
    isChangePasswordRequired: boolean;
}

export interface AuthResultResponse {
    isSuccess: boolean;
    authCode: number;
    authToken: string;
    message: string;
    pwd: string;
    expired: Date;
    user: AuthenticationClaim;
}

export interface UserRegistrationRequest {
    email: string;
    fullName: string;
    password: string;
    confirmPassword: string;
    phone: string;
    phoneCountryCode: string;
    clientType: number;
    gRecaptchaResponse: string;
}

export interface UserConfirmRequest {
    email: string;
    code: string;
}

export interface ChangePasswordRequest {
    oldPassword: string;
    newPassword: string;
}

export interface ResendEmailResponse {
    AuthResult: number;
    Count: number;
}

export interface ChangeForgotPasswordRequest {
  code: string;
  email: string;
  newPassword: string;
}

export enum AuthCode {
    Success = 0,
    UserNotExists = 1,
    NotVerified = 2,
    UserAlreadyExists = 3,
    UserPhoneAlreadyExist = 25,
    Error = 4,
    NewPasswordSameWithOldOne = 5,
    OldPasswordNotMatchWithCurrent = 6,
    RequiredTwoFactorAuth = 7,
    RedirectToProfile = 8,
    UserNotActive = 9,
    UserIsLocked = 10,
    ProfileNotComplete = 11,
    UserNotTopUp = 12,
    TooMuchRequestCode = 13,
    SystemTokenExpired = 14,
    SecurityCodeExpired = 25,
    SecurityCodeInvalid = 26,

    CaptchaNotSolve = 15,

    CaptchaMissingInputSecret = 16,
    CaptchaInvalidInputSecret = 17,
    CaptchaMissingInputResponse = 18,
    CaptchaInvalidInputResponse = 19,
    CaptchaMissingServerKey = 20,
    CaptchaMissingEncodedToken = 21,

    IncorrectPin =22,
    PinMustBeNumericOnly = 23,
    IncorrectOldPin = 24,
    InvalidHash = 25,

    EmailRegisteredButNotVerified = 26,
}