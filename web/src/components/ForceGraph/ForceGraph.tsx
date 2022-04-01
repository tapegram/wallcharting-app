import { Graph } from 'react-d3-graph'
import { navigate, routes } from '@redwoodjs/router'
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
      })),
    },
    config: {
      height: 800,
      width: 800,
      automaticRearrangeAfterDropNode: true,
      freezeAllDragEvents: false,
      staticGraph: false,
      staticGraphWithDragAndDrop: false,
      collapsible: false,
      nodeHighlightBehavior: true,
      node: {
        color: 'blue',
        size: 400,
        fontSize: 12,
        highlightStrokeColor: 'blue',
        labelProperty: 'label',
      },
      link: {
        highlightColor: 'lightblue',
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
      <Graph
        id="ontology-graph"
        data={state.data}
        config={state.config}
        onClickNode={onClickNode}
      />
    </>
  )
}

export default ForceGraph
