import { time, timeLog } from 'console';
import { PlaywrightUtils } from '../utils/playwright_utils';
import { Page } from '@playwright/test';
import { tr } from '@faker-js/faker/.';


export class PIMPage {

    private page: Page;
    constructor(private PLaywrightUtils: PlaywrightUtils) {
        this.PLaywrightUtils = PLaywrightUtils;
        this.page = PLaywrightUtils.getPage();
    }

    private selector = {
        pimLK: "//span[text()='PIM']",
        pimpageheader: "//h6[text()='PIM']",
        addBT: "//button[text()=' Add ']",
        addemployeepageheader: "//h6[text()='Add Employee']",
        firstnameTB: "//input[@name='firstName']",
        lastnameTB: "//input[@name='lastName']",
        empID: "//label[text()='Employee Id']/parent::div/following-sibling::div//input",
        saveBT: "//button[text()=' Save ']",
        successmessage: "//p[text()='Success']",
        otherID: "//label[text()='Other Id']/parent::div/following-sibling::div//input",
        drivinglicense: "//label[contains(text(),'License Number')]/parent::div/following-sibling::div//input",
        licenceexpirydate: "//label[contains(text(),'License Expiry Date')]/parent::div/following-sibling::div//input",
        nationality: "//label[contains(text(),'Nationality')]/parent::div/following-sibling::div",
        marritalstatus: "//label[contains(text(),'Marital Status')]/parent::div/following-sibling::div",
        dob: "//label[contains(text(),'Date of Birth')]/parent::div/following-sibling::div//input",
        genderradiobT: "//span[contains(@class, 'oxd-radio-input')]",
        selectbloodgroup: "//label[contains(text(),'Blood Type')]/parent::div/following-sibling::div",
        test_field: "//label[contains(text(),'Test_Field')]/parent::div/following-sibling::div//input",
        savebutton: "//p[text()=' * Required']//following-sibling::button",
        costumSavebutton: "//h6[text()='Custom Fields']/following-sibling::form//button[@type='submit']",
    }





    async enterLicenseExpiryDate(licenceexpirydate: string, timeout?: number) {
        await this.PLaywrightUtils.fill(this.selector.licenceexpirydate, licenceexpirydate, timeout);
    }

    async clickCustomSaveButton(timeout?: number) {
        await this.PLaywrightUtils.click(this.selector.costumSavebutton, timeout);
    }

    async clickPersonalDetailsSaveButton(timeout?: number) {
        await this.PLaywrightUtils.click(this.selector.savebutton, timeout);
    }


    async enterTestField(testfield: string, timeout?: number) {
        await this.PLaywrightUtils.fill(this.selector.test_field, testfield, timeout);
    }


    async selectBloodGroup(timeout?: number) {
        await this.PLaywrightUtils.click(this.selector.selectbloodgroup, timeout);

        await this.page.keyboard.type('O', { delay: 100 });
        const bloodGroupOption = await this.page.locator('text=O+');
        await bloodGroupOption.waitFor({ state: 'visible' });
        await bloodGroupOption.click();


        await this.page.keyboard.press('Enter');

    }



    async clickGenderRadioButton(timeout?: number) {
        await this.PLaywrightUtils.click(this.selector.genderradiobT, timeout);
    }


    async enterDOB(dob: string, timeout?: number) {
        await this.PLaywrightUtils.fill(this.selector.dob, dob, timeout);
    }

    async selectMaritalStatus(timeout?: number) {
        await this.PLaywrightUtils.click(this.selector.marritalstatus, timeout);

        await this.page.keyboard.type('S', { delay: 100 }); // Type 'M'


        // Wait for the "Married" option to be visible
        const marriedOption = await this.page.locator('text=Single');
        await marriedOption.waitFor({ state: 'visible' });

        // Click on the "Married" option
        await marriedOption.click();

    }

    async selectNationality(timeout?: number) {
        await this.PLaywrightUtils.click(this.selector.nationality, timeout);

        // Type the letter 'I' four times to navigate to the "Indian" option
        await this.page.keyboard.type('I', { delay: 100 }); // Type 'I'
        await this.page.keyboard.type('I', { delay: 100 }); // Type 'I'
        await this.page.keyboard.type('I', { delay: 100 }); // Type 'I'

        // Wait for the "Indian" option to be visible
        const indianOption = await this.page.getByText('Indian', { exact: true });
        await indianOption.waitFor({ state: 'visible' });

        // Click on the "Indian" option
        await indianOption.click();
    }

    async enterDrivingLicense(license: string, timeout?: number) {
        await this.PLaywrightUtils.fill(this.selector.drivinglicense, license, timeout);
    }

    async enterOtherID(otherid: string, timeout?: number) {
        await this.PLaywrightUtils.click(this.selector.otherID, timeout);
        await this.PLaywrightUtils.fill(this.selector.otherID, otherid, timeout);

    }


