import { Permission } from "@app/entity/permission/repository/mongo/permission-mongo.schema";
import { IRole } from "@app/entity/role/interface/role.interface";
import { Base, EntityEnum } from "@inlaze_techlead/gannar-core";
import { ModelDefinition, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";

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
export class Role extends Base implements IRole {
  @Prop({ type: Types.String, required: true })
  public readonly slug!: string;

  @Prop({ type: Types.String, required: true })
  public readonly name!: string;

  @Prop({
    type: [{ type: Types.ObjectId, ref: EntityEnum.PERMISSION }],
    autopopulate: true,
    required: true,
  })
  public readonly permissions!: Permission[];
}

export const RoleSchema = SchemaFactory.createForClass(Role)
  .index({ slug: 1 }, { unique: true })
  .plugin(mongooseAutoPopulate);

export const RoleModel: ModelDefinition = {
  name: Role.name,
  schema: RoleSchema,
};
