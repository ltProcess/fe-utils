// https://juejin.cn/post/7018427747617751076 字节跳动商业化 社招
const userList = [
  {
    id: "四川",
    province: "四川",
    parentId: "",
  },
  {
    id: "江苏",
    province: "江苏",
    parentId: "",
  },

  {
    id: "成都",
    city: "成都",
    parentId: "四川",
  },
  {
    id: "南充",
    city: "南充",
    parentId: "四川",
  },
  {
    id: "南京",
    city: "南京",
    parentId: "江苏",
  },
  {
    id: "镇江",
    city: "镇江",
    parentId: "江苏",
  },

  {
    name: "user1",
    age: 18,
    province: "四川",
    district: "高新区",
    id: "高新区",
    parentId: "成都",
  },

  {
    name: "user2",
    age: 19,
    province: "四川",
    district: "天府新区",
    id: "天府新区",
    parentId: "成都",
  },

  {
    name: "user3",
    age: 20,
    province: "四川",
    city: "南充",
    district: "顺庆区",
    id: "顺庆区",
    parentId: "南充",
  },

  {
    name: "user4",
    age: 22,
    province: "江苏",
    city: "南京",
    district: "鼓楼区",
    id: "鼓楼区",
    parentId: "南京",
  },

  {
    name: "user5",
    age: 21,
    province: "江苏",
    city: "南京",
    district: "玄武区",
    id: "玄武区",
    parentId: "南京",
  },

  {
    name: "user6",
    age: 21,
    province: "江苏",
    city: "镇江",
    district: "京口区",
    id: "京口区",
    parentId: "镇江",
  },
];

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

const userTree = list2Tree(userList, "province/city/district");
console.log("userTree", userTree);

// https://juejin.cn/post/6972751722410147854
const data = [
  {
    id: "1",
    sub: [
      {
        id: "2",
        sub: [
          {
            id: "3",
            sub: null,
          },
          {
            id: "4",
            sub: [
              {
                id: "6",
                sub: null,
              },
            ],
          },
          {
            id: "5",
            sub: null,
          },
        ],
      },
    ],
  },
  {
    id: "7",
    sub: [
      {
        id: "8",
        sub: [
          {
            id: "9",
            sub: null,
          },
        ],
      },
    ],
  },
  {
    id: "10",
    sub: null,
  },
];
// 现在给定一个id，要求实现一个函数

function findPath(data, id) {
  function getTree(tree, id) {
    const stack = [{ ...tree }];
    const result = [];
    while (stack.length > 0) {
      const curr = stack.shift();
      result.push(curr.id);
      if (curr.id === id) return result;
      if (Array.isArray(curr.sub)) {
        for (let j = 0; j < curr.sub.length; j++) {
          const now = curr.sub[j];
          result.push(now.id);
          if (now.id === id) return result;
          if (now.sub) stack.push(...now.sub);
        }
        // curr.sub.forEach((item) => {
        //   if (item.sub !== null) {
        //     stack.push(...item.sub);
        //     result.push(item.id);
        //     if (item.id === id) {
        //       console.log("result", result);
        //     }
        //   }
        // });
      }
    }
    return [];
  }
  let res = [];
  for (let i = 0; i < data.length; i++) {
    const curRes = getTree(data[i], id);
    if (curRes.length > 0) {
      res = [...curRes];
      break;
    }
  }
  return res;
}
// console.log("findPath", findPath(data, "9"));
// 返回给定id在 data 里的路径
// 示例:

// id = "1" => ["1"]
// id = "9" => ["7", "8", "9"]
// id = "100"=> []
// PS: id 全局唯一，无序
// ```
