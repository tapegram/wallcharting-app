import { MetaTags } from '@redwoodjs/web'
import ProfileCell from 'src/components/ProfileCell'

const ProfilePage = ({ id }) => {
  return (
    <>
      <MetaTags title="Profile" description="Profile page" />
      <ProfileCell id={id}/>
    </>
  )
}

export default ProfilePage
