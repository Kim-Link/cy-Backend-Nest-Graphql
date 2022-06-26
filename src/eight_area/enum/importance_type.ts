import { registerEnumType } from '@nestjs/graphql';

/**
 * 중요도 타입
 */
export enum ImportanceType {
  A = 'A', // 높음
  B = 'B', // 중간
  C = 'C', // 낮음
}

registerEnumType(ImportanceType, {
  name: 'ImportanceType',
});
