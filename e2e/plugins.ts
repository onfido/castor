// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import codeCoverage from '@cypress/code-coverage/task';
import { addMatchImageSnapshotPlugin } from 'cypress-image-snapshot/plugin';

export default ((on, config) => {
  // cypress-image-snapshot
  addMatchImageSnapshotPlugin(on, config);

  // @cypress/code-coverage
  codeCoverage(on, config);

  return config;
}) as Cypress.PluginConfig;
