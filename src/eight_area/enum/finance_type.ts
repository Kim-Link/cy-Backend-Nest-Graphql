import { registerEnumType } from '@nestjs/graphql';

/**
 * 재무 타입
 */
export enum FinanceType {
  SHORT = 'SHORT',
  MIDDLE = 'MIDDLE',
  LONG = 'LONG',
}

registerEnumType(FinanceType, {
  name: 'FinanceType',
});
