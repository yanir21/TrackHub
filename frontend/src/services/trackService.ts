import { SuggestionStatus } from '../models/suggestion';
import http from './http';

export const updateSuggestionStatus = async (
  suggestionId: string,
  newStatus: SuggestionStatus
) => {
  return (await http.put(`/suggestions/${suggestionId}`, { status: newStatus }))
    .data;
};
