import { Outlet, type RouteObject } from 'react-router-dom';

import { ROUTE_PATH } from '@constants';
import { HomeClient } from '@pages';
import { LayoutClient } from '@layout';

/**
 *  Purchase page link for users
 */

const clientRoutes: RouteObject = {
   path: ROUTE_PATH.CLIENT_HOME,
   element: (
      <LayoutClient>
         <Outlet />
      </LayoutClient>
   ),
   children: [
      {
         index: true,
         element: <HomeClient />,
      },
   ],
};

export default clientRoutes;
