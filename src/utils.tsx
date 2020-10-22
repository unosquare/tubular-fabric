import * as React from 'react';
import { ColumnDataType, ColumnModel, CompareOperators, parseDateColumnValue } from 'tubular-common';
import { registerIcons, getTheme } from '@fluentui/react/lib/Styling';
import { TextCell, CheckboxCell } from './cells';

const theme = getTheme();
const wrapSvg = (svgInner: JSX.Element, isStringOperator = true) => {
    const viewBox = isStringOperator ? '0,-2,16,16' : '0,0,20,20';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox={viewBox}
            width="16px"
            height="16px"
            fill={theme.palette.themePrimary}
        >
            {svgInner}
        </svg>
    );
};

export const getRenderByDataType = (column: ColumnModel, value: any): React.ReactNode => {
    switch (column.dataType) {
        case ColumnDataType.Boolean:
            return <CheckboxCell checked={!!value} />;
        case ColumnDataType.Numeric:
            return <TextCell textAlign="Right" value={value} />;
        case ColumnDataType.Date:
        case ColumnDataType.DateTime:
        case ColumnDataType.DateTimeUtc:
            const dateAsString = !value ? '' : parseDateColumnValue(column, value);
            return <TextCell textAlign="Right" value={dateAsString} />;
        default:
            return <TextCell value={value} />;
    }
};

export const getOperatorText = (value: CompareOperators, title: string) => {
    switch (value) {
        case CompareOperators.NotContains:
        case CompareOperators.Contains:
        case CompareOperators.StartsWith:
        case CompareOperators.NotStartsWith:
        case CompareOperators.EndsWith:
        case CompareOperators.NotEndsWith:
        case CompareOperators.Equals:
        case CompareOperators.NotEquals:
        case CompareOperators.Between:
            return title;
        case CompareOperators.Gt:
            return 'Greater than';
        case CompareOperators.Gte:
            return 'Greater than or equals to';
        case CompareOperators.Lt:
            return 'Less than';
        case CompareOperators.Lte:
            return 'Less than or equals to';
        default:
            return 'None';
    }
};

export const getOperatorIcon = (value: CompareOperators) => {
    switch (value) {
        case CompareOperators.NotContains:
            return 'not-contains-svg';
        case CompareOperators.Contains:
            return 'contains-svg';
        case CompareOperators.StartsWith:
            return 'starts-with-svg';
        case CompareOperators.NotStartsWith:
            return 'not-starts-with-svg';
        case CompareOperators.EndsWith:
            return 'ends-with-svg';
        case CompareOperators.NotEndsWith:
            return 'not-ends-with-svg';
        case CompareOperators.Gt:
            return 'greater-than-svg';
        case CompareOperators.Gte:
            return 'greater-or-equals-to-svg';
        case CompareOperators.Lt:
            return 'less-than-svg';
        case CompareOperators.Lte:
            return 'less-or-equals-to-svg';
        case CompareOperators.Equals:
            return 'equals-svg';
        case CompareOperators.NotEquals:
            return 'not-equals-svg';
        case CompareOperators.Between:
            return 'between-svg';
        default:
            return 'ClearFilter';
    }
};

export const getRecordPlural = (count: number) => (count == 1 ? 'record' : 'records');

export const getPagingMessage = (totalRecordCount: number, filteredRecordCount: number) =>
    totalRecordCount === filteredRecordCount
        ? `${totalRecordCount} ${getRecordPlural(totalRecordCount)}`
        : filteredRecordCount === 0
        ? 'No records'
        : `${filteredRecordCount} ${getRecordPlural(totalRecordCount)} of ${totalRecordCount}`;

