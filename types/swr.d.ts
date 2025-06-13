declare module 'swr' {
  export interface SWRResponse<Data = any, Error = any> {
    data?: Data;
    error?: Error;
    mutate: (data?: Data | Promise<Data>, shouldRevalidate?: boolean) => Promise<Data | undefined>;
    isValidating: boolean;
  }

  export default function useSWR<Data = any, Error = any>(
    key: string | null,
    fetcher?: (url: string) => Promise<Data>,
    options?: {
      revalidateOnFocus?: boolean;
      revalidateOnReconnect?: boolean;
      refreshInterval?: number;
      dedupingInterval?: number;
      focusThrottleInterval?: number;
      loadingTimeout?: number;
      errorRetryCount?: number;
      errorRetryInterval?: number;
      onSuccess?: (data: Data, key: string, config: any) => void;
      onError?: (err: Error, key: string, config: any) => void;
      onLoadingSlow?: (key: string, config: any) => void;
      onDiscarded?: (key: string) => void;
      compare?: (a: Data, b: Data) => boolean;
    }
  ): SWRResponse<Data, Error>;
} 