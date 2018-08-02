'use strict';

import { parseFullGov } from '../lib/parse-govs';
import { findHOGKeywords, findCOSKeywords } from '../lib/parse-leaders';
import parseElectionsDates from '../lib/parse-elections';

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
      expect(multipleWithSemicolon['1'][0]).toEqual('premier');
      expect(multipleWithSemicolon['1'][1]).toEqual('dmitriy');
      expect(multipleWithSemicolon['1'][2]).toEqual('anatolyevich');
      expect(multipleWithSemicolon['1'][3]).toEqual('medvedev');
      expect(multipleWithSemicolon['2'][0]).toEqual('first');
      expect(multipleWithSemicolon['2'][1]).toEqual('deputy');
      expect(multipleWithSemicolon['2'][2]).toEqual('premier');
      expect(multipleWithSemicolon['2'][3]).toEqual('igor');
      expect(multipleWithSemicolon['2'][4]).toEqual('ivanovich');
      expect(multipleWithSemicolon['2'][5]).toEqual('shuvalov');
    });

    test('testing with semicolon but only one leader should return array of keywords for that leader', () => {
      const simpleWithSemicolon = findHOGKeywords('President Patrice TALON (since 6 April 2016); prime minister position abolished');
  
      expect(simpleWithSemicolon).toBeInstanceOf(Object);
      expect(Object.keys(simpleWithSemicolon)).toHaveLength(1);
      expect(simpleWithSemicolon['1']).toBeInstanceOf(Array);
      expect(simpleWithSemicolon['1']).toHaveLength(3);
      expect(simpleWithSemicolon['1'][0]).toEqual('president');
      expect(simpleWithSemicolon['1'][1]).toEqual('patrice');
      expect(simpleWithSemicolon['1'][2]).toEqual('talon');
    });

    test('testing without semicolon and only one leader should returns a simple string', () => {
      const simpleWithSemicolon = findHOGKeywords('Prime Minister Theresa MAY (Conservative) (since 13 July 2016)');
  
      expect(simpleWithSemicolon).toBeInstanceOf(Object);
      expect(Object.keys(simpleWithSemicolon)).toHaveLength(1);
      expect(typeof simpleWithSemicolon['1']).toEqual('object');
      expect(simpleWithSemicolon['1']).toEqual(['prime', 'minister', 'theresa', 'may']);
    });
  });

  describe('findCOSKeywords', () => {
    test('testing with semicolon and multiple leaders returns array of multiple leaders', () => {
      const multipleWithSemicolon = findCOSKeywords('Queen ELIZABETH II (since 6 February 1952); Heir Apparent Prince CHARLES, son of the queen (born 14 November 1948)');

      expect(multipleWithSemicolon).toBeInstanceOf(Object);
      expect(Object.keys(multipleWithSemicolon)).toHaveLength(2);
      expect(multipleWithSemicolon['1']).toBeInstanceOf(Array);
      expect(multipleWithSemicolon['2']).toBeInstanceOf(Array);
      expect(multipleWithSemicolon['1'][0]).toEqual('elizabeth');
      expect(multipleWithSemicolon['1'][1]).toEqual('ii');
      expect(multipleWithSemicolon['2'][0]).toEqual('heir');
      expect(multipleWithSemicolon['2'][1]).toEqual('apparent');
      expect(multipleWithSemicolon['2'][2]).toEqual('prince');
      expect(multipleWithSemicolon['2'][3]).toEqual('charles');
    });
    
    test('testing without semicolon and only one leader should return array of keywords for that leader', () => {
      const simpleWithSemicolon = findCOSKeywords('Supreme Leader Ali Hoseini-KHAMENEI (since 4 June 1989)');
  
      expect(simpleWithSemicolon).toBeInstanceOf(Object);
      expect(Object.keys(simpleWithSemicolon)).toHaveLength(1);
      expect(simpleWithSemicolon['1']).toBeInstanceOf(Array);
      expect(simpleWithSemicolon['1']).toHaveLength(4);
      expect(simpleWithSemicolon['1'][0]).toEqual('supreme');
      expect(simpleWithSemicolon['1'][1]).toEqual('leader');
      expect(simpleWithSemicolon['1'][2]).toEqual('ali');
      expect(simpleWithSemicolon['1'][3]).toEqual('hoseini-khamenei');
    });
  });
});

describe('Testing: parse-elections.js', () => {
  test('All elections exist - 1 entry for each (normal)', () => {
    const test = parseElectionsDates('president directly elected by absolute majority popular vote in 2 rounds if needed for a 5-year term (eligible for a second term); last held on 6 March and 20 March 2016 (next to be held in 2021)', 'last held on 26 April 2015 (next to be held in April 2019)');
    expect(test.exec.next[0]).toEqual('in 2021');
    expect(test.exec.last[0]).toEqual('20 March 2016');
    expect(test.leg.next[0]).toEqual('April 2019');
    expect(test.leg.last[0]).toEqual('26 April 2015');
  });

  test('Legislative elections - multiple dates should return arrays; Executive - no dates should return null', () => {
    const test = parseElectionsDates('blah blah no dates', 'Chamber of Senators - last held on 26 October 2014 (next to be held in October 2019); Chamber of Representatives - last held on 26 October 2014 (next to be held in October 2019)');
    expect(test.exec.next).toBeNull();
    expect(test.exec.last).toBeNull();
    expect(test.leg.next).toBeInstanceOf(Array);
    expect(test.leg.next).toHaveLength(2);
    expect(test.leg.last).toBeInstanceOf(Array);
    expect(test.leg.last).toHaveLength(2);
  });

  test('Executive elections - multiple dates should return arrays; Legislative - no dates should return null', () => {
    const test = parseElectionsDates('president and vice president directly elected on the same ballot by absolute majority vote in 2 rounds if needed for a 5-year term (eligible for nonconsecutive terms); election last held on 26 October 2014, last on 30 November 2014 (next to be held on 27 October 2019, last on 24 November 2019)', 'blah blah no dates');
    expect(test.leg.next).toBeNull();
    expect(test.leg.last).toBeNull();
    expect(test.exec.next).toBeInstanceOf(Array);
    expect(test.exec.next).toHaveLength(2);
    expect(test.exec.last).toBeInstanceOf(Array);
    expect(test.exec.last).toHaveLength(2);
  });
}); 
