import {
  Form,
  FormError,
  Label,
  SelectField,
  Submit,
} from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Toaster } from '@redwoodjs/web/toast'
import { QUERY as RelationshipsQuery } from 'src/components/RelationshipsCell'

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
    refetchQueries: [{ query: RelationshipsQuery, variables: { personId } }],
  })
  const onSubmit = (input) => {
    createRelationship({ variables: {
      input: {
        leftId: personId,
        rightId: input.person
      }
     }
    })
  }

  return (
    <div>
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <h3>Add Relationship</h3>
      <Form onSubmit={onSubmit}>
        <FormError
          error={error}
        />

        <Label name="person" >
          Person
        </Label>
        <SelectField
          name="person"
          validation={{ required: true, valueAsNumber: true }}
        >
          {people.map((person) => (
            <option key={person.id} value={person.id}>
              {person.lastName}, {person.firstName}
            </option>
          ))}
        </SelectField>

        <Submit>
          Submit
        </Submit>
      </Form>
    </div>
  )
}

export default RelationshipForm
