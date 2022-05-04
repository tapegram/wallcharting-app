import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

type PersonLayoutProps = {
  children: React.ReactNode
}

const PeopleLayout = ({ children }: PersonLayoutProps) => {
  return (
    <div className="rw-scaffold">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link to={routes.home()} className="rw-link mx-2">
            Home
          </Link>
          <Link to={routes.people()} className="rw-link mx-2">
            People
          </Link>
          <Link to={routes.profiles()} className="rw-link mx-2">
            Profiles
          </Link>
        </h1>
        <Link to={routes.newPerson()} className="rw-button rw-button-green">
          <div className="rw-button-icon">+</div> New Person
        </Link>
      </header>
      <main className="rw-main">{children}</main>
    </div>
  )
}

export default PeopleLayout
