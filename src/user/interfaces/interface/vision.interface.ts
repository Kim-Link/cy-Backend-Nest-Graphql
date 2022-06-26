import { IUser } from './user.interface';

export interface IVision extends IUser {
  /**
   * 직업 비전
   */
  readonly career_vision?: string;

  /**
   * 학습 비전
   */
  readonly study_vision?: string;

  /**
   * 건강 비전
   */
  readonly health_vision?: string;

  /**
   * 관계 비전
   */
  readonly relationship_vision?: string;

  /**
   * 주거 비전
   */
  readonly living_vision?: string;

  /**
   * 사회참여 비전
   */
  readonly social_vision?: string;

  /**
   * 여가 비전
   */
  readonly leisure_vision?: string;

  /**
   * 재무 비전
   */
  readonly finance_vision?: string;
}
