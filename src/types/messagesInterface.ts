export interface MessageInterface {
  id: number;
  messageable_type: string;
  messageable_id: number;
  community_id: number;
  created_at: string;
  delivery_method: 'sms' | 'email';
  email: string | null;
  full_message: string;
  message_type: string | null;
  metadata: any | null;
  phone: string | null;
  send_date: string;
  token: string;
  updated_at: string;
} 