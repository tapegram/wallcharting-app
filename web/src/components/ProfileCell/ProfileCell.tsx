import type { ProfileQuery } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import Profile from 'src/components/Profile/Profile'

export const QUERY = gql`
  query ProfileQuery($id: Int!) {
    profile: person(id: $id) {
      id
      firstName
      lastName
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ profile }: CellSuccessProps<ProfileQuery>) => {
  return <Profile key={profile.id} profile={profile} />
}
