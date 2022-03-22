import type { ProfilesQuery } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import Profile from 'src/components/Profile/Profile'


export const QUERY = gql`
  query ProfilesQuery {
    profiles: people {
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

export const Success = ({ profiles }) => {
  return profiles.map((profile) => (
      <Profile key={profile.id} profile={profile} />
  ))
}
