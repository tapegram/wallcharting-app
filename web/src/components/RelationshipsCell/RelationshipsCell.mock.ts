// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  relationships: [relationship1, relationship2],
})

const relationship1 = {
  id: 42,
  leftId: 1,
  left: {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
  },
  rightId: 2,
  right: {
    id: 2,
    firstName: 'Jane',
    lastName: 'Doe',
  }
}

const relationship2 = {
  id: 42,
  leftId: 1,
  left: {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
  },
  rightId: 3,
  right: {
    id: 3,
    firstName: 'Jacob',
    lastName: 'Doe',
  }
}

