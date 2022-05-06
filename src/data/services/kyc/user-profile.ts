export interface UserProfile {
    id: string;
    boId: string;
    userId: string;
    fundClientId: number;
    sellingAgentPK: number;
    isComplete: boolean;
    isUpdateVerified: boolean;
    clientCategory: number;
    investorProfile: InvestorProfile;
    workProfile: WorkProfile;
    bankProfile: BankProfile;
    investReason: InvestReason;
    investorsRiskProfile: InvestorsRiskProfile;
    termAndConditionProfile: TermAndConditionProfile;
    attachmentProfile: AttachmentProfile;
    signatureProfile: SignatureProfile;
    virtualAccount: UserVirtualAccount[];
    companyProfile: CompanyProfile;
    officerData: OfficerData;
    bankProfileIns: BankProfileIns;
    investReasonIns: InvestReasonIns;
    investorsRiskProfileIns: InvestorsRiskProfileIns;
    termAndConditionProfileIns: TermAndConditionProfileIns;
    attachmentProfileIns: AttachmentProfileIns;
    createdAt: Date;
    completeAt: Date;
    firstTopupAt: Date;
    verifiedAt: Date;
    isFaceToFace: boolean;
    pendingKyc: boolean;
    hasUpdate: boolean;
}
export interface InvestorProfile {
    namaDepanInd: string;
    namaTengahInd: string;
    namaBelakangInd: string;
    sid: string;
    ifuaCode: string;
    statementType: number;
    beneficiaryOwner: number;
    beneficiaryOwnerOther: string;
    assetOwner: number;
    assetOwnerOther: string;
    name: string;
    identitasInd1: number;
    noIdentitasInd1: string;
    registrationDateIdentitasInd1: Date;
    npwp: string;
    registrationNPWP: Date;
    expiredDateIdentitasInd1: Date;
    lifetimeExpiredDate: boolean;
    nationality: string;
    negara: string;
    tempatLahir: string;
    tanggalLahir: Date;
    jenisKelamin: number;
    statusPerkawinan: number;
    spouseName: string;
    spouseOccupation: number;
    spouseNatureOfBusiness: number;
    spouseNaturOfBusinessOther: string;
    spouseBirthPlace: string;
    otherPropinsiInd1: number;
    kodeDomisiliPropinsi: number;
    spouseDateOfBirth: Date;
    spouseIDNo: string;
    spouseNationality: string;
    spouseAnnualIncome: number;
    spouseHandphone: string;
    pendidikan: number;
    agama: number;
    alamatInd1: string;
    kodeKotaInd1: number;
    kotaOthers: string;
    kodePosInd1: number;
    isEqualCorrespondence: boolean;
    alamatInd2: string;
    kodeKotaInd2: number;
    kodePosInd2: number;
    countryofDomicile: string;
    identity1RT: string;
    identity1RW: string;
    countryofCorrespondence: string;
    otherAlamatInd1: string;
    otherKodeKotaInd1: number;
    otherNegaraInd1: string;
    otherKodePosInd1: number;
    domicileRT: string;
    domicileRW: string;
    teleponSelular: string;
    countryCodeTeleponSelular: string;
    countryOfBirth: string;
    email: string;
    teleponRumah: string;
    countryCodeTeleponRumah: string;
    fax: string;
    motherMaidenName: string;
    isIdentityChange: boolean;
    ahliWaris: string;
    hubunganAhliWaris: string;
    correspondenceAddress: number;
}
export interface CompanyProfile {
    namaPerusahaan: string;
    npwp: string;
    domisili: number;
    tipe: number;
    karakteristik: number;
    noSKD: string;
    penghasilanInstitusi: number;
    sumberDanaInstitusi: number;
    alamatPerusahaan: string;
    kodeKotaIns: string;
    kodePosIns: number;
    lokasiBerdiri: string;
    teleponBisnis: string;
    countryCodeTeleponBisnis: string;
    fax: string;
    countryCodeFax: string;
    negara: string;
    nomorSIUP: string;
    registrationNPWP: Date;
    expiredDateSKD: Date;
    tanggalBerdiri: Date;
}
export interface OfficerData {
    namaDepanIns1: string;
    namaTengahIns1: string;
    namaBelakangIns1: string;
    jabatan1: string;
    jumlaIdentitasIns1: number;
    identitasIns11: number;
    noIdentitasIns11: string;
    registrationDateIdentitasIns11: Date;
    expiredDateIdentitasIns11: Date;
    namaDepanIns2: string;
    namaTengahIns2: string;
    namaBelakangIns2: string;
    jabatan2: string;
    jumlaIdentitasIns2: number;
    identitasIns21: number;
    noIdentitasIns21: string;
    registrationDateIdentitasIns21: Date;
    expiredDateIdentitasIns21: Date;
    namaDepanIns3: string;
    namaTengahIns3: string;
    namaBelakangIns3: string;
    jabatan3: string;
    jumlaIdentitasIns3: number;
    identitasIns31: number;
    noIdentitasIns31: string;
    registrationDateIdentitasIns31: Date;
    expiredDateIdentitasIns31: Date;
    namaDepanIns4: string;
    namaTengahIns4: string;
    namaBelakangIns4: string;
    jabatan4: string;
    jumlaIdentitasIns4: number;
    identitasIns41: number;
    noIdentitasIns41: string;
    registrationDateIdentitasIns41: Date;
    expiredDateIdentitasIns41: Date;
}
export interface WorkProfile {
    pekerjaan: number;
    natureOfBusiness: number;
    naturOfBusinessOther: string;
    pekerjaanOthers: string;
    penghasilanInd: number;
    sumberDanaInd: number;
    sourceOfIncomeOthers: string;
    perusahaanBekerja: string;
    alamatKantorInd: string;
    namaKantorInd: string;
    kodeKotaKantorInd: number;
    propinsiKantorInd: number;
    kodePosKantorInd: number;
    kodeCountryofKantor: string;
    companyCityName: number;
}
export interface BankProfile {
    namaBank1: number;
    nomorRekening1: string;
    bankBranchName1: string;
    namaNasabah1: string;
    mataUang1: string;
    bankCountry1: number;
    namaBank2: number;
    nomorRekening2: string;
    bankBranchName2: string;
    namaNasabah2: string;
    mataUang2: string;
    bankCountry2: number;
    namaBank3: number;
    nomorRekening3: string;
    bankBranchName3: string;
    namaNasabah3: string;
    mataUang3: string;
    bankCountry3: number;
}
export interface BankProfileIns {
    assetFor1Year: number;
    assetFor2Year: number;
    assetFor3Year: number;
    operatingProfitFor1Year: number;
    operatingProfitFor2Year: number;
    operatingProfitFor3Year: number;
}
export interface InvestReasonIns {
    maksudTujuanInstitusi: number;
    maksudTujuanLain: string;
}
export interface InvestReason {
    maksudTujuanInd: number;
    maksudTujuanLain: string;
}
export interface InvestorsRiskProfile {
    investmentPeriod: number;
    investorAge: number;
    investmentResult: number;
    investmentRisk: number;
    investmentAllocation: number;
    investmentReason: number;
    investmentKnowledge: number;
    investmentLoss: number;
    investmentLocation: number;
    isTakingRisk: boolean;
    investorsRiskProfileId: number;
}
export interface InvestorsRiskProfileIns {
    investorsRiskProfileId: number;
}
export interface TermAndConditionProfile {
    openBankAccount: boolean;
    onlineTransaction: boolean;
    openMutualAccount: boolean;
}

