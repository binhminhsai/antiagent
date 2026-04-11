import json

def simplify_node(node, depth=0):
    indent = "  " * depth
    name = node.get("name", "Unknown")
    node_type = node.get("type", "Unknown")
    print(f"{indent}- {name} ({node_type})")
    for child in node.get("children", []):
        simplify_node(child, depth + 1)

with open("figma_node.json", "r") as f:
    data = json.load(f)

nodes = data.get("nodes", {})
for node_id, node_data in nodes.items():
    print(f"Node ID: {node_id}")
    simplify_node(node_data.get("document", {}))
