import { Link, routes } from '@redwoodjs/router'

const Profile = ({ profile }) => {
  return (
    <div>
        <header>
          <h2>
            <Link to={routes.profile({ id: profile.id })}>
              {profile.lastName}, {profile.firstName}
            </Link>
          </h2>
        </header>

        <body>
          <div>Created at: {profile.createdAt}</div>
        </body>
    </div>
  )
}

export default Profile
