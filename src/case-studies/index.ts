import type { ComponentType } from 'react';
import { KnottyCaseStudy } from './knotty/KnottyCaseStudy';

/** 프로젝트 id별 상세 케이스 스터디. 없으면 기본 상세 화면을 사용한다. */
export const caseStudies: Record<string, ComponentType | undefined> = {
  knotty: KnottyCaseStudy,
};
