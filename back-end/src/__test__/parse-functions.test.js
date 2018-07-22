'use strict';

import { parseFullGov } from '../lib/parse-govs';
import { findHOGKeywords, findCOSKeywords } from '../lib/parse-leaders';

describe('Testing: parse-govs.js', () => {
  test('parseFullGov parses long string to create condensed system information', () => {
    expect(parseFullGov('this is a parliamentary democracy but also monarchy and extra words')).toEqual('parliamentary democracy');
    expect(parseFullGov('a single-party state under juche ideology')).toEqual('dictatorship');
    expect(parseFullGov('communist state run by the communist party of China')).toEqual('communist state');
    expect(parseFullGov('Islamic theocratic republic blah blah blah')).toEqual('theocratic republic');
    expect(parseFullGov('parliamentary republic under a constitutional monarchy')).toEqual('parliamentary republic');
    expect(parseFullGov('presidential democracy')).toEqual('presidential democracy');
    expect(parseFullGov('presidential federation, strong central authority')).toEqual('presidential federation');
    expect(parseFullGov('republic under a constitutional monarchy')).toEqual('constitutional republic');
    expect(parseFullGov('presidential republic under a constitutional monarchy')).toEqual('presidential republic');
    expect(parseFullGov('constitutional monarchy')).toEqual('constitutional monarchy');
    expect(parseFullGov('parliamentary system of government under a constitutional monarchy')).toEqual('parliamentary monarchy');
    expect(parseFullGov('a totally unknown system')).toEqual('unknown');
    expect(parseFullGov('a random democracy')).toEqual('democracy');
    expect(parseFullGov('random federation')).toEqual('federation');
    expect(parseFullGov('an unclassified republic')).toEqual('republic');
  });
});

describe('Testing: parse-leaders.js', () => {  
  describe('findHOGKeywords', () => {
    test('testing with semicolon and multiple leaders returns array of multiple leaders', () => {
      const multipleWithSemicolon = findHOGKeywords('Premier Dmitriy Anatolyevich MEDVEDEV (since 8 May 2012); First Deputy Premier Igor Ivanovich SHUVALOV (since 12 May 2008)');

      expect(multipleWithSemicolon).toBeInstanceOf(Object);
      expect(Object.keys(multipleWithSemicolon)).toHaveLength(2);
      expect(multipleWithSemicolon['1']).toBeInstanceOf(Array);
      expect(multipleWithSemicolon['2']).toBeInstanceOf(Array);
      expect(multipleWithSemicolon['1'][0]).toEqual('Premier');
      expect(multipleWithSemicolon['1'][1]).toEqual('Dmitriy');
      expect(multipleWithSemicolon['1'][2]).toEqual('Anatolyevich');
      expect(multipleWithSemicolon['1'][3]).toEqual('MEDVEDEV');
      expect(multipleWithSemicolon['2'][0]).toEqual('First');
      expect(multipleWithSemicolon['2'][1]).toEqual('Deputy');
      expect(multipleWithSemicolon['2'][2]).toEqual('Premier');
      expect(multipleWithSemicolon['2'][3]).toEqual('Igor');
      expect(multipleWithSemicolon['2'][4]).toEqual('Ivanovich');
      expect(multipleWithSemicolon['2'][5]).toEqual('SHUVALOV');
    });

    test('testing with semicolon but only one leader should return array of keywords for that leader', () => {
      const simpleWithSemicolon = findHOGKeywords('President Patrice TALON (since 6 April 2016); prime minister position abolished');
  
      expect(simpleWithSemicolon).toBeInstanceOf(Object);
      expect(Object.keys(simpleWithSemicolon)).toHaveLength(1);
      expect(simpleWithSemicolon['1']).toBeInstanceOf(Array);
      expect(simpleWithSemicolon['1']).toHaveLength(3);
      expect(simpleWithSemicolon['1'][0]).toEqual('President');
      expect(simpleWithSemicolon['1'][1]).toEqual('Patrice');
      expect(simpleWithSemicolon['1'][2]).toEqual('TALON');
    });

    test('testing without semicolon and only one leader should returns a simple string', () => {
      const simpleWithSemicolon = findHOGKeywords('Prime Minister Theresa MAY (Conservative) (since 13 July 2016)');
  
      expect(simpleWithSemicolon).toBeInstanceOf(Object);
      expect(Object.keys(simpleWithSemicolon)).toHaveLength(1);
      expect(typeof simpleWithSemicolon['1']).toEqual('string');
      expect(simpleWithSemicolon['1']).toEqual('Prime Minister Theresa M');
    });
  });

  describe('findCOSKeywords', () => {
    test('testing with semicolon and multiple leaders returns array of multiple leaders', () => {
      const multipleWithSemicolon = findCOSKeywords('Queen ELIZABETH II (since 6 February 1952); Heir Apparent Prince CHARLES, son of the queen (born 14 November 1948)');

      expect(multipleWithSemicolon).toBeInstanceOf(Object);
      expect(Object.keys(multipleWithSemicolon)).toHaveLength(2);
      expect(multipleWithSemicolon['1']).toBeInstanceOf(Array);
      expect(multipleWithSemicolon['2']).toBeInstanceOf(Array);
      expect(multipleWithSemicolon['1'][0]).toEqual('ELIZABETH');
      expect(multipleWithSemicolon['1'][1]).toEqual('II');
      expect(multipleWithSemicolon['2'][0]).toEqual('Heir');
      expect(multipleWithSemicolon['2'][1]).toEqual('Apparent');
      expect(multipleWithSemicolon['2'][2]).toEqual('Prince');
      expect(multipleWithSemicolon['2'][3]).toEqual('CHARLES');
    });

    test('testing without semicolon and only one leader should return array of keywords for that leader', () => {
      const simpleWithSemicolon = findCOSKeywords('Supreme Leader Ali Hoseini-KHAMENEI (since 4 June 1989)');
  
      expect(simpleWithSemicolon).toBeInstanceOf(Object);
      expect(Object.keys(simpleWithSemicolon)).toHaveLength(1);
      expect(simpleWithSemicolon['1']).toBeInstanceOf(Array);
      expect(simpleWithSemicolon['1']).toHaveLength(4);
      expect(simpleWithSemicolon['1'][0]).toEqual('Supreme');
      expect(simpleWithSemicolon['1'][1]).toEqual('Leader');
      expect(simpleWithSemicolon['1'][2]).toEqual('Ali');
      expect(simpleWithSemicolon['1'][3]).toEqual('Hoseini-KHAMENEI');
    });
  });
});
