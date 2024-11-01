import { TableColumnDefinition } from '@fluentui/react-components';
import { ColumnModel } from 'tubular-common';

export interface ITbColumn<TItem> extends TableColumnDefinition<TItem> {
    tb?: Partial<ColumnModel>;
}

export type TbSupportedIColumnProps = Partial<Pick<IColumn, 'minWidth' | 'maxWidth'>>;

export interface ITbColumnProxy extends Partial<ColumnModel>, TbSupportedIColumnProps {}
