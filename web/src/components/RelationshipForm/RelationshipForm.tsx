import {
  Form,
  FormError,
  Label,
  SelectField,
  Submit,
} from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'

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
  const [createRelationship, { loading, error }] = useMutation(CREATE)
  const onSubmit = (input) => {
    console.log(input.person)
    console.log(personId)
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
