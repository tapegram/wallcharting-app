import { Link as RWLink } from '@redwoodjs/router'

const Link = ({ to, children }) => {
  return (
    <RWLink to={to}
      className="text-blue-500 hover:text-blue-800"
    >
      {children}
    </RWLink>
  )
}

export default Link
