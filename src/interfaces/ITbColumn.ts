import { TableColumnDefinition } from '@fluentui/react-components';
import { ColumnModel } from 'tubular-common';

export interface ITbColumn<TItem> extends TableColumnDefinition<TItem> {
    tb?: Partial<ColumnModel>;
}

export type TbSupportedIColumnProps<TItem> = Partial<
    Pick<TableColumnDefinition<TItem>, 'renderCell' | 'renderHeaderCell'>
>;

export interface ITbColumnProxy<TItem> extends Partial<ColumnModel>, TbSupportedIColumnProps<TItem> {}
