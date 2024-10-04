import { IColumn } from '@fluentui/react';
import { ColumnModel } from 'tubular-common';

export interface ITbColumn extends IColumn {
    tb?: Partial<ColumnModel>;
}

export interface ITbColumnProxy extends Partial<ColumnModel>, Pick<IColumn, 'minWidth' | 'maxWidth'> {}
