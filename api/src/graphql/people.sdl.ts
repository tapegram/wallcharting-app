export const schema = gql`
  type Person {
    id: Int!
    firstName: String!
    lastName: String!
    createdAt: DateTime!
    relationshipsLeft: [Relationship]!
    relationshipsRight: [Relationship]!
  }

  type Relationship {
    id: Int!
    leftId: Int!
    left: Person!
    rightId: Int!
    right: Person!
  }

  type Query {
    people: [Person!]! @requireAuth
    person(id: Int!): Person @requireAuth
    relationships(personId: Int!): [Relationship!]! @requireAuth
  }

  input CreatePersonInput {
    firstName: String!
    lastName: String!
  }

  input UpdatePersonInput {
    firstName: String
    lastName: String
  }

  input CreateRelationshipInput {
    leftId: Int!
    rightId: Int!
  }

  type Mutation {
    createPerson(input: CreatePersonInput!): Person! @requireAuth
    updatePerson(id: Int!, input: UpdatePersonInput!): Person! @requireAuth
    deletePerson(id: Int!): Person! @requireAuth
    createRelationship(input: CreateRelationshipInput!): Relationship! @requireAuth
  }
`
