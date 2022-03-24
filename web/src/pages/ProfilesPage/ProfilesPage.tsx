import { MetaTags } from '@redwoodjs/web'
import ProfilesCell from 'src/components/ProfilesCell'

const ProfilesPage = () => {
  return (
    <>
      <MetaTags title="Profiles" description="Profiles page" />
      <h1>ProfilesPage</h1>
      <ProfilesCell />
    </>
  )
}

export default ProfilesPage
