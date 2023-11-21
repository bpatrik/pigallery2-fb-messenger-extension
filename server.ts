/* eslint-disable @typescript-eslint/no-inferrable-types */
import {IExtensionObject} from '../../src/backend/model/extension/IExtension';
import * as cypress from './node_modules/cypress';
import * as path from 'path';

export const init = async (extension: IExtensionObject): Promise<void> => {

  // no implementation


  extension.messengers.addMessenger<{
    email: string,
    password: string,
    groupId: string
  }>('FbMessenger',
    [{
      id: 'email',
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
    }, {
      id: 'groupId',
      type: 'string',
      name: 'Thread id',
      description: 'Facebook messenger thread id (the number after https://www.messenger.com/t/',
      defaultValue: '',
    }],
    {
      sendMedia: async (c, media) => {
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
            fb_email: c.email,
            fb_password: c.password,
            fb_groupId: c.groupId,
            photos: media.map(m => m.thumbnailPath)
          },
        });
      }
    });
};

