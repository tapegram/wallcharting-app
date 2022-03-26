import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

type ProfilesLayoutProps = {
  children?: React.ReactNode
}

const ProfilesLayout = ({ children }: ProfilesLayoutProps) => {
    return <div>
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <header>
        <h1>
        <Link
          to={routes.people()}
        >
          people
        </Link>
          <Link
            to={routes.profiles()}
          >
            profiles
          </Link>
        <Link
          to={routes.people()}
        >
          people
        </Link>
        </h1>
      </header>
      <main>{children}</main>
    </div>
}

export default ProfilesLayout
