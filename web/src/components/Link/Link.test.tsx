import { render } from '@redwoodjs/testing/web'

import Link from './Link'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Link', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Link />)
    }).not.toThrow()
  })
})
