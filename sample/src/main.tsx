import * as React from 'react';

import { Label } from 'office-ui-fabric-react/lib/Label';
import DetailsListDocumentsExample from './DetailsListDocumentsExample'

const Main = () =>  (
    <div>
      <Label required={true}>Hello Cruel World! I have not miss you :(</Label>
        <DetailsListDocumentsExample />
    </div>
  );

  export default Main;
