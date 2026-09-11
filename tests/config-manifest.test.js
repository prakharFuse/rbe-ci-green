import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const source = readFileSync(new URL('../src/config.js', import.meta.url), 'utf8');
const manifest = readFileSync(new URL('../config-keys.manifest', import.meta.url), 'utf8');

const exported = [...source.matchAll(/^export const (\w+)/gm)].map((m) => m[1]);
const recorded = manifest
  .split('\n')
  .map((line) => line.trim())
  .filter((line) => line !== '' && !line.startsWith('#'));

test('every exported config key is recorded in the manifest', () => {
  const missing = exported.filter((key) => !recorded.includes(key));
  assert.deepEqual(
    missing,
    [],
    'config key manifest is stale - these exported keys are not recorded: ' + missing.join(', '),
  );
});

test('the manifest records no key that is no longer exported', () => {
  const stale = recorded.filter((key) => !exported.includes(key));
  assert.deepEqual(stale, [], 'manifest records keys that no longer exist: ' + stale.join(', '));
});
