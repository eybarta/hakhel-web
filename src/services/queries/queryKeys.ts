export const queryKeys = {
  cemeteries: ['cemeteries'] as const,
  contacts: ['contacts'] as const,
  deceased: ['deceased'] as const,
  messages: {
    future: ['messages', 'future'] as const,
    sent: ['messages', 'sent'] as const,
  },
};
