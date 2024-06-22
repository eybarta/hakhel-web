import { FormikProps, FormikValues } from 'formik';
import {
  RelationToContactClientInterface,
  RelationToDeceasedClientInterface,
} from './relationshipsInterface';

export interface RemoveRelationProps {
  relation:
    | RelationToContactClientInterface
    | RelationToDeceasedClientInterface;
  index: number;
  remove: (index: number) => void | undefined;
  form: FormikProps<FormikValues>;
}

export interface RemoveRelationEventProps extends RemoveRelationProps {
  event: React.MouseEvent<HTMLButtonElement>;
}

export interface TabHeaderProps extends RemoveRelationProps {
  name: string;
}
