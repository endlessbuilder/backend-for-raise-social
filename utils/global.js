import { BN } from '@coral-xyz/anchor'
import {
  getOrCreateAssociatedTokenAccount,
  getAccount,
  mintToChecked,
  getAssociatedTokenAddressSync,
  createAssociatedTokenAccountInstruction
} from '@solana/spl-token'
import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  TransactionInstruction
} from '@solana/web3.js'


export const getOrCreateATA = async (
    connection,
    mint,
    owner,
    payer
  ) => {
    const ata = await getOrCreateAssociatedTokenAccount(
      connection,
      payer,
      mint,
      owner
    )
  
    return ata.address
  }
  
  export const toTokenAmount = (uiAmount, decimals) => {
    return new BN(uiAmount * 10 ** decimals)
  }
  
  export const toUiAmount = (token_amount, decimals) => {
    return token_amount / 10 ** decimals
  }
  
  // return in lamports
  export const getSolBalance = async (
    connection,
    pubkey
  ) => {
    return connection
      .getBalance(pubkey)
      .then(balance => balance)
      .catch(() => 0)
  }
  
  export const getBalance = async (connection, pubkey) => {
    return getAccount(connection, pubkey)
      .then(account => Number(account.amount))
      .catch(() => 0)
  }
  
  export const mintTokens = async (
    connection,
    payer,
    uiAmount,
    decimals,
    mint,
    destiantionWallet
  ) => {
    await mintToChecked(
      connection,
      payer,
      mint,
      destiantionWallet,
      payer.publicKey,
      toTokenAmount(uiAmount, decimals).toNumber(),
      decimals
    )
  }
  
  export const checkAccountValidity = async (
    connection,
    publicKey
  ) => {
    const accountInfo = await connection.getAccountInfo(publicKey)
    return accountInfo != null && accountInfo != undefined
  }
  