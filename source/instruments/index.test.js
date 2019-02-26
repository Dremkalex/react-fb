// Core
import { sum, delay, getUniqueID, getFullApiUrl, getDisplayName } from './';
import renderer from 'react-test-renderer';

describe('instrumenrs', () => {
    test('sum function should be a function', () => {
        expect(sum).toBeInstanceOf(Function);
    });

    test('sum function should throw, when called with non-number type as second argument', () => {
        expect(() => sum(1, 'hello')).toThrow();
    });

    test('sum function should throw, when called with non-number type as first argument', () => {
        expect(() => sum('hello', 1)).toThrow();
    });

    test('sum function should return an addition of two arguments passed', () => {
        expect(sum(3, 1)).toBe(4);
        expect(sum(4, 2)).toMatchSnapshot();
    });

    test('delay function should return a resolved promise', async () => {
        await expect(delay()).resolves.toBeUndefined();
    });

    test('getUniqueID function should be a function', () => {
        expect(getUniqueID).toBeInstanceOf(Function);
    });

    test('getUniqueID function should throw, when called with non-number type as an argument', () => {
        expect(() => getUniqueID('hello')).toThrow();
    });

    test('getUniqueID function should produce a string with default length value', () => {
        expect(getUniqueID()).toHaveLength(15);
    });

    test('getUniqueID function should produce a string of a desired given length', () => {
        expect(typeof getUniqueID()).toBe('string');
        expect(getUniqueID(5)).toHaveLength(5);
        expect(getUniqueID(13)).toHaveLength(13);
    });

    test('getFullApiUrl function should be a function', () => {
        expect(getFullApiUrl).toBeInstanceOf(Function);
    });

    test('getFullApiUrl function should throw, when called with non-string type as a first argument', () => {
        expect(() => getFullApiUrl(5, 'hello')).toThrow();
    });

    test('getFullApiUrl function should throw, when called with non-string type as a second argument', () => {
        expect(() => getFullApiUrl('hello', 5)).toThrow();
    });

    test('getFullApiUrl function should produce a string of a concat two arguments', () => {
        expect(typeof getFullApiUrl('api', 'groupid')).toBe('string');
        expect(getFullApiUrl('api', 'groupid')).toBe('api/groupid');
        expect(getFullApiUrl('byte', 'bit')).toBe('byte/bit');
    });

    test('getDisplayName function should be a function', () => {
        expect(getDisplayName).toBeInstanceOf(Function);
    });

    test('getDisplayName function should produce a string', () => {
        const renderTree = renderer.create(<div/>).toJSON();
        expect(typeof getDisplayName(renderTree)).toBe('string');
    });
});

