import React from 'react';
import {MdOutlineManageAccounts,MdSubject} from 'react-icons/md';
import {FaGlobeAmericas, FaGraduationCap} from 'react-icons/fa'
import {SiBookstack} from 'react-icons/si';
import {HiOutlineCode} from 'react-icons/hi';

const routesConfig = [
  {
    id: 'app',
    title: 'Sample',
    messageId: 'sidebar.sample',
    type: 'group',
    children: [
      {
        id: 'education',
        title: 'Page 1',
        messageId: 'sidebar.sample.page1',
        type: 'item',
        icon: <FaGraduationCap />,
        path: '/sample/education',
      },
      {
        id: 'lang',
        title: 'Page 2',
        messageId: 'sidebar.sample.page2',
        type: 'item',
        icon: <FaGlobeAmericas />,
        path: '/sample/lang',
      },
      {
        id: 'subject',
        title: 'Page 3',
        messageId: 'sidebar.sample.page3',
        type: 'item',
        icon: <SiBookstack />,
        path: '/sample/subject',
      },
      {
        id: 'it',
        title: 'Page 4',
        messageId: 'sidebar.sample.page4',
        type: 'item',
        icon: <HiOutlineCode />,
        path: '/sample/it',
      },
      {
        id: 'other',
        title: 'Page 5',
        messageId: 'sidebar.sample.page5',
        type: 'item',
        icon: <MdSubject />,
        path: '/sample/other',
      },
    ],
  },
  {
    id: 'extra-pages',
    title: 'Extra Pages',
    messageId: 'sidebar.pages.extraPages',
    path: 'extra-pages',
    type: 'group',
    children: [
      {
        id: 'account',
        title: 'Account',
        messageId: 'sidebar.pages.extraPages.account',
        icon: <MdOutlineManageAccounts />,
        path: '/extra-pages/user-profile',
      },
    ],
  },
];
export default routesConfig;