    async clickPIMLink(timeout?: number) {
        await this.PLaywrightUtils.click(this.selector.pimLK, timeout);

    }

    async isPIMPageHeaderVisible(timeout?: number) {
        return await this.PLaywrightUtils.isVisible(this.selector.pimpageheader, timeout);

    }

    async clickAddButton(timeout?: number) {
        await this.PLaywrightUtils.click(this.selector.addBT, timeout);
    }


    async idAddEmployeePageHeaderVisible(timeout?: number) {
        return await this.PLaywrightUtils.isVisible(this.selector.addemployeepageheader, timeout);

    }

    async enterFirstName(firstname: string, timeout?: number) {
        await this.PLaywrightUtils.fill(this.selector.firstnameTB, firstname, timeout);

    }

    async genearateRandomEMployeeID(): Promise<number> {
        const randomID = Math.floor(Math.random() * 1000000);
        return randomID;
    }

    async enterEmployeeID(empid?: number, timeout?: number) {
        await this.PLaywrightUtils.fill(this.selector.empID, empid?.toString() || this.genearateRandomEMployeeID().toString(), timeout);

    }

    async enterLastName(lastname: string, timeout?: number) {
        await this.PLaywrightUtils.fill(this.selector.lastnameTB, lastname, timeout);

    }

    async clickSaveButton(timeout?: number) {
        await this.PLaywrightUtils.click(this.selector.saveBT, timeout);

    }

    async getSuccessMessage(timeout?: number) {
        return await this.PLaywrightUtils.getText(this.selector.successmessage, timeout);
    }
    private contactDetailsSelectors = {
        contactDetailsLK: "//a[text()='Contact Details']",
        contactDetailsPageHEader: "//h6[text()='Contact Details']",
        street1: "//label[text()='Street 1']/parent::div/following-sibling::div//input",
        street2: "//label[text()='Street 2']/parent::div/following-sibling::div//input",
        city: "//label[text()='City']/parent::div/following-sibling::div//input",
        state: "//label[text()='State/Province']/parent::div/following-sibling::div//input",
        zipcode: "//label[text()='Zip/Postal Code']/parent::div/following-sibling::div//input",
        country: "//label[text()='Country']/parent::div/following-sibling::div",
        hometelephone: "//label[text()='Home']/parent::div/following-sibling::div//input",
        mobilenumber: "//label[text()='Mobile']/parent::div/following-sibling::div//input",
        workcontact: "//label[text()='Work']/parent::div/following-sibling::div//input",
        workemail: "//label[text()='Work Email']/parent::div/following-sibling::div//input",
        otheremail: "//label[text()='Other Email']/parent::div/following-sibling::div//input",
    }

    async clickContactDetailsLink(timeout?: number) {

        await this.PLaywrightUtils.click(this.contactDetailsSelectors.contactDetailsLK, timeout);

    }

    async isContactDetailsPageHeaderVisible(timeout?: number) {
        return await this.PLaywrightUtils.getText(this.contactDetailsSelectors.contactDetailsPageHEader, timeout);
    }

    async enterStreet(street1: string, street2: string, timeout?: number) {
        await this.PLaywrightUtils.click(this.contactDetailsSelectors.street1, timeout)
        await this.PLaywrightUtils.fill(this.contactDetailsSelectors.street1, street1, timeout);
        await this.PLaywrightUtils.click(this.contactDetailsSelectors.street2, timeout)
        await this.PLaywrightUtils.fill(this.contactDetailsSelectors.street2, street2, timeout);

    }

    async enterCityAndState(cityName: string, stateName: string, timeout?: number) {
        await this.PLaywrightUtils.fill(this.contactDetailsSelectors.city, cityName, timeout);
        await this.PLaywrightUtils.fill(this.contactDetailsSelectors.state, stateName, timeout);

    }

    async enterZipCode(zipCode: string, timeout?: number) {
        await this.PLaywrightUtils.fill(this.contactDetailsSelectors.zipcode, zipCode, timeout);
    }

    async selectCountry(timeout?: number) {
        await this.PLaywrightUtils.click(this.contactDetailsSelectors.country, timeout);

        await this.page.keyboard.type('I', { delay: 100 });
        await this.page.keyboard.type('I', { delay: 100 });

        const indiaOption = this.page.getByText('India', { exact: true });
        await indiaOption.waitFor({ state: 'visible' });

        await indiaOption.click();


    }

    async enterContactTelephoneAndEmail(hometelephone: string, mobileNumber: string, workcontact: string, workemail: string, otheremail: string, timeout?: number) {
        await this.PLaywrightUtils.fill(this.contactDetailsSelectors.hometelephone, hometelephone, timeout);
        await this.PLaywrightUtils.fill(this.contactDetailsSelectors.mobilenumber, mobileNumber, timeout);
        await this.PLaywrightUtils.fill(this.contactDetailsSelectors.workcontact, workcontact, timeout);
        await this.PLaywrightUtils.fill(this.contactDetailsSelectors.workemail, workemail, timeout);

        await this.PLaywrightUtils.fill(this.contactDetailsSelectors.otheremail, otheremail, timeout);
    }


