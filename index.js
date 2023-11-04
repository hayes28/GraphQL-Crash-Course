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
        game(_, args) {
            return db.games.find(game => game.id === args.id)
        },
        authors() {
            return db.authors
        },
        author(_, args) {
            return db.authors.find(author => author.id === args.id)
        },
        reviews() {
            return db.reviews
        },
        review(_, args) {
            return db.reviews.find(review => review.id === args.id)
        }
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
