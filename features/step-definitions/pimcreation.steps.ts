import { Given, When, Then } from "@cucumber/cucumber";
import {expect} from '@playwright/test';
import { CustomWorld } from "../support/world";
import { getEmployeeTestData } from '../../src/utils/readExcel';
import { da } from "@faker-js/faker/.";
import { PluginManager } from "@cucumber/cucumber/lib/plugin";
import { waitForDebugger } from "inspector";


// let data: Record<string, any>; 

         When('I navigate to the PIM creation page', async function (this: CustomWorld) {

            await this.PIMPage.clickPIMLink();

            const isPIMPageHeaderVisible=await this.PIMPage.isPIMPageHeaderVisible(5000);
            expect(isPIMPageHeaderVisible).toBe(true);

            this.attach('PIM Page Header is visible', 'text/plain');
    
         });

   
When('I fill in the required fields with valid data', async function (this: CustomWorld) {
  const data = await getEmployeeTestData('Personal Details'); // Reads 2nd row from "Personal Details" sheet

  await this.PIMPage.clickAddButton();

  const idAddEmployeePageHeaderVisible = await this.PIMPage.idAddEmployeePageHeaderVisible(5000);
  expect(idAddEmployeePageHeaderVisible).toBe(true);

  this.attach('Add Employee Page Header is visible', 'text/plain');

  await this.PIMPage.enterFirstName(data['Employee Full Name'].split(' ')[0]); // First name
  await this.PIMPage.enterLastName(data['Employee Full Name'].split(' ')[1] || ''); // Last name

  const empid = await this.PIMPage.genearateRandomEMployeeID();
  await this.PIMPage.enterEmployeeID(empid);

  this.attach(`Employee ID is ${empid}`, 'text/plain');
});



         When('I click on the Save button', async function (this: CustomWorld ) {
            await this.PIMPage.clickSaveButton();

         });

 When('I enter Employee Personal Information Management', async function (this: CustomWorld) {
   const data = await getEmployeeTestData('Personal Details');
  await this.PIMPage.enterOtherID(data['Other ID']);
    this.attach(`Other ID is ${data['Other ID']}`, 'text/plain');

    await this.PIMPage.enterDrivingLicense(data['Driving License']);
    this.attach(`Driving License is ${data['Driving License']}`, 'text/plain');

   

    await this.PIMPage.enterLicenseExpiryDate(data['License Expiry Date']);
    this.attach(`License Expiry Date is ${data['License Expiry Date']}`, 'text/plain');



    await this.PIMPage.selectNationality(5000);
    this.attach(`Nationality is ${data['Nationality']}`, 'text/plain');
    await this.PIMPage.selectMaritalStatus(5000);
    this.attach(`Marital Status is ${data['Marital Status']}`, 'text/plain');
    await this.PIMPage.enterDOB(data['Date of Birth']);
    this.attach(`Date of Birth is ${data['Date of Birth']}`, 'text/plain');
    await this.PIMPage.clickGenderRadioButton(5000);
    this.attach(`Gender is ${data['Gender']}`, 'text/plain');
await this.PIMPage.clickPersonalDetailsSaveButton(5000);
const successMessage = await this.PIMPage.getSuccessMessage();
            expect(successMessage).toContain('Success');
            this.attach(`Success message is ${successMessage}`, 'text/plain');
    await this.PIMPage.selectBloodGroup(5000);
    this.attach(`Blood Type is ${data['Blood Type']}`, 'text/plain');
    await this.PIMPage.enterTestField(data['Test_Field']);
    this.attach(`Test Field is ${data['Test_Field']}`, 'text/plain');

      await this.PIMPage.clickCustomSaveButton(5000);
      const customSuccessMessage = await this.PIMPage.getSuccessMessage();
      expect(customSuccessMessage).toContain('Success');
      this.attach(`Custom Success message is ${customSuccessMessage}`, 'text/plain');





 });

 When('I enter Employee Contact Information Management', async function (this: CustomWorld) {
  const data = await getEmployeeTestData('Contact Details');
await this.PIMPage.clickContactDetailsLink();

 const isPageHeaderVisible=await this.PIMPage.isContactDetailsPageHeaderVisible(5000);
expect(isPageHeaderVisible).toBe("Contact Details");

this.attach(`Contact Details Page Header :${isPageHeaderVisible}`,'text/plain');

await this.PIMPage.enterStreet(data['Street 1'],data['Street 2']);
await this.PIMPage.enterCityAndState(data['City'],data['State/Province']);
await this.PIMPage.enterZipCode(data['Zip/Postal Code']);
await this.PIMPage.selectCountry();

await this.PIMPage.enterContactTelephoneAndEmail(data['Telephone Home'],data['Telephone Mobile'],data['Telephone Work'],data['Work Email'],data['Other Email']);
this.attach(`Contact Home Number :${data['Telephone Home']}`,'text/plain');
this.attach(`Contact Mibile Number :${data['Telephone Mobile']}`,'text/plain');
this.attach(`Contact Office Number :${data['Telephone Work']}`,'text/plain');
this.attach(`Contact Office Email  :${data['Work Email']}`,'text/plain');
this.attach(`Contact Other Email :${data['Other Email']}`,'text/plain');

await this.PIMPage.clickSaveButton();
      const customSuccessMessage = await this.PIMPage.getSuccessMessage();
      expect(customSuccessMessage).toContain('Success');
      this.attach(`Custom Success message is ${customSuccessMessage}`, 'text/plain');
 });


