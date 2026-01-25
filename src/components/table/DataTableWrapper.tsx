// components/DataTableWrapper.tsx
import { ReactNode, useState } from 'react';
import { DataTable, DataTableExpandedRows } from 'primereact/datatable';
import { Column, ColumnProps } from 'primereact/column';
import type { FilterMatchMode } from 'primereact/api';
import { useTranslation } from 'react-i18next';
import useExpanderColumn from './hooks/useExpanderColumn';

interface DataTableWrapperProps<T> {
  data: T[];
  loading: boolean;
  columns: ColumnProps[];
  fieldsToFilter: string[];
  filters: { [key: string]: { value: string; matchMode: FilterMatchMode } };
  headerTemplate: ReactNode;
  emptyMessage?: string;
  withExpand?: boolean;
  expanderProp?: keyof T;
  rowExpansionTemplate?: (data: T) => ReactNode;
}
const DataTableWrapper = <T extends object>({
  data,
  loading,
  columns,
  filters,
  fieldsToFilter,
  headerTemplate,
  emptyMessage,
  withExpand = false,
  expanderProp,
  rowExpansionTemplate,
}: DataTableWrapperProps<T>): JSX.Element => {
  const { t } = useTranslation();
  const [expandedRows, setExpandedRows] = useState<
    DataTableExpandedRows | undefined
  >(undefined);
  const expanderKey = (expanderProp ?? 'id') as keyof T & string;
  const expanderColumn = useExpanderColumn(expanderKey);

  return (
    <DataTable
      value={data}
      header={headerTemplate}
      loading={loading}
      emptyMessage={emptyMessage || t('no data available')}
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
