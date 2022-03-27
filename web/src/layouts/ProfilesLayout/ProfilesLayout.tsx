import { routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'
import Link from 'src/components/Link/Link'

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
            to={routes.home()}
          >
            Home
          </Link>
        </li>
        <li className="mr-6">
          <Link
            to={routes.people()}
          >
            People
          </Link>
        </li>
        <li className="mr-6">
          <Link
            to={routes.profiles()}
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
