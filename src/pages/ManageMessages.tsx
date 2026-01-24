import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';

// Types
import { MessageInterface } from '../types/messagesInterface';

// Global Contexts
import { useToast } from '../components/context/ToastContext';
import { useConfirm } from '../components/context/ConfirmContext';
import { useDialog } from '../components/context/DialogContext';

// State (Recoil)
import { messagesAtom, sentMessagesAtom } from '../services/state/atoms/messagesAtoms';
import {
  messagesDataSelector,
  sentMessagesDataSelector,
  useFetchMessagesCallback,
  useFetchSentMessagesCallback,
  useDeleteMessageCallback,
  useBlastMessageCallback,
} from '../services/state/selectors/messagesSelectors';

// Custom Hooks
import { useRecoilLoader } from '../hooks/useRecoilLoader';

// PrimeReact UI components
import { Card } from 'primereact/card';
import { FilterMatchMode } from 'primereact/api';
import { Tag } from 'primereact/tag';
import { Column } from 'primereact/column';
import { TabView, TabPanel } from 'primereact/tabview';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';

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
  const [activeIndex, setActiveIndex] = useState(0);

  const deleteMessageCallback = useDeleteMessageCallback();
  const blastMessageCallback = useBlastMessageCallback();
  const fetchMessagesCallback = useFetchMessagesCallback();
  const fetchSentMessagesCallback = useFetchSentMessagesCallback();

  const { data: futureMessages, isLoading: isFutureLoading } = useRecoilLoader(
    messagesAtom,
    messagesDataSelector
  );

  const { data: sentMessages, isLoading: isSentLoading } = useRecoilLoader(
    sentMessagesAtom,
    sentMessagesDataSelector
  );

  // Log messages whenever they change
  React.useEffect(() => {
    console.log('Messages in component:', futureMessages, sentMessages);
  }, [futureMessages, sentMessages]);

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MM/dd/yyyy, h:mma').toLowerCase();
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

  const confirmBlast = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    try {
      await blastMessageCallback(id);
      showToast({
        severity: 'success',
        summary: t('message sent successfully'),
      });
    } catch (error) {
      console.error('error: ', error);
      showToast({
        severity: 'error',
        summary: t('an error occurred, please try again'),
      });
    }
  };

  const blastMessage = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
    confirmPopup({
      target: e.currentTarget,
      message: t('confirm send now'),
      icon: 'pi pi-send',
      defaultFocus: 'accept',
      accept: () => confirmBlast(e, id),
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

  const tableHeaderTemplate = (showAddButton: boolean = true) => {
    return (
      <ManageTableHeader
        onSearch={onGlobalFilterChange}
        onAdd={showAddButton ? () => editMessage(null) : undefined}
        addLabel='add message'
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

  const actionBodyTemplate = (data: MessageInterface) => (
    <div className="flex gap-2">
      <RowActions
        data={data}
        onEdit={editMessage}
        onDelete={deleteMessage}
      />
      <Button
          className='row-actions'
          icon="pi pi-send"
          rounded
          outlined
          text
          size='small'
          severity='info'
          tooltip={t('send now')}
          tooltipOptions={{ position: 'top' }}
          onClick={(e) => blastMessage(e, data.id)}
        />
    </div>
  );

  const columns = (showActions: boolean = true) => [
    ...(showActions
      ? [
          {
            body: actionBodyTemplate,
          },
        ]
      : []),
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
      className: 'whitespace-nowrap text-left ltr',
      body: (data: MessageInterface) => formatDate(data.send_date),
    },
  ];

  const fieldsToFilter = ['delivery_method', 'phone', 'email', 'full_message'];

  const expanderTemplate = () => {
    return <span className="p-row-toggler" />;
  };

  return (
    <div className='app-page h-screen w-screen'>
      <Card pt={{ content: { className: 'p-0' } }} className='mt-3'>
        <TabView pt={{ panelContainer: { className: 'p-0' } }} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
          <TabPanel header={t('future messages')}>
            <DataTableWrapper
              data={futureMessages}
              loading={isFutureLoading}
              columns={[
               
                ...columns(true)
              ]}
              filters={filters}
              fieldsToFilter={fieldsToFilter}
              headerTemplate={tableHeaderTemplate(true)}
              withExpand={true}
              expanderProp='full_message'
              rowExpansionTemplate={rowExpansionTemplate}
            />
          </TabPanel>
          <TabPanel header={t('sent messages')}>
            <DataTableWrapper
              data={sentMessages}
              loading={isSentLoading}
              columns={[
                {
                  expander: true,
                  body: expanderTemplate,
                  style: { width: '3rem' }
                },
                ...columns(false)
              ]}
              filters={filters}
              fieldsToFilter={fieldsToFilter}
              headerTemplate={tableHeaderTemplate(false)}
              withExpand={true}
              expanderProp='full_message'
              rowExpansionTemplate={rowExpansionTemplate}
            />
          </TabPanel>
        </TabView>
      </Card>
    </div>
  );
};

export default ManageMessages;

