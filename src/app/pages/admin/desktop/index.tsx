import React from 'react';

import BaseBreadcrumbs from '@components/design-systems/BaseBreadcrumbs/BaseBreadcrumbs';
import { ROUTE_PATH } from '@constants';

const breadcrumbs = [
   {
      title: 'Trang Chủ',
      link: ROUTE_PATH.ADMIN_HOME,
   },
];

const Desktop = () => {
   return <BaseBreadcrumbs arialabel="Danh sách thiết bị" breadcrumbs={breadcrumbs}></BaseBreadcrumbs>;
};

export { Desktop };
