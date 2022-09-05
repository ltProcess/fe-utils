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
function treeFind(tree, cb) {
  for (const data of tree) {
    if (typeof cb === "function" && cb(data)) return data;
    if (data.sub) {
      const res = treeFind(data.sub, cb);
      if (res) return res;
    }
  }
  return null;
}
console.log(treeFind(data, (item) => item.id === "9"));

function treeFindPath(tree, cb, path = []) {
  if (!tree) return [];
  for (const data of tree) {
    path.push(data.id);
    if (typeof cb === "function" && cb(data)) return path;
    if (data.sub) {
      const findChildren = treeFindPath(data.sub, cb, path);
      if (findChildren.length) return findChildren;
    }
    path.pop();
  }
  return [];
}

console.log(treeFindPath(data, (item) => item.id === "9"));
