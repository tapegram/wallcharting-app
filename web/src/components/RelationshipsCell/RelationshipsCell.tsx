import type { CellFailureProps } from '@redwoodjs/web'
import { routes } from '@redwoodjs/router'
import Link from 'src/components/Link/Link'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'


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


const DELETE_RELATIONSHIP_MUTATION = gql`
  mutation DeleteRelationshipMutation($id: Int!) {
    deleteRelationship(id: $id) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ personId, relationships }) => {
  const [deleteRelationship] = useMutation(DELETE_RELATIONSHIP_MUTATION, {
    onCompleted: () => {
      toast.success('Relationship deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    refetchQueries: [{ query: QUERY, variables: { personId } }],
  })

  const onDeleteClick = (id, person) => {
    if (confirm(
      'Are you sure you want to delete this relationship: ' + person.lastName + ', ' + person.firstName + '?')) {
      deleteRelationship({ variables: { id } })
    }
  }

  return (
    <div className="my-5">
      <h2 className="text-xl">Relationships</h2>
      <ul>
        {aggregateRelationships(personId, relationships).map((relationship) => {
          return <div key={relationship.id}>
            <li>
              <Link to={routes.profile({ id: relationship.person.id })}
              >
                {relationship.person.lastName}, {relationship.person.firstName}
              </Link>
              <button
                type="button"
                className="flex-shrink-0 border-transparent border-4 text-red-500 hover:text-red-800 text-sm py-1 px-2 rounded"
                onClick={() => onDeleteClick(relationship.id, relationship.person)}
              >
                X
              </button>

            </li>
          </div>
        })}
      </ul>
    </div >
  )
}

// We dont know if the current user is on the left or right, so this just
// grabs the "other" user
// filters duplicates
const aggregateRelationships = (id, relationships) => {
  return uniqBy(relationships
    .filter((relationship) => relationship.leftId === id || relationship.rightId === id)
    .map((relationship) => {
      if (relationship.leftId === id) {
        return { id: relationship.id, person: relationship.right }
      } else {
        return { id: relationship.id, person: relationship.left }
      }
    }), JSON.stringify)
}

const uniqBy = (a, key) => {
  var seen = {};
  return a.filter(function (item) {
    var k = key(item);
    return seen.hasOwnProperty(k) ? false : (seen[k] = true);
  })
}
