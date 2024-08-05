/**
 * @vitest-environment jsdom
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { observersComponentBuilderMap } from './observersComponentBuilderMap';
import { faker } from '@faker-js/faker';
import { expect, describe, it, vi } from 'vitest';

vi.mock('./github/component', () => ({
  __esModule: true,
  GithubAction: (props: any) => <input data-testid={`githubAction`} {...props} />,
}));
vi.mock('./cctray/component', () => ({
  __esModule: true,
  CCTray: (props: any) => <input data-testid={`ccTray`} {...props} />,
}));
vi.mock('./datadog/component', () => ({
  __esModule: true,
  DatadogMonitor: (props: any) => <input data-testid={`datadogMonitor`} {...props} />,
}));
vi.mock('./sentry/component', () => ({
  __esModule: true,
  Sentry: (props: any) => <input data-testid={`sentry`} {...props} />,
}));
vi.mock('./newRelic/component', () => ({
  __esModule: true,
  NewRelic: (props: any) => <input data-testid={`newRelic`} {...props} />,
}));

describe('observersComponentBuilderMap', () => {
  describe.each([['githubAction'], ['ccTray'], ['datadogMonitor'], ['sentry'], ['newRelic']])('%s', (type: string) => {
    it('should have correct textfield attributes', () => {
      const expectedObservable = faker.string.uuid();
      const expectedIndex = faker.number.int();
      const expectedUpdateFn = faker.string.uuid();
      const expectedTranslateFn = faker.string.uuid();
      const component = observersComponentBuilderMap[type](
        expectedObservable,
        expectedIndex,
        expectedUpdateFn,
        expectedTranslateFn
      );
      render(component);
      const textfield = screen.getByTestId(type);
      expect(textfield).toHaveAttribute('observable', expectedObservable);
      expect(textfield).toHaveAttribute('index', expectedIndex.toString());
      expect(textfield).toHaveAttribute('updateFieldWithValue', expectedUpdateFn);
      expect(textfield).toHaveAttribute('translate', expectedTranslateFn);
    });
  });
});
