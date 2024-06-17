// components/DataTableWrapper.tsx
import React, { ReactNode, useState } from 'react';
import { DataTable, DataTableExpandedRows } from 'primereact/datatable';
import { Column, ColumnProps } from 'primereact/column';
import type { FilterMatchMode } from 'primereact/api';
import { useTranslation } from 'react-i18next';
import useExpanderColumn from './hooks/useExpanderColumn';

interface DataTableWrapperProps<T> {
  data: T[];
  loading: boolean;
  withExpand?: boolean;
  columns: ColumnProps[];
  fieldsToFilter: string[];
  filters: { [key: string]: { value: string; matchMode: FilterMatchMode } };
  headerTemplate: ReactNode;
  emptyMessage?: string;
  rowExpansionTemplate: (data: T) => ReactNode;
}

// const expanderIconTemplate = ({ props: { rowData } }) => {
//   console.log('rowData: ', rowData);
//   if (rowData.address) {
//     return <i className='pi pi-chevron-left'></i>;
//   } else {
//     return (
//       <i className='pi pi-chevron-left pointer-events-none opacity-20'></i>
//     );
//   }
// };

const DataTableWrapper = <T extends object>({
  data,
  loading,
  withExpand = false,
  columns,
  filters,
  fieldsToFilter,
  headerTemplate,
  emptyMessage,
  rowExpansionTemplate,
}: DataTableWrapperProps<T>): JSX.Element => {
  const { t } = useTranslation();
  const [expandedRows, setExpandedRows] = useState<
    DataTableExpandedRows | undefined
  >(undefined);
  const expanderColumn = useExpanderColumn();

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
      pt={{
        loadingOverlay: { className: 'bg-gray-100/50' },
      }}
      rowClassName={() => 'data-table-row'}
      rowExpansionTemplate={rowExpansionTemplate}
      expandedRows={expandedRows}
      onRowToggle={e => {
        console.log(e);
        setExpandedRows(e.data as DataTableExpandedRows);
      }}
    >
      {withExpand && <Column {...expanderColumn} />}
      {columns.map((col, index) => (
        <Column key={index} {...col} />
      ))}
    </DataTable>
  );
};

export default DataTableWrapper;
