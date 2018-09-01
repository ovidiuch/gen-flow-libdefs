// @flow

import { join } from 'path';
import j from 'jscodeshift';
import { readFileAsync } from './shared';

run();

async function run() {
  const input = await readFileAsync(
    join(__dirname, 'tests/function.input.js'),
    'utf8'
  );

  const root = j(input, {
    parser: require('jscodeshift/parser/flow')
  });
  const namedExports = root.find(j.ExportNamedDeclaration);

  namedExports.forEach(namedExport => {
    // The "declaration" is the exported object
    const { declaration: fnDecl } = namedExport.node;
    const { type } = fnDecl;

    // TODO: Support different types
    if (type !== 'FunctionDeclaration') {
      return;
    }

    console.log(getFnDeclDef({ input, fnDecl }));
  });
}

function getFnDeclDef({ input, fnDecl }) {
  const { id } = fnDecl;
  const typeParams = getTypeParametersStr(input, fnDecl);
  const params = getParamsStr(input, fnDecl);
  const returnType = getReturnTypeStr(input, fnDecl);

  return `declare export function ${
    id.name
  }${typeParams}(${params})${returnType};`;
}

function getTypeParametersStr(input, { typeParameters }) {
  return typeParameters ? input.substring(...typeParameters.range) : '';
}

function getParamsStr(input, { params }) {
  if (params.length === 0) {
    return '';
  }

  const first = params[0];
  const last = params[params.length - 1];

  return `\n  ${input.substring(first.range[0], last.range[1])}\n`;
}

function getReturnTypeStr(input, { returnType }) {
  return returnType ? input.substring(...returnType.range) : '';
}
