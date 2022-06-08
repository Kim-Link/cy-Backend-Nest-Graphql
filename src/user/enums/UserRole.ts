import { registerEnumType } from '@nestjs/graphql';

/**
 * 유저 역할
 */
export enum UserRole {
  USER = 'USER', // 일반 이용자
  ADMIN = 'ADMIN', // 관리자
  CONTSULTANT = 'CONTSULTANT', // 컨설턴트
  AGENCY = 'AGENCY', // 에이전시
}

registerEnumType(UserRole, {
  name: 'UserRole',
});
