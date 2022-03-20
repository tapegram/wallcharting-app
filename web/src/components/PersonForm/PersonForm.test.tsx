import { render } from '@redwoodjs/testing/web'

import PersonForm from './PersonForm'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('PersonForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PersonForm />)
    }).not.toThrow()
  })
})
