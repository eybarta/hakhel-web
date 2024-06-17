import {
  DeceasedPersonInterface,
  DeceasedPersonServerInterface,
} from '@type/deceasedInterface';

// Format deceased from client to server interface
const useFormatDeceased = (
  values: DeceasedPersonInterface
): DeceasedPersonServerInterface => ({
  deceased_person: values,
});

export default useFormatDeceased;
