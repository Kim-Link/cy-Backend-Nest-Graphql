import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Exclude } from 'class-transformer';
import { Sex } from '../enums/Sex';
import { UserRole } from '../enums/UserRole';
import { schemaOptions } from 'src/configuration/utils/schema.options';
// import { ConsultingEntity } from '../../eight_area/entities/consulting.entity';
// import { AgencyEntity } from '../../eight_area/entities/agency.entity';

export type UserDocument = UserEntity & Document;
@Schema(schemaOptions('User'))
export class UserEntity {

  /**
   * 유저 이메일
   */
  @Prop({ required: false, unique: true, max: 255 })
  email: string;

  /**
   * 유저 이름
   */
  @Prop({ required: false, type: String, min: 2, max: 50 })
  name: string;

  /**
   * 유저 생년월일 (YYYY-MM-DD)
   */
  @Prop({ required: false, type: mongoose.Schema.Types.Date })
  birth: string;

  /**
   * 유저 비밀번호
   */
  @Prop({ required: false, type: String, min: 2, max: 255 })
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
    required: false,
    type: String,
    enum: Object.values(Sex),
    default: Sex.NONE,
  })
  sex: Sex;

  /**
   * 유저 역할
   */
  @Prop({
    required: false,
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
   * 컨설턴트 자격증명들
   */
  @Prop({ nullable: true, required: false, type: [String] })
  consultant_qualifications?: string[];

  /**
   * 리프레시 토큰
   */
  @Prop({ nullable: true, required: false, type: String })
  @Exclude()
  currentHashedRefreshToken?: string;

  /**
   * 삭제여부
   */
  @Prop({ required: false, type: Boolean, default: false })
  is_deleted: boolean;

  /**
   * 작성날짜 (YYYY-MM-DD)
   */
  @Prop({ required: false, type: mongoose.Schema.Types.Date })
  created_at: string;

  /**
   * 수정날짜 (YYYY-MM-DD)
   */
  @Prop({ required: false, type: mongoose.Schema.Types.Date })
  updated_at: string;
}

const UserSchema = SchemaFactory.createForClass(UserEntity);

export { UserSchema };
