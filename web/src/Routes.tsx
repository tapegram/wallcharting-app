// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route } from '@redwoodjs/router'
import PeopleLayout from 'src/layouts/PeopleLayout'
import ProfilesLayout from 'src/layouts/ProfilesLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={PeopleLayout}>
        <Route path="/people/new" page={PersonNewPersonPage} name="newPerson" />
        <Route path="/people/{id:Int}/edit" page={PersonEditPersonPage} name="editPerson" />
        <Route path="/people/{id:Int}" page={PersonPersonPage} name="person" />
        <Route path="/people" page={PersonPeoplePage} name="people" />
      </Set>
      <Set wrap={ProfilesLayout}>
        <Route path="/profiles" page={ProfilesPage} name="profiles" />
        <Route path="/profiles/{id:Int}" page={ProfilePage} name="profile" />
        <Route path="/" page={HomePage} name="home" />
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
