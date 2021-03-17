const express = require("express")
const { GraphQLServer } = require("graphql-yoga")

const libraries = [
  {
    branch: "downtown",
  },
  {
    branch: "riverside",
  },
]

// The branch field of a book indicates which library has it in stock
const books = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
    branch: "riverside",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
    branch: "downtown",
  },
]

// Schema definition
const typeDefs = `
  type Library {
    branch: String!
    books: [Book!]
  }
  type Book {
    title: String!
    author: Author!
  }
  type Author {
    name: String!
  }
  type Query {
    libraries: [Library]
  }
`

// Resolver map
const resolvers = {
  Query: {
    libraries() {
      // Return our hardcoded array of libraries
      return libraries
    },
  },
  Library: {
    books(parent) {
      // Filter the hardcoded array of books to only include
      // books that are located at the correct branch
      return books.filter((book) => book.branch === parent.branch)
    },
  },
  Book: {
    // The parent resolver (Library.books) returns an object with the
    // author's name in the "author" field. Return a JSON object containing
    // the name, because this field expects an object.
    author(parent) {
      return {
        name: parent.author,
      }
    },
  },

  // Because Book.author returns an object with a "name" field,
  // Apollo Server's default resolver for Author.name will work.
  // We don't need to define one.
}

// Pass schema definition and resolvers to the
// ApolloServer constructor
const server = new GraphQLServer({ typeDefs, resolvers })

// Launch the server
server.start(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})

// If we now update our query to also ask for each book's title:

// Copy

/*
query GetBooksByLibrary {
  libraries {
    books {
      title
      author {
        name
      }
    }
  }
}
*/
