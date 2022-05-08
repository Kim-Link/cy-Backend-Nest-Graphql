import * as mongoose from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { MoneyType } from '../enums/money_type';
import { AreaType } from '../enums/area_type';
import { MiddleObjectiveEntity } from './middle_objective.entity';

export type SmallObjectiveDocument = SmallObjectiveEntity & Document;
@Schema()
export class SmallObjectiveEntity {
  /**
   * 중목표 아이디
   */
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  ref_id?: MiddleObjectiveEntity;

  /**
   * 영역 타입
   */
  @Prop({
    nullable: false,
    required: true,
    type: String,
    enum: Object.values(AreaType),
  })
  area_type?: string;

  /**
   * 대 목표 내용
   */
  @Prop({
    nullable: true,
    required: false,
    type: String,
  })
  middle_objective_content?: string;

  /**
   * 달성나이
   */
  @Prop({
    nullable: true,
    required: false,
    type: Number,
  })
  age?: number;

  /**
   * 달성연도
   */
  @Prop({
    nullable: true,
    required: false,
    type: Number,
  })
  year?: number;

  /**
   * 금액이 필요한 영역인지 여부
   */
  @Prop({
    nullable: true,
    required: false,
    type: Boolean,
    default: false,
  })
  is_money_required?: boolean;

  /**
   * 목표 금액
   */
  @Prop({
    nullable: true,
    required: false,
    type: Number,
  })
  objective_money?: number;

  /**
   * 소멸성/저축성 타입
   */
  @Prop({
    nullable: false,
    required: true,
    type: String,
    enum: Object.values(MoneyType),
  })
  money_type: string;

  /**
   * 목표 달성 완료 체크
   */
  @Prop({
    nullable: true,
    required: false,
    type: Boolean,
    default: false,
  })
  is_objective_achieved?: boolean;

  /**
   * 구체성(Specific)
   */
  @Prop({
    nullable: true,
    required: false,
    type: Boolean,
    default: false,
  })
  specific?: boolean;

  /**
   * 측정 가능성(Measurable)
   */
  @Prop({
    nullable: true,
    required: false,
    type: Boolean,
    default: false,
  })
  measurable?: boolean;

  /**
   * 달성 가능성(Achievable)
   */
  @Prop({
    nullable: true,
    required: false,
    type: Boolean,
    default: false,
  })
  achievable?: boolean;

  /**
   * 비전과의 연관도(Reasoned)
   */
  @Prop({
    nullable: true,
    required: false,
    type: Boolean,
    default: false,
  })
  reasoned?: boolean;

  /**
   * 목표 달성 시간(Time-bound)
   */
  @Prop({
    nullable: true,
    required: false,
    type: Boolean,
    default: false,
  })
  time_bound?: boolean;

  /**
   * 삭제여부
   */
  @Prop({ required: true, type: Boolean, default: false })
  is_deleted: boolean;

  /**
   * 작성날짜 (YYYY-MM-DD)
   */
  @Prop({ required: true, type: mongoose.Schema.Types.Date })
  created_at: string;

  /**
   * 수정날짜 (YYYY-MM-DD)
   */
  @Prop({ required: true, type: mongoose.Schema.Types.Date })
  updated_at: string;
}

const SmallObjectiveSchema = SchemaFactory.createForClass(SmallObjectiveEntity);

/**
 * 직업 스키마 ID 설정
 */
SmallObjectiveSchema.virtual('id').get(function (this: SmallObjectiveDocument) {
  return this._id;
});
SmallObjectiveSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.__v;
  },
});

export { SmallObjectiveSchema };
