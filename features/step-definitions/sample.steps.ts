import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { config }   from '../../src/Config/config';
import { CustomWorld } from '../support/world';


When('I enter valid username and password', { timeout: 30000 }, async function (this : CustomWorld) {

    await this.loginPage.enterUsername(config.username);
    await this.loginPage.enterPassword(config.password);
  

 
});

When('I click on the login button', async function (this : CustomWorld) {
   await this.loginPage.clickLoginButton();
});

Then('I should be logged in and see the dashboard', async function (this : CustomWorld) {
 
    const isDashboardVisible = await this.loginPage.isDashboardTitleVisible();
    expect(isDashboardVisible).toBe(true);

});

Then('I should see the welcome message', async function (this : CustomWorld) {

const isDashboardVisible = await this.loginPage.isDashboardTitleVisible();
    expect(isDashboardVisible).toBe(true);


}
);
When('I enter invalid username and password', async function (this : CustomWorld) {
    await this.loginPage.enterUsername('invalidUser');
    await this.loginPage.enterPassword('invalidPass');
});

Then('I should see an error message', { timeout: 20000 }, async function (this : CustomWorld) {
    const errorMessage = await this.loginPage.getErrorMessage();
    expect(errorMessage).toContain('Invalid credentials');
});


