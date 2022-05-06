import {AxiosError} from "axios";

export interface IResponseValidationError {
    fieldName : string;
    errorMessage: string[];
}

export interface IResponseExceptionError {
    exceptionMessage: string;
    ticketNumber: string;
}

export interface IResponseError {
    ValidationError?: (err: IResponseValidationError[]) => void,
    ServerError?: (err: IResponseExceptionError) => void
    TokenExpired?: () => void
}

export interface IResponseSuccess extends IResponseError {
    Success?: <T>(res: T) => void
}

let handle401 = () => {
    // console.log('401');
};


export const HandleError = async (err: AxiosError, handler: IResponseError)  => {
    console.log(err);
    let e = err.response;
    switch (e.status) {
        case(400) : return await handler.ValidationError(e.data as IResponseValidationError[]);
        case(401): return await handler.TokenExpired || handle401();
        default: return await handler.ServerError(e.data as IResponseExceptionError);
    }
};

