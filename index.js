import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

// Import data
import db from './_db.js';

// Import typeDefs
import { typeDefs } from './schema.js';

// resolvers
const resolvers = {
    Query: {
        games() {
            return db.games
        },
        authors() {
            return db.authors
        },
        reviews() {
            return db.reviews
        },
    }
}

// Setup Apollo Server
const server = new ApolloServer({
    typeDefs,
    resolvers
});

// Start the server
const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 }
})

console.log(`Server ready at: ${url}`);
