import { Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from 'react-router-dom';
//
import ThemeProvider from 'theme';
import Settings from 'components/settings';
import LoadingScreen from 'components/LoadingScreen';
import useSettings from 'hooks/useSettings';
import AllRoutes from 'Routes.js';

export default function App() {
  const settings = useSettings();

  return (
    <>
      <ToastContainer limit={3} theme={settings.themeMode} />
      <BrowserRouter>
        <ThemeProvider>
          <Settings />
          <Suspense fallback={<LoadingScreen />}>
            <AllRoutes />
          </Suspense>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}
