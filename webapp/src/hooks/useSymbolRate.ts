import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const PRICE_API_URL = 'https://min-api.cryptocompare.com/data/price';

interface UseSymbolRateOptions {
  enabled: boolean;
}

export const useSymbolRate = (fromSymbol: string, toSymbols: string[], { enabled }: UseSymbolRateOptions) => useQuery({
  staleTime: 1000 * 60 * 15,
  cacheTime: 1000 * 60 * 15,
  queryKey: [fromSymbol, toSymbols],
  enabled,
  queryFn: async (): Promise<{ [symbol: string]: number }> => {
    const { data } = await axios.get<{ [symbol: string]: number }>(PRICE_API_URL, {
      params: {
        fsym: fromSymbol,
        tsyms: toSymbols.join(','),
      }
    });
    return data;
  },
});
