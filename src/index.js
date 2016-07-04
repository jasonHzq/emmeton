import abbreviationParser from 'emmet/lib/parser/abbreviation';
import child_process from 'child_process';

const execSync = child_process.execSync;

const traverseAst = (tree) => {
  const commands = [];

  if (tree._text) {
    commands.push(`touch ${tree._text}`);

    return commands;
  }

  if (tree.abbreviation) {
    commands.push(`_mkdir ${tree.abbreviation}`);
  }

  if (tree.children && tree.children.length) {
    if (tree.abbreviation) {
      commands.push(`cd ${tree.abbreviation}`);
    }

    tree.children.forEach((child, index) => {
      commands.push(...traverseAst(child));
    });

    commands.push('cd ..');
  }

  return commands;
};

const NODE_STR = '├── ';
const PATH_STR = '│   ';
const repeat = (str, cnt) => cnt === 0 ? '' : str + repeat(str, cnt - 1);

const showTree = (tree, depth = 0) => {
  const lines = [];

  const node = tree._text || tree.abbreviation;

  if (node) {
    const pathCnt = depth - 1;
    const line = repeat(PATH_STR, pathCnt) + repeat(NODE_STR, 1) + node;

    lines.push(line);
  } else {
    lines.push('.');
  }

  tree.children.forEach((child) => {
    lines.push(...showTree(child, depth + 1));
  });

  return lines;
};

const mkcdir = `
  _mkdir ()
  {
      mkdir -p -- "$1"
  }
`;

export default (code) => {
  const emmetTree = abbreviationParser.parse(code);
  const commands = traverseAst(emmetTree).join(' && ');

  console.log('the tree you will create:');
  showTree(emmetTree).forEach(line => console.log(line));
  execSync(mkcdir + commands);

  console.log('create successful!');
}
