import { setWorldConstructor,IWorldOptions, World } from "@cucumber/cucumber";   
import { BrowserContext, Page } from '@playwright/test';
import { Login_Page } from "../../src/pages/login_Page";
import { PlaywrightUtils } from "../../src/utils/playwright_utils";
import { DashboardPage  } from "../../src/pages/DashboardPage";
import {PIMPage} from '../../src/pages/PIMPage';




export class CustomWorld extends World {
  public context!: BrowserContext;
  public page!: Page;
  public loginPage!: Login_Page;
  public playwrightUtils!: PlaywrightUtils;
  public dashboardPage!: DashboardPage;
  public PIMPage!: PIMPage;
  constructor(options: IWorldOptions) {
    super(options);
  }
}



setWorldConstructor(CustomWorld);