'use strict';

const assert = require('assert');
const path = require('path');
const resolve = require('..');

describe('test/index.test.js', () => {

  it('should resolve all files', () => {
    const cwd = path.join(__dirname, 'fixtures/resolve');
    const result = resolve({ cwd });
    assert.deepEqual(result, [
      path.join(cwd, 'index.js'),
      path.join(cwd, 'lib/a.js'),
      'autod',
      path.join(cwd, 'lib/b.js'),
      path.join(cwd, 'util.js'),
      path.join(cwd, 'c/index.js'),
      'a',
      path.join(cwd, 'package.json'),
      path.join(cwd, 'pkg/package.json'),
    ]);
  });

  it('should ignore modules when ignoreModules = true', () => {
    const cwd = path.join(__dirname, 'fixtures/resolve');
    const result = resolve({ cwd, ignoreModules: true });
    assert.deepEqual(result, [
      path.join(cwd, 'index.js'),
      path.join(cwd, 'lib/a.js'),
      path.join(cwd, 'lib/b.js'),
      path.join(cwd, 'util.js'),
      path.join(cwd, 'c/index.js'),
      path.join(cwd, 'package.json'),
      path.join(cwd, 'pkg/package.json'),
    ]);
  });

  it('should resolve recursive dependency', () => {
    const cwd = path.join(__dirname, 'fixtures/recursive');
    const result = resolve({ cwd });
    assert.deepEqual(result, [
      path.join(cwd, 'index.js'),
      path.join(cwd, 'lib/a.js'),
      path.join(cwd, 'util.js'),
    ]);
  });

  it('should resolve multi entry', () => {
    const cwd = path.join(__dirname, 'fixtures/multi-entry');
    const result = resolve({ cwd, entry: [
      path.join(cwd, 'a.js'),
      path.join(cwd, 'b.js'),
    ] });
    assert.deepEqual(result, [
      path.join(cwd, 'a.js'),
      path.join(cwd, 'a/index.js'),
      path.join(cwd, 'b.js'),
      path.join(cwd, 'b/index.js'),
      path.join(cwd, 'index.js'),
    ]);
  });

  it('should ignore when no export', () => {
    const cwd = path.join(__dirname, 'fixtures/no-export');
    const result = resolve({ cwd });
    assert.deepEqual(result, []);
  });

  it('should ignore when require error', () => {
    const cwd = path.join(__dirname, 'fixtures/require-error');
    const result = resolve({ cwd });
    assert.deepEqual(result, [
      path.join(cwd, 'index.js'),
    ]);
  });

  it('should ignore when entry is null', () => {
    const cwd = path.join(__dirname, 'fixtures/resolve');
    resolve({ cwd, entry: null });
  });
});
