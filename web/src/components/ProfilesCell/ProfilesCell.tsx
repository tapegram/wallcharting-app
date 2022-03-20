import type { ProfilesQuery } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'


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

export const Success = ({ profiles }: CellSuccessProps<ProfilesQuery>) => {
  return (
    <>
      {profiles.map((profile) => {
        return <div key={profile.id}>
          {console.log(profile)}
          <header>
            <h2>{profile.lastName}, {profile.firstName}</h2>
          </header>
          <body>
            <p>{profile.lastName}, {profile.firstName}</p>
            <div>Created at: {profile.createdAt}</div>
          </body>
        </div>
      })}
    </>
  )
}
