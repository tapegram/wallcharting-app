import {
  people,
  person,
  createPerson,
  updatePerson,
  deletePerson,
} from './people'
import type { StandardScenario } from './people.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('people', () => {
  scenario('returns all people', async (scenario: StandardScenario) => {
    const result = await people()

    expect(result.length).toEqual(Object.keys(scenario.person).length)
  })

  scenario('returns a single person', async (scenario: StandardScenario) => {
    const result = await person({ id: scenario.person.one.id })

    expect(result).toEqual(scenario.person.one)
  })

  scenario('creates a person', async () => {
    const result = await createPerson({
      input: { firstName: 'String', lastName: 'String' },
    })

    expect(result.firstName).toEqual('String')
    expect(result.lastName).toEqual('String')
  })

  scenario('updates a person', async (scenario: StandardScenario) => {
    const original = await person({ id: scenario.person.one.id })
    const result = await updatePerson({
      id: original.id,
      input: { firstName: 'String2' },
    })

    expect(result.firstName).toEqual('String2')
  })

  scenario('deletes a person', async (scenario: StandardScenario) => {
    const original = await deletePerson({ id: scenario.person.one.id })
    const result = await person({ id: original.id })

    expect(result).toEqual(null)
  })
})
