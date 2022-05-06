import {IKycDataService, KycDataService} from '../../services/kyc/kyc';
import {AttachmentImage, AttachmentProfile, ImageBase64Response, UserProfile} from '../../services/kyc/user-profile';
import {HandleError, IResponseError} from '../../services/error/response';

export interface IKycSaveResponse extends IResponseError {
  Success?: () => void;
  Finish?: (handler: IKycFinishResponse) => void;
}

export interface IKycFinishResponse extends IResponseError {
    Success?: () => void;
    ProfileNotComplete?: () => void;
}

export interface IKycImageResponse extends IResponseError {
    Success?: (image: ImageBase64Response) => void;
    ImageNotFound?: () => void;
}

export interface IKycPdfResponse extends IResponseError {
    Success?: (file: Blob) => void;
}

export interface IKycService {
    Review(handler: IKycReviewResponse);
    Save(req: UserProfile, handler: IKycSaveResponse);
    Finish(handler: IKycFinishResponse);
    UploadKtp(file: Blob, handler: IKycUploadResponse, width?: string, height?: string);
    UploadNpwp(file: Blob, handler: IKycUploadResponse, width?: string, height?: string);
    UploadSelfie(file: Blob, handler: IKycUploadResponse, width?: string, height?: string);
    GetProfileImage(id: string, handler: IKycImageResponse);
    Upload(type: string, file: Blob, handler: IKycUploadResponse, width?: string, height?: string);
    GetPdfProfile(token: string, handler: IResponseError);
    AutoSave(req: UserProfile, handler: IKycAutoSaveResponse);
    GetAutoSave(handler: IKycGetAutoSaveResponse);
}

export interface IKycUploadResponse extends IResponseError {
    Success? : (res: AttachmentProfile)  => void;
    NoFileDetected? : () => void;
    FileTooBig? : () => void;
    WrongContentType? : () => void;
}

export interface IKycReviewResponse extends IResponseError {
    Success?: (data: any) => void;
}

export interface IKycAutoSaveResponse extends IResponseError {
  Success?: () => void;
}

export interface IKycGetAutoSaveResponse extends IResponseError {
  Success?: (profile: UserProfile) => void;
  SomethingElse?: () => void;
}

export class KycService implements IKycService {
    private _kyc: IKycDataService;

    constructor() {
        this._kyc = new KycDataService();
    }

    async Save(req: UserProfile, handler: IKycSaveResponse) {
        try {
            await this._kyc.SaveProfile(req);
            return await handler.Success();
        } catch (err){
            return await HandleError(err, handler);
        }
    }

    async Finish(handler: IKycFinishResponse) {
        try {
            let data = await this._kyc.FinishProfile();
            if(data == null) await handler.ProfileNotComplete();
            if((data.data as any).status == 0) await handler.Success();
            return await handler.ProfileNotComplete();
        } catch (err) {
            return await HandleError(err, handler);
        }
    }

    async Review(handler: IKycReviewResponse) {
        try {
            let res = await this._kyc.GetProfile();
            return await handler.Success(res.data);
        } catch (err) {
            return await HandleError(err, handler);
        }
    }

    async UploadKtp(file: Blob, handler: IKycUploadResponse, width?: string, height?: string) {
        return await this.Upload("ktp", file, handler, width, height);
    }

    async UploadSelfie(file: Blob, handler: IKycUploadResponse, width?: string, height?: string) {
        return await this.Upload("selfie", file, handler, width, height);
    }

    async UploadNpwp(file: Blob, handler: IKycUploadResponse, width?: string, height?: string) {
        return await this.Upload("npwp", file, handler, width, height);
    }

    async GetProfileImage(id: string, handler: IKycImageResponse) {
        try {
            let img = await this._kyc.GetImageProfile(id);
            if(img == null || img.data == null) return await handler.ImageNotFound();
            return await handler.Success(img.data);
        } catch (err) {
            if(err && err.response && err.response.status == 404) await handler.ImageNotFound();
            else await HandleError(err, handler);
        }
    }

    async Upload(type: string, file: Blob, handler: IKycUploadResponse, width: string = '100', height: string = '100') {
        try {
            let form = new FormData();
            form.append("w", width);
            form.append("h", height);
            form.append(type, file);

            let data = await this._kyc.Upload(form);

            if(data == null || data.data == 1) return await handler.NoFileDetected();
            if(data.data == 2) return await handler.FileTooBig();
            if(data.data == 3) return await handler.WrongContentType();

            let res = data.data as AttachmentProfile;
            let errCode = res.errorCode;

            if(errCode != 0) {
                if(errCode == 2) return await handler.FileTooBig();
                if(errCode == 3) return await handler.WrongContentType();
            }
            return await handler.Success(res);
        } catch (err) {
            return await HandleError(err, handler);
        }
    }

    async GetPdfProfile(token: string, handler: IKycPdfResponse) {
        try {
            let res = await this._kyc.GetProfilePdf(token);
            return await handler.Success(res.data);
        } catch (err) {
            return HandleError(err, handler);
        }
    }

    async AutoSave(req: UserProfile, handler: IKycAutoSaveResponse) {
        try {
             await this._kyc.AutoSave(req);
            return await handler.Success();
        } catch (err) {
            return HandleError(err, handler)
        }
    }

  async GetAutoSave(handler: IKycGetAutoSaveResponse) {
    try {
      let data = await this._kyc.GetAutoSave();
      return await handler.Success(data.data);
    } catch (err) {
      return HandleError(err, handler)
    }
  }
}