import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-block-6',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './block_6.html',
  styleUrl: './block_6.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class block_6 {

  readonly baseConfigCode = `
module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [],
    client: {},
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    restartOnFileChange: true
  });
};
`;

  readonly frameworksCode = `
frameworks: [
  'jasmine',
  '@angular-devkit/build-angular'
],
`;

  readonly reportersCode = `
reporters: [
  'progress',
  'kjhtml',
  'coverage'
],
`;

  readonly coverageCode = `
coverageReporter: {
  dir: require('path').join(__dirname, './coverage'),
  subdir: '.',
  reporters: [
    { type: 'html' },
    { type: 'text-summary' }
  ]
},
`;

  readonly browsersCode = `
browsers: ['ChromeHeadless'],

customLaunchers: {
  ChromeHeadlessCI: {
    base: 'ChromeHeadless',
    flags: [
      '--no-sandbox',
      '--disable-gpu'
    ]
  }
},
`;

  readonly usefulConfigCode = `
client: {
  jasmine: {
    random: false,
    timeoutInterval: 10000
  },
  clearContext: false
},

logLevel: config.LOG_WARN,
`;

readonly headlessCode = `
browsers: ['ChromeHeadless'],

customLaunchers: {
  ChromeHeadlessCI: {
    base: 'ChromeHeadless',
    flags: [
      '--no-sandbox',
      '--disable-gpu',
      '--disable-dev-shm-usage'
    ]
  }
},
`;

readonly lcovCode = `
reporters: ['progress', 'coverage'],

coverageReporter: {
  dir: require('path').join(__dirname, './coverage'),
  subdir: '.',
  reporters: [
    { type: 'html' },
    { type: 'text-summary' },
    { type: 'lcov' },
    { type: 'lcovonly' }
  ]
},
`;

readonly coverageIgnoreCode = `
// angular.json

"test": {
  "options": {
    "codeCoverage": true,
    "codeCoverageExclude": [
      "**/*.module.ts",
      "**/main.ts",
      "**/environment*.ts",
      "**/block_*.ts"
    ]
  }
}
`;

readonly coverageThresholdCode = `
coverageReporter: {
  check: {
    global: {
      statements: 80,
      branches: 70,
      functions: 80,
      lines: 80
    }
  }
}
`;
}