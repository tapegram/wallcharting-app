import {
  Form,
  FormError,
  SelectField,
  Submit,
} from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { QUERY as RelationshipsQuery } from 'src/components/RelationshipsCell'
import { QUERY as ForceGraphQuery } from 'src/components/ForceGraphCell'

const CREATE = gql`
  mutation CreateRelationshipMutation($input: CreateRelationshipInput!) {
    createRelationship(input: $input) {
      id,
      leftId,
      left {
        id,
        firstName,
        lastName,
      },
      rightId,
      right {
        id,
        firstName,
        lastName,
      }
    }
  }
`

const RelationshipForm = ({ personId, people }) => {
  const [createRelationship, { loading, error }] = useMutation(CREATE, {
    onCompleted: () => {
      toast.success('Relationship created!')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    refetchQueries: [
      { query: RelationshipsQuery, variables: { personId } },
      { query: ForceGraphQuery },
    ],
  })
  const onSubmit = (input) => {
    createRelationship({
      variables: {
        input: {
          leftId: personId,
          rightId: input.person
        }
      }
    })
  }

  return (
    <div className="my-4">
      <h2 className="text-xl">Add Relationship</h2>
      <Form onSubmit={onSubmit}>
        <FormError
          error={error}
        />
        <div className="inline-block relative w-64">
          <SelectField
            name="person"
            validation={{ required: true, valueAsNumber: true }}
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">

            <option value="" disabled selected>Select a person</option>
            {people.map((person) => (
              <option key={person.id} value={person.id}>
                {person.lastName}, {person.firstName}
              </option>

            ))}
          </SelectField>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
          </div>
        </div>
        <Submit
          className="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded"
        >
          Submit
        </Submit>
      </Form>
    </div>
  )
}

export default RelationshipForm
