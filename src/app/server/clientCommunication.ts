/* tslint:disable */
/* eslint-disable */
// Generated using typescript-generator version 2.36.1070 on 2022-06-19 17:52:08.

export namespace ClientCommunication {
  export interface HcertDTO {
    nam: HcertHolder;
    dob: string;
    ver: string;
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
  }

  export interface ValidationErrorServerResponse {
    validationErrors: ValidationError[];
  }

  export interface QRCodeServerRequest {
    url: string;
  }

  export interface HcertHolder {
    fn: string;
    fnt: string;
    gn: string;
    gnt: string;
  }

  export interface ValidationError {
    fieldName: string;
    message: string;
  }
}
