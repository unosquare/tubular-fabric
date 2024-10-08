import { ColumnDataType } from 'tubular-common';
import { ITbColumnProxy } from '../../src/interfaces';

const nouns = ['bird', 'clock', 'boy', 'plastic', 'duck', 'teacher', 'old lady', 'professor', 'hamster', 'dog'];
const verbs = ['kicked', 'ran', 'flew', 'dodged', 'sliced', 'rolled', 'died', 'breathed', 'slept', 'killed'];
const adjectives = [
    'beautiful',
    'lazy',
    'professional',
    'lovely',
    'dumb',
    'rough',
    'soft',
    'hot',
    'vibrating',
    'slimy',
];
const adverbs = [
    'slowly',
    'elegantly',
    'precisely',
    'quickly',
    'sadly',
    'humbly',
    'proudly',
    'shockingly',
    'calmly',
    'passionately',
];
const preposition = ['down', 'into', 'up', 'on', 'upon', 'below', 'above', 'through', 'across', 'towards'];

const sentence = () => {
    const rand1 = Math.floor(Math.random() * 10);
    const rand2 = Math.floor(Math.random() * 10);
    const rand3 = Math.floor(Math.random() * 10);
    const rand4 = Math.floor(Math.random() * 10);
    const rand5 = Math.floor(Math.random() * 10);
    const rand6 = Math.floor(Math.random() * 10);

    const content = `The ${adjectives[rand1]} ${nouns[rand2]} ${adverbs[rand3]} ${verbs[rand4]} because some ${nouns[rand1]} ${adverbs[rand1]} ${verbs[rand1]} ${preposition[rand1]} a ${adjectives[rand2]} ${nouns[rand5]} which, became a ${adjectives[rand3]}, ${adjectives[rand4]} ${nouns[rand6]}.`;

    return content;
};

export const createFakeRows = (columnDefinition: ITbColumnProxy[], numberOfRows = 100, intNumbers = true) => {
    const rows: ITbColumnProxy[] = [];
    const today = new Date();

    for (let i = 0; i < numberOfRows; i++) {
        const row = columnDefinition.reduce((accumulator, current) => {
            const newItem = {};
            switch (current.dataType) {
                case ColumnDataType.Boolean:
                    newItem[current.name!] = Math.random() > 0.5;
                    break;
                case ColumnDataType.Date:
                case ColumnDataType.DateTime:
                case ColumnDataType.DateTimeUtc:
                    newItem[current.name!] = new Date(
                        today.getFullYear(),
                        Math.random() * 11,
                        Math.random() * 28,
                    ).toISOString();
                    break;
                case ColumnDataType.Numeric:
                    if (current.isKey) {
                        newItem[current.name!] = i;
                        break;
                    }

                    // eslint-disable-next-line no-case-declarations
                    const randNumber = Math.random() * 10000;
                    newItem[current.name!] = intNumbers ? Math.round(randNumber) : randNumber;
                    break;
                case ColumnDataType.String:
                    newItem[current.name!] = sentence();
                    break;
            }
            return { ...accumulator, ...newItem };
        }, {});

        rows.push(row as ITbColumnProxy);
    }

    return rows;
};
