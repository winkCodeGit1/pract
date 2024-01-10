/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { render, cleanup, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
//

import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ThemeProvider } from '@mui/material';
import Button from 'theme/overrides/Button';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import In from 'date-fns/locale/en-IN';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { BrowserRouter } from 'react-router-dom';

// import { Api } from '@mui/icons-material';

import * as api from 'pages/api/lab/index';
import AddTestMethod from './AddTestMethod';
import TestMethod from '../../lab/testMethod';

const theme = {
  palette: {
    mode: 'light',
    common: {
      black: '#000',
      white: '#fff',
    },
    primary: {
      lighter: '#D1E9FC',
      light: '#76B0F1',
      main: '#2065D1',
      dark: '#103996',
      darker: '#061B64',
      contrastText: '#fff',
    },
    secondary: {
      lighter: '#C8FACD',
      light: '#5BE584',
      main: '#00AB55',
      dark: '#007B55',
      darker: '#005249',
      contrastText: '#fff',
    },
    info: {
      lighter: '#D0F2FF',
      light: '#74CAFF',
      main: '#1890FF',
      dark: '#0C53B7',
      darker: '#04297A',
      contrastText: '#fff',
    },
    success: {
      lighter: '#E9FCD4',
      light: '#AAF27F',
      main: '#54D62C',
      dark: '#229A16',
      darker: '#08660D',
      contrastText: '#212B36',
    },
    warning: {
      lighter: '#FFF7CD',
      light: '#FFE16A',
      main: '#FFC107',
      dark: '#B78103',
      darker: '#7A4F01',
      contrastText: '#212B36',
    },
    error: {
      lighter: '#FFE7D9',
      light: '#FFA48D',
      main: '#FF4842',
      dark: '#B72136',
      darker: '#7A0C2E',
      contrastText: '#fff',
    },
    grey: {
      0: '#FFFFFF',
      50: '#fafafa',
      100: '#F9FAFB',
      200: '#F4F6F8',
      300: '#DFE3E8',
      400: '#C4CDD5',
      500: '#919EAB',
      600: '#637381',
      700: '#454F5B',
      800: '#212B36',
      900: '#161C24',
      5008: 'rgba(145, 158, 171, 0.08)',
      50012: 'rgba(145, 158, 171, 0.12)',
      50016: 'rgba(145, 158, 171, 0.16)',
      50024: 'rgba(145, 158, 171, 0.24)',
      50032: 'rgba(145, 158, 171, 0.32)',
      50048: 'rgba(145, 158, 171, 0.48)',
      50056: 'rgba(145, 158, 171, 0.56)',
      50080: 'rgba(145, 158, 171, 0.8)',
      A100: '#f5f5f5',
      A200: '#eeeeee',
      A400: '#bdbdbd',
      A700: '#616161',
    },
    gradients: {
      primary: 'linear-gradient(to bottom, #76B0F1, #2065D1)',
      info: 'linear-gradient(to bottom, #74CAFF, #1890FF)',
      success: 'linear-gradient(to bottom, #AAF27F, #54D62C)',
      warning: 'linear-gradient(to bottom, #FFE16A, #FFC107)',
      error: 'linear-gradient(to bottom, #FFA48D, #FF4842)',
    },
    chart: {
      violet: ['#826AF9', '#9E86FF', '#D0AEFF', '#F7D2FF'],
      blue: ['#2D99FF', '#83CFFF', '#A5F3FF', '#CCFAFF'],
      green: ['#2CD9C5', '#60F1C8', '#A4F7CC', '#C0F2DC'],
      yellow: ['#FFE700', '#FFEF5A', '#FFF7AE', '#FFF3D6'],
      red: ['#FF6C40', '#FF8F6D', '#FFBD98', '#FFF2D4'],
    },
    divider: 'rgba(145, 158, 171, 0.24)',
    action: {
      active: '#637381',
      hover: 'rgba(145, 158, 171, 0.08)',
      selected: 'rgba(145, 158, 171, 0.16)',
      disabled: 'rgba(145, 158, 171, 0.8)',
      disabledBackground: 'rgba(145, 158, 171, 0.24)',
      focus: 'rgba(145, 158, 171, 0.24)',
      hoverOpacity: 0.08,
      disabledOpacity: 0.48,
      selectedOpacity: 0.08,
      focusOpacity: 0.12,
      activatedOpacity: 0.12,
    },
    text: {
      primary: '#212B36',
      secondary: '#637381',
      disabled: '#919EAB',
    },
    background: {
      paper: '#fff',
      default: '#fff',
      neutral: '#F4F6F8',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  customShadows: {
    z1: '0 1px 2px 0 rgba(145, 158, 171, 0.16)',
    z8: '0 8px 16px 0 rgba(145, 158, 171, 0.16)',
    z12: '0 12px 24px -4px rgba(145, 158, 171, 0.16)',
    z16: '0 16px 32px -4px rgba(145, 158, 171, 0.16)',
    z20: '0 20px 40px -4px rgba(145, 158, 171, 0.16)',
    z24: '0 24px 48px 0 rgba(145, 158, 171, 0.16)',
    primary: '0 8px 16px 0 rgba(32, 101, 209, 0.24)',
    info: '0 8px 16px 0 rgba(24, 144, 255, 0.24)',
    secondary: '0 8px 16px 0 rgba(0, 171, 85, 0.24)',
    success: '0 8px 16px 0 rgba(84, 214, 44, 0.24)',
    warning: '0 8px 16px 0 rgba(255, 193, 7, 0.24)',
    error: '0 8px 16px 0 rgba(255, 72, 66, 0.24)',
    card: '0 0 2px 0 rgba(145, 158, 171, 0.2), 0 12px 24px -4px rgba(145, 158, 171, 0.12)',
    dialog: '-40px 40px 80px -8px rgba(0, 0, 0, 0.24)',
    dropdown: '0 0 2px 0 rgba(145, 158, 171, 0.24), -20px 20px 40px -4px rgba(145, 158, 171, 0.24)',
  },
};

//components

// afterEach function runs after each test suite is executed
afterEach(() => {
  cleanup(); // Resets the DOM after each test suite
});

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
      retry: 1,
      // suspense: true,
    },
  },
});

