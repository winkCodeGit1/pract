import { createRoot } from 'react-dom/client';
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import In from 'date-fns/locale/en-IN';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { toast } from 'react-toastify';
//
import { CollapseDrawerProvider } from 'contexts/CollapseDrawerContext';
import { AuthProvider } from 'contexts/JWTContext';
import { SettingsProvider } from 'contexts/SettingsContext';
import { IS_DEVELOPMENT } from 'config';
import App from 'App';
import './index.css';
import { StrictMode } from 'react';

const container = document.getElementById('root');
const root = createRoot(container);
const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      console.log(error);
      IS_DEVELOPMENT && toast.error(JSON.stringify(error));
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      console.log(error);
      IS_DEVELOPMENT && toast.error(JSON.stringify(error));
    },
  }),

  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retryOnMount: false,
      retry: 0,
      // suspense: true,
    },
  },
});

root.render(
  <StrictMode>
    <AuthProvider>
      <CollapseDrawerProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={In}>
          <SettingsProvider>
            <QueryClientProvider client={queryClient}>
              <App />
              <ReactQueryDevtools buttonPosition='bottom-left' />
            </QueryClientProvider>
          </SettingsProvider>
        </LocalizationProvider>
      </CollapseDrawerProvider>
    </AuthProvider>
  </StrictMode>
);
