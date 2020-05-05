import React from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

export function useActions<T>(
  actions: T,
  deps: any[] = []
): {
  [K in keyof T]: (
    ...args: T[K] extends (...args: any) => any ? Parameters<T[K]> : never
  ) => any;
} {
  const dispatch = useDispatch();
  return React.useMemo(
    () => bindActionCreators(actions as any, dispatch),
    [dispatch, ...deps] // eslint-disable-line
  );
}

// Custom hook to support thunks
export function useEffectActions<T>(
  effects: T,
  deps: any[] = []
): {
  [K in keyof T]: (
    ...args: T[K] extends (...args: any) => any ? Parameters<T[K]> : never
  ) => any;
} {
  const dispatch = useDispatch();
  return React.useMemo(
    () =>
      Object.entries(effects).reduce((acc: any, [effectName, effect]: any) => {
        acc[effectName] = (...args: any) => effect(...args)(dispatch);
        return acc;
      }, {}),
    [dispatch, effects, ...deps] // eslint-disable-line
  );
}
