import { IBase } from "@inlaze_techlead/gannar-core";

export interface ILoginLog extends IBase {
  readonly userId: string;
  readonly ipAddress: string;
  readonly userAgent: string;
}
