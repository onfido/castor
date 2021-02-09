// can't be `bump-core-peer-dependency.ts` as it is invoked by
// `standard-version` as a custom updater

const detectIndent = require('detect-indent');
const detectNewline = require('detect-newline');
const stringifyPackage = require('stringify-package');

module.exports.readVersion = function (contents) {
  return JSON.parse(contents).peerDependencies['@onfido/castor'];
};

module.exports.writeVersion = function (contents, version) {
  const json = JSON.parse(contents);
  const indent = detectIndent(contents).indent;
  const newline = detectNewline(contents);
  json.peerDependencies['@onfido/castor'] = `^${version}`;
  return stringifyPackage(json, indent, newline);
};
