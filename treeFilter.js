function treeFilter(tree, callBack) {
  return tree.map(node => ({ ... ndoe })).filter(node => {
    node.children = node.children && treeFilter(node.children, callBack);
    return callBack(node) || (node.children && node.children.length);
  });
}