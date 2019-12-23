import * as React from 'react';

import { Label } from 'office-ui-fabric-react/lib/Label';
import DetailsListDocumentsExample from './DetailsListDocumentsExample';

const Main: React.FunctionComponent = () => {
    return (
        <div>
            <Label required={true}>Hello Cruel World! I have not missed you :(</Label>
            <DetailsListDocumentsExample />
        </div>
    );
};

export default Main;
