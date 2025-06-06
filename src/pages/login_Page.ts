import { PlaywrightUtils } from "../utils/playwright_utils";

export class Login_Page {

private selector= {
    username: 'input[name="username"]',
    password: 'input[name="password"]',
    loginButton: "//button[@type='submit']",
    errorMessage: "//p[text()='Invalid credentials']",
    dashboardtitle: "//h6[text()='Dashboard']",
    userdropdown: "//img[@alt='profile picture']/following-sibling::i",
    logoutbutton: "//a[text()='Logout']",
    
    };




    constructor(private PlaywrightUtils: PlaywrightUtils) {
        this.PlaywrightUtils = PlaywrightUtils;
    }

 

   async enterUsername(username: string,timeout  ?: number ){
        await this.PlaywrightUtils.fill(this.selector.username,username, timeout);
        
    }

    async enterPassword(password: string, timeout ?: number) {
 await this.PlaywrightUtils.fill(this.selector.password, password, timeout);
        
    }

    async clickLoginButton(timeout ?: number) {
        await this.PlaywrightUtils.click(this.selector.loginButton, timeout);
       
    }

   async getErrorMessage(timeout ?: number) {
        return await this.PlaywrightUtils.getText(this.selector.errorMessage, timeout);
       
    }

    async isDashboardTitleVisible(timeout ?: number) {
        return await this.PlaywrightUtils.isVisible(this.selector.dashboardtitle, timeout);
       
    }

    async logout(timeout ?: number) {
        await this.PlaywrightUtils.click(this.selector.userdropdown, timeout);
        await this.PlaywrightUtils.click(this.selector.logoutbutton, timeout);
    }
}