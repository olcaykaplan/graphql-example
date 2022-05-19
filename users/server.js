const { ApolloServer, gql } = require("apollo-server");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");
const { users, events, locations, participants } = require("./data");
const { nanoid } = require("nanoid");

const typeDefs = gql`
  type User {
    id: ID
    username: String!
    email: String!
    events: [Event!]!
  }

  input CreateUserInput {
    username: String!
    email: String!
  }
  input UpdateUserInput {
    username: String
    email: String
  }

  type Event {
    id: ID!
    title: String!
    desc: String!
    date: String!
    from: String!
    to: String!
    location_id: ID!
    user_id: ID!
    user: User!
    location: Location!
    participants: [Participant!]!
  }
  input CreateEventInput {
    title: String!
    desc: String!
    date: String!
    from: String!
    to: String!
    location_id: ID!
    user_id: ID!
  }
  input UpdateEventInput {
    title: String
    desc: String
    date: String
    from: String
    to: String
    location_id: ID
    user_id: ID
  }

  type Location {
    id: ID!
    name: String!
    desc: String!
    lat: Float!
    lng: Float!
  }
  input CreateLocationInput {
    name: String!
    desc: String!
    lat: Float!
    lng: Float!
  }
  input UpdateLocationInput {
    name: String
    desc: String
    lat: Float
    lng: Float
  }
  type Participant {
    id: ID!
    user_id: ID!
    event_id: ID!
    user: User!
    event: Event!
  }
  input CreateParticipantInput {
    user_id: ID!
    event_id: ID!
  }
  input UpdateParticipantInput {
    user_id: ID
    event_id: ID
  }
  type Query {
    #User
    users: [User!]!
    user(id: ID!): User

    #Event
    events: [Event!]!
    event(id: ID!): Event!

    #Location
    locations: [Location!]!
    location(id: ID!): Location!

    #Participant
    participants: [Participant!]!
    participant(id: ID!): Participant!
  }
  type Mutation {
    #User
    createUser(data: CreateUserInput!): User!
    updateUser(id: ID!, data: UpdateUserInput!): User!
    deleteUser(id: ID!): User!

    #Event
    createEvent(data: CreateEventInput!): Event!
    updateEvent(id: ID!, data: UpdateEventInput!): Event!
    deleteEvent(id: ID!): Event!

    #Location
    createLocation(data: CreateLocationInput!): Location!
    updateLocation(id: ID!, data: UpdateLocationInput!): Location!
    deleteLocation(id: ID!): Location!

    #Participant
    createParticipant(data: CreateParticipantInput!): Participant!
    updateParticipant(id: ID!, data: UpdateParticipantInput!): Participant!
    deleteParticipant(id: ID!): Participant!
  }
`;

const resolvers = {
  Mutation: {
    //User
    createUser: (parent, { data }) => {
      const user = { id: nanoid(), ...data };
      users.push(user);
      return user;
    },
    updateUser: (parent, { id, data }) => {
      const userIndex = users.findIndex((user) => user.id === id);
      if (userIndex === -1) return new Error("User not found");
      const updatedUser = (users[userIndex] = {
        ...users[userIndex],
        ...data,
      });
      return updatedUser;
    },
    deleteUser: (parent, { id }) => {
      const userIndex = users.findIndex((user) => user.id === id);
      if (userIndex === -1) return new Error("User not found");
      const deletedUser = users[userIndex];
      users.splice(userIndex, 1);
      return deletedUser;
    },

    //Event
    createEvent: (parent, { data }) => {
      const event = {
        id: nanoid(),
        ...data,
      };
      events.push(event);
      return event;
    },
    updateEvent: (parent, { id, data }) => {
      const eventIndex = events.findIndex((event) => event.id === id);
      if (eventIndex === -1) return new Error("Event is not found!");
      const updatedEvent = (events[eventIndex] = {
        ...events[eventIndex],
        ...data,
      });
      return updatedEvent;
    },
    deleteEvent: (parent, { id }) => {
      const eventIndex = events.findIndex((event) => event.id === id);
      if (eventIndex === -1) return new Error("Event is not found!");
      const deletedEvent = events[eventIndex];
      events.splice(eventIndex, 1);
      return deletedEvent;
    },

    //Location
    createLocation: (parent, { data }) => {
      const location = {
        id: nanoid(),
        ...data,
      };
      locations.push(location);
      return location;
    },
    updateLocation: (parent, { id, data }) => {
      const locationIndex = locations.findIndex(
        (location) => location.id == id
      );
      if (locationIndex === -1) return new Error("Location not found!");
      const updatedLocation = (locations[locationIndex] = {
        ...locations[locationIndex],
        ...data,
      });
      return updatedLocation;
    },
    deleteLocation: (parent, { id }) => {
      const locationIndex = locations.findIndex(
        (location) => location.id == id
      );
      if (locationIndex === -1) return new Error("Location not found!");
      const deletedLocation = locations[locationIndex];
      locations.splice(locationIndex, 1);
      return deletedLocation;
    },

    //Participant
    createParticipant: (parent, { data }) => {
      const participant = {
        id: nanoid(),
        ...data,
      };
      participants.push(participant);
      return participant;
    },
    updateParticipant: (parent, { id, data }) => {
      const participantIndex = participants.findIndex(
        (participant) => participant.id == id
      );
      if (participantIndex === -1) return new Error("Participant not found!");
      const updatedParticipant = (participants[participantIndex] = {
        ...participants[participantIndex],
        ...data,
      });
      return updatedParticipant;
    },
    deleteParticipant: (parent, { id }) => {
      const participantIndex = participants.findIndex(
        (participant) => participant.id == id
      );
      if (participantIndex === -1) return new Error("Participant not found!");
      const deletedParticipant = participants[participantIndex];
      participants.splice(participantIndex, 1);
      return deletedParticipant;
    },
  },
  Query: {
    //User
    users: () => users,
    user: (parent, args) => users.find((user) => user.id == args.id),

    //Event
    events: () => events,
    event: (parents, args) => events.find((event) => event.id == args.id),

    //Location
    locations: () => locations,
    location: (parents, args) =>
      locations.find((location) => location.id == args.id),

    //Participant
    participants: () => participants,
    participant: (parents, args) =>
      participants.find((participant) => participant.id == args.id),
  },
  User: {
    events: (parents) => events.filter((event) => event.user_id === parents.id),
  },
  Event: {
    user: (parent) => users.find((user) => user.id == parent.user_id),
    location: (parent) =>
      locations.find((location) => location.id == parent.location_id),
    participants: (parents) =>
      participants.filter((participant) => participant.event_id == parents.id),
  },
  Participant: {
    user: (parent) => users.find((user) => user.id === parent.user_id),
    event: (parent) => events.find((event) => event.id === parent.event_id),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground({})],
});
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
