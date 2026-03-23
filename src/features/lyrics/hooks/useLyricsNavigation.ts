import { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import type { NavigationProp } from '@react-navigation/native';

export function useLyricsNavigation(navigation: NavigationProp<Record<string, unknown>>) {
  useFocusEffect(
    useCallback(() => {
      const parent = navigation.getParent();
      parent?.setOptions({ tabBarStyle: { display: 'none' } });

      return () => parent?.setOptions({ tabBarStyle: undefined });
    }, [navigation]),
  );
}
