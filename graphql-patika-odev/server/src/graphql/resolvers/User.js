import { events } from '../../data.json';

export const User = {
  events: (parent) =>
    events.filter((event) => event.user_id === parseInt(parent.id)),
};
