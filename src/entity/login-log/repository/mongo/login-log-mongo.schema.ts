import { ILoginLog } from "@app/entity/login-log/interface/login-log.interface";
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
export class LoginLog extends Base implements ILoginLog {
  @Prop({ type: Types.String, required: true })
  public readonly userId!: string;

  @Prop({ type: Types.String, required: true })
  public readonly ipAddress!: string;

  @Prop({ type: Types.String, required: true })
  public readonly userAgent!: string;
}

export const LoginLogSchema = SchemaFactory.createForClass(LoginLog);

export const LoginLogModel: ModelDefinition = {
  name: LoginLog.name,
  schema: LoginLogSchema,
};
