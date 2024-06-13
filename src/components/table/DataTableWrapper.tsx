// components/DataTableWrapper.tsx
import React, { ReactNode } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column, ColumnProps } from 'primereact/column';
import type { FilterMatchMode } from 'primereact/api';
import { useTranslation } from 'react-i18next';

interface DataTableWrapperProps<T> {
  data: T[];
  loading: boolean;
  columns: ColumnProps[];
  fieldsToFilter: string[];
  filters: { [key: string]: { value: string; matchMode: FilterMatchMode } };
  headerTemplate: ReactNode;
  emptyMessage?: string;
}

const DataTableWrapper = <T extends object>({
  data,
  loading,
  columns,
  filters,
  fieldsToFilter,
  headerTemplate,
  emptyMessage,
}: DataTableWrapperProps<T>): JSX.Element => {
  const { t } = useTranslation();

  return (
    <DataTable
      value={data}
      header={headerTemplate}
      loading={loading}
      emptyMessage={emptyMessage || t('No data available')}
      globalFilterFields={fieldsToFilter || []}
      filters={filters}
      stripedRows
      scrollable
      scrollHeight='600px'
      virtualScrollerOptions={{ itemSize: 46 }}
      tableStyle={{ minWidth: '50rem' }}
      pt={{ loadingOverlay: { className: 'bg-gray-100/50' } }}
      rowClassName={() => 'data-table-row'}
    >
      {columns.map((col, index) => (
        <Column key={index} {...col} />
      ))}
    </DataTable>
  );
};

export default DataTableWrapper;
