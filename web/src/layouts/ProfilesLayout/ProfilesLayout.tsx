import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

type ProfilesLayoutProps = {
  children?: React.ReactNode
}

const ProfilesLayout = ({ children }: ProfilesLayoutProps) => {
  return <div className="m-4">
    <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
    <header>
      <ul className="flex">
        <li className="mr-6">
          <Link
            to={routes.people()}
            className="text-blue-500 hover:text-blue-800"
          >
            People
          </Link>
        </li>
        <li className="mr-6">
          <Link
            to={routes.profiles()}
            className="text-blue-500 hover:text-blue-800"
          >
            Profiles
          </Link>
        </li>
      </ul>
    </header>
    <main>{children}</main>
  </div>
}

export default ProfilesLayout
