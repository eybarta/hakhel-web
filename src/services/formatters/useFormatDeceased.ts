import {
  DeceasedPersonInterface,
  DeceasedPersonServerInterface,
} from '@type/deceased';

// Format deceased from client to server interface
const useFormatDeceased = (
  values: DeceasedPersonInterface
): DeceasedPersonServerInterface => ({
  deceased_person: values,
});

export default useFormatDeceased;
