import { Graph } from "react-d3-graph";

const ForceGraph = () => {
  const state = {
    data: {
      nodes: [
        { id: "query", type: "query", color: "#FBc879" },
        { id: "hmrc_united_kingdom", type: "authority", color: "#ff0076" },
        { id: "united_kingdom_hm_revenue_and_customs", type: "authority" },
        { id: "united_kingdom", type: "countries" },
        { id: "customs_and_excise_l1", type: "lc-l1" },
        { id: "customs_and_excise_l2", type: "lc-l2" },
        { id: "international_trade", type: "lc-l1", color: "#ff0076" }
      ],
      links: [
        { source: "customs_and_excise_l2", target: "international_trade" },
        { source: "query", target: "hmrc_united_kingdom" },
        { source: "query", target: "united_kingdom_hm_revenue_and_customs" },
        { source: "query", target: "united_kingdom" },
        { source: "query", target: "customs_and_excise_l1" },
        { source: "query", target: "customs_and_excise_l2" }
      ]
    },
    config: {
      collapsible: true,
      nodeHighlightBehavior: true,
      node: {
        color: "blue",
        size: 250,
        fontSize: 12,
        highlightStrokeColor: "blue"
      },
      link: {
        highlightColor: "lightblue"
      }
    },
    fontSize: 12
  };

  const onClickNode = nodeId => {
    console.log("Click on node: ", nodeId);
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
