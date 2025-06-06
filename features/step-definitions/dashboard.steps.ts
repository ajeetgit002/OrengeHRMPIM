import {Given,When ,Then} from '@cucumber/cucumber';
import {expect} from '@playwright/test';
import {CustomWorld} from '../support/world';


Given('I am on the dashboard page',async function(this : CustomWorld){

const  ismyaccountvisible    =await this.dashboardPage.isMyAccountVisible();
expect(ismyaccountvisible).toBe(true)


    
});

Then('I should see the dashboard title',async function(this :CustomWorld){

   const dashboardpagetitle  = await this.playwrightUtils.getTitle();

    expect(dashboardpagetitle).toContain('OrangeHRM');


});

Then('I should see the dashboard content',async function(this:CustomWorld){

const isanymodulevisible = await this.dashboardPage.isAnyModuleVisible();
expect(isanymodulevisible).toBe(true);  

const modulelist = await this.dashboardPage.getModuleList();
console.log('Module List:', modulelist);
expect(modulelist.length).toBeGreaterThan(0);

});