import { AddressInterface } from './addressInterface';
import {
  RelationToDeceasedClientInterface,
  RelationToDeceasedServerInterface,
} from './relationshipsInterface';

export interface ContactInterface {
  id?: number | null;
  first_name: string;
  last_name: string;
  email: string | null;
  phone: string;
  gender: string;
  created_at?: Date;
  updated_at?: Date;
  address_attributes?: AddressInterface | undefined;
  address?: AddressInterface | undefined;
  relations_attributes?: RelationToDeceasedClientInterface[];
  relations?: RelationToDeceasedServerInterface[];
}

export type ContactServerInterface = {
  contact_person: ContactInterface;
};
