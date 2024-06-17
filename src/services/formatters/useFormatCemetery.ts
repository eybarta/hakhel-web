import {
  CemeteryInterface,
  CemeteryServerInterface,
} from '@type/cemeteriesInterface';

// Format deceased from client to server interface
const useFormatCemetery = (
  values: CemeteryInterface
): CemeteryServerInterface => ({
  cemetery: values,
});

export default useFormatCemetery;
