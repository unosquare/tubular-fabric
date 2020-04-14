import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/components/TextField/TextField';
import { handleFilterChange, onKeyDown } from './utils';

export const NumericFilter = ({ column, onEnter }) => {
    return (
        <>
            <TextField
                label={''}
                type="number"
                onChange={handleFilterChange(column)}
                defaultValue={column.filterText}
                onKeyDown={onKeyDown(onEnter)}
            />
        </>
    );
};
