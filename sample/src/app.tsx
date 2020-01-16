import * as React from 'react';
import { render } from 'react-dom';

import Main from './main';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';

initializeIcons(/* optional base url */);
render(<Main />, document.getElementById('root'));
