import { CemeteryInterface } from '@type/cemeteriesInterface';
import { ContactInterface } from '@type/contactsInterface';

type IncomingDataType = ContactInterface | CemeteryInterface;

const maybeExcludeAddress = <T extends IncomingDataType>(data: T): T => {
  if (data.address_attributes) {
    const hasAddressData = Object.values(data.address_attributes).some(
      value => value
    );

    if (!hasAddressData) {
      const { address_attributes: _address_attributes, ...restData } = data;
      return restData as T;
    }
  }
  return data;
};

export default maybeExcludeAddress;
