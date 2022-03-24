import { MetaTags } from '@redwoodjs/web'
import ForceGraphCell from 'src/components/ForceGraphCell'

const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" description="Home page" />
      <h1>HomePage</h1>
      <ForceGraphCell />
    </>
  )
}

export default HomePage
