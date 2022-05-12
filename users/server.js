const { ApolloServer, gql } = require("apollo-server");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");
 const { users, events, locations, participants } = require("./data");

const typeDefs = gql`
  type User {
    id: ID
    username: String!
    email: String!
    events: [Event!]!
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
  type Location {
    id: ID!
    name: String!
    desc: String!
    lat: Float!
    lng: Float!
  }
  type Participant {
    id: ID!
    user_id: ID!
    event_id: ID!
    user: User!
    event: Event!
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
`;

const resolvers = {
  Query: {
    users: () => users,
    user:  (parent, args) => users.find((user) => user.id == args.id),

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
    user: (parent) => users.find(user => user.id === parent.user_id),
    location: (parent) => locations.find(location => location.id === parent.location_id),
    participants: (parents) =>
      participants.filter((participant) => participant.event_id === parents.id),
  },
  Participant: {
    user: (parent) => users.find(user => user.id === parent.user_id),
    event: (parent) => events.find(event => event.id === parent.event_id)
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground({})],
});
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});

