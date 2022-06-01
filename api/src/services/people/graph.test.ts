import {
  people,
  person,
  createPerson,
  updatePerson,
  deletePerson,
  getColor,
  getSize,
} from './people'
import type { StandardScenario } from './people.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('color', () => {
  scenario('edge < 2', async () => {
    const result = getColor(1)

    expect(result).toEqual('blue')
  })
  scenario('edge = 2', async () => {
    const result = getColor(2)

    expect(result).toEqual('blue')
  })
  scenario('edge > 2', async () => {
    const result = getColor(3)

    expect(result).toEqual('red')
  })
})
describe('size', () => {
  scenario('size = 0', async () => {
    const result = getSize(0)

    expect(result).toEqual(100)
  })
  scenario('size = 1', async () => {
    const result = getSize(1)

    expect(result).toEqual(300)
  })
  scenario('size = 4', async () => {
    const result = getSize(4)

    expect(result).toEqual(900)
  })
  scenario('size = 5', async () => {
    const result = getSize(5)

    expect(result).toEqual(1000)
  })
  scenario('size = 100', async () => {
    const result = getSize(100)

    expect(result).toEqual(1000)
  })
})
