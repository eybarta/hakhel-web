import api from './apiService';
import { MessageInterface } from '../../types/messagesInterface';

export const fetchMessages = async (): Promise<MessageInterface[]> => {
  try {
    const response = await api.get('future_messages');
    return response.data;
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }
};

export const deleteMessage = async (id: number): Promise<void> => {
  try {
    await api.delete(`future_messages/${id}`);
  } catch (error) {
    console.error('Error deleting message:', error);
    throw error;
  }
}; 