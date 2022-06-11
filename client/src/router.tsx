import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';

import SidebarLayout from 'src/layouts/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';
import SuspenseLoader from 'src/components/SuspenseLoader';

const Loader = (Component: any) => (props: any) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

const Login = Loader(lazy(() => import('src/content/Login')));
const Dashboard = Loader(lazy(() => import('src/content/Dashboard')));
const Reports = Loader(lazy(() => import('src/content/Sections/Reports')));
const Payments = Loader(lazy(() => import('src/content/Sections/Payments')));
const Jobs = Loader(lazy(() => import('src/content/Sections/Jobs')));
const JobDetailed = Loader(
  lazy(() => import('src/content/Sections/Jobs/JobDetailedPage'))
);

const Messenger = Loader(lazy(() => import('src/content/Messenger')));

const Workers = Loader(lazy(() => import('src/content/Sections/Workers')));
const WorkerDetailed = Loader(
  lazy(() => import('src/content/Sections/Workers/WorkerDetailedPage'))
);

const NewApplicants = Loader(
  lazy(() => import('src/content/Sections/NewApplicants'))
);

const NewApplicantDetailed = Loader(
  lazy(
    () => import('src/content/Sections/NewApplicants/NewApplicantDetailedPage')
  )
);

const Status404 = Loader(
  lazy(() => import('src/content/pages/Status/Status404'))
);
const Status500 = Loader(
  lazy(() => import('src/content/pages/Status/Status500'))
);
const StatusComingSoon = Loader(
  lazy(() => import('src/content/pages/Status/ComingSoon'))
);
const StatusMaintenance = Loader(
  lazy(() => import('src/content/pages/Status/Maintenance'))
);

const routes: any = (isAuthenticated) => [
  {
    path: '/',
    element: !isAuthenticated ? (
      <BaseLayout />
    ) : (
      <Navigate to="/app/dashboard" />
    ),
    children: [
      {
        path: '/login',
        element: <Login />
      },
      {
        path: 'status',
        children: [
          {
            path: '/',
            element: <Navigate to="404" replace />
          },
          {
            path: '404',
            element: <Status404 />
          },
          {
            path: '500',
            element: <Status500 />
          },
          {
            path: 'maintenance',
            element: <StatusMaintenance />
          },
          {
            path: 'coming-soon',
            element: <StatusComingSoon />
          }
        ]
      },
      {
        path: '/',
        element: <Navigate to="/login" />
      },
      {
        path: '*',
        element: <Status404 />
      }
    ]
  },
  {
    path: '/app',
    element: isAuthenticated ? <SidebarLayout /> : <Navigate to="/login" />,
    children: [
      {
        path: '/',
        element: <Navigate to="/app/dashboard" replace />
      },
      {
        path: 'dashboard',
        element: <Dashboard />
      },
      {
        path: 'workers',
        children: [
          { path: '/', element: <Workers /> },
          { path: '/:id', element: <WorkerDetailed /> }
        ]
      },

      {
        path: 'jobs',
        children: [
          { path: '/', element: <Jobs /> },
          { path: '/:id', element: <JobDetailed /> }
        ]
      },
      {
        path: 'new-applicants',
        children: [
          { path: '/', element: <NewApplicants /> },
          { path: '/:id', element: <NewApplicantDetailed /> }
        ]
      },

      {
        path: 'profile',
        children: [
          {
            path: '/',
            element: <StatusComingSoon />
          },
          {
            path: 'details',
            element: <StatusComingSoon />
          }
        ]
      },
      {
        path: 'woker-requests',
        element: <StatusComingSoon />
      },
      {
        path: 'messenger',
        element: <Messenger />
      },
      {
        path: 'report',
        element: <Reports />
      },
      {
        path: 'inventory',
        element: <StatusComingSoon />
      },
      {
        path: 'payments',
        element: <Payments />
      }
    ]
  }
];
export default routes;
