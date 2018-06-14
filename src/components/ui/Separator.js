import { h, Component, Fragment } from 'ink';

module.exports = ({ size = 39, symbol = '-' }) => (
  <div>{String(symbol).repeat(size)}</div>
);
