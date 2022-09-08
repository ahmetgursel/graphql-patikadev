import { events, locations, users, participants } from '../../data.json';

export const Query = {
  // events
  events: () => events,
  event: (_, args) => {
    const event = events.find((event) => event.id.toString() === args.id);
    if (!event) {
      return new Error('Event not found!');
    } else {
      return event;
    }
  },

  // users
  users: () => users,
  user: (_, args) => {
    const user = users.find((user) => user.id.toString() === args.id);
    if (!user) {
      return new Error('User not found!');
    } else {
      return user;
    }
  },

  //participants
  participants: () => participants,
  participant: (_, args) => {
    const participant = participants.find(
      (participant) => participant.event_id === parseInt(args.id)
    );

    if (!participant) {
      return new Error('Participant not found!');
    } else {
      return participant;
    }
  },

  //locations
  locations: () => locations,
  location: (_, args) => {
    const location = locations.find((location) => location.id === parseInt(args.id));
    if (!location) {
      return new Error('Location not found!');
    } else {
      return location;
    }
  },
};
