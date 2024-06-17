import { ContactInterface } from './contactsInterface';
import { DeceasedPersonInterface } from './deceasedInterface';

interface RelationInterface {
  id?: string | null;
  relation_of_deceased_to_contact: string;
  deceased_person_id?: number;
  contact_person_id?: number;
  token: string;
}

export interface RelationToDeceasedClientInterface {
  relation_of_deceased_to_contact: string;
  deceased_person_attributes: DeceasedPersonInterface;
}

export interface RelationToContactClientInterface {
  relation_of_deceased_to_contact: string;
  contact_person_attributes: ContactInterface;
}

export interface RelationToDeceasedAttributesInterface {
  relations_attributes: RelationToDeceasedClientInterface[];
}

export interface RelationToContactAttributesInterface {
  relations_attributes: RelationToContactClientInterface[];
}

export interface RelationToDeceasedServerInterface extends RelationInterface {
  contact_person: ContactInterface;
}
export interface RelationToContactServerInterface extends RelationInterface {
  deceased_person: DeceasedPersonInterface;
}
