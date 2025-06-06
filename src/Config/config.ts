interface Config {
    url: string;
    username: string;
    password: string;
}


// export const config: Config = {
//     url: 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',
//     username: 'Admin',
//     password: 'admin123'
// };

import { testableConfig } from './env/testable';
import { uatConfig } from './env/uat';

const env = process.env.TEST_ENV || 'testable';  // default = testable

export const config = (() => {
  switch (env.toLowerCase()) {
    case 'uat':
      return uatConfig;
    case 'testable':
    default:
      return testableConfig;
  }
})();