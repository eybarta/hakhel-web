import { ContactInterface } from './contactsInterface';
import { DeceasedPersonInterface } from './deceasedInterface';

interface RelationInterface {
  id?: string | null;
  relation_of_deceased_to_contact: string;
  deceased_person_id?: number;
  contact_person_id?: number;
  token: string;
}

////////////////////////////////////////////////////////////////
/*
	Structure of properties of deceased under contact,
	when building in client.
*/
////////////////////////////////////////////////////////////////
export interface RelationToDeceasedClientInterface {
  relation_of_deceased_to_contact: string;
  deceased_person_attributes: DeceasedPersonInterface;
}

////////////////////////////////////////////////////////////////
/*
	Structure of contact under deceased,
	when building in client. (inside relation array)
*/
////////////////////////////////////////////////////////////////

export interface RelationToContactClientInterface {
  relation_of_deceased_to_contact: string;
  contact_person_attributes: ContactInterface;
}

////////////////////////////////////////////////////////////////
/*
	Structure of properties of contacts under deceased,
	when building in client.
*/
////////////////////////////////////////////////////////////////
export interface RelationToDeceasedAttributesInterface {
  relations_attributes: RelationToDeceasedClientInterface[];
}

export interface RelationToContactAttributesInterface {
  relations_attributes: RelationToContactClientInterface[];
}

export interface RelationToDeceasedServerInterface extends RelationInterface {
  deceased_person: DeceasedPersonInterface;
}
export interface RelationToContactServerInterface extends RelationInterface {
  contact_person: ContactInterface;
}
