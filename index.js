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
        // query for a single game
        game(_, args) {
            return db.games.find(game => game.id === args.id)
        },
        authors() {
            return db.authors
        },
        // query for a single author
        author(_, args) {
            return db.authors.find(author => author.id === args.id)
        },
        reviews() {
            return db.reviews
        },
        // query for a single review
        review(_, args) {
            return db.reviews.find(review => review.id === args.id)
        }
    },
    // query for a game's reviews
    Game: {
        reviews(parent) {
            return db.reviews.filter((r) => r.game_id === parent.id)
        }
    },
    // query for an author's reviews
    Author: {
        reviews(parent) {
            return db.reviews.filter((r) => r.author_id === parent.id)
        }
    },
    // query for a review's author and game
    Review: {
        game(parent) {
            return db.games.find((g) => g.id === parent.game_id)
        },
        author(parent) {
            return db.authors.find((a) => a.id === parent.author_id)
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
