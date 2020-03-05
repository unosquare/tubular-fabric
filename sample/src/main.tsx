import * as React from 'react';

import { TbDetailsListSample } from './TbDetailsListSample';

const Main: React.FunctionComponent = () => {
    return (
        <>
            <div
                style={{
                    height: '100%',
                    display: 'flex',
                    position: 'relative',
                    width: 1200,
                    margin: 'auto',
                    flexDirection: 'column',
                }}
            >
                <TbDetailsListSample />
            </div>
        </>
    );
};

export default Main;
