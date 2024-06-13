import React, { ReactNode } from 'react';
import { fireEvent, waitFor, within } from '@testing-library/react';
import { render, screen } from './test-utils'; // Use your custom render
import '@testing-library/jest-dom';
import api from '@services/api/apiService'; // Import the real API module
import mockDeceasedData from '/src/__mocks__/data/mockDeceasedData.js'; // Import mock data

import ManageDeceased from '../pages/ManageDeceased';
// import TableHeader from '@components/table/TableHeader';

jest.mock('@services/api/apiService'); // Mock the API module

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('ManageDeceased component', () => {
  beforeEach(() => {
    api.get.mockClear();
  });

  test('search input filters data correctly', async () => {
    // Set up the mock API call to return the mock data
    api.get.mockResolvedValue({ data: mockDeceasedData });

    // Render the component
    render(<ManageDeceased />);

    // Wait for the data to be loaded and a row to be present
    const initialRow = await waitFor(() => screen.getAllByRole('row')[1]); // Assuming the first row is a header
    console.log('initialRow: ', initialRow);

    if (initialRow) {
      // Log the initial rows before search
      const initialRows = screen.getAllByRole('row');
      console.log('Initial rows count:', initialRows.length);
      initialRows.forEach((row, index) => {
        console.log(`Row ${index + 1}: ${row.textContent}`);
      });

      // Get the search input element
      const searchInput = screen.getByTestId('search-input');

      // Ensure the search input is in the document
      expect(searchInput).toBeInTheDocument();

      // Simulate typing into the search input
      fireEvent.change(searchInput, { target: { value: 'רחל' } });

      // Verify the table rows are filtered correctly
      await waitFor(() => {
        const tableBody = screen.getByRole('rowgroup'); // Assuming rowgroup is used for tbody
        const dataRows = within(tableBody).getAllByRole('row');

        // Log the rows after search
        console.log('Filtered rows count:', dataRows.length);
        dataRows.forEach((row, index) => {
          console.log(`Row ${index + 1}: ${row.textContent}`);
        });

        // Filter the rows that contain the search term
        const filteredRows = dataRows.filter(row =>
          row?.textContent?.includes('רחל')
        );

        // Assert that the correct number of rows are present
        expect(filteredRows.length).toBe(1); // Adjust the number based on your expected filtered result
        expect(filteredRows[0]).toHaveTextContent('רחל');

        // Optionally, check that the non-matching row is not present
        expect(screen.queryByText('NonMatchingName')).not.toBeInTheDocument();
      });
    }
  });
});

// describe('ManageDeceased component', () => {
//   test('search input filters data correctly', async () => {
//     // Render the component
//     render(<ManageDeceased />);

//     // Wait for the data to be loaded and rows to be present
//     const initialRows = await screen.findAllByRole('row'); // This will wait for any row to appear
//     console.log('initialRows: ', initialRows);

//     // Ensure there are initial rows before search
//     expect(initialRows.length).toBeGreaterThan(1); // Assuming there's at least one data row

//     // Log the initial rows before search
//     console.log('Initial rows count:', initialRows.length);
//     initialRows.forEach((row, index) => {
//       console.log(`Row ${index + 1}: ${row.textContent}`);
//     });

//     // Get the search input element
//     const searchInput = screen.getByTestId('search-input');

//     // Ensure the search input is in the document
//     expect(searchInput).toBeInTheDocument();

//     // Simulate typing into the search input
//     fireEvent.change(searchInput, { target: { value: 'רחל' } });

//     // Verify the table rows are filtered correctly
//     await waitFor(() => {
//       // Use a more specific query to get rows within the table body
//       const tableBody = screen.getByRole('tbody'); // Assuming rowgroup is used for tbody
//       console.log('tableBody: ', tableBody);
//       const dataRows = within(tableBody).getAllByRole('row');

//       // Log the rows after search
//       console.log('Filtered rows count:', dataRows.length);
//       dataRows.forEach((row, index) => {
//         console.log(`Row ${index + 1}: ${row.textContent}`);
//       });

//       // Filter the rows that contain the search term
//       const filteredRows = dataRows.filter(row =>
//         row?.textContent?.includes('רחל')
//       );

//       // Assert that the correct number of rows are present
//       expect(filteredRows.length).toBe(1); // Adjust the number based on your expected filtered result
//       expect(filteredRows[0]).toHaveTextContent('רחל');

//       // Optionally, check that the non-matching row is not present
//       expect(screen.queryByText('NonMatchingName')).not.toBeInTheDocument();
//     });
//   });
// });
