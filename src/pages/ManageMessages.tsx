import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

// Types
import { MessageInterface } from '../types/messagesInterface';

// Global Contexts
import { useToast } from '../components/context/ToastContext';
import { useConfirm } from '../components/context/ConfirmContext';
import { useDialog } from '../components/context/DialogContext';

// State (Recoil)
import { messagesAtom } from '../services/state/atoms/messagesAtoms';
import { messagesDataSelector, useFetchMessagesCallback, useDeleteMessageCallback } from '../services/state/selectors/messagesSelectors';

// Custom Hooks
import { useRecoilLoader } from '../hooks/useRecoilLoader';

// PrimeReact UI components
import { Card } from 'primereact/card';
import { FilterMatchMode } from 'primereact/api';
import { Tag } from 'primereact/tag';

// App Components
import DataTableWrapper from '../components/table/DataTableWrapper';
import RowActions from '../components/table/RowActions';
import FormEditMessage from '../components/forms/FormEditMessage';
import ManageTableHeader from '../components/table/templates/ManageTableHeader';

const ManageMessages = () => {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const { showDialog, hideDialog } = useDialog();
  const { confirmPopup } = useConfirm();

  const deleteMessageCallback = useDeleteMessageCallback();
  const fetchMessagesCallback = useFetchMessagesCallback();

  const { data: messages, isLoading } = useRecoilLoader(
    messagesAtom,
    messagesDataSelector
  );

  // Log messages whenever they change
  React.useEffect(() => {
    console.log('Messages in component:', messages);
  }, [messages]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('he-IL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const confirmDelete = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    try {
      await deleteMessageCallback(id);
      showToast({
        severity: 'info',
        summary: t('message deleted successfully'),
      });
    } catch (error) {
      console.error('error: ', error);
      showToast({
        severity: 'error',
        summary: t('an error occurred, please try again'),
      });
    }
  };

  const deleteMessage = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
    confirmPopup({
      target: e.currentTarget,
      message: t('are you sure you want to delete this message?'),
      icon: 'pi pi-exclamation-triangle',
      defaultFocus: 'accept',
      accept: () => confirmDelete(e, id),
      reject: () => console.log('Rejected'),
    });
  };

  const editMessage = (data: MessageInterface | null) => {
    showDialog(
      <FormEditMessage
        propValues={data}
        closeDialog={hideDialog}
        submit={onSubmit}
      />
    );
  };

  const onSubmit = (result: MessageInterface) => {
    const summary = t('message updated successfully');
    fetchMessagesCallback();
    showToast({ severity: 'info', summary });
    hideDialog();
  };

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
        onAdd={() => editMessage(null)}
        addLabel='add message'
        title='messages'
      />
    );
  };

  const rowExpansionTemplate = (data: MessageInterface) => {
    return (
      <div>
        <h4 className='text-2xl text-slate-500 mb-6 font-bold'>
          {t('message content')}
        </h4>
        <div className='p-3'>
          <Card className='md:w-25rem'>
            <p className='whitespace-pre-wrap'>{data.full_message}</p>
          </Card>
        </div>
      </div>
    );
  };

  const getDeliveryMethodSeverity = (method: string) => {
    return method === 'sms' ? 'warning' : 'info';
  };

  const columns = [
    {
      body: (data: MessageInterface) => (
        <RowActions
          data={data}
          onEdit={editMessage}
          onDelete={deleteMessage}
        />
      ),
    },
    {
      sortable: true,
      field: 'delivery_method',
      header: t('delivery method'),
      body: (data: MessageInterface) => (
        <Tag
          value={data.delivery_method.toUpperCase()}
          icon={`pi ${data.delivery_method === 'sms' ? 'pi-mobile' : 'pi-envelope'}`}
          severity={getDeliveryMethodSeverity(data.delivery_method)}
        />
      ),
    },
    {
      sortable: true,
      field: 'phone',
      header: t('phone'),
      body: (data: MessageInterface) => data.phone || '-',
    },
    {
      sortable: true,
      field: 'email',
      header: t('email'),
      body: (data: MessageInterface) => data.email || '-',
    },
    {
      sortable: true,
      field: 'send_date',
      header: t('send date'),
      body: (data: MessageInterface) => formatDate(data.send_date),
    },
    {
      sortable: true,
      field: 'created_at',
      header: t('created at'),
      body: (data: MessageInterface) => formatDate(data.created_at),
    },
  ];

  const fieldsToFilter = ['delivery_method', 'phone', 'email', 'full_message'];

  return (
    <div className='app-page h-screen w-screen'>
      <Card pt={{ content: { className: 'p-0' } }} className='mt-3'>
        <DataTableWrapper
          data={messages}
          loading={isLoading}
          columns={columns}
          filters={filters}
          fieldsToFilter={fieldsToFilter}
          headerTemplate={tableHeaderTemplate()}
          withExpand={true}
          expanderProp='full_message'
          rowExpansionTemplate={rowExpansionTemplate}
        />
      </Card>
    </div>
  );
};

export default ManageMessages;