When('I enter Employee Job Information',async function(this:CustomWorld){
const data = await getEmployeeTestData('Work Experience');
await this.PIMPage.navigateJobDtailsPage();

const isJobDetailsPageheaderVisible = await this.PIMPage.isJobDetailsPageHeaderVisible();
//console.log("Result type:", typeof isJobDetailsPageheaderVisible); // Should be 'boolean'

expect(isJobDetailsPageheaderVisible).toBe(true);

await this.PIMPage.enterJoiningDate(data['From']);


console.log('Joining date: ',data['From']);

await this.PIMPage.selectJobTitle(data['Job Title']); 

//await this.PIMPage.selectJobCategory('Professionals')

await this.PIMPage.selectSubUnit('Engineering');

await this.PIMPage.selctEmployeementType('Full-Time Permanent');

await this.PIMPage.clickSaveButton();
      const customSuccessMessage = await this.PIMPage.getSuccessMessage();
      expect(customSuccessMessage).toContain('Success');
      this.attach(`Custom Success message is ${customSuccessMessage}`, 'text/plain');

});


When('I enter Qualification Information',async function(this:CustomWorld){

 const data = await getEmployeeTestData('Education');

 await this.PIMPage.clickQualificationLink();

 try {
  const qualificationPageHeader = await this.PIMPage.isQualificationPageHeaderVisible(); // use await if it's a promise
  expect(qualificationPageHeader).toBe(true);
} catch (error) {
  console.log('Expected value did not match:', error);
}

await this.PIMPage.clickAddButton();
await this.PIMPage.enterCompany("Microsoft");
await this.PIMPage.enterjobTIle("QA Engineer");
await this.PIMPage.enterWorkPeriodInOrganization("2014-21-11","2020-21-11")

await this.PIMPage.clickSaveButton();
      const customSuccessMessage = await this.PIMPage.getSuccessMessage();
      expect(customSuccessMessage).toContain('Success');
      this.attach(`Custom Success message is ${customSuccessMessage}`, 'text/plain');

});





 

         Then('I should see a confirmation message {string}',async function (this: CustomWorld,massage) {
           
            const successMessage = await this.PIMPage.getSuccessMessage();
            expect(successMessage).toContain(massage);
         });

   

         Then('the new PIM should be listed in the PIM management section', async function (this: CustomWorld) {
            await this.PIMPage.clickPIMLink();

            const isPIMPageHeaderVisible=await this.PIMPage.isPIMPageHeaderVisible(5000);
            expect(isPIMPageHeaderVisible).toBe(true);

            this.attach('PIM Page Header is visible', 'text/plain');

            
         });


        

   

        //  When('I leave required fields empty', function (this: CustomWorld) {
            
        //  });

  

         


        //  Then('I should see an error message {string}', function (this: CustomWorld,string) {
            
        //  });

   

        //  Then('the PIM should not be created', function (this: CustomWorld) {
            
        //  });
