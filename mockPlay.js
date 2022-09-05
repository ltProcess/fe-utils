// https://juejin.cn/post/7018427747617751076 字节跳动商业化 社招
const userList = [
  {
    name: "user1",
    age: 18,
    province: "四川",
    city: "成都",
    district: "高新区",
  },

  {
    name: "user2",
    age: 19,
    province: "四川",
    city: "成都",
    district: "天府新区",
  },

  {
    name: "user3",
    age: 20,
    province: "四川",
    city: "南充",
    district: "顺庆区",
  },

  {
    name: "user4",
    age: 22,
    province: "江苏",
    city: "南京",
    district: "鼓楼区",
  },

  {
    name: "user5",
    age: 21,
    province: "江苏",
    city: "南京",
    district: "玄武区",
  },

  {
    name: "user6",
    age: 21,
    province: "江苏",
    city: "镇江",
    district: "京口区",
  },
];

/**
{
    "四川": {
        "成都": {
            "高新区": "user1",
            "天府新区": "user2"
        },
        "南充": {
            "顺庆区": "user3"
        }
    },
    "江苏": {
        "南京": {
            "鼓楼区": "user4",
            "玄武区": "user5"
        },
        "镇江": {
            "京口区": "user6"
        }
    }
}
 */

function list2tree(list, path) {
  const tree = [];
  for (const node of list) {
    if (!node.parentId) {
      let p = { ...node };
      p.children = getChildren(p.province, list);
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
  console.log("tree", tree);
  return tree;
  // const info = list.reduce((current, patch) => {
  //   if (!current[patch.province]) {
  //     current[patch.province] = {};
  //     current[patch.province].children = [];
  //   }
  //   current[patch.province].children.push(patch);
  //   return current;
  // }, {});
  // console.log("info", info);
}

const userTree = list2tree(userList, "province/city/district");

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
console.log("findPath", findPath(data, "9"));
// 返回给定id在 data 里的路径
// 示例:

// id = "1" => ["1"]
// id = "9" => ["7", "8", "9"]
// id = "100"=> []
// PS: id 全局唯一，无序
// ```
