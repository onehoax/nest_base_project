import { IBase } from "@inlaze_techlead/gannar-core";

export interface IPermission extends IBase {
  readonly module: string;
  readonly path: string;
  readonly method: string;
  readonly description: string;
}
