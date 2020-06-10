import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { queryByAttribute } from '@testing-library/react';
import { debug } from 'webpack';

export type DebugFunc = (
    baseElement?: HTMLElement | DocumentFragment | Array<HTMLElement | DocumentFragment>,
    maxLength?: number,
    options?: any,
) => void;

export const createTestCheckbox = <T>(container: HTMLElement, data: T, _debug?: DebugFunc) => (
    fieldName: string,
): void => {
    // Use name for checkboxes, they loss data-testid
    const checkbox = queryByAttribute('name', container, fieldName);

    expect(checkbox).toBeTruthy();
    expect(data[fieldName] === checkbox.hasAttribute('checked')).toBeTruthy();
};