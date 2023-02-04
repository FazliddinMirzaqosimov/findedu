import React from 'react';
import {BiAlignLeft} from 'react-icons/bi';
import {MdOutlineManageAccounts} from 'react-icons/md';

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
        icon: <BiAlignLeft />,
        path: '/sample/education',
      },
      {
        id: 'lang',
        title: 'Page 2',
        messageId: 'sidebar.sample.page2',
        type: 'item',
        icon: <BiAlignLeft />,
        path: '/sample/lang',
      },
      {
        id: 'subject',
        title: 'Page 3',
        messageId: 'sidebar.sample.page3',
        type: 'item',
        icon: <BiAlignLeft />,
        path: '/sample/subject',
      },
      {
        id: 'it',
        title: 'Page 4',
        messageId: 'sidebar.sample.page4',
        type: 'item',
        icon: <BiAlignLeft />,
        path: '/sample/it',
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
