import { Link, routes } from '@redwoodjs/router'
import RelationshipsCell from 'src/components/RelationshipsCell'
import CreateRelationshipForPersonFormCell from 'src/components/CreateRelationshipForPersonFormCell'

const Profile = ({ profile }) => {
  return (
    <div className="my-4">
      <h2 className="text-xl">
        <Link to={routes.profile({ id: profile.id })}
          className="text-blue-500 hover:text-blue-800"
        >
          {profile.lastName}, {profile.firstName}
        </Link>
      </h2>
      <div>Created at: {profile.createdAt}</div>
      <CreateRelationshipForPersonFormCell personId={profile.id} />
      <RelationshipsCell personId={profile.id} />
    </div>
  )
}

export default Profile
