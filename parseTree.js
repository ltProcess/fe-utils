let tree = [
  {
    id: '1',
    title: '节点1',
    children: [
      {
        id: '1-1',
        title: '节点1-1'
      },
      {
        id: '1-2',
        title: '节点1-2'
      }
    ]
  },
  {
    id: '2',
    title: '节点2',
    children: [
      {
        id: '2-1',
        title: '节点2-1'
      }
    ]
  }
]

// 广度优先
function bfsTreeForEach(tree, callBack) {
  let node, list = [...tree];
  while (node = list.shift()) {
    callBack(node);
    node.children && list.push(...node.children);
  }
}

// 深度优先-前序
function dfsTreeForEach(tree, callBack) {
  let node, list = [...tree];
  list.forEach(data => {
    callBack(data);
    data.children && dfsTreeForEach(data.children, callBack);
  })
}

// 深度优先-后序
function dfsTreeForEachPostOrder(tree, callBack) {
  let node, list = [...tree];
  list.forEach(data => {
    data.children && dfsTreeForEachPostOrder(data.children, callBack);
    callBack(data);
  })
}

// 深度优先前序-循环
function dfsTreeForEach1(tree, callBack) {
  let node, list = [...tree];
  while (node = list.shift()) {
    callBack(tree);
    node.children && list.unshift(...node.children);
  }
}

// 深度优先后序-循环
function dfsTreeForEachPostOrder1(tree, callBack) {
  let node, list = [...tree], i = 0 ;
  while (node = list[i]) {
    let childCount = node.children ? node.children.length : 0;
    if (!childCount || node.children[childCount - 1] === list[i - 1]) {
      callBack(node);
      i++;
    } else {
      list.splice(i, 0, ...node.children);
    }
  }
}
dfsTreeForEachPostOrder1(tree, node => { console.log(node.title) })