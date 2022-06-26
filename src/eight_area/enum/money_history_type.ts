import { registerEnumType } from '@nestjs/graphql';

/**
 * 재무관리 타입
 */
export enum MoneyHistoryType {
  // 지출
  EXPANSE = 'EXPANSE',
  // 수입
  INCOME = 'INCOME',
  // 자산
  ASSET = 'ASSET',
}

registerEnumType(MoneyHistoryType, {
  name: 'MoneyHistoryType',
});
