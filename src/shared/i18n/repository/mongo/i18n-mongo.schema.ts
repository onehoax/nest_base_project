import { Ii18n } from "@app/shared/i18n/interface/i18n.interface";
import { Base } from "@inlaze_techlead/gannar-core";
import { ModelDefinition, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

const { Types } = mongoose.Schema;

@Schema({
  autoIndex: true,
  autoCreate: true,
  timestamps: true,
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    },
  },
})
export class I18n extends Base implements Ii18n {
  @Prop({ type: Types.String, required: true })
  public readonly language!: string;

  @Prop({ type: Object, required: true })
  public readonly content!: Object;
}

export const I18nSchema = SchemaFactory.createForClass(I18n).index(
  { language: 1 },
  { unique: true },
);

export const I18nModel: ModelDefinition = {
  name: I18n.name,
  schema: I18nSchema,
};
