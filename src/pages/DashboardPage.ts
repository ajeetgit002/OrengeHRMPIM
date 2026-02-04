import { PlaywrightUtils } from "../utils/playwright_utils";

export class DashboardPage {


    private seleçtor = {

        myaccount: "//p[text()='My Actions']",
        modulelist:"//a//span",
        pimmodule:"//span[text()='PIM']"

    }

    constructor(private PlaywrightUtils: PlaywrightUtils) {
        this.PlaywrightUtils = PlaywrightUtils;
    }

    async isMyAccountVisible(timeout?: number) {

        return await this.PlaywrightUtils.isVisible(this.seleçtor.myaccount, timeout);

    }

    async isAnyModuleVisible(timeout?:number){
     
        return await this.PlaywrightUtils.isVisible(this.seleçtor.modulelist, timeout);

    }
    async getModuleList(timeout?:number){
        return await this.PlaywrightUtils.getTexts(this.seleçtor.modulelist, timeout);

    }

    async clickPIMModule(timeout?:number){

    await this.PlaywrightUtils.click(this.seleçtor.pimmodule,timeout)

}

}
