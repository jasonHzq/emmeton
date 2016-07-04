#!/usr/bin/env node

var emmeton = require('../lib/').default;
console.log(process.argv[3])
if (process.argv[3]) {
  const emmet = process.argv[3];
  const path = process.argv[2];
  const emmetStr = path.split('/').join('>') + '>' + emmet;

  emmeton(emmetStr);
  return;
}

emmeton(process.argv[2]);
