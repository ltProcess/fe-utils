const fs = require('fs');
const Path = require('path');

function readdirs(path) {
  const result = {
    path,
    name: Path.basename(path),
    type: 'directory'
  };
  const files = fs.readdirSync(path);
  result.children = files.map(file => {
    const subPath = Path.resolve(path, file);
    const stats = fs.statSync(subPath);
    if (stats.isDirectory()) {
      return readdirs(subPath);
    }
    return {
      path: subPath,
      name: file,
      type: 'file'
    }
  });
  return result;
}

const cwd = process.cwd();
const tree = readdirs(cwd);

fs.writeFileSync(Path.join(cwd, 'tree.json'), JSON.stringify(tree));