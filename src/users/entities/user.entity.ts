import * as mongoose from 'mongoose';
import { Sex } from '../enums/Sex';
import { UserRole } from '../enums/UserRole';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Exclude } from 'class-transformer';

export type UserDocument = UserEntity & Document;
@Schema({ timestamps: true })
export class UserEntity {
  /**
   * 유저 이메일
   */
  @Prop({ required: true, unique: true, max: 255 })
  email: string;

  /**
   * 유저 이름
   */
  @Prop({ required: true, type: String, min: 2, max: 50 })
  name: string;

  /**
   * 유저 생년월일 (YYYY-MM-DD)
   */
  @Prop({ required: true, type: mongoose.Schema.Types.Date })
  birth: string;

  /**
   * 유저 비밀번호
   */
  @Prop({ required: true, type: String, min: 2, max: 255 })
  password: string;

  /**
   * 직업 비전
   */
  @Prop({ nullable: true, required: false, type: String })
  career_vision?: string;

  /**
   * 학습 비전
   */
  @Prop({ nullable: true, required: false, type: String })
  study_vision?: string;

  /**
   * 건강 비전
   */
  @Prop({ nullable: true, required: false, type: String })
  health_vision?: string;

  /**
   * 관계 비전
   */
  @Prop({ nullable: true, required: false, type: String })
  relationship_vision?: string;

  /**
   * 주거 비전
   */
  @Prop({ nullable: true, required: false, type: String })
  living_vision?: string;

  /**
   * 사회참여 비전
   */
  @Prop({ nullable: true, required: false, type: String })
  social_vision?: string;

  /**
   * 여가 비전
   */
  @Prop({ nullable: true, required: false, type: String })
  leisure_vision?: string;

  /**
   * 재무 비전
   */
  @Prop({ nullable: true, required: false, type: String })
  finance_vision?: string;

  /**
   * 유저 성별
   */
  @Prop({
    required: true,
    type: String,
    enum: Object.values(Sex),
    default: Sex.NONE,
  })
  sex: Sex;

  /**
   * 유저 역할
   */
  @Prop({
    required: true,
    type: String,
    enum: Object.values(UserRole),
    default: UserRole.USER,
  })
  role: UserRole;

  /**
   * 유저 프로파일 이미지
   */
  @Prop({
    required: false,
    type: String,
  })
  photo?: string;

  /**
   * 리프레시 토큰
   */
  @Prop({ nullable: true, required: false, type: String })
  @Exclude()
  current_hashed_refresh_token?: string;
}

const UserSchema = SchemaFactory.createForClass(UserEntity);

/**
 * 유저 스키마 ID 설정
 */
UserSchema.virtual('id').get(function (this: UserDocument) {
  return this._id;
});
UserSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.__v;
  },
});

export { UserSchema };
