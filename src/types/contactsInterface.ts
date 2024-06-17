import { AddressInterface } from './addressInterface';
import { RelationshipToDeceasedInterface } from './relationshipsInterface';

export interface ContactInterface {
  id?: number | null;
  first_name: string;
  last_name: string;
  email: string | null;
  phone: string;
  gender: string;
  created_at?: Date;
  updated_at?: Date;
  address_attributes?: AddressInterface;
  address?: AddressInterface;
  relations_attributes?: RelationshipToDeceasedInterface[];
}

export type ContactsServerInterface = {
  contact_person: ContactInterface;
};
