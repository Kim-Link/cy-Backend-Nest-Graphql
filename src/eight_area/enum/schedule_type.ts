import { registerEnumType } from '@nestjs/graphql';

/**
 * 일정 타입
 */
export enum ScheduleType {
  // 시드 - 반복되는 일정
  SEED = 'SEED',
  // 일정 - 반복 없는 일정
  SCHEDULE = 'SCHEDULE',
}

registerEnumType(ScheduleType, {
  name: 'ScheduleType',
});
