import {AuthDataService, IAuthPasswordDataService} from '../../services/auth/login';
import {ChangePasswordRequest} from '../../services/auth/user';
import {HandleError, IResponseError} from '../../services/error/response';

export interface IChangePasswordResponse extends IResponseError {
    Success?: () => void;
}

interface IChangePasswordService {
    ChangePassword(req: ChangePasswordRequest, handler: IChangePasswordResponse): Promise<any>;
}

export class ChangePasswordService implements IChangePasswordService {
    private _change: IAuthPasswordDataService;

    constructor() {
        this._change = new AuthDataService();
    }

    async ChangePassword(req: ChangePasswordRequest, handler: IChangePasswordResponse) {
        try {
            let data = await this._change.ChangePassword(req);
            if (data == null) return handler.Success();
        } catch (err) {
            return HandleError(err, handler);
        }
    }
}