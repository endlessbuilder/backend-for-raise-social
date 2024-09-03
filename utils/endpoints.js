const { clusterApiUrl, Connection } = require("@solana/web3.js") 
const { WalletAdapterNetwork } = require('@solana/wallet-adapter-base')

export const SOLANA_MAIN = clusterApiUrl(WalletAdapterNetwork.Mainnet);
export const SOLANA_TEST = clusterApiUrl(WalletAdapterNetwork.Testnet);
export const SOLANA_DEV = clusterApiUrl(WalletAdapterNetwork.Devnet);
export const SOLANA_LOCAL = `http://127.0.0.1:8899`;

export const NETWORK = SOLANA_LOCAL;
export const CONNECTION = new Connection(NETWORK);