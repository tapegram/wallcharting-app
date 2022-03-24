import { render } from '@redwoodjs/testing/web'

import ProfilesLayout from './ProfilesLayout'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('ProfilesLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ProfilesLayout />)
    }).not.toThrow()
  })
})
