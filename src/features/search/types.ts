export type { Artist, Song, Album } from '@/types';

export type SearchFilterType = 'all' | 'songs' | 'artists' | 'albums';

export interface SearchResults {
  songs:   import('@/types').Song[];
  artists: import('@/types').Artist[];
  albums:  import('@/types').Album[];
}

export interface UseSearchParams {
  query: string;
  type:  SearchFilterType;
}

export interface UseSearchReturn {
  results:      SearchResults;
  isLoading:    boolean;
  isEmpty:      boolean;
  hasNoResults: boolean;
}