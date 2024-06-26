// React + Locale
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

// Global Contexts
import { useToast } from '@context/ToastContext';
import { useDialog } from '@context/DialogContext';
import { useConfirm } from '@components/context/ConfirmContext';

// State (Recoil)
import {
  useRecoilValueLoadable,
  useRecoilCallback,
  useRecoilRefresher_UNSTABLE,
  useRecoilState,
  Snapshot,
} from 'recoil';
import {
  cemeteriesAtom,
  cemeteriesDataSelector,
  deleteCemeterySelector,
} from '@services/state';

// PrimeReact UI components
import { Card } from 'primereact/card';
import { FilterMatchMode } from 'primereact/api';
// App Components
import FormEditCemetery from '@components/forms/FormEditCemetery';
import RowActions from '@components/table/RowActions';
import DataTableWrapper from '@components/table/DataTableWrapper';

// Types
import type { CemeteryInterface } from '@type/cemeteriesInterface';
import ManageTableHeader from '@components/table/templates/ManageTableHeader';

const ManageCemeteries = () => {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const { showDialog, hideDialog } = useDialog();
  const { confirmPopup } = useConfirm();

  const [cemeteries, setCemeteries] = useRecoilState(cemeteriesAtom);
  const cemeteriesLoadable = useRecoilValueLoadable(cemeteriesDataSelector);
  const refreshCemeteries = useRecoilRefresher_UNSTABLE(cemeteriesDataSelector);
  const [filters, setFilters] = useState({
    global: { value: '', matchMode: FilterMatchMode.CONTAINS },
  });

  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFilters({
      ...filters,
      global: { ...filters.global, value: e.target.value },
    });

  // Load data
  useEffect(() => {
    console.log('cemeteriesLoadable.state: ', cemeteriesLoadable.state);
    console.log('cemeteriesLoadable: ', cemeteriesLoadable);
    if (cemeteriesLoadable.state === 'hasValue') {
      setCemeteries(cemeteriesLoadable.contents);
    }
  }, [cemeteriesLoadable.state, cemeteriesLoadable.contents, setCemeteries]);
  /////////////

  // Methods
  const confirmDelete = async (
    snapshot: Snapshot,
    release: () => void,
    id: number
  ) => {
    try {
      await snapshot.getPromise(deleteCemeterySelector(id));
      refreshCemeteries();
      showToast({
        severity: 'info',
        summary: 'בית עלמין נמחק בהצלחה',
      });
    } catch (error) {
      console.error('error: ', error);
      showToast({
        severity: 'error',
        summary: 'ארעה שגיאה, בבקשה נסו שוב.',
      });
      return error;
    } finally {
      release();
    }
  };
  const deleteCemetery = useRecoilCallback(
    ({ snapshot }) =>
      async (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
        const release = snapshot.retain(); // Retain the snapshot
        confirmPopup({
          target: e.currentTarget,
          message: 'למחוק את הבית עלמין הזה?',
          icon: 'pi pi-exclamation-triangle text-yellow-800',
          defaultFocus: 'accept',
          acceptLabel: t('yes'),
          rejectLabel: t('no'),
          accept: async () => await confirmDelete(snapshot, release, id),
          reject: () => console.log('Rejected'),
        });
      }
  );

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
    refreshCemeteries();
    showToast({ severity: 'info', summary });
    hideDialog();
  };
  // UI Renderers
  const tableHeaderTemplate = () => {
    return (
      <ManageTableHeader
        onSearch={onGlobalFilterChange}
        onAdd={() => editCemetery(null)}
        addLabel='add cemetery'
        title='cemeteries information'
      />
    );
  };

  const rowExpansionTemplate = (data: CemeteryInterface) => {
    console.log('data.address: ', data.address);
    if (data.address) {
      const {
        address: { line1, city, postal_code },
      } = data;
      return (
        <div className='p-3'>
          <h5 className='font-semibold mb-2'>{t('cemetery address')}</h5>
          <p>{line1}</p>
          <p>
            {city}, {postal_code}
          </p>
        </div>
      );
    }
    return <h5 className='font-semibold mb-2'>{t('no address')}</h5>;
  };

  const columns = [
    {
      body: (data: CemeteryInterface) => (
        <RowActions
          data={data}
          onEdit={editCemetery}
          onDelete={deleteCemetery}
        />
      ),
    },
    {
      sortable: true,
      field: 'name',
      header: t('name'),
    },
    {
      sortable: true,
      field: 'description',
      header: t('description'),
    },
  ];
  const fieldsToFilter = ['name', 'description'];

  return (
    <div className='app-page h-screen w-screen'>
      <Card pt={{ content: { className: 'p-0' } }} className='mt-3'>
        <DataTableWrapper
          data={cemeteries}
          loading={cemeteriesLoadable.state === 'loading'}
          columns={columns}
          filters={filters}
          fieldsToFilter={fieldsToFilter}
          headerTemplate={tableHeaderTemplate()}
          withExpand={true}
          expanderProp='address'
          rowExpansionTemplate={rowExpansionTemplate}
        />
      </Card>
    </div>
  );
};
export default ManageCemeteries;