export interface SignatureProfile {
  speciment1: string;
  speciment2: string;
}
export interface TermAndConditionProfileIns {
    openBankAccount: boolean;
    onlineTransaction: boolean;
    openMutualAccount: boolean;
}
export interface RdnProfile {
    bankRDNPK: number;
    rdnAccountNo: number;
    rdnAccountName: string;
    bankName: string;
}
export interface AttachmentProfile {
    ktp: AttachmentImage;
    npwp: AttachmentImage;
    selfie: AttachmentImage;
    notHaveNpwp: boolean;
    errorCode: number;
}
export interface AttachmentProfileIns {
    ktp: AttachmentImage;
    npwp: AttachmentImage;
}
export interface AttachmentImage {
    original: string;
    thumbnail: string;
    fileName: string;
    fileType: string;
}
export interface AttachmentMetadata {
    userId: string;
}
export interface AttachmentVerificationMetadata {
    userId: string;
}
export interface AttachmentVerification {
    receipt: AttachmentImage;
}
export interface UserVirtualAccount {
    id: string;
    userId: string;
    fullName: string;
    fundClientId: number;
    no: string;
    productId: number;
    productBankId: number;
    userAccountNo: string[];
}

export interface ImageBase64Response {
    fileName: string;
    base64: string;
    type: string;
}
