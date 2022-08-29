import { locations, users, participants } from '../../data.json';

export const Event = {
  user: (parent) => users.find((user) => user.id === parseInt(parent.user_id)),
  location: (parent) =>
    locations.find((location) => location.id === parseInt(parent.location_id)),
  participants: (parent) =>
    participants.filter((participant) => participant.event_id === parent.id),
};
