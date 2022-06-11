import {HcertDTO} from '../model/hcert/hcertDTO';
import {HcertTimeStampDTO} from '../model/hcert/hcertTimeStampDTO';

export interface HcertServerResponse {
  hcertPrefix: string;
  hcertContent: HcertDTO;
  hcertKID: string;
  hcertAlgo: string;
  hcertIssuer: string;
  hcertTimeStamp: HcertTimeStampDTO;
  hcertSignature: string;
}