    private jobfieldselector = {
        joblink: "//a[text()='Job']",
        pageheader: "//h6[text()='Job Details']",
        joindate: "//input[@placeholder='yyyy-dd-mm']",
        jobtitle: "//label[text()='Job Title']/parent::div/following-sibling::div/child::div/child::div//child::div",
        jobcategory: "//label[text()='Job Category']/parent::div/following-sibling::div/child::div/child::div//child::div",
        subunit: "//label[text()='Sub Unit']/parent::div/following-sibling::div/child::div/child::div//child::div",
        employeestatus: "(//label[text()='Employment Status']/parent::div/following-sibling::div/child::div/child::div//child::div)[1]",

    }

    async navigateJobDtailsPage(timeout?: number) {
        await this.PLaywrightUtils.click(this.jobfieldselector.joblink, timeout);

    }

    async isJobDetailsPageHeaderVisible(timeout?: number) {
        return await this.PLaywrightUtils.isVisible(this.jobfieldselector.pageheader, timeout);
    }

    async enterJoiningDate(joiningdate: string, timeout?: number) {
        await this.PLaywrightUtils.click(this.jobfieldselector.joindate, timeout);
        await this.PLaywrightUtils.fill(this.jobfieldselector.joindate, joiningdate, timeout);

    }

    async selectJobTitle(jobtitle: string, timeout?: number) {

        await this.PLaywrightUtils.click(this.jobfieldselector.jobtitle, timeout);

        await this.page.keyboard.type('A', { delay: 100 }); // Type 'I'
        await this.page.keyboard.type('A', { delay: 100 }); // Type 'I'


        // Wait for the "Indian" option to be visible
        const jobtittleoption = await this.page.getByText('Automaton Tester', { exact: true });
        await jobtittleoption.waitFor({ state: 'visible' });

        // Click on the "Indian" option
        await jobtittleoption.click();

    }


    async selectJobCategory(jobcategory: string, timeout?: number) {

        await this.PLaywrightUtils.click(this.jobfieldselector.jobcategory, timeout);

        await this.page.keyboard.type('P', { delay: 100 });

        const jobcategoryoption = await this.page.getByText('Professionals', { exact: true });
        await jobcategoryoption.waitFor({ state: 'visible' });

        await jobcategoryoption.click();


    }

    async selectSubUnit(subunit: string, timeout?: number) {

        await this.PLaywrightUtils.click(this.jobfieldselector.subunit, timeout);

        await this.page.keyboard.type('E', { delay: 100 });

        const subunitoption = await this.page.getByText('Engineering', { exact: true });

        await subunitoption.waitFor({ state: 'visible' });

        await subunitoption.click();

    }
    async selctEmployeementType(emptype: string, timeout?: number) {
        await this.PLaywrightUtils.click(this.jobfieldselector.employeestatus, timeout);
 
    await this.page.keyboard.type('F',{delay:100});
    await this.page.keyboard.type('F',{delay:100});
    await this.page.keyboard.type('F',{delay:100});


    const employeementtypestatus=await this.page.getByText('Full-Time Permanent',{exact:true});

    await employeementtypestatus.waitFor({state:'visible'});

    await employeementtypestatus.click();


    }


    private quaificationselector={
        qualificationlink:"//a[text()='Qualifications']",
        qualifiactionpageheader:"//h6[text()='Qualifications']",
        companytextbox:"//label[text()='Company']/parent::div/following-sibling::div//input",
        jobtitle:"//label[text()='Job Title']/parent::div/following-sibling::div//input",
        from:"//label[text()='From']/parent::div/following-sibling::div//input",
        to:"//label[text()='To']/parent::div/following-sibling::div//input",
    }


    async clickQualificationLink(timeout?:number){
        await this.PLaywrightUtils.click(this.quaificationselector.qualificationlink,timeout);
    }
    

    async isQualificationPageHeaderVisible( timeout?:number){
      return  await this.PLaywrightUtils.isVisible(this.quaificationselector.qualifiactionpageheader,timeout);

    }

    async enterCompany(company:string,timeout?:number){
await this.PLaywrightUtils.fill(this.quaificationselector.companytextbox,company,timeout);

    }
async enterjobTIle(jobtitle:string ,timeout?:number){

    await this.PLaywrightUtils.fill(this.quaificationselector.jobtitle,jobtitle,timeout);

}

async enterWorkPeriodInOrganization(from:string,to:string,timeout?:number){
    await this.PLaywrightUtils.fill(this.quaificationselector.from,from,timeout);
    await this.PLaywrightUtils.fill(this.quaificationselector.to,to,timeout);

}

}

