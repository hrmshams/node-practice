const express = require("express")
const express_graphql = require("express-graphql")
const graphql = require("graphql")

const dataArr = require("./data.json")

const schema = graphql.buildSchema(`
  type Query {
    course(id: Int!): Course
    courses(ids: [Int]!): [Course]
  }
  type User {
    id: Int!
    name: String!
  }
  type Course {
    id: Int!
    title: String!
    description: String!
    topic: String!
    url: String!
    author: User
  }
`)
//     author: User!

const resolver = {
  course: (root, args, context, info) => {
    console.log(context)
    const { id } = root
    return dataArr.find((el) => el.id === id)
  },
  courses: ({ ids }) => {
    return dataArr.filter((el) => ids.includes(el.id))
  },
}
const fieldResolver = () => {
  return {
    author: (args) => {
      return { id: 1, name: "test" }
    },
  }
}

const app = express()

app.use(
  "/graphql",
  express_graphql.graphqlHTTP({
    schema,
    rootValue: resolver,
    graphiql: true,
    fieldResolver,
  })
)
app.listen(4000, () => {
  console.log("app is running on port 4000")
})
