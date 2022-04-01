import ProfileCell from 'src/components/ProfileCell'

type Props = {
  id: number
}

const ProfilePanel = ({ id }) => {
  return (
    <div className="h-1/3 w-1/3">
      <ProfileCell id={id} />
    </div>
  )
}

export default ProfilePanel
