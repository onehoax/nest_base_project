import { IBase } from "@inlaze_techlead/gannar-core";

export interface Ii18n extends IBase {
  readonly language: string;
  readonly content: Object;
}
