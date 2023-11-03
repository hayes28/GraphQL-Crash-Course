import { ApolloServer } from 'apollo-server';
import { startStandaloneServer } from '@apollo/server/standalone';

// Setup Apollo Server
const server = new ApolloServer({
    // typeDefs
    // resolvers
});

// Start the server
const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 }
})

console.log(`Server ready at port`, 4000);