import { Graph } from 'react-d3-graph'
import { navigate, routes } from '@redwoodjs/router'
import { useState, useEffect } from 'react'
import ProfilePanel from '../ProfilePanel/ProfilePanel'

const ForceGraph = ({ nodes, edges }) => {
  const [selectedPerson, setSelectedPerson] = useState(0)
  const [showPanel, setShowPanel] = useState(false)
  const [dimensions, setDimensions] = useState({})
  const state = {
    data: {
      nodes: nodes,
      links: edges.map((edge) => ({
        source: edge.leftId,
        target: edge.rightId,
      })),
    },
    config: {
      height: window.innerHeight,
      width: window.innerWidth,
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

  function debounce(fn, ms) {
    let timer
    return _ => {
      clearTimeout(timer)
      timer = setTimeout(_ => {
        timer = null
        fn.apply(this, arguments)
      }, ms)
    };
  }

  useEffect(() => {
    const debouncedHandleResize = debounce(function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth
      })
    }, 50)

    window.addEventListener('resize', debouncedHandleResize)

    return _ => {
      window.removeEventListener('resize', debouncedHandleResize)
    }
  })

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
