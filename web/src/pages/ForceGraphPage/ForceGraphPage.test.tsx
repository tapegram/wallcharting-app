import { render } from '@redwoodjs/testing/web'

import ForceGraphPage from './ForceGraphPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('ForceGraphPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ForceGraphPage />)
    }).not.toThrow()
  })
})
