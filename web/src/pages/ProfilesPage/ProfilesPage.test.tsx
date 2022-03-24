import { render } from '@redwoodjs/testing/web'

import ProfilesPage from './ProfilesPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('ProfilesPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ProfilesPage />)
    }).not.toThrow()
  })
})
