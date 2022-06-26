import { registerEnumType } from '@nestjs/graphql';

/**
 * 활동 구분
 */
export enum ActivityType {
  // 목표 활동
  OBJECTIVE_ACTIVITY = 'OBJECTIVE',
  // 일반 활동
  NORMAL_ACTIVITY = 'NORMAL',
}

// GraphQL Enums
registerEnumType(ActivityType, {
  name: 'ActivityType',
});
