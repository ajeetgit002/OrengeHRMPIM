import reporter from 'cucumber-html-reporter';

const options: any = {
  theme: 'bootstrap',
  jsonFile: 'reports/cucumber-report.json',
  output: 'reports/cucumber-report.html',
  reportSuiteAsScenarios: true,
  launchReport: true,
  metadata: {
    "App Version": "1.0.0",
    "Test Environment": "STAGING",
    "Browser": "Chrome",
    "Platform": "Windows 10",
    "Parallel": "Scenarios",
    "Executed": "Local"
  }
};

reporter.generate(options);
