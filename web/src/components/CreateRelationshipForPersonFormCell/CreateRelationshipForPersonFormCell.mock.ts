// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  createRelationshipForPersonForm: {
    personId: 42,
    people: [
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
      },
      {
        id: 2,
        firstName: 'Jane',
        lastName: 'Doe',
      },
    ]
  },
})
