import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

type ProfilesLayoutProps = {
  children?: React.ReactNode
}

const ProfilesLayout = ({ children }: ProfilesLayoutProps) => {
    return <div className="rw-scaffold">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
        <Link
          to={routes.people()}
          className="rw-link"
        >
          people
        </Link>
          <Link
            to={routes.profiles()}
            className="rw-link"
          >
            profiles
          </Link>
        <Link
          to={routes.people()}
          className="rw-link"
        >
          people
        </Link>
        </h1>
      </header>
      <main className="rw-main">{children}</main>
    </div>
}

export default ProfilesLayout