export const registerTbIcons = () => {
    registerIcons({
        icons: {
            'not-equals-svg': wrapSvg(
                <polygon points="19.99 9.79 19.99 8.32 16.72 8.32 19.6 5.44 18.56 4.4 14.64 8.32 4.01 8.32 4.01 9.79 13.17 9.79 8.75 14.21 4.01 14.21 4.01 15.68 7.28 15.68 4.4 18.56 5.44 19.6 9.36 15.68 19.99 15.68 19.99 14.21 10.83 14.21 15.25 9.79 19.99 9.79" />,
                false,
            ),
            'equals-svg': wrapSvg(<path d="M20,8.32H4V9.79H20ZM4,15.68H20V14.21H4Z" />, false),
            'not-contains-svg': wrapSvg(
                <>
                    <rect x="4.78" y="1.59" width="6.43" height="11.63" />
                    <path d="M4.4,11H3.56v-.82h0A1.72,1.72,0,0,1,2,11.07a1.73,1.73,0,0,1-1.22-.41A1.45,1.45,0,0,1,.29,9.57C.29,8.59.86,8,2,7.87l1.55-.22c0-.88-.35-1.32-1.07-1.32A2.53,2.53,0,0,0,.8,7V6.12a3.18,3.18,0,0,1,1.77-.49c1.22,0,1.83.64,1.83,1.94ZM3.56,8.32l-1.25.17a1.93,1.93,0,0,0-.87.29.81.81,0,0,0-.3.72.78.78,0,0,0,.28.63,1,1,0,0,0,.72.24,1.34,1.34,0,0,0,1-.44,1.54,1.54,0,0,0,.4-1.1Z" />
                    <path
                        fill="white"
                        d="M6.82,10.2h0V11H6V3.25H6.8V6.66h0a2,2,0,0,1,1.79-1,1.9,1.9,0,0,1,1.57.7,2.84,2.84,0,0,1,.56,1.87,3.21,3.21,0,0,1-.63,2.08,2.09,2.09,0,0,1-1.73.79A1.71,1.71,0,0,1,6.82,10.2Zm0-2.1v.72a1.56,1.56,0,0,0,.42,1.1,1.37,1.37,0,0,0,1.06.45,1.4,1.4,0,0,0,1.18-.58,2.63,2.63,0,0,0,.43-1.61,2.08,2.08,0,0,0-.4-1.36,1.32,1.32,0,0,0-1.08-.49,1.48,1.48,0,0,0-1.17.5A1.84,1.84,0,0,0,6.8,8.1Z"
                    />
                    <path d="M15.62,10.71a2.74,2.74,0,0,1-1.43.36,2.33,2.33,0,0,1-1.79-.73,2.62,2.62,0,0,1-.68-1.87,2.87,2.87,0,0,1,.73-2.06,2.58,2.58,0,0,1,2-.78,2.73,2.73,0,0,1,1.21.25v.85a2.13,2.13,0,0,0-1.24-.4,1.68,1.68,0,0,0-1.31.57,2.16,2.16,0,0,0-.51,1.5,2.05,2.05,0,0,0,.48,1.44,1.67,1.67,0,0,0,1.29.53,2.1,2.1,0,0,0,1.28-.45Z" />
                    <path fill="white" d="M4.78,8.74V8.22h6.44v.52Z" />
                </>,
            ),
            'contains-svg': wrapSvg(
                <>
                    <rect x="4.78" y="1.59" width="6.43" height="11.63" />
                    <path d="M4.4,11H3.56v-.82h0A1.72,1.72,0,0,1,2,11.07a1.73,1.73,0,0,1-1.22-.41A1.45,1.45,0,0,1,.29,9.57C.29,8.59.86,8,2,7.87l1.55-.22c0-.88-.35-1.32-1.07-1.32A2.53,2.53,0,0,0,.8,7V6.12a3.18,3.18,0,0,1,1.77-.49c1.22,0,1.83.64,1.83,1.94ZM3.56,8.32l-1.25.17a2,2,0,0,0-.87.29.81.81,0,0,0-.3.72.78.78,0,0,0,.28.63,1,1,0,0,0,.72.24,1.34,1.34,0,0,0,1-.44,1.54,1.54,0,0,0,.4-1.1Z" />
                    <path
                        fill="white"
                        d="M6.82,10.2h0V11H6V3.25H6.8V6.66h0a2,2,0,0,1,1.79-1,1.9,1.9,0,0,1,1.57.7,2.84,2.84,0,0,1,.56,1.87,3.21,3.21,0,0,1-.63,2.08,2.09,2.09,0,0,1-1.73.79A1.71,1.71,0,0,1,6.82,10.2Zm0-2.1v.72a1.56,1.56,0,0,0,.42,1.1,1.37,1.37,0,0,0,1.06.45,1.4,1.4,0,0,0,1.18-.58,2.63,2.63,0,0,0,.43-1.61,2.08,2.08,0,0,0-.4-1.36,1.32,1.32,0,0,0-1.08-.49,1.48,1.48,0,0,0-1.17.5A1.84,1.84,0,0,0,6.8,8.1Z"
                    />
                    <path d="M15.62,10.71a2.74,2.74,0,0,1-1.43.36,2.33,2.33,0,0,1-1.79-.73,2.62,2.62,0,0,1-.68-1.87,2.87,2.87,0,0,1,.73-2.06,2.58,2.58,0,0,1,2-.78,2.73,2.73,0,0,1,1.21.25v.85a2.13,2.13,0,0,0-1.24-.4,1.68,1.68,0,0,0-1.31.57,2.16,2.16,0,0,0-.51,1.5,2.05,2.05,0,0,0,.48,1.44,1.67,1.67,0,0,0,1.29.53,2.1,2.1,0,0,0,1.28-.45Z" />
                </>,
            ),
            'starts-with-svg': wrapSvg(
                <>
                    <rect y="1.59" width="11.22" height="11.63" />
                    <path
                        fill="white"
                        d="M4.4,11H3.56v-.82h0A1.72,1.72,0,0,1,2,11.07a1.73,1.73,0,0,1-1.22-.41A1.45,1.45,0,0,1,.29,9.57C.29,8.59.86,8,2,7.87l1.55-.22c0-.88-.35-1.32-1.07-1.32A2.53,2.53,0,0,0,.8,7V6.12a3.18,3.18,0,0,1,1.77-.49c1.22,0,1.83.64,1.83,1.94ZM3.56,8.32l-1.25.17a2,2,0,0,0-.87.29.81.81,0,0,0-.3.72.78.78,0,0,0,.28.63,1,1,0,0,0,.72.24,1.34,1.34,0,0,0,1-.44,1.54,1.54,0,0,0,.4-1.1Z"
                    />
                    <path
                        fill="white"
                        d="M6.82,10.2h0V11H6V3.25H6.8V6.66h0a2,2,0,0,1,1.79-1,1.9,1.9,0,0,1,1.57.7,2.84,2.84,0,0,1,.56,1.87,3.21,3.21,0,0,1-.63,2.08,2.09,2.09,0,0,1-1.73.79A1.71,1.71,0,0,1,6.82,10.2Zm0-2.1v.72a1.56,1.56,0,0,0,.42,1.1,1.37,1.37,0,0,0,1.06.45,1.4,1.4,0,0,0,1.18-.58,2.63,2.63,0,0,0,.43-1.61,2.08,2.08,0,0,0-.4-1.36,1.32,1.32,0,0,0-1.08-.49,1.48,1.48,0,0,0-1.17.5A1.84,1.84,0,0,0,6.8,8.1Z"
                    />
                    <path d="M15.62,10.71a2.74,2.74,0,0,1-1.43.36,2.33,2.33,0,0,1-1.79-.73,2.62,2.62,0,0,1-.68-1.87,2.87,2.87,0,0,1,.73-2.06,2.58,2.58,0,0,1,2-.78,2.73,2.73,0,0,1,1.21.25v.85a2.13,2.13,0,0,0-1.24-.4,1.68,1.68,0,0,0-1.31.57,2.16,2.16,0,0,0-.51,1.5,2.05,2.05,0,0,0,.48,1.44,1.67,1.67,0,0,0,1.29.53,2.1,2.1,0,0,0,1.28-.45Z" />
                </>,
            ),
            'ends-with-svg': wrapSvg(
                <>
                    <rect x="4.78" y="1.59" width="11.22" height="11.63" />
                    <path d="M4.4,11H3.56v-.82h0A1.72,1.72,0,0,1,2,11.07a1.73,1.73,0,0,1-1.22-.41A1.45,1.45,0,0,1,.29,9.57C.29,8.59.86,8,2,7.87l1.55-.22c0-.88-.35-1.32-1.07-1.32A2.53,2.53,0,0,0,.8,7V6.12a3.18,3.18,0,0,1,1.77-.49c1.22,0,1.83.64,1.83,1.94ZM3.56,8.32l-1.25.17a1.93,1.93,0,0,0-.87.29.81.81,0,0,0-.3.72.78.78,0,0,0,.28.63,1,1,0,0,0,.72.24,1.34,1.34,0,0,0,1-.44,1.54,1.54,0,0,0,.4-1.1Z" />
                    <path
                        fill="white"
                        d="M6.82,10.2h0V11H6V3.25H6.8V6.66h0a2,2,0,0,1,1.79-1,1.9,1.9,0,0,1,1.57.7,2.84,2.84,0,0,1,.56,1.87,3.21,3.21,0,0,1-.63,2.08,2.09,2.09,0,0,1-1.73.79A1.71,1.71,0,0,1,6.82,10.2Zm0-2.1v.72a1.56,1.56,0,0,0,.42,1.1,1.37,1.37,0,0,0,1.06.45,1.4,1.4,0,0,0,1.18-.58,2.63,2.63,0,0,0,.43-1.61,2.08,2.08,0,0,0-.4-1.36,1.32,1.32,0,0,0-1.08-.49,1.48,1.48,0,0,0-1.17.5A1.84,1.84,0,0,0,6.8,8.1Z"
                    />
                    <path
                        fill="white"
                        d="M15.62,10.71a2.74,2.74,0,0,1-1.43.36,2.33,2.33,0,0,1-1.79-.73,2.62,2.62,0,0,1-.68-1.87,2.87,2.87,0,0,1,.73-2.06,2.58,2.58,0,0,1,2-.78,2.73,2.73,0,0,1,1.21.25v.85a2.13,2.13,0,0,0-1.24-.4,1.68,1.68,0,0,0-1.31.57,2.16,2.16,0,0,0-.51,1.5,2.05,2.05,0,0,0,.48,1.44,1.67,1.67,0,0,0,1.29.53,2.1,2.1,0,0,0,1.28-.45Z"
                    />
                </>,
            ),
            'not-starts-with-svg': wrapSvg(
                <>
                    <rect y="1.59" width="11.22" height="11.63" />
                    <path
                        fill="white"
                        d="M4.4,11H3.56v-.82h0A1.72,1.72,0,0,1,2,11.07a1.73,1.73,0,0,1-1.22-.41A1.45,1.45,0,0,1,.29,9.57C.29,8.59.86,8,2,7.87l1.55-.22c0-.88-.35-1.32-1.07-1.32A2.53,2.53,0,0,0,.8,7V6.12a3.18,3.18,0,0,1,1.77-.49c1.22,0,1.83.64,1.83,1.94ZM3.56,8.32l-1.25.17a2,2,0,0,0-.87.29.81.81,0,0,0-.3.72.78.78,0,0,0,.28.63,1,1,0,0,0,.72.24,1.34,1.34,0,0,0,1-.44,1.54,1.54,0,0,0,.4-1.1Z"
                    />
                    <path
                        fill="white"
                        d="M6.82,10.2h0V11H6V3.25H6.8V6.66h0a2,2,0,0,1,1.79-1,1.9,1.9,0,0,1,1.57.7,2.84,2.84,0,0,1,.56,1.87,3.21,3.21,0,0,1-.63,2.08,2.09,2.09,0,0,1-1.73.79A1.71,1.71,0,0,1,6.82,10.2Zm0-2.1v.72a1.56,1.56,0,0,0,.42,1.1,1.37,1.37,0,0,0,1.06.45,1.4,1.4,0,0,0,1.18-.58,2.63,2.63,0,0,0,.43-1.61,2.08,2.08,0,0,0-.4-1.36,1.32,1.32,0,0,0-1.08-.49,1.48,1.48,0,0,0-1.17.5A1.84,1.84,0,0,0,6.8,8.1Z"
                    />
                    <path d="M15.58,10.76a3.46,3.46,0,0,1-1.45.29,2.39,2.39,0,0,1-2.5-2.57,2.55,2.55,0,0,1,2.7-2.67,3.15,3.15,0,0,1,1.27.26l-.21.71a2.07,2.07,0,0,0-1.06-.24,1.74,1.74,0,0,0-1.78,1.9,1.72,1.72,0,0,0,1.75,1.88,2.5,2.5,0,0,0,1.12-.25Z" />
                    <path fill="white" d="M0,8.74V8.22H11.22v.52Z" />
                </>,
            ),
            'not-ends-with-svg': wrapSvg(
                <>
                    <rect x="4.78" y="1.59" width="11.22" height="11.63" />
                    <path d="M4.4,11H3.56v-.82h0A1.72,1.72,0,0,1,2,11.07a1.73,1.73,0,0,1-1.22-.41A1.45,1.45,0,0,1,.29,9.57C.29,8.59.86,8,2,7.87l1.55-.22c0-.88-.35-1.32-1.07-1.32A2.53,2.53,0,0,0,.8,7V6.12a3.18,3.18,0,0,1,1.77-.49c1.22,0,1.83.64,1.83,1.94ZM3.56,8.32l-1.25.17a1.93,1.93,0,0,0-.87.29.81.81,0,0,0-.3.72.78.78,0,0,0,.28.63,1,1,0,0,0,.72.24,1.34,1.34,0,0,0,1-.44,1.54,1.54,0,0,0,.4-1.1Z" />
                    <path
                        fill="white"
                        d="M6.82,10.2h0V11H6V3.25H6.8V6.66h0a2,2,0,0,1,1.79-1,1.9,1.9,0,0,1,1.57.7,2.84,2.84,0,0,1,.56,1.87,3.21,3.21,0,0,1-.63,2.08,2.09,2.09,0,0,1-1.73.79A1.71,1.71,0,0,1,6.82,10.2Zm0-2.1v.72a1.56,1.56,0,0,0,.42,1.1,1.37,1.37,0,0,0,1.06.45,1.4,1.4,0,0,0,1.18-.58,2.63,2.63,0,0,0,.43-1.61,2.08,2.08,0,0,0-.4-1.36,1.32,1.32,0,0,0-1.08-.49,1.48,1.48,0,0,0-1.17.5A1.84,1.84,0,0,0,6.8,8.1Z"
                    />
                    <path
                        fill="white"
                        d="M15.62,10.71a2.74,2.74,0,0,1-1.43.36,2.33,2.33,0,0,1-1.79-.73,2.62,2.62,0,0,1-.68-1.87,2.87,2.87,0,0,1,.73-2.06,2.58,2.58,0,0,1,2-.78,2.73,2.73,0,0,1,1.21.25v.85a2.13,2.13,0,0,0-1.24-.4,1.68,1.68,0,0,0-1.31.57,2.16,2.16,0,0,0-.51,1.5,2.05,2.05,0,0,0,.48,1.44,1.67,1.67,0,0,0,1.29.53,2.1,2.1,0,0,0,1.28-.45Z"
                    />
                    <path fill="white" d="M4.78,8.74V8.22H16v.52Z" />
                </>,
            ),
            'greater-or-equals-to-svg': wrapSvg(
                <>
                    <polygon points="3.89 7.1 4.93 6.06 9.84 10.96 9.84 10.96 10.89 12 4.97 17.94 3.93 16.91 8.8 12.01 3.89 7.1" />
                    <path d="M20,9.74H11v1.47h9Zm-8.92,4.41h9V12.67h-9Z" />
                </>,
                false,
            ),
            'greater-than-svg': wrapSvg(
                <polygon points="8.5 7.1 9.54 6.06 14.45 10.96 14.45 10.96 15.5 12 9.58 17.94 8.54 16.91 13.41 12.01 8.5 7.1" />,
                false,
            ),
            'less-or-equals-to-svg': wrapSvg(
                <>
                    <polygon points="10.89 7.1 9.85 6.06 4.94 10.96 4.94 10.96 3.89 12 9.81 17.94 10.85 16.91 5.98 12.01 10.89 7.1" />
                    <path d="M20,9.74H11v1.47h9Zm-8.92,4.41h9V12.67h-9Z" />
                </>,
                false,
            ),
            'less-than-svg': wrapSvg(
                <polygon points="15.5 7.1 14.46 6.06 9.55 10.96 9.55 10.96 8.5 12 14.42 17.94 15.46 16.91 10.59 12.01 15.5 7.1" />,
                false,
            ),
            'between-svg': wrapSvg(
                <>
                    <polygon points="10.97 7.1 9.93 6.06 5.03 10.96 5.02 10.96 3.98 12 9.89 17.94 10.94 16.91 6.06 12.01 10.97 7.1" />
                    <polygon points="13.03 7.1 14.07 6.06 18.98 10.96 18.98 10.96 20.02 12 14.11 17.94 13.06 16.91 17.94 12.01 13.03 7.1" />
                </>,
                false,
            ),
        },
    });
};
