import { describe, it, expect} from "vitest";
import { checkInput, isWordFound } from "main.js";


describe('test of checkInput function', () => {
    it('when valid input is entered', () => {
        expect(checkInput("fun")).toBe(true);
    })
})

describe('test of checkInput function', () => {
    it('when valid input is entered', () => {
        expect(checkInput("123")).toBe(false);
    })
})

describe('test of checkInput function', () => {
    it('when valid input is entered', () => {
        expect(checkInput("big guy")).toBe(false);
    })
})

describe('test of isWordFound function', () => {
    it('when input the title to the value key is not found', () => {
        expect(isWordFound([
            {'word': 'definition',
            'synonym':'synonym',
            'partOfSpeech':'noun'}
        ])).toBe(true);
    })
})


describe('test of isWordFound function', () => {
    it('when input the title to the value key is not found', () => {
        expect(isWordFound(
            {'title': 'definition',
            'meaning':'text',
            'resolution':'text'}
        )).toBe(false);
    })
})

