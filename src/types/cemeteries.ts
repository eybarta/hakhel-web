export interface CemeteryInterface {
  id?: number | null;
  description: string;
  name: string;
  created_at?: Date;
  updated_at?: Date;
  address_attributes?: {
    line1: string;
    line2?: string;
    city: string;
    country: string;
    postal_code: string;
  };
}
