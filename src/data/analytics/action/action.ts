import {UserTrack} from '../entities/user-entry';

export const ActionLog = {
  "login": <UserTrack>{Page: "sign_in", Url: "sign_in", ACat: "auth", Action: "login"},
  "registerSave": <UserTrack>{Page: "sign_up", Url: "sign_up", ACat: "auth", Action: "save registration"},
  "registerPage": <UserTrack>{Page: "sign_up", Url: "sign_up", ACat: "auth", Action: "open registration page"},
  "kycPage": <UserTrack>{Page: "kyc", Url: "kyc", ACat: "profile", Action: "open kyc page"},
  "kycSaveTab1": <UserTrack>{Page: "kyc", Url: "kyc", ACat: "profile", Action: "save kyc", AddInfo: "1"},
  "kycSaveTab2": <UserTrack>{Page: "kyc", Url: "kyc", ACat: "profile", Action: "save kyc", AddInfo: "2"},
  "kycSaveTab3": <UserTrack>{Page: "kyc", Url: "kyc", ACat: "profile", Action: "save kyc", AddInfo: "3"},
  "kycSaveTab4": <UserTrack>{Page: "kyc", Url: "kyc", ACat: "profile", Action: "save kyc", AddInfo: "4"},
  "kycSaveTab5": <UserTrack>{Page: "kyc", Url: "kyc", ACat: "profile", Action: "save kyc", AddInfo: "5"},
  "kycUpload": <UserTrack>{Page: "kyc", Url: "kyc", ACat: "profile", Action: "upload image kyc"},
  "kycFinish": <UserTrack>{Page: "kyc", Url: "kyc", ACat: "profile", Action: "finish kyc"},
  "kycSendCode": <UserTrack>{Page: "kyc", Url: "kyc", ACat: "profile", Action: "send verification code kyc"},
  "kycVerifyCode": <UserTrack>{Page: "kyc", Url: "kyc", ACat: "profile", Action: "save verification kyc"},
  "dashboardPage": <UserTrack>{Page: "dashboard", Url: "dashboard", ACat: "dashboard", Action: "open dashboard page"}
};