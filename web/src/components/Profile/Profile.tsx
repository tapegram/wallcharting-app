import { Link, routes } from '@redwoodjs/router'
import RelationshipsCell from 'src/components/RelationshipsCell'

const Profile = ({ profile }) => {
  return (
    <>
        <h2>
          <Link to={routes.profile({ id: profile.id })}>
            {profile.lastName}, {profile.firstName}
          </Link>
        </h2>
        <div>Created at: {profile.createdAt}</div>
        <RelationshipsCell personId={profile.id} />
    </>
  )
}

export default Profile
