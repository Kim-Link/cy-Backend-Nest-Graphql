import { Prop, Schema } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { UserEntity } from 'src/user/entities/user.entity';
import { AreaType } from '../enum/area_type';
import { MoneyType } from '../enum/money_type';
import { EightAreaEntity } from './eight_area.entity';

export type BigObjectiveDocument = BigObjectiveEntity & Document;

@Schema({
  versionKey: false,
  collection: 'BigObjectiveEntity',
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
export class BigObjectiveEntity {
  /**
   * 8대 영역, 최종목표 아이디
   */
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  ref_id?: EightAreaEntity;

  /**
   * 유저 아이디
   */
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  user_id: UserEntity;

  /**
   * 중목표
   */
  //   @Prop({ type: [mongoose.Schema.Types.ObjectId] })
  //   middle_objective?: MiddleObjectiveEntity[];

  /**
   * 대목표에 포함된 중목표 리스트
   */
  @Prop({
    nullable: true,
    required: false,
    type: String,
    enum: Object.values(AreaType),
  })
  area_type?: string;

  /**
   * 대목표 내용
   */
  @Prop({
    nullable: true,
    required: false,
    type: String,
  })
  big_objective_content?: string;

  /**
   * 대목표 달성 나이
   */
  @Prop({
    nullable: true,
    required: false,
    type: Number,
    default: 0,
  })
  age?: number;

  /**
   * 대목표 달성 년도
   */
  @Prop({
    nullable: true,
    required: false,
    type: Number,
    default: 0,
  })
  year?: number;

  /**
   * 금액이 필요한 목표인지 여부
   */
  @Prop({
    nullable: true,
    required: false,
    type: Boolean,
    default: false,
  })
  is_money_required?: boolean;

  @Prop({
    nullable: true,
    required: false,
    type: Number,
    default: 0,
  })
  objective_money?: number;

  /**
   * 소멸성 / 저축성
   */
  @Prop({
    nullable: true,
    required: false,
    type: String,
    enum: Object.values(MoneyType),
  })
  money_type?: number;

  /**
   * 대목표 달성 완료 체크
   */
  @Prop({
    nullable: true,
    required: false,
    type: Boolean,
    default: false,
  })
  is_objective_achieved?: boolean;

  /**
   * 스마트 원칙 충족 체크
   */
  @Prop({
    nullable: true,
    required: false,
    type: Boolean,
    default: false,
  })
  smart_check?: boolean;

  @Prop({
    required: false,
    type: Boolean,
    default: false,
  })
  is_deleted: boolean;

  @Prop({
    required: false,
    type: mongoose.Schema.Types.Date,
  })
  created_at: string;

  @Prop({
    required: false,
    type: mongoose.Schema.Types.Date,
  })
  updated_at: string;
}
