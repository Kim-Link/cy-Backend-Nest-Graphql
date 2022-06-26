import { Prop, Schema } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { UserEntity } from 'src/user/entities/user.entity';
import { AreaType } from '../enum/area_type';
import { MoneyHistoryType } from '../enum/money_history_type';
import { MoneyType } from '../enum/money_type';

export type MoneyHistoryDocument = MoneyHistoryEntity & Document;

@Schema()
export class MoneyHistoryEntity {
  /**
   * 재무관리 타입(지출, 소득, 자산)
   *! 필수
   */
  @Prop({
    nullable: true,
    required: false,
    type: String,
    enum: Object.values(MoneyHistoryType),
  })
  money_history_type?: string;

  /**
   * 유저 참조  [ 지출 / 소득 / 자산 ]
   *! 필수
   */
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  user_id: UserEntity;

  /**
   * 8대영역 구분 [ 지출 / 소득 / 자산 ]
   *! 필수
   */
  @Prop({
    nullable: true,
    required: false,
    type: String,
    enum: Object.values(AreaType),
  })
  area_type?: string;

  /**
   * 타이틀 [ 지출 / 소득 / 자산 ]
   *? 지출 - 선택
   */
  @Prop({
    nullable: true,
    required: false,
    type: String,
  })
  money_history_title?: string;

  /**
   * 카테고리 1 [ 지출 / 소득 / 자산 ]
   *! 지출 - 필수
   */
  @Prop({
    nullable: true,
    required: false,
    type: String,
  })
  first_item?: string;

  /**
   * 카테고리 2 [ 지출 / 소득 / 자산 ]
   *! 지출 - 필수
   */
  @Prop({
    nullable: true,
    required: false,
    type: String,
  })
  second_item?: string;

  /**
   * 카테고리 3 [ 지출 / 소득 / 자산 ]
   *! 지출 - 필수
   */
  @Prop({
    nullable: true,
    required: false,
    type: String,
  })
  third_item?: string;

  /**
   * 활동 날짜 [ 지출 / 소득 ]
   *! 지출 - 필수
   */
  @Prop({ required: false, type: mongoose.Schema.Types.Date })
  activity_date?: string;

  /**
   * 지출 목표 금액 [ 지출 ]
   *? 선택
   */
  @Prop({
    nullable: true,
    required: false,
    type: Number,
    default: 0,
  })
  objective_money?: number;

  /**
   * 지출 금액 [ 지출 ]
   *! 필수
   */
  @Prop({
    nullable: true,
    required: false,
    type: Number,
    default: 0,
  })
  expanse_money?: number;

  /**
   * 구분(소멸성, 저축성) [ 지출 ]
   *! 필수, 디폴트 소멸성
   */
  @Prop({
    nullable: true,
    required: false,
    type: String,
    enum: Object.values(MoneyType),
  })
  money_type?: string;

  /**
   * 장소 [ 지출 ]
   *? 선택
   */
  @Prop({
    nullable: true,
    required: false,
    type: String,
  })
  space?: string;

  /**
   * 소득 금액 [ 소득 ]
   */
  @Prop({
    nullable: true,
    required: false,
    type: Number,
    default: 0,
  })
  money?: number;

  /**
   * 소득 거래처 [ 소득 ]
   */
  @Prop({
    nullable: true,
    required: false,
    type: String,
  })
  account?: string;

  /**
   * 입금처 [ 소득 ]
   *? 선택
   */
  @Prop({
    nullable: true,
    required: false,
    type: String,
  })
  income_account?: string;

  /**
   * 삭제여부
   */
  @Prop({ required: false, type: Boolean, default: false })
  is_deleted: boolean;
}
