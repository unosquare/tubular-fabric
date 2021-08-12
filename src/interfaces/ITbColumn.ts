import { IColumn } from '@fluentui/react';
import { ColumnModel } from 'tubular-common';

export interface ITbColumn extends IColumn {
    tb?: Partial<ColumnModel>;
}
