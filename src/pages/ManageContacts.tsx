// React + Locale
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

// Global Contexts
import { useToast } from '@components/context/useToast';
import { useConfirm } from '@components/context/useConfirm';
import { useDialog } from '@components/context/useDialog';

// State (Query)
import { useQueryClient } from '@tanstack/react-query';
import {
  queryKeys,
  useContacts,
  useDeleteContact,
} from '@services/queries';

// Utils
// PrimeReact UI components
import { Card } from 'primereact/card';
import { FilterMatchMode } from 'primereact/api';

// App Components
import DataTableWrapper from '@components/table/DataTableWrapper';
import RowActions from '@components/table/RowActions';
import FormEditContact from '@components/forms/FormEditContact';
import { ContactInterface } from '@type/contactsInterface';
import { RelationToDeceasedServerInterface } from '@type/relationshipsInterface';
import ManageTableHeader from '@components/table/templates/ManageTableHeader';

const ManageContacts = () => {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const { showDialog, hideDialog } = useDialog();
  const { confirmPopup } = useConfirm();

  const queryClient = useQueryClient();
  const deleteContactMutation = useDeleteContact();
  const { data: contacts = [], isLoading: isContactsLoading } = useContacts();

  const confirmDelete = async (id: number) => {
    try {
      await deleteContactMutation.mutateAsync(id);
      showToast({
        severity: 'info',
        summary: 'משתמש נמחק בהצלחה',
      });
    } catch (error) {
      console.error('error: ', error);
      showToast({
        severity: 'error',
        summary: 'ארעה שגיאה, בבקשה נסו שוב.',
      });
    }
  };
  const deleteContact = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    confirmPopup({
      target: e.currentTarget,
      message: 'Are you sure you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      defaultFocus: 'accept',
      accept: async () => await confirmDelete(id),
      reject: () => console.log('Rejected'),
    });
  };

  const editContact = (data: ContactInterface | null) => {
    showDialog(
      <FormEditContact
        propValues={data}
        closeDialog={hideDialog}
        submit={onSubmit}
      />
    );
  };

  const onSubmit = (result: ContactInterface) => {
    console.log('result: ', result);
    const summary = 'פרטי משתמש עודכנו בהצלחה';
    queryClient.invalidateQueries({ queryKey: queryKeys.contacts });
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
        onAdd={() => editContact(null)}
        addLabel='add contact'
        title='contacts'
      />
    );
  };

  const rowExpansionTemplate = (data: ContactInterface) => {
    console.log('data.relations: ', data.relations);
    const { relations } = data;
    return relations?.length ? (
      <div>
        <h4 className='text-2xl text-slate-500 mb-6 font-bold'>
          {t('deceased_related_to_contact')}
        </h4>
        <div className='flex gap-3 items-start w-full'>
          {relations.map((relation: RelationToDeceasedServerInterface) => {
            const { deceased_person } = relation;
            return (
              <Card
                key={relation.id}
                title={`${deceased_person.first_name} ${deceased_person.last_name}`}
                subTitle={`${t('relationship')}: ${t(
                  relation.relation_of_deceased_to_contact,
                  {
                    ns: 'relations',
                  }
                )}`}
                className='md:w-25rem'
              >
                {/* <p className='m-0'>{JSON.stringify(relation)}</p> */}
              </Card>
              // <div className='max-w-96 break-words flex flex-col flex-1 rounded-md border border-blue-400'>
              //   {JSON.stringify(relation)}
              // </div>
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
      body: (data: ContactInterface) => (
        <RowActions data={data} onEdit={editContact} onDelete={deleteContact} />
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
      field: 'phone',
      header: t('phone'),
    },
    {
      field: 'email',
      header: t('email'),
    },
  ];

  const fieldsToFilter = ['first_name', 'last_name', 'cemetery.name'];
  return (
    <div className='app-page h-screen w-screen'>
      <Card pt={{ content: { className: 'p-0' } }} className='mt-3'>
        <DataTableWrapper
          data={contacts}
          loading={isContactsLoading}
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
export default ManageContacts;
