import { Ii18n } from "@app/shared/i18n/interface/i18n.interface";

export interface Ii18nRepository {
  findTranslation: (language: string, key: string) => Promise<string | null>;
  updateTranslation: (language: string, i18n: Partial<Ii18n>) => Promise<number>;
}

export const I18N_REPOSITORY = Symbol("I18N_REPOSITORY ");
