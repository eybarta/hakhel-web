import { MessageInterface } from '../../types/messagesInterface';
import api from './apiService';

export const fetchMessages = async (): Promise<MessageInterface[]> => {
  try {
    const response = await api.get('future_messages');
    return response.data;
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }
};

export const fetchSentMessages = async (): Promise<MessageInterface[]> => {
  try {
    const response = await api.get('sent_messages');
    return response.data;
  } catch (error) {
    console.error('Error fetching sent messages:', error);
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

export const blastMessage = async (id: number): Promise<void> => {
  try {
    await api.post(`future_messages/${id}/blast`);
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
}; 