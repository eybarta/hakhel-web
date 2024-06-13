import React, { ReactNode } from 'react';
import SearchField from '../fields/SearchField';

interface TableHeaderProps {
  title: string;
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showSearch?: boolean;
  children?: ReactNode;
}

const TableHeader: React.FC<TableHeaderProps> = ({
  title,
  onSearch,
  showSearch = true,
  children,
}) => {
  return (
    <div role='banner' className='flex justify-between items-center'>
      <h1 className='text-2xl font-semibold'>{title}</h1>
      <div className='flex items-center gap-2'>
        {showSearch && <SearchField onChange={onSearch} />}
        {children}
      </div>
    </div>
  );
};

export default TableHeader;
