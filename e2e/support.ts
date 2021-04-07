import '@cypress/code-coverage/support';
import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';

addMatchImageSnapshotCommand({
  capture: 'viewport',
  customDiffConfig: { threshold: 0.015 },
  customDiffDir: 'coverage/e2e/.diff',
  customSnapshotsDir: 'e2e/.snapshots',
  failureThreshold: 0.015,
  failureThresholdType: 'percent',
});
