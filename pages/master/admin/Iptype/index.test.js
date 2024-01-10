/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { render, fireEvent, waitFor, getByTestId, getByText } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddIpType from './AddIpType';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import In from 'date-fns/locale/en-IN';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// Mock the API function
import { departmentTypeSaveDeptType } from 'pages/api/master';
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { IS_DEVELOPMENT } from 'config';

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

jest.mock('pages/api/master', () => ({
  departmentTypeSaveDeptType: jest.fn(),
}));

describe('AddIpType Component', () => {
  test('handles form submission', async () => {
    const { getByTestId, getByText } = render(
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={In}>
        <QueryClientProvider client={queryClient}>
          <AddIpType onClose={() => {}} selectedRow={null} ipDetail={[]} isEditMode={false} />
        </QueryClientProvider>
      </LocalizationProvider>
    );
    const ipTypeInput = getByTestId('ip-type-input');
    const shortNameInput = getByTestId('short-name-input');

    fireEvent.change(ipTypeInput, { target: { value: 'Test IP' } });
    fireEvent.change(shortNameInput, { target: { value: 'Test Short' } });

    // Mock the API function implementation for a successful response
    // const responseData = [{ labName: 'eke44545ek' }];
    // Mock the API function to resolve with the response data
    departmentTypeSaveDeptType.mockImplementation(async (options) => {
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
