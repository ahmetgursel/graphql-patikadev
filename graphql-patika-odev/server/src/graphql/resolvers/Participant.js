import { events, users } from '../../data.json';

export const Participant = {
  user: (parent) => users.find((user) => user.id == parent.user_id),
  event: (parent) => events.find((event) => event.id == parent.event_id),
};
