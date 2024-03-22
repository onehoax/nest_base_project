import { IPermission } from "@app/entity/permission/interface/permission.interface";
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
export class Permission extends Base implements IPermission {
  @Prop({ type: Types.String, required: true })
  public readonly module!: string;

  @Prop({ type: Types.String, required: true })
  public readonly path!: string;

  @Prop({ type: Types.String, required: true })
  public readonly method!: string;

  @Prop({ type: Types.String, required: true })
  public readonly description!: string;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission).index(
  { module: 1, method: 1 },
  { unique: true },
);

export const PermissionModel: ModelDefinition = {
  name: Permission.name,
  schema: PermissionSchema,
};
