import {
  ContactInterface,
  ContactServerInterface,
} from '@type/contactsInterface';

// Format deceased from client to server interface
const useFormatContact = (
  values: ContactInterface
): ContactServerInterface => ({
  contact_person: values,
});

export default useFormatContact;
