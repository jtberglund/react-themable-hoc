/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved, import/extensions */

import { configure } from '@storybook/react';
import { setDefaults } from '@storybook/addon-info';

setDefaults({
    inline: true
});

function loadStories() {
    require('../src/stories');
}

configure(loadStories, module);
