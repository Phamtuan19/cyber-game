import { Outlet, type RouteObject } from 'react-router-dom';

import PrivateRouter from '../components/private-router';

import { ROUTE_PATH } from '@constants';
import LayoutAdmin from '@layout/admin';
import { AdminProduct, Dashboard, Desktop, Rom } from '@pages/admin';

const adminRoutes: RouteObject = {
   path: ROUTE_PATH.ADMIN_HOME,
   element: (
      <PrivateRouter>
         <LayoutAdmin>
            <Outlet />
         </LayoutAdmin>
      </PrivateRouter>
   ),
   children: [
      {
         index: true,
         element: <Dashboard />,
      },
      {
         path: ROUTE_PATH.ADMIN_PRODUCTS,
         element: <AdminProduct />,
      },
      {
         path: ROUTE_PATH.ADMIN_DESKTOP,
         element: <Desktop />,
      },
      {
         path: ROUTE_PATH.ADMIN_ROM,
         element: <Rom />,
      },
   ],
};

export default adminRoutes;
