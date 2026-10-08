const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? "tamil-heritage.vercel.app";

export const siteUrl = new URL(`https://${productionHost}`);
