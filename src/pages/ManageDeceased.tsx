// React + Locale
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

// Types
import type { DeceasedPersonInterface } from '@type/deceased';

// Global Contexts
import { useToast } from '@components/context/ToastContext';
import { useConfirm } from '@components/context/ConfirmContext';
import { useDialog } from '@components/context/DialogContext';

// State (Recoil)
import {
  useRecoilValueLoadable,
  useRecoilCallback,
  useRecoilRefresher_UNSTABLE,
  useRecoilState,
  Snapshot,
} from 'recoil';

import {
  deceasedDataSelector,
  deleteDeceasedSelector,
  cemeteriesDataSelector,
  deceasedPeopleAtom,
  cemeteriesAtom,
} from '@services/state';

// Utils
import useFindCemetery from '@utils/useFindCemetery';

// PrimeReact UI components
import { Card } from 'primereact/card';
import { ProgressSpinner } from 'primereact/progressspinner';
import { FilterMatchMode } from 'primereact/api';

// App Components
import DataTableWrapper from '@components/table/DataTableWrapper';
import RowActions from '@components/table/RowActions';
import FormEditDeceased from '@components/forms/FormEditDeceased';
import ManageDeceasedTableHeader from '@components/table/templates/ManageDeceasedTableHeader';

const ManageDeceased = () => {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const { showDialog, hideDialog } = useDialog();
  const { confirmPopup } = useConfirm();
  const [deceasedPeople, setDeceasedPeople] =
    useRecoilState(deceasedPeopleAtom);

  const [cemeteries, setCemeteries] = useRecoilState(cemeteriesAtom);
  const cemeteriesLoadable = useRecoilValueLoadable(cemeteriesDataSelector);
  const deceasedLoadable = useRecoilValueLoadable(deceasedDataSelector);
  const refreshDeceased = useRecoilRefresher_UNSTABLE(deceasedDataSelector);

  // Load data
  useEffect(() => {
    if (deceasedLoadable.state === 'hasValue') {
      setDeceasedPeople(deceasedLoadable.contents);
    }
  }, [deceasedLoadable.state, deceasedLoadable.contents, setDeceasedPeople]);
  useEffect(() => {
    if (cemeteriesLoadable.state === 'hasValue') {
      setCemeteries(cemeteriesLoadable.contents);
    }
  }, [cemeteriesLoadable.state, cemeteriesLoadable.contents, setCemeteries]);
  /////////////

  const confirmDelete = async (
    snapshot: Snapshot,
    release: () => void,

    id: number
  ) => {
    try {
      await snapshot.getPromise(deleteDeceasedSelector(id));
      refreshDeceased();
      showToast({
        severity: 'info',
        summary: 'נפטר נמחק בהצלחה',
      });
    } catch (error) {
      console.error('error: ', error);
      showToast({
        severity: 'error',
        summary: 'ארעה שגיאה, בבקשה נסו שוב.',
      });
    } finally {
      release();
    }
  };
  const deleteDeceased = useRecoilCallback(
    ({ snapshot }) =>
      async (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
        const release = snapshot.retain();
        confirmPopup({
          target: e.currentTarget,
          message: 'Are you sure you want to proceed?',
          icon: 'pi pi-exclamation-triangle',
          defaultFocus: 'accept',
          accept: async () => await confirmDelete(snapshot, release, id),
          reject: () => console.log('Rejected'),
        });
      }
  );

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
    console.log('result: ', result);
    const summary = 'פרטי נפטר עודכנו בהצלחה';
    refreshDeceased();
    showToast({ severity: 'info', summary });
    hideDialog();
  };

  // Table header, search, filter
  const [filters, setFilters] = useState({
    global: { value: '', matchMode: FilterMatchMode.CONTAINS },
  });

  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFilters({
      ...filters,
      global: { ...filters.global, value: e.target.value },
    });

  const tableHeaderTemplate = () => {
    return (
      <ManageDeceasedTableHeader
        onSearch={onGlobalFilterChange}
        onAdd={() => editDeceased(null)}
      />
    );
  };

  // util
  const findCemetery = useFindCemetery(cemeteries);

  const columns = [
    {
      body: (data: DeceasedPersonInterface) => (
        <RowActions
          data={data}
          onEdit={editDeceased}
          onDelete={deleteDeceased}
        />
      ),
    },
    {
      sortable: true,
      field: 'first_name',
      header: t('First name'),
    },
    {
      sortable: true,
      field: 'last_name',
      header: t('Last name'),
    },
    {
      body: (data: DeceasedPersonInterface) => {
        const {
          hebrew_day_of_death,
          hebrew_month_of_death,
          hebrew_year_of_death,
        } = data;
        return (
          <span>{`${hebrew_day_of_death} ${hebrew_month_of_death} ${hebrew_year_of_death}`}</span>
        );
      },
      header: t('Date of Death'),
    },
    {
      body: (data: DeceasedPersonInterface) => {
        const cemetery = findCemetery(data.cemetery_id);
        return cemetery ? <span>{cemetery.name}</span> : <ProgressSpinner />;
      },
      header: t('Cemetery'),
    },
  ];

  const fieldsToFilter = ['first_name', 'last_name', 'cemetery.name'];
  return (
    <div className='app-page h-screen w-screen'>
      <Card pt={{ content: { className: 'p-0' } }} className='mt-3'>
        <DataTableWrapper
          data={deceasedPeople}
          loading={deceasedLoadable.state === 'loading'}
          columns={columns}
          filters={filters}
          fieldsToFilter={fieldsToFilter}
          headerTemplate={tableHeaderTemplate()}
        />
      </Card>
    </div>
  );
};
export default ManageDeceased;
