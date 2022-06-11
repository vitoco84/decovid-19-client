import {HcertPublicKeyDTO} from '../model/hcert/hcertPublicKeyDTO';

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
