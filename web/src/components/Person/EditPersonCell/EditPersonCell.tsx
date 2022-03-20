import type { EditPersonById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'

import PersonForm from 'src/components/Person/PersonForm'

export const QUERY = gql`
  query EditPersonById($id: Int!) {
    person: person(id: $id) {
      id
      firstName
      lastName
      createdAt
    }
  }
`
const UPDATE_PERSON_MUTATION = gql`
  mutation UpdatePersonMutation($id: Int!, $input: UpdatePersonInput!) {
    updatePerson(id: $id, input: $input) {
      id
      firstName
      lastName
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ person }: CellSuccessProps<EditPersonById>) => {
  const [updatePerson, { loading, error }] = useMutation(UPDATE_PERSON_MUTATION, {
    onCompleted: () => {
      toast.success('Person updated')
      navigate(routes.people())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input, id) => {
    updatePerson({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit Person {person.id}</h2>
      </header>
      <div className="rw-segment-main">
        <PersonForm person={person} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
