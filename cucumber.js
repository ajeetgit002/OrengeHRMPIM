const path = require('path');

module.exports = {
  default: {
    require: [
      "features/step-definitions/*.ts",
      "features/support/hooks.ts"
    ],
    format: [
      "progress",                                // CLI progress output
      "json:reports/cucumber-report.json",       // JSON for Allure or custom parsing
      "junit:reports/results.xml"                // ✅ JUnit format for Jenkins
    ],
    paths: ["features/**/*.feature"],
    requireModule: ["ts-node/register"],
    timeout: 60000
  },
};
