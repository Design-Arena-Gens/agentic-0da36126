export type SearchDocument = {
  id: string;
  title: string;
  url: string;
  tags: string[];
  summary: string;
  content: string;
};

export type RankedDocument = SearchDocument & {
  score: number;
  snippet: string;
  highlights: string[];
};

export type SearchFilters = {
  tags?: string[];
};

export type SearchPayload = {
  query: string;
  filters?: SearchFilters;
};

export type SearchInsights = {
  relatedQuestions: string[];
  smartSuggestions: string[];
  deepDiveTopics: string[];
};

export type SearchResponse = {
  query: string;
  results: RankedDocument[];
  insights: SearchInsights;
  stats: {
    took: number;
    totalResults: number;
  };
  trendingTopics: string[];
};
