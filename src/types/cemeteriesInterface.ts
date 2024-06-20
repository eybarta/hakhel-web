import { AddressInterface } from './addressInterface';

export interface CemeteryInterface {
  id?: number | null;
  description: string;
  name: string;
  created_at?: Date;
  updated_at?: Date;
  address_attributes?: AddressInterface | undefined;
  address?: AddressInterface | undefined;
}

export type CemeteryServerInterface = {
  cemetery: CemeteryInterface;
};
