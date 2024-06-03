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
import { Dialog, DialogPassThroughMethodOptions } from 'primereact/dialog';
import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
// App Components
import FormEditCemetery from '/src/components/forms/FormEditCemetery';
// State (Recoil)
import { useRecoilValueLoadable, useSetRecoilState } from 'recoil';
import {
  cemeteriesDataSelector,
  cemeteriesFetchVersionAtom,
} from '../services/state/selectors';

// Types
import { CemeteryInterface } from '../types/cemeteries';
import { Toast } from 'primereact/toast';

const ManageCemeteries = () => {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const { showDialog, hideDialog } = useDialog();

  const [cemeteries, setCemeteries] = useState<CemeteryInterface[] | []>([]);
  const [cemeteryFormVisible, setCemeteryFormVisible] = useState(false);
  const [cemeteryInEdit, setCemeteryInEdit] =
    useState<CemeteryInterface | null>(null);
  const cemeteriesLoadable = useRecoilValueLoadable(cemeteriesDataSelector);
  const [filters, setFilters] = useState({
    global: { value: '', matchMode: FilterMatchMode.CONTAINS },
  });

  const refetchCemeteries = useSetRecoilState(
    cemeteriesFetchVersionAtom('latest')
  );

  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFilters({
      ...filters,
      global: { ...filters.global, value: e.target.value },
    });

  // Load data
  useEffect(() => {
    if (cemeteriesLoadable.state === 'hasValue') {
      setCemeteries(cemeteriesLoadable.contents);
    }
  }, [cemeteriesLoadable.state, cemeteriesLoadable.contents]);
  /////////////

  // Methods
  const deleteCemetery = (data: CemeteryInterface) => {
    console.log('deleteCemetery: ', data);
  };

  const editCemetery = (data: CemeteryInterface | null) => {
    showDialog(
      <FormEditCemetery
        propValues={data}
        closeDialog={hideDialog}
        submit={onSubmit}
      />
    );
  };
  const onSubmit = (result: CemeteryInterface) => {
    console.log('result: ', result);
    const summary = 'בית עלמין עודכן בהצלחה';
    refetchCemeteries(version => version + 1);
    showToast({ severity: 'success', summary });
  };
  // UI Renderers
  const tableHeaderTemplate = () => {
    return (
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-semibold'>
          {t('Cemeteries information')}
        </h1>
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
            label={t('Add cemetery')}
            className='mr-2'
            onClick={() => setCemeteryFormVisible(true)}
          />
        </div>
      </div>
    );
  };
  const emptyMessageTemplate = () => {
    return <div>{t('No data available')}</div>;
  };

  const rowActionsTemplate = (data: CemeteryInterface) => {
    return (
      <div className='flex items-center gap-2 row-actions max-w-20'>
        <Button
          icon='pi pi-pencil'
          rounded
          outlined
          text
          size='small'
          severity='secondary'
          onClick={() => editCemetery(data)}
        />
        <Button
          icon='pi pi-trash'
          rounded
          outlined
          size='small'
          severity='danger'
          text
          onClick={() => deleteCemetery(data)}
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
          value={cemeteries}
          header={tableHeaderTemplate}
          loading={cemeteriesLoadable.state == 'loading'}
          emptyMessage={emptyMessageTemplate}
          tableStyle={{ minWidth: '50rem' }}
          pt={{
            loadingOverlay: 'bg-gray-100/50',
          }}
          globalFilterFields={['name', 'description']}
          filters={filters}
        >
          <Column body={rowActionsTemplate}></Column>
          <Column sortable field='name' header={t('Name')}></Column>
          <Column
            sortable
            field='description'
            header={t('Description')}
          ></Column>
        </DataTable>
      </Card>
    </div>
  );
};
export default ManageCemeteries;
