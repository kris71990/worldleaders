'use strict';

// import { startServer, stopServer } from '../lib/server';
import { parseFullGov } from '../lib/parse-govs';
// import { createFakeMockSystem, removeSystemMock } from './lib/system-mock';

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
