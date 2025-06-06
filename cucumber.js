const path = require('path');

module.exports = {
  default: {
    require: ["features/step-definitions/*.ts", "features//support/hooks.ts"],
    format: [
      "json:reports/cucumber-report.json" // 👈 JSON report output
    ],
    paths: ["features/**/*.feature"],
    requireModule: ["ts-node/register"],
    timeout: 60000
  },
};
