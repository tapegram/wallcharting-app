import type { RelationshipsQuery } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { Link, routes } from '@redwoodjs/router'


export const QUERY = gql`
  query RelationshipsQuery($personId: Int!) {
    relationships(personId: $personId) {
      id
      leftId
      left {
        id
        firstName
        lastName
      }
      rightId
      right {
        id
        firstName
        lastName
      }
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
        {aggregateRelationships(personId, relationships).map((person) => {
          return <div key={person.id}>
            <h3>
              <Link to={routes.profile({ id: person.id })}>
                {person.lastName}, {person.firstName}
              </Link>
            </h3>
          </div>
        })}
      </ul>
    </>
  )
}

// We dont know if the current user is on the left or right, so this just
// grabs the "other" user
// filters duplicates
const aggregateRelationships = (id, relationships) => {
  return relationships.map((relationship) => {
    if (relationship.leftId === id) {
      return relationship.right
    } else {
      return relationship.left
    }
  })
}