describe('getButtonStyles', () => {
  it('returns styles based on the provided theme', () => {
    const buttonStyles = Button(theme);

    // Assert specific styles
    expect(buttonStyles.MuiButton.styleOverrides.root['&:hover'].boxShadow).toBe('none');
    expect(buttonStyles.MuiButton.styleOverrides.containedInherit.color).toBe(
      `${theme.palette.grey[800]}`
    );
    expect(buttonStyles.MuiButton.styleOverrides.containedInherit['&:hover'].backgroundColor).toBe(
      `${theme.palette.grey[400]}`
    );
  });
});

test('render consultation correctly', () => {
  render(
    <BrowserRouter>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={In}>
        <QueryClientProvider client={queryClient}>
          <AddTestMethod onClose={() => {}} isEditMode={false} row={null} fuelDetails={null} />
        </QueryClientProvider>
      </LocalizationProvider>
    </BrowserRouter>
  );
});

jest.mock('pages/api/lab', () => ({
  labTestMethodAll: jest.fn(),
  labTestMethodSave: jest.fn(),
}));

describe('TestMethod Component', () => {
  beforeEach(() => jest.clearAllMocks());

  it('should render Test Method when API responds', async () => {
    api.labTestMethodAll.mockImplementation(async (options) => {
      // Check if the signal property is an AbortSignal instance
      if (options.signal instanceof AbortSignal) {
        // Handle the signal object if needed
      }
      return Promise.resolve([]);
    });
    // Render the component
    render(
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={In}>
        <QueryClientProvider client={queryClient}>
          <TestMethod path={'Test'} />
        </QueryClientProvider>
      </LocalizationProvider>
    );

    // Wait for the component to finish fetching data and render the lab name
    await waitFor(() => {
      expect(api.labTestMethodAll).toHaveBeenCalledWith(
        expect.objectContaining({ signal: expect.any(AbortSignal) })
      );
    });
  });
});

describe('TestMethod Component', () => {
  test('handles form submission', async () => {
    const { getByTestId, getByText } = render(
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={In}>
        <QueryClientProvider client={queryClient}>
          <AddTestMethod onClose={() => {}} selectedRow={null} isEditMode={false} />
        </QueryClientProvider>
      </LocalizationProvider>
    );
    const TestMethodInput = getByTestId('Test-Method-Input');

    fireEvent.change(TestMethodInput, { target: { value: 'Test method' } });

    api.labTestMethodSave.mockImplementation(async (options) => {
      // Check if the signal property is an AbortSignal instance
      if (options.signal instanceof AbortSignal) {
        // Handle the signal object if needed
      }
      return Promise.resolve({});
    });

    fireEvent.click(getByText(/Submit/i));

    // Wait for the asynchronous operation to complete
    // await waitFor(() => {
    //   // Add assertions for the success state
    //   // For example, assert that a success message is rendered
    //   expect(getByText(/Saved Successfully/i)).toBeInTheDocument();
    // });

    // Add assertions for any side effects or changes in the UI after form submission
  });
});
