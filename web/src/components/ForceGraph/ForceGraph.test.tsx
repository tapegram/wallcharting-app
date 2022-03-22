import { render } from '@redwoodjs/testing/web'

import ForceGraph from './ForceGraph'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ForceGraph', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ForceGraph />)
    }).not.toThrow()
  })
})
