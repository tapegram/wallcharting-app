import { render } from '@redwoodjs/testing/web'
import PeopleCell from '../Person/PeopleCell'

import RelationshipForm from './RelationshipForm'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('RelationshipForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<RelationshipForm personId={1} people={people()}/>)
    }).not.toThrow()
  })
})

const people = () => [
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
