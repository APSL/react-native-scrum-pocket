/* @flow */

export type DeckType = {
  Standard: Array<string>,
  TShirt: Array<string>,
  Fibonacci: Array<string>,
  RiskPlanning: Array<string>,
};

const Deck: DeckType = {
  Standard: [
    '0',
    '1/2',
    '1',
    '2',
    '3',
    '5',
    '8',
    '13',
    '20',
    '40',
    '100',
    '∞',
    '?',
    '☕',
  ],
  TShirt: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '∞', '?', '☕'],
  Fibonacci: [
    '0',
    '1',
    '2',
    '3',
    '5',
    '8',
    '13',
    '21',
    '34',
    '55',
    '89',
    '144',
    '∞',
    '?',
    '☕',
  ],
  RiskPlanning: [
    '#9ACD32',
    '#FFFF00',
    '#FFA500',
    '#800080',
    '#FF4500',
    '∞',
    '?',
    '☕',
  ],
};

export { Deck };
