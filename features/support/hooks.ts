import { Before, After, BeforeAll, AfterStep, Status, AfterAll, setDefaultTimeout } from '@cucumber/cucumber';
import { Browser, BrowserContext, chromium } from '@playwright/test';
import { CustomWorld } from './world';
import { Login_Page } from '../../src/pages/login_Page';
import { PlaywrightUtils } from '../../src/utils/playwright_utils';
import * as path from 'path';
import { config } from '../../src/Config/config';
import { DashboardPage } from '../../src/pages/DashboardPage';
import { PIMPage } from '../../src/pages/PIMPage';

// Set timeout for all steps to 60 seconds
setDefaultTimeout(60 * 1000);

let browser: Browser;
let context: BrowserContext;

BeforeAll(async function () {
    try {
        browser = await chromium.launch({
            headless: true,
            slowMo: 50,
            channel: 'chrome',
            args: ['--start-maximized'],
        });
    } catch (error) {
        console.error('Failed to launch browser:', error);
        throw error;
    }
});
 
Before(async function (this: CustomWorld) {
    try {
         this.context = await browser.newContext({
            viewport: null // <-- This is required for maximizing to take effect
        });
  this.page = await this.context.newPage();

  // Object Initialized
  this.playwrightUtils = new PlaywrightUtils(this.page);
  this.loginPage = new Login_Page(this.playwrightUtils);
  this.dashboardPage=new DashboardPage(this.playwrightUtils);
this.PIMPage=new PIMPage(this.playwrightUtils);

  await this.playwrightUtils.navigate(config.url);
    } catch (error) {
        console.error('Failed to create context or page:', error);
        throw error;
    }
});

AfterStep(async function (this: CustomWorld, scenario) {
    if (scenario.result?.status === Status.FAILED) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const screenshotPath = path.join('test-results', 'screenshots', `failure-${timestamp}.png`);
        await this.page.screenshot({ path: screenshotPath, fullPage: true });
        console.log(`Screenshot saved: ${screenshotPath}`);
    }
});

After(async function (this: CustomWorld) {
    try {
      await this.context?.close();
    } catch (error) {
        console.error('Failed to close context:', error);
    }
});

AfterAll(async function () {
    try {
 //await browser?.close();
    } catch (error) {
        console.error('Failed to close browser:', error);
    }
});

// Export page and browser for use in step definitions
export { PlaywrightUtils }; 