import type { RelationshipsQuery } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import PersonCell from 'src/components/Person/PersonCell'


export const QUERY = gql`
  query RelationshipsQuery($personId: Int!) {
    relationships(personId: $personId) {
      id
      leftId
      rightId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ personId, relationships }: CellSuccessProps<RelationshipsQuery>) => {
  return (
    <>
      <h2>Relationships</h2>
      <ul>
        {console.log(aggregateRelationships(personId, relationships)) || aggregateRelationships(personId, relationships).map((id) => {
          return <PersonCell key={id} id={id} />
        })}
      </ul>
    </>
  )
}

// We dont know if the current user is on the left or right, so this just
// grabs the "other" user
const aggregateRelationships = (id, relationships) => {
  return relationships.map((relationship) => {
    if (relationship.leftId === id) {
      return relationship.rightId
    } else {
      return relationship.leftId
    }
  })
}
