// React + Locale
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

// Types
import type { DeceasedPersonInterface } from '@type/deceasedInterface';

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
  deceasedAtom,
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
import ManageTableHeader from '@components/table/templates/ManageTableHeader';
import { Button } from 'primereact/button';
import { ContactInterface } from '@type/contactsInterface';

const ManageDeceased = () => {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const { showDialog, hideDialog } = useDialog();
  const { confirmPopup } = useConfirm();
  const [deceasedPeople, setDeceasedPeople] = useRecoilState(deceasedAtom);

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
      <ManageTableHeader
        onSearch={onGlobalFilterChange}
        onAdd={() => editDeceased(null)}
        addLabel='add deceased person'
        title='deceased people'
      />
    );
  };

  const findCemetery = useFindCemetery(cemeteries);

  // const editContact = (contact: ContactInterface) => {
  //   console.log('editContact: ', contact);
  // };
  // const contactCardFooter = (contact: ContactInterface) => {
  //   console.log('contact: ', contact);
  //   return (
  //     <div className='w-full flex flex-row-reverse'>
  //       <Button
  //         icon='pi pi-pencil'
  //         rounded
  //         text
  //         size='small'
  //         severity='secondary'
  //         aria-label='Edit Contact'
  //         onClick={() => editContact(contact)}
  //       />
  //     </div>
  //   );
  // };
  const rowExpansionTemplate = (data: DeceasedPersonInterface) => {
    console.log('data.relations: ', data.relations);
    const { relations } = data;
    return relations?.length ? (
      <div>
        <h4 className='text-2xl text-slate-500 mb-6 font-bold'>
          {t('contacts of the deceased')}
        </h4>
        <div className='flex gap-3 items-start w-full'>
          {relations.map(relation => {
            const { contact_person } = relation;
            return (
              <Card
                key={relation.id}
                title={`${contact_person.first_name} ${contact_person.last_name}`}
                subTitle={`${t('relationship')}: ${t(
                  relation.relation_of_deceased_to_contact,
                  {
                    ns: 'relations',
                  }
                )}`}
                // footer={() => contactCardFooter(contact_person)}
                className='md:w-25rem'
              >
                <div>
                  {contact_person.email && (
                    <p className='flex gap-2'>
                      <span>{t('email')}:</span>
                      <span>{contact_person.email}</span>
                    </p>
                  )}
                  {contact_person.phone && (
                    <p className='flex items-center gap-2'>
                      <i className='pi pi-mobile'></i>
                      <span>{contact_person.phone}</span>
                    </p>
                  )}
                </div>
                {/* <p className='m-0'>{JSON.stringify(relation)}</p> */}
              </Card>
            );
          })}
        </div>
      </div>
    ) : (
      <div className='p-3'>NO RELATIONS YET!</div>
    );
  };

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
      header: t('first name'),
    },
    {
      sortable: true,
      field: 'last_name',
      header: t('last name'),
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
      header: t('date of death'),
    },
    {
      body: (data: DeceasedPersonInterface) => {
        const cemetery = findCemetery(data.cemetery_id);
        if (!data.cemetery_id) {
          return <span>-</span>;
        }
        return cemetery ? (
          <span>{cemetery.name}</span>
        ) : (
          <ProgressSpinner
            className='inline-spinner'
            aria-label='Loading cemetery'
          />
        );
      },
      header: t('cemetery'),
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
          withExpand={true}
          expanderProp='relations'
          rowExpansionTemplate={rowExpansionTemplate}
        />
      </Card>
    </div>
  );
};
export default ManageDeceased;
