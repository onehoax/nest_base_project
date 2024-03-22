import { Ii18n } from "@app/shared/i18n/interface/i18n.interface";
import { Ii18nRepository } from "@app/shared/i18n/interface/i18n.repository.interface";
import { I18n } from "@app/shared/i18n/repository/mongo/i18n-mongo.schema";
import { MongoRepository } from "@inlaze_techlead/gannar-core";
import { InjectModel } from "@nestjs/mongoose";
import { Model, UpdateWriteOpResult } from "mongoose";

export class I18nMongoRepository extends MongoRepository<Ii18n> implements Ii18nRepository {
  public constructor(@InjectModel(I18n.name) private readonly i18nModel: Model<I18n>) {
    super(i18nModel);
  }

  public async findTranslation(language: string, key: string): Promise<string | null> {
    const keys: string[] = key.split(".");

    const result = this.i18nModel
      .findOne({ language: language })
      .exec()
      .then((translation) => translation?.content[keys[0]][keys[1]] as string);

    return result;
  }

  public async updateTranslation(language: string, i18n: Partial<Ii18n>): Promise<number> {
    return this.i18nModel
      .updateOne({ language: language }, i18n)
      .exec()
      .then((result: UpdateWriteOpResult): number => result.modifiedCount);
  }
}
