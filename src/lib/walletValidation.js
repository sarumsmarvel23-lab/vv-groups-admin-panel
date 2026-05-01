import { PublicKey } from "@solana/web3.js";

export function isSolanaAddress(address) {
  try {
    new PublicKey(address); 
    return true;
  } catch (e) {
    console.log(e, "Invalid Solana Address");
    return false;
  }
}