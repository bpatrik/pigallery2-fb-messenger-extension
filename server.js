"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const cypress = require("./node_modules/cypress");
const path = require("path");
const init = async (extension) => {
    // no implementation
    //  extension.Logger.silly('testing run');
    console.log(path.join(__dirname, 'screenshots'));
    cypress.run({
        browser: 'chrome',
        spec: path.join(__dirname, 'fb-messenger.cy.ts'),
        config: {
            baseUrl: 'https://www.messenger.com',
            experimentalStudio: true,
            specPattern: path.join(__dirname, '*.cy.ts'),
            fixturesFolder: false,
            screenshotsFolder: path.join(__dirname, 'screenshots'),
            downloadsFolder: path.join(__dirname, 'downloads')
        },
        env: {
            fb_email: 'braunerikhome@gmail.com',
            fb_password: '26ccE.06e558',
            fb_groupId: '24603530029230827',
            photos: ['D:\\test.jpg', 'D:\\Mindenes\\Fotók\\nnap.jpg']
        },
    });

      extension.messengers.addMessenger('FbMessenger',
        [{
          id: 'user',
          type: 'string',
          name: 'FB email',
          description: 'Email address, used to log into Facebook',
          defaultValue: '',
        }, {
          id: 'password',
          type: 'string',
          name: 'FB password',
          description: 'Facebook password',
          defaultValue: '',
        }],
        {
          sendMedia: async (c, m) => {
            console.log(m);
          }
        });
};
exports.init = init;
(0, exports.init)();
//# sourceMappingURL=server.js.map
