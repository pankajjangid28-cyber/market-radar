
/*
 * Market Radar — live crypto data
 * Read-only: this file never places trades.
 * Prices are supplied by CoinGecko's public API.
 */

const CRYPTO_API =
  "https://api.coingecko.com/api/v3/coins/markets";

async function getLiveCryptoPrices() {
  const params = new URLSearchParams({
    vs_currency: "aud",
    ids: "bitcoin,ethereum,solana,ripple,cardano",
    order: "market_cap_desc",
    per_page: "5",
    page: "1",
    sparkline: "false",
    price_change_percentage: "24h,7d"
  });

  const response = await fetch(`${CRYPTO_API}?${params}`);

  if (!response.ok) {
    throw new Error(
      `Crypto data request failed: HTTP ${response.status}`
    );
  }

  const coins = await response.json();

  return coins.map((coin) => ({
    name: coin.name,
    symbol: coin.symbol.toUpperCase(),
    priceAUD: coin.current_price,
    change24h: coin.price_change_percentage_24h,
    change7d: coin.price_change_percentage_7d_in_currency,
    marketCapAUD: coin.market_cap,
    volume24hAUD: coin.total_volume,
    updatedAt: coin.last_updated
  }));
}

// Example usage:
// getLiveCryptoPrices().then(console.log).catch(console.error);
getLiveCryptoPrices()
  .then(coins => console.log("Live crypto prices (AUD):", coins))
  .catch(error => console.error("Could not load crypto prices:", error));
