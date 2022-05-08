import * as mongoose from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { FinanceType } from '../enums/finance_type';
import { FinanceEntity } from './finance.entity';

export type FinanceDocument = DecadeFinanceEntity & Document;
@Schema()
export class DecadeFinanceEntity {
  /**
   * 7대영역 아이디
   */
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  ref_id?: FinanceEntity;

  /**
   * 설정년도
   */
  @Prop({
    nullable: true,
    required: false,
    type: Number,
  })
  setting_year?: number;

  /**
   * 설정 월
   */
  @Prop({
    nullable: true,
    required: false,
    type: Number,
  })
  setting_month?: number;

  /**
   * 설정 주
   */
  @Prop({
    nullable: true,
    required: false,
    type: Number,
  })
  setting_week?: number;

  /**
   * 소멸성 지출
   */
  @Prop({
    nullable: true,
    required: false,
    type: Number,
  })
  extinctive_expense?: number;

  /**
   * 저축성 지출
   */
  @Prop({
    nullable: true,
    required: false,
    type: Number,
  })
  saving_expense?: number;

  /**
   * 소멸성 지출 비율(직업)
   */
  @Prop({
    nullable: true,
    required: false,
    type: Number,
  })
  career_extintive_ratio?: number;

  /**
   * 저출성 지출 비율(직업)
   */
  @Prop({
    nullable: true,
    required: false,
    type: Number,
  })
  career_saving_ratio?: number;

  /**
   * 소멸성 지출 비율(학습)
   */
  @Prop({
    nullable: true,
    required: false,
    type: Number,
  })
  study_extintive_ratio?: number;

  /**
   * 저출성 지출 비율(학습)
   */
  @Prop({
    nullable: true,
    required: false,
    type: Number,
  })
  study_saving_ratio?: number;

  /**
   * 소멸성 지출 비율(건강)
   */
  @Prop({
    nullable: true,
    required: false,
    type: Number,
  })
  health_extintive_ratio?: number;

  /**
   * 저축성 지출 비율(건강)
   */
  @Prop({
    nullable: true,
    required: false,
    type: Number,
  })
  health_saving_ratio?: number;

  /**
   * 소멸성 지출 비율(관계)
   */
  @Prop({
    nullable: true,
    required: false,
    type: Number,
  })
  relationship_extintive_ratio?: number;

  /**
   * 저축성 지출 비율(관계)
   */
  @Prop({
    nullable: true,
    required: false,
    type: Number,
  })
  relationship_saving_ratio?: number;

  /**
   * 소멸성 지출 비율(주거)
   */
  @Prop({
    nullable: true,
    required: false,
    type: Number,
  })
  living_extintive_ratio?: number;

  /**
   * 저축성 지출 비율(주거)
   */
  @Prop({
    nullable: true,
    required: false,
    type: Number,
  })
  living_saving_ratio?: number;

  /**
   * 소멸성 지출 비율(사회참여)
   */
  @Prop({
    nullable: true,
    required: false,
    type: Number,
  })
  social_extintive_ratio?: number;

  /**
   * 저축성 지출 비율(사회참여)
   */
  @Prop({
    nullable: true,
    required: false,
    type: Number,
  })
  social_saving_ratio?: number;

  /**
   * 소멸성 지출 비율(여가)
   */
  @Prop({
    nullable: true,
    required: false,
    type: Number,
  })
  leisure_extintive_ratio?: number;

  /**
   * 저축성 지출 비율(여가)
   */
  @Prop({
    nullable: true,
    required: false,
    type: Number,
  })
  leisure_saving_ratio?: number;

  /**
   * 소멸성 지출 비율(재무)
   */
  @Prop({
    nullable: true,
    required: false,
    type: Number,
  })
  finance_extintive_ratio?: number;

  /**
   * 저축성 지출 비율(재무)
   */
  @Prop({
    nullable: true,
    required: false,
    type: Number,
  })
  finance_saving_ratio?: number;

  /**
   * 연금소득
   */
  @Prop({
    nullable: true,
    required: false,
    type: Number,
  })
  pension_income?: number;

  /**
   * 근로 소득
   */
  @Prop({
    nullable: true,
    required: false,
    type: Number,
  })
  working_income?: number;

  /**
   * 자산 소득
   */
  @Prop({
    nullable: true,
    required: false,
    type: Number,
  })
  asset_income?: number;

  /**
   * 이전 소득
   */
  @Prop({
    nullable: true,
    required: false,
    type: Number,
  })
  transfer_income?: number;

  /**
   * 기타소득
   */
  @Prop({
    nullable: true,
    required: false,
    type: Number,
  })
  etc_income?: number;

  /**
   * 상속
   */
  @Prop({
    nullable: true,
    required: false,
    type: Number,
  })
  inheritance_income?: number;

  /**
   * 연말 목표자산
   */
  @Prop({
    nullable: true,
    required: false,
    type: Number,
  })
  year_end_objective_asset?: number;

  /**
   * 부동산 자산
   */
  @Prop({
    nullable: true,
    required: false,
    type: Number,
  })
  real_estate_asset?: number;

  /**
   * 사용 자산
   */
  @Prop({
    nullable: true,
    required: false,
    type: Number,
  })
  use_asset?: number;

  /**
   * 현금성 자산
   */
  @Prop({
    nullable: true,
    required: false,
    type: Number,
  })
  cash_asset?: number;

  /**
   * 금융 자산
   */
  @Prop({
    nullable: true,
    required: false,
    type: Number,
  })
  banking_asset?: number;

  /**
   * 보장 자산
   */
  @Prop({
    nullable: true,
    required: false,
    type: Number,
  })
  guarantee_asset?: number;

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

const FinanceSchema = SchemaFactory.createForClass(DecadeFinanceEntity);

/**
 * 직업 스키마 ID 설정
 */
FinanceSchema.virtual('id').get(function (this: FinanceDocument) {
  return this._id;
});
FinanceSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.__v;
  },
});

export { FinanceSchema };
