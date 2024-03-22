import { IUser } from "@app/entity/user/interface/user.interface";
import {
  I18N_REPOSITORY,
  Ii18nRepository,
} from "@app/shared/i18n/interface/i18n.repository.interface";
import { LoggerService } from "@inlaze_techlead/inlaze-common";
import { Inject, Injectable, Scope } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { Request } from "express";

@Injectable({ scope: Scope.REQUEST })
export class I18nService {
  public constructor(
    @Inject(REQUEST)
    private readonly request: Request,
    @Inject(I18N_REPOSITORY)
    private readonly i18Repository: Ii18nRepository,
    private readonly loggerService: LoggerService,
  ) {}

  public async translate(key: string): Promise<string> {
    try {
      const lang: string = this.getUserLanguage(this.request);
      const translation: string | null = await this.i18Repository.findTranslation(lang, key);

      if (!translation) {
        this.loggerService.warn({
          data: {
            context: this.constructor,
            message: `No Translation available`,
          },
        });

        return key;
      }

      return translation;
    } catch (error) {
      this.loggerService.error({
        data: {
          context: this.constructor,
          message: `Error translating message, error: ${(error as Error).message}`,
        },
      });

      return key;
    }
  }

  private getUserLanguage(req: Request): string {
    return (
      (req.headers.language as string) ??
      (req?.user as IUser | undefined)?.language ??
      (req.acceptsLanguages("es", "en") || "en")
    );
  }
}
