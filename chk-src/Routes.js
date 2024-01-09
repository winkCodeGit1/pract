import { lazy, useMemo } from 'react';
import { useRoutes } from 'react-router-dom';
//
import componentMap from 'componentMap';
import LoadingScreen from 'components/LoadingScreen';
import useAuth from 'hooks/useAuth';
import ComingSoon from 'pages/ComingSoon';
import Page404 from 'pages/Page404';
import Login from 'pages/auth/Login';
import ResetPassword from 'pages/auth/ResetPassword';
import LandingPage from 'pages/landing';
import AppointmentSchedular from 'pages/opd-ipd-registration/Forms/AppointmentSchedular';
import AssistantRegistration from 'pages/opd-ipd-registration/Forms/AssistantRegistration';

const Dashboard = lazy(() => import('pages/Dashboard'));

//All components import  moved to
//-------- import componentMap from 'componentMap';----------------------

export default function Routes() {
  const { user, isAuthenticated, isInitialized } = useAuth();

  const routes = useMemo(
    () =>
      user?.menuOption.flatMap(({ items }) =>
        items.map(({ children, path, title, tabs }) => {
          if (!children) {
            const ComponentToRender = componentMap[title] || ComingSoon;
            return { path, element: <ComponentToRender tabs={tabs} path={path} title={title} /> };
          }

          return {
            children: children.map(({ path, tabs, title }) => {
              const ComponentToRender = componentMap[title] || ComingSoon;
              return { path, element: <ComponentToRender tabs={tabs} path={path} title={title} /> };
            }),
          };
        })
      ),
    [user, componentMap]
  );

  //Redirecting user to the login page if he tries to enter protect routes

  let notFound = <LoadingScreen />;

  if (isAuthenticated && isInitialized) {
    notFound = <Page404 />;
  } else if (!isAuthenticated && isInitialized) {
    notFound = <LandingPage />;
  }

  let firstRouteObj = {
    path: '/',
    element: <LandingPage />,
  };

  if (routes?.length > 0) {
    firstRouteObj = {
      path: '/',
      element: <Dashboard />,
      children: [...routes],
    };
  }

  const allRoutes = [
    // dynamic rotes
    firstRouteObj,
    //===============================================

    //-------------Unprotected routes -----------------
    { path: '/', element: <LandingPage /> },
    { path: '/login', element: <Login /> },
    { path: '/reset-password', element: <ResetPassword /> },
    { path: '/*', element: notFound },
    { path: '/selfRegistration', element: <AssistantRegistration /> },
    { path: '/scheduleAppointment', element: <AppointmentSchedular /> },
  ];

  return useRoutes(allRoutes);
}
