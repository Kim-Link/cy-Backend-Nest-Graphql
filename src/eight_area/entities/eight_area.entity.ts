import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { UserEntity } from 'src/user/entities/user.entity';
import { AreaType } from '../enum/area_type';
import { MoneyType } from '../enum/money_type';
import { BigObjectiveEntity } from './big_objective.entity';

export type EightAreaDocument = EightAreaEntity & Document;

@Schema({
  versionKey: false,
  collection: 'EightArea',
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
export class EightAreaEntity {
  /**
   * 유저 아이디
   */
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  user_id: UserEntity;

  /**
   * 대목표
   */
  @Prop({ type: [mongoose.Schema.Types.ObjectId] })
  big_objective?: BigObjectiveEntity[];

  /**
   * 8대 영역 타입
   */
  @Prop({
    nullable: true,
    required: false,
    type: String,
    enum: Object.values(AreaType),
  })
  area_type?: string;

  /**
   * 최종 목표
   */
  @Prop({
    nullable: true,
    required: false,
    type: String,
  })
  final_objective_content?: string;

  /**
   * 최종목표 달성나이
   */
  @Prop({
    nullable: true,
    required: false,
    type: Number,
    default: 0,
  })
  age?: number;

  /**
   * 최종목표 달성년도
   */
  @Prop({
    nullable: true,
    required: false,
    type: Number,
    default: 0,
  })
  year?: number;

  /**
   * 최종목표가 금액이 필요한 영역인지 여부
   */
  @Prop({
    nullable: true,
    required: false,
    type: Boolean,
    default: false,
  })
  is_money_required?: boolean;

  /**
   * 최종목표의 is_money_required = true인 경우
   * 최종목표의 목표 금액
   */
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
  money_type?: string;

  /**
   * 최종목표의 목표 달성 완료 체크
   */
  @Prop({
    nullable: true,
    required: false,
    type: Boolean,
    default: 0,
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
}

const EightAreaSchema = SchemaFactory.createForClass(EightAreaEntity);

export { EightAreaSchema };
