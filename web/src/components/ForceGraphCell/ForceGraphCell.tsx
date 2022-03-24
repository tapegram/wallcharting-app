import type { CellFailureProps } from '@redwoodjs/web'
import ForceGraph from 'src/components/ForceGraph/ForceGraph'

export const QUERY = gql`
  query ForceGraphQuery {
    relationshipsGraph {
      nodes {
        id
        label
      }
      edges {
        leftId
        rightId
      }
    }
  }
`
export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ relationshipsGraph }) => {
  return <ForceGraph nodes={relationshipsGraph.nodes} edges={relationshipsGraph.edges}/>
}
