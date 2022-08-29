import { events, locations, users, participants } from '../../data.json';
import { nanoid } from 'nanoid';
import pubsub from '../../pubsub';

export const Mutation = {
  //User
  createUser: (_, { data }) => {
    const user = { id: nanoid(), ...data };
    users.push(user);
    pubsub.publish('userCreated', { userCreated: user });
    return user;
  },
  updateUser: (_, { id, data }) => {
    const user_index = users.findIndex((user) => user.id === parseInt(id));

    if (user_index === -1) {
      return new Error('User not found!');
    }

    const updatedUser = (users[user_index] = {
      ...users[user_index],
      ...data,
    });
    pubsub.publish('userUpdated', { userUpdated: updatedUser });
    return updatedUser;
  },
  deleteUser: (_, { id }) => {
    const user_index = users.findIndex((user) => user.id === parseInt(id));

    if (user_index === -1) {
      return new Error('User not found!');
    }

    const deletedUser = users[user_index];
    users.splice(user_index, 1);
    pubsub.publish('userDeleted', { userDeleted: deletedUser });
    return deletedUser;
  },
  deleteAllUsers: () => {
    const lenght = users.length;
    users.splice(0, lenght);

    return {
      count: lenght,
    };
  },

  //event
  createEvent: (_, { data }) => {
    const event = { id: nanoid(), ...data };
    events.push(event);
    pubsub.publish('eventCreated', { eventCreated: event });
    return event;
  },
  updateEvent: (_, { id, data }) => {
    const event_index = events.findIndex((event) => event.id === parseInt(id));

    if (event_index === -1) {
      return new Error('Event not found!');
    }

    const updatedEvent = (events[event_index] = {
      ...events[event_index],
      ...data,
    });
    pubsub.publish('eventUpdated', { eventUpdated: updatedEvent });
    return updatedEvent;
  },
  deleteEvent: (_, { id }) => {
    const event_index = events.findIndex((event) => event.id === parseInt(id));

    if (event_index === -1) {
      return new Error('Event not found!');
    }

    const deletedEvent = events[event_index];
    events.splice(event_index, 1);
    pubsub.publish('eventDeleted', { eventDeleted: deletedEvent });
    return deletedEvent;
  },
  deleteAllEvents: () => {
    const lenght = events.length;
    events.splice(0, lenght);

    return {
      count: lenght,
    };
  },

  //participant
  createParticipant: (_, { data }) => {
    const participant = { id: nanoid(), ...data };
    participants.push(participant);
    return participant;
  },
  updateParticipant: (_, { id, data }) => {
    const participant_index = participants.findIndex(
      (participant) => participant.id === parseInt(id)
    );

    if (participant_index === -1) {
      return new Error('Participant not found!');
    }

    const updatedParticipant = (participants[[participant_index]] = {
      ...participants[participant_index],
      ...data,
    });

    return updatedParticipant;
  },
  deleteParticipant: (_, { id }) => {
    const participant_index = participants.findIndex(
      (participant) => participant.id === parseInt(id)
    );

    if (participant_index === -1) {
      return new Error('Participant not found!');
    }

    const deletedParticipant = participants[participant_index];
    participants.splice(participant_index, 1);

    return deletedParticipant;
  },
  deleteAllParticipants: () => {
    const lenght = participants.length;
    participants.splice(0, lenght);

    return {
      count: lenght,
    };
  },

  //location
  createLocation: (_, { data }) => {
    const location = { id: nanoid(), ...data };
    locations.push(location);
    return location;
  },
  updateLocation: (_, { id, data }) => {
    const location_index = locations.findIndex(
      (location) => location.id === parseInt(id)
    );

    if (location_index === -1) {
      return new Error('Location not found!');
    }

    const updatedLocation = (locations[[location_index]] = {
      ...locations[location_index],
      ...data,
    });

    return updatedLocation;
  },
  deleteLocation: (_, { id }) => {
    const location_index = locations.findIndex(
      (location) => location.id === parseInt(id)
    );

    if (location_index === -1) {
      return new Error('Location not found!');
    }

    const deletedLocation = locations[location_index];
    locations.splice(location_index, 1);

    return deletedLocation;
  },
  deleteAllLocations: () => {
    const lenght = locations.length;
    locations.splice(0, lenght);

    return {
      count: lenght,
    };
  },
};
