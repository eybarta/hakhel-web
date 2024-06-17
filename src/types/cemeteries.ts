import { AddressInterface } from './addressInterface';

export interface CemeteryInterface {
  id?: number | null;
  description: string;
  name: string;
  created_at?: Date;
  updated_at?: Date;
  address_attributes?: AddressInterface;
  address?: AddressInterface;
}

export type CemeteryServerInterface = {
  cemetery: CemeteryInterface;
};
