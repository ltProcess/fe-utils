const { list, listToTree } = require('./listToTree');
function treeFilter(tree, callBack) {
  return tree.map(node => ({ ... node })).filter(node => {
    node.children = node.children && treeFilter(node.children, callBack);
    return callBack(node) || (node.children && node.children.length);
  });
}

const amen = treeFilter(listToTree(list), (node) => node.id === '1-3');
console.log('amen', amen);