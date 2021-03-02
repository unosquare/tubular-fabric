import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/components/TextField/TextField';
import { handleFilterChange, onKeyDown } from './utils';

export const StringFilter = ({ column, onEnter }) => (
    <TextField
        label={''}
        onChange={handleFilterChange(column)}
        defaultValue={column.filterText}
        onKeyDown={onKeyDown(onEnter)}
    />
);
