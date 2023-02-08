import React from 'react';

export const samplePagesConfigs = [
  {
    path: '/sample/education',
    component: React.lazy(() => import('./AddEdu')),
  },
  {
    path: '/sample/lang',
    component: React.lazy(() => import('./AddLang')),
  },
  {
    path: '/sample/subject',
    component: React.lazy(() => import('./AddSubject')),
  },
  {
    path: '/sample/it',
    component: React.lazy(() => import('./AddIt')),
  },
  {
    path: '/sample/other',
    component: React.lazy(() => import('./AddOther')),
  },
];
