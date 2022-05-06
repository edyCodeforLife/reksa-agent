import {AttachmentImage, ImageBase64Response, UserProfile} from './user-profile';
import axios, {AxiosPromise} from 'axios';
import {BaseApiUrl, DataService} from '../config';

export interface IKycDataService {
    SaveProfile(profile: UserProfile) : AxiosPromise<number>;
    GetProfile()  : AxiosPromise<UserProfile>;
    FinishProfile() : AxiosPromise<number>;
    Upload(formData: FormData) : AxiosPromise<any>;
    GetImageProfile(id: string): AxiosPromise<ImageBase64Response>;
    GetProfilePdf(token: string): AxiosPromise<Blob>;
    AutoSave(profile: UserProfile) : AxiosPromise;
    GetAutoSave() : AxiosPromise<UserProfile>;
}

export class KycDataService implements IKycDataService {
    GetProfile(): AxiosPromise<UserProfile> {
        return DataService.get("/profile/review");
    }

    SaveProfile(profile: UserProfile) : AxiosPromise<number> {
        return DataService.post<number>("/profile/save", profile);
    }

    FinishProfile(): AxiosPromise<number> {
        return DataService.post<number>("/profile/finish");
    }

    Upload(formData: FormData) : AxiosPromise<any> {
        return DataService.post<any>("/image/uploadprofile", formData);
    }

    GetImageProfile(id: string): AxiosPromise<ImageBase64Response> {
        return DataService.get<ImageBase64Response>("/image/getbase64", {params: {"id": id}})
    }

    GetProfilePdf(token: string): AxiosPromise<Blob> {
        return DataService.get<Blob>("/pdf/indiprofile", {params: {"token": token}});
    }

    AutoSave(profile: UserProfile) : AxiosPromise {
        return DataService.post("/profile/autosave", profile);
    }

    GetAutoSave() : AxiosPromise<UserProfile>{
        return DataService.get("/profile/getautosave");
    }
}