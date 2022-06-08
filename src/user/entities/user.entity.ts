import * as mongoose from 'mongoose';
import { Sex } from '../enums/Sex';
import { UserRole } from '../enums/UserRole';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Exclude } from 'class-transformer';
import { Field, ObjectType } from '@nestjs/graphql';

export type UserDocument = User & Document;

@Schema({
  collection: 'User',
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  id: true,
  versionKey: false,
})
@ObjectType({ description: 'User' })
export class User {
  // /**
  //  * agency_id
  //  */
  // @Prop({
  //   nullable: true,
  //   required: false,
  //   type: mongoose.Schema.Types.ObjectId,
  //   default: null,
  // })
  // agency_id?: AgencyEntity;

  // /**
  //  * 컨설팅 내용 조회
  //  */
  // @Prop({
  //   nullable: true,
  //   required: false,
  //   type: [mongoose.Schema.Types.ObjectId],
  //   default: null,
  // })
  // consultant_id?: ConsultingEntity[];

  /**
   * 유저 이메일
   */
  @Prop({ required: false, unique: true, max: 255 })
  @Field()
  email: string;

  /**
   * 유저 이름
   */
  @Prop({ required: false, type: String, min: 2, max: 50 })
  @Field()
  name: string;

  /**
   * 유저 생년월일 (YYYY-MM-DD)
   */
  @Prop({ required: false, type: mongoose.Schema.Types.Date })
  @Field()
  birth: string;

  /**
   * 유저 비밀번호
   */
  @Prop({ required: false, type: String, min: 2, max: 255 })
  @Field()
  @Exclude()
  password: string;

  /**
   * 직업 비전
   */
  @Prop({ nullable: true, required: false, type: String })
  @Field()
  career_vision?: string;

  /**
   * 학습 비전
   */
  @Prop({ nullable: true, required: false, type: String })
  @Field()
  study_vision?: string;

  /**
   * 건강 비전
   */
  @Prop({ nullable: true, required: false, type: String })
  @Field()
  health_vision?: string;

  /**
   * 관계 비전
   */
  @Prop({ nullable: true, required: false, type: String })
  @Field()
  relationship_vision?: string;

  /**
   * 주거 비전
   */
  @Prop({ nullable: true, required: false, type: String })
  @Field()
  living_vision?: string;

  /**
   * 사회참여 비전
   */
  @Prop({ nullable: true, required: false, type: String })
  @Field()
  social_vision?: string;

  /**
   * 여가 비전
   */
  @Prop({ nullable: true, required: false, type: String })
  @Field()
  leisure_vision?: string;

  /**
   * 재무 비전
   */
  @Prop({ nullable: true, required: false, type: String })
  @Field()
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
  @Field((type) => Sex)
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
  @Field((type) => UserRole)
  role: UserRole;

  /**
   * 유저 프로파일 이미지
   */
  @Prop({
    required: false,
    type: String,
  })
  @Field()
  photo?: string;

  /**
   * 컨설턴트 자격증명들
   */
  @Prop({ nullable: true, required: false, type: [String] })
  @Field((type) => [String])
  consultant_qualifications?: string[];

  /**
   * 리프레시 토큰
   */
  @Prop({ nullable: true, required: false, type: String })
  @Field()
  @Exclude()
  current_hashed_refresh_token?: string;

  /**
   * 삭제여부
   */
  @Prop({ type: Boolean, required: false })
  is_deleted?: boolean;
}

const UserSchema = SchemaFactory.createForClass(User);

export { UserSchema };
