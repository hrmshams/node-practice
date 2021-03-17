const express = require("express")
const { GraphQLServer } = require("graphql-yoga")

const { authors, books } = require("./data")

const typeDefs = `
  type Author {
    id: Int!
    name: String!
  }
  type Course {
    id: Int!
    author: Author
    title: String!
    description: String!
    topic: String!
    url: String!
  }
  type Query {
    msg: String!
    course(id: Int!): Course
    courses(ids: [Int]!): [Course]
  }
`

const resolvers = {
  Query: {
    msg: () => {
      return "hello graphql"
    },
    course: (_, args) => {
      const { id } = args
      return books.find((el) => el.id === id)
    },
    courses: (_, { ids }) => {
      return books.filter((el) => ids.includes(el.id))
    },
  },
  Course: {
    author: (parent) => {
      const bookId = parent.id
      let author = authors.find((el) => el.books.includes(bookId))
      return { id: author.id, name: author.name }
    },
  },
}
const opts = {
  port: 4000,
  endpoint: "/graphql",
}

const server = new GraphQLServer({ typeDefs, resolvers, opts })
server.express.use("/rest", (req, res) => {
  res.send("combination of graphql and rest is possible lol")
})

server.start(() => {
  console.log(`Server running at http://localhost:${opts.port}${opts.endpoint}`)
})
