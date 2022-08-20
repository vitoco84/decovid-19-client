/* tslint:disable */
/* eslint-disable */
// Generated using typescript-generator version 2.36.1070 on 2022-06-30 08:56:42.

export namespace ClientCommunication {
  export interface HcertDTO {
    nam: HcertHolder;
    dob: string;
    ver: string;
  }

  export interface HcertContentDTO extends HcertDTO {
    r?: HcertRecovery[];
    v?: HcertVaccination[];
    t: HcertTest[];
  }

  export interface HcertPublicKeyDTO {
    modulus: string;
    publicExponent: string;
    publicXCoord: string;
    publicYCoord: string;
    algo: string;
    bitLength: string;
  }

  export interface HcertTimeStampDTO {
    hcertExpirationTime: string;
    hcertIssuedAtTime: string;
    isHcertExpired: boolean;
  }

  export interface HcertServerRequest {
    hcertPrefix: string;
  }

  export interface HcertServerResponse {
    hcertPrefix: string;
    hcertContent: HcertDTO;
    hcertKID: string;
    hcertAlgo: string;
    hcertIssuer: string;
    hcertTimeStamp: HcertTimeStampDTO;
    hcertSignature: string;
  }

  export interface PEMCertServerRequest {
    pemCertificate: string;
  }

  export interface PEMCertServerResponse {
    publicKey: string;
    subject: string;
    signatureAlgorithm: string;
    validTo: string;
    validFrom: string;
    serialNumber: string;
    issuer: string;
    publicKeyParams: HcertPublicKeyDTO;
    signature: string;
    isValid: boolean;
  }

  export interface HcertVerificationServerRequest {
    bearerToken: string;
    keyId: string;
    hcertPrefix: string;
  }

  export interface HcertVerificationServerResponse {
    isHcertVerified: boolean;
    isTrustChainVerified: boolean;
    certRawContent: string;
  }

  export interface ValidationErrorServerResponse {
    validationErrors: ValidationError[];
  }

  export interface QRCodeServerRequest {
    url: string;
  }

  export interface Base45EncodeServerRequest {
    base45Encode: string;
  }

  export interface Base45DecodeServerRequest {
    base45Decode: string;
  }

  export interface HcertHolder {
    fn: string;
    fnt: string;
    gn: string;
    gnt: string;
  }

  export interface HcertRecovery extends Hcert {
    fr: string;
    df: string;
    du: string;
    is: string;
    ci: string;
  }

  export interface HcertVaccination extends Hcert {
    ci: string;
    dn: number;
    dt: string;
    is: string;
    ma: string;
    mp: string;
    sd: number;
    vp: string;
  }

  export interface HcertTest extends Hcert {
    tt: string;
    nm: string;
    ma: string;
    sc: string;
    tr: string;
    tc: string;
    is: string;
    ci?: string;
  }

  export interface ValidationError {
    fieldName: string;
    message: string;
  }

  export interface Hcert {
    tg: string;
    co: string;
  }
}
