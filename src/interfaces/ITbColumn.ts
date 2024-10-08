import { IColumn } from '@fluentui/react';
import { ColumnModel } from 'tubular-common';

export interface ITbColumn extends IColumn {
    tb?: Partial<ColumnModel>;
}

export type TbSupportedIColumnProps = Partial<Pick<IColumn, 'minWidth' | 'maxWidth'>>;

export interface ITbColumnProxy extends Partial<ColumnModel>, TbSupportedIColumnProps {}
