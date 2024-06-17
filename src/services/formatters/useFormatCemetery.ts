import { CemeteryInterface, CemeteryServerInterface } from '@type/cemeteries';

// Format deceased from client to server interface
const useFormatCemetery = (
  values: CemeteryInterface
): CemeteryServerInterface => ({
  cemetery: values,
});

export default useFormatCemetery;
