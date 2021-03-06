import { Graph } from 'react-d3-graph'
import { useState } from 'react'
import ProfilePanel from '../ProfilePanel/ProfilePanel'
const ForceGraph = ({ nodes, edges }) => {
  const [selectedPerson, setSelectedPerson] = useState(0)
  const [showPanel, setShowPanel] = useState(false)
  const state = {
    data: {
      nodes: nodes,
      links: edges.map((edge) => ({
        source: edge.leftId,
        target: edge.rightId,
        label: edge.category,
      })),
    },
    config: {
      height: 400,
      width: 400,
      automaticRearrangeAfterDropNode: true,
      freezeAllDragEvents: false,
      staticGraph: false,
      staticGraphWithDragAndDrop: false,
      collapsible: false,
      nodeHighlightBehavior: true,
      node: {
        fontSize: 12,
        highlightStrokeColor: 'blue',
        labelProperty: 'label',
      },
      link: {
        highlightColor: 'lightblue',
        labelProperty: 'label',
        renderLabel: true,
      },
      d3: {
        alphaTarget: 0.05,
        gravity: -250,
        linkLength: 120,
        linkStrength: 2,
        disableLinkForce: false,
      },
    },
    fontSize: 12,
  }

  const onClickNode = (nodeId) => {
    // navigate(routes.profile({ id: nodeId }))
    setSelectedPerson(parseInt(nodeId))
    setShowPanel(true)
  }

  return (
    <>
      <p>{showPanel ? <ProfilePanel id={selectedPerson} /> : <></>}</p>
      <div className="w-1/3">
        <Graph
          id="ontology-graph"
          data={state.data}
          config={state.config}
          onClickNode={onClickNode}
        />
      </div>
    </>
  )
}

export default ForceGraph
