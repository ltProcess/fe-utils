let list = [
  {
    id: "1",
    title: "节点1",
    parentId: "",
  },
  {
    id: "1-1",
    title: "节点1-1",
    parentId: "1",
  },
  {
    id: "1-2",
    title: "节点1-2",
    parentId: "1",
  },
  {
    id: "2",
    title: "节点2",
    parentId: "",
  },
  {
    id: "2-1",
    title: "节点2-1",
    parentId: "2",
  },
];

function listToTree(list) {
  const info = list.reduce((map, node) => {
    map[node.id] = node;
    node.children = [];
    return map;
  }, {});
  console.log(info);
  return list.filter((node) => {
    info[node.parentId] && info[node.parentId].children.push(node);
    return !node.parentId;
  });
}

function list2Tree(list) {
  const tree = [];
  for (const node of list) {
    if (!node.parentId) {
      let p = { ...node };
      p.children = getChildren(p.id, list);
      tree.push(p);
    }
  }
  function getChildren(id, list) {
    const children = [];
    for (const node of list) {
      if (node.parentId === id) {
        children.push(node);
      }
    }
    for (const node of children) {
      const children = getChildren(node.id, list);
      if (children.length) node.children = children;
    }
    return children;
  }
  return tree;
}
console.log(list2Tree(list));

module.exports = {
  list,
  listToTree,
};
