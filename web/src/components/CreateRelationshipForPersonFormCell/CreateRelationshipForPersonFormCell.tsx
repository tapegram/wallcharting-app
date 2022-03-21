import type { FindPeople } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import RelationshipsForm from 'src/components/RelationshipForm/RelationshipForm'

export const QUERY = gql`
  query FindPeople {
    people {
      id
      firstName
      lastName
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ personId, people }: CellSuccessProps<FindPeople>) => {
  return <div>
      <RelationshipsForm personId={personId} people={people} />
    </div>
}
