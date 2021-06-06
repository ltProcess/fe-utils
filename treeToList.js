const { list, listToTree } = require('./listToTree');
function treeToList(tree, result = [], level = 0) {
  tree.forEach(node => {
    result.push(node);
    node.level = level + 1;
    node.children && treeToList(node.children, result, level + 1);
  });
  return result;
}

const amen = treeToList(listToTree(list));
console.log('amen', amen);