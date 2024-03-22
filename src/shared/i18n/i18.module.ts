import { I18N_REPOSITORY } from "@app/shared/i18n/interface/i18n.repository.interface";
import { I18nMongoRepository } from "@app/shared/i18n/repository/mongo/i18n-mongo.repository";
import { I18nModel } from "@app/shared/i18n/repository/mongo/i18n-mongo.schema";
import { I18nService } from "@app/shared/i18n/service/i18n.service";
import { Global, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

@Global()
@Module({
  imports: [MongooseModule.forFeature([I18nModel])],
  providers: [
    I18nService,
    {
      provide: I18N_REPOSITORY,
      useClass: I18nMongoRepository,
    },
  ],
  exports: [I18nService],
})
export class I18nModule {}
