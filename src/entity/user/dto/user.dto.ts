import { IRole } from "@app/entity/role/interface/role.interface";
import { UserStatusEnum } from "@app/entity/user/enum/user-status.enum";
import { IUser } from "@app/entity/user/interface/user.interface";
import {
  EMAIL_REGEX,
  USERNAME_REGEX,
  account,
  BaseDto,
  LanguageEnum,
} from "@inlaze_techlead/gannar-core";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from "class-validator";

export class UserDto extends BaseDto implements IUser {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "Full name",
    type: String,
    required: true,
    example: "Super User",
  })
  public fullName!: string;

  @IsString()
  @IsNotEmpty()
  @Matches(USERNAME_REGEX, {
    message: account.invalidUsername,
  })
  @ApiProperty({
    description: "User name",
    type: String,
    required: true,
    example: "super",
  })
  public userName!: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @Matches(EMAIL_REGEX, {
    message: account.invalidEmail,
  })
  @ApiProperty({
    description: "Email",
    type: String,
    required: true,
    example: "super@email.com",
  })
  public email!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "Password",
    type: String,
    required: true,
    example: "pass",
  })
  public password!: string;

  @IsEnum(UserStatusEnum)
  @IsNotEmpty()
  @ApiProperty({
    description: "Status",
    type: String,
    required: true,
    example: "1",
    default: "1",
  })
  public status!: UserStatusEnum;

  @IsEnum(LanguageEnum)
  @IsNotEmpty()
  @ApiProperty({
    description: "Language",
    type: String,
    required: true,
    example: "en",
    default: LanguageEnum.ENGLISH,
  })
  public language!: LanguageEnum;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "Role id",
    type: String,
    required: true,
    example: "65a599542df44e9fd126d335",
  })
  public role!: IRole;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    description: "Super user?",
    type: Boolean,
    required: true,
    example: false,
    default: false,
  })
  public isSuperUser!: boolean;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "Refresh token",
    type: String,
    required: true,
    example: "987214jhc23b33c12897rkjnsdc",
  })
  public refreshToken?: string;

  @IsDate()
  @IsOptional()
  @ApiProperty({
    description: "Last login",
    type: Date,
    required: false,
    example: new Date(),
  })
  public lastLogin?: Date;
}
