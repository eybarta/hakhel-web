import React, { ReactNode } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ManageDeceased from '../ManageDeceased';
// Mock useTranslation hook
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

interface TableHeaderProps {
  title: string;
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children?: ReactNode;
}

// Mock TableHeader component
jest.mock(
  '@components/table/TableHeader',
  () =>
    ({ title, onSearch, children }: TableHeaderProps) =>
      (
        <div>
          <h1>{title}</h1>
          <input data-testid='search-input' onChange={onSearch} />
          {children}
        </div>
      )
);

describe('ManageDeceased component', () => {
  test('search input filters data correctly', () => {
    // Render the component
    render(<ManageDeceased />);

    // Get the search input
    const searchInput = screen.getByTestId('search-input');

    // Simulate typing into the search input
    fireEvent.change(searchInput, { target: { value: 'רחל' } });

    // Check if the filters state was updated (assuming you have some way to verify this)
    // This could be verifying some visible data or checking internal state if exposed
    // For this example, let's assume we are checking the rendered list items
    // You will need to adjust this part to fit how your data is displayed and filtered
    const filteredItem = screen.getByText(/רחל/i);
    expect(filteredItem).toBeInTheDocument();
  });
});
