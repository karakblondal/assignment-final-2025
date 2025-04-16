import { datadogRum } from '@datadog/browser-rum';

export function initDatadogRUM() {
  datadogRum.init({
    applicationId: '69b0c446-4c3c-4e40-be41-0fc2a36c5179',
    clientToken: 'pub7fbb3e8eda652f1ac63e3f961224c761',
    site: 'us5.datadoghq.com',
    service: 'final-assignment-2025',
    env: process.env.NODE_ENV,
    sessionSampleRate: 100,
    sessionReplaySampleRate: 20,
    defaultPrivacyLevel: 'mask-user-input',
  });

  datadogRum.startSessionReplayRecording();
} 