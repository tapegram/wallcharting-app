import { render } from '@redwoodjs/testing/web'

import ProfilePanel from './ProfilePanel'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ProfilePanel', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ProfilePanel />)
    }).not.toThrow()
  })
})
