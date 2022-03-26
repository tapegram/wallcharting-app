import { Graph } from "react-d3-graph";
import { navigate, routes } from '@redwoodjs/router'

const ForceGraph = ({ nodes, edges }) => {
  const state = {
    data: {
      nodes: nodes,
      links: edges.map((edge) => ({ source: edge.leftId, target: edge.rightId })),
    },
    config: {
      collapsible: false,
      nodeHighlightBehavior: false,
      node: {
        color: "blue",
        size: 250,
        fontSize: 12,
        highlightStrokeColor: "blue",
        labelProperty: "label",
      },
      link: {
        highlightColor: "lightblue"
      }
    },
    fontSize: 12
  };

  const onClickNode = nodeId => {
    navigate(routes.profile({ id: nodeId }))
  };

  const onDoubleClickNode = nodeId => {
    console.log("DoubleClick on node: ", nodeId);
  };

  return <Graph
    id="ontology-graph"
    data={state.data}
    config={state.config}
    onClickNode={onClickNode}
    onDoubleClickNode={onDoubleClickNode}
  />
}


export default ForceGraph
