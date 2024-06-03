// React + Locale
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

// Global Contexts
import { useToast } from '/src/components/context/ToastContext';
import { useDialog } from '/src/components/context/DialogContext';

// PrimeReact UI components
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';

// App Components
import FormEditDeceased from '/src/components/forms/FormEditDeceased';
// State (Recoil)
import { useRecoilValueLoadable, useSetRecoilState } from 'recoil';

import {
  cemeteriesDataSelector,
  deceasedDataSelector,
  deceasedFetchVersionAtom,
} from '../services/state/selectors';

// Types
import { DeceasedPersonInterface } from '../types/deceased';
import { CemeteryInterface } from '../types/cemeteries';

const ManageDeceased = () => {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const { showDialog, hideDialog } = useDialog();
  const [deceasedPeople, setDeceasedPeople] = useState<
    DeceasedPersonInterface[] | []
  >([]);
  const [cemeteries, setCemeteries] = useState<CemeteryInterface[] | []>([]);
  const cemeteriesLoadable = useRecoilValueLoadable(cemeteriesDataSelector);
  const deceasedLoadable = useRecoilValueLoadable(deceasedDataSelector);
  const [filters, setFilters] = useState({
    global: { value: '', matchMode: FilterMatchMode.CONTAINS },
  });
  const refetchDeceased = useSetRecoilState(deceasedFetchVersionAtom('latest'));

  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFilters({
      ...filters,
      global: { ...filters.global, value: e.target.value },
    });

  // Load data
  useEffect(() => {
    if (deceasedLoadable.state === 'hasValue') {
      setDeceasedPeople(deceasedLoadable.contents);
    }
  }, [deceasedLoadable.state, deceasedLoadable.contents]);
  useEffect(() => {
    if (cemeteriesLoadable.state === 'hasValue') {
      setCemeteries(cemeteriesLoadable.contents);
    }
  }, [cemeteriesLoadable.state, cemeteriesLoadable.contents]);
  /////////////

  // Methods
  const findCemetery = (id: number) => {
    if (cemeteries) {
      return cemeteries.find((c: CemeteryInterface) => c.id === id);
    }
    return null;
  };
  const deleteDeceased = (data: DeceasedPersonInterface) => {};

  const editDeceased = (data: DeceasedPersonInterface | null) => {
    showDialog(
      <FormEditDeceased
        propValues={data}
        closeDialog={hideDialog}
        submit={onSubmit}
      />
    );
  };

  const onSubmit = (result: DeceasedPersonInterface) => {
    const summary = 'פרטי נפטר עודכנו בהצלחה';
    refetchDeceased(version => version + 1);
    showToast({ severity: 'success', summary });
    hideDialog();
  };
  // UI Renderers
  const tableHeaderTemplate = () => {
    return (
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-semibold'>{t('Deceased people')}</h1>
        <div className='flex items-center gap-2'>
          <IconField size={1} iconPosition='right'>
            <InputIcon className='pi pi-search'> </InputIcon>
            <InputText
              onChange={onGlobalFilterChange}
              placeholder={t('Search')}
            />
          </IconField>
          <Button
            icon='pi pi-plus'
            severity='info'
            raised
            outlined
            size='small'
            label={t('Add deceased person')}
            className='mr-2'
            onClick={() => editDeceased(null)}
          />
        </div>
      </div>
    );
  };
  const emptyMessageTemplate = () => {
    return <div>{t('No data available')}</div>;
  };

  const deceasedDateTemplate = (data: DeceasedPersonInterface) => {
    const { hebrew_day_of_death, hebrew_month_of_death, hebrew_year_of_death } =
      data;
    return (
      <span>{`${hebrew_day_of_death} ${hebrew_month_of_death} ${hebrew_year_of_death}`}</span>
    );
  };
  const cemeteryTemplate = (data: DeceasedPersonInterface) => {
    const { cemetery_id } = data;
    const cemetery = findCemetery(cemetery_id);
    if (cemetery) return <span>{cemetery.name}</span>;
    return (
      <div className='flex items-start'>
        <ProgressSpinner pt={{ root: 'h-5 !w-5 !m-0' }} />
      </div>
    );
  };
  const rowActionsTemplate = (data: DeceasedPersonInterface) => {
    return (
      <div className='flex items-center gap-2 row-actions max-w-20'>
        <Button
          icon='pi pi-pencil'
          rounded
          outlined
          text
          size='small'
          severity='secondary'
          onClick={() => editDeceased(data)}
        />
        <Button
          icon='pi pi-trash'
          rounded
          outlined
          size='small'
          severity='danger'
          text
          onClick={() => deleteDeceased(data)}
        />
      </div>
    );
  };
  return (
    <div className='app-page h-screen w-screen'>
      <Card pt={{ content: 'p-0' }} className='mt-3'>
        <DataTable
          stripedRows
          scrollable
          scrollHeight='600px'
          virtualScrollerOptions={{ itemSize: 46 }}
          value={deceasedPeople}
          header={tableHeaderTemplate}
          loading={deceasedLoadable.state == 'loading'}
          emptyMessage={emptyMessageTemplate}
          tableStyle={{ minWidth: '50rem' }}
          pt={{
            loadingOverlay: 'bg-gray-100/50',
          }}
          rowClassName='data-table-row'
          globalFilterFields={['first_name', 'last_name', 'cemetery.name']}
          filters={filters}
          filterDisplay='row'
        >
          <Column body={rowActionsTemplate}></Column>

          <Column sortable field='first_name' header={t('First name')}></Column>
          <Column sortable field='last_name' header={t('Last name')}></Column>
          <Column
            body={deceasedDateTemplate}
            header={t('Date of Death')}
          ></Column>
          <Column body={cemeteryTemplate} header={t('cemetery')}></Column>
        </DataTable>
      </Card>
    </div>
  );
};
export default ManageDeceased;
