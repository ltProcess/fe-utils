const { list, listToTree } = require('./listToTree');
function treeToList(tree, result = [], level = 0) {
  tree.forEach(node => {
    result.push(node);
    node.level = level + 1;
    node.children && treeToList(node.children, result, level + 1);
  });
  return result;
}

function treeToList1(tree) {
  let node, result = tree.map(node => {
    node.level = 1;
    return node;
  });
  for (let i = 0; i < result.length; i++) {
    if (!result[i].children) continue;
    let list = result[i].children.map(node => {
      node.level = result[i].level + 1;
      return node;
    });
    result.splice(i+1, 0, ...list);
  }
  return result;
}

const amen = treeToList1(listToTree(list));
console.log('amen', amen);