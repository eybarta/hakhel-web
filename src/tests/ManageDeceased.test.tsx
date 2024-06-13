import React, { ReactNode } from 'react';
import { fireEvent, waitFor, within } from '@testing-library/react';
import { render, screen } from './test-utils'; // Use your custom render
import '@testing-library/jest-dom';
import ManageDeceased from '../pages/ManageDeceased';
import TableHeader from '@components/table/TableHeader';
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

// interface TableHeaderProps {
//   title: string;
//   onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   children?: ReactNode;
// }

// // Mock TableHeader component
// jest.mock(
//   '@components/table/TableHeader',
//   () =>
//     ({ title, onSearch, children }: TableHeaderProps) =>
//       (
//         <div>
//           <h1>{title}</h1>
//           <input data-testid='search-input' onChange={onSearch} />
//           {children}
//         </div>
//       )
// );

// ...

describe('ManageDeceased component', () => {
  test('search input filters data correctly', async () => {
    // Render the component
    render(<ManageDeceased />);

    // Get the TableHeader component
    const tableHeader = screen.getByRole('banner');
    const searchInput = within(tableHeader).getByTestId('search-input');

    await waitFor(() => {
      expect(searchInput).toBeInTheDocument();
    });

    // Simulate typing into the search input
    fireEvent.change(searchInput, { target: { value: 'רחל' } });

    // ... (the rest of your test remains the same)
  });
});
