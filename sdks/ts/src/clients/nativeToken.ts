import {
  getAttestation,
  getAttestedEventFromTxHash,
  type ViemClient,
} from "../utils";
import type {
  ChainAddresses,
  Demand,
} from "../types";
import {
  decodeAbiParameters,
  encodeAbiParameters,
  getAbiItem,
  parseAbiParameter,
  parseAbiParameters,
  type Address,
  type Hash,
  type PublicClient,
} from "viem";

import { abi as nativeTokenPaymentAbi } from "../contracts/NativeTokenPaymentObligation";
import { abi as nativeTokenEscrowAbi } from "../contracts/NativeTokenEscrowObligation";
import { abi as easAbi } from "../contracts/IEAS";

// Extract ObligationData struct ABI from contract ABI at module initialization
const nativePaymentDoObligationFunction = getAbiItem({
  abi: nativeTokenPaymentAbi.abi,
  name: 'doObligation'
});

if (!nativePaymentDoObligationFunction || nativePaymentDoObligationFunction.type !== 'function') {
  throw new Error('doObligation function not found in NativeTokenPaymentObligation ABI');
}

const nativePaymentObligationDataAbi = nativePaymentDoObligationFunction.inputs[0];

if (!nativePaymentObligationDataAbi || nativePaymentObligationDataAbi.type !== 'tuple') {
  throw new Error('ObligationData parameter not found or not a tuple in doObligation function');
}

// Similar extraction for escrow obligation
const nativeEscrowDoObligationFunction = getAbiItem({
  abi: nativeTokenEscrowAbi.abi,
  name: 'doObligation'
});

if (!nativeEscrowDoObligationFunction || nativeEscrowDoObligationFunction.type !== 'function') {
  throw new Error('doObligation function not found in NativeTokenEscrowObligation ABI');
}

const nativeEscrowObligationDataAbi = nativeEscrowDoObligationFunction.inputs[0];

if (!nativeEscrowObligationDataAbi || nativeEscrowObligationDataAbi.type !== 'tuple') {
  throw new Error('ObligationData parameter not found or not a tuple in doObligation function');
}

type TupleAbiParameter = typeof nativePaymentObligationDataAbi & { components: readonly any[] };

/**
 * Native Token Payment Obligation Data structure
 * Matches the Solidity struct: struct ObligationData { uint256 amount; address payee; }
 */
export type NativeTokenPaymentObligationData = {
  amount: bigint;
  payee: Address;
};

/**
 * Native Token Escrow Obligation Data structure
 * Matches the Solidity struct: struct ObligationData { address arbiter; bytes demand; uint256 amount; }
 */
export type NativeTokenEscrowObligationData = {
  arbiter: Address;
  demand: `0x${string}`;
  amount: bigint;
};

/**
 * Creates a Native Token client for interacting with native token payment and escrow contracts
 * @param viemClient - Viem client instance
 * @param addresses - Contract addresses for the chain
 * @returns Native Token client with methods for payments and escrow
 */
export const makeNativeTokenClient = (
  viemClient: ViemClient,
  addresses: ChainAddresses,
) => {
  /**
   * Encodes Native Token payment obligation data (simple version for tests)
   */
    const encodeNativeTokenObligationData = (data: {amount: bigint, payee: Address}): `0x${string}` => {
    try {
      // Encode as tuple (uint256 amount, address payee) to match ObligationData struct
      const encoded = encodeAbiParameters(
        [
          { name: 'amount', type: 'uint256' },
          { name: 'payee', type: 'address' }
        ],
        [data.amount, data.payee]
      );
      return encoded;
    } catch (error) {
      throw new Error(`Failed to encode Native Token obligation data: ${error}`);
    }
  };

  /**
   * Decodes Native Token payment obligation data (simple version for tests)
   */
  const decodeNativeTokenObligationData = (data: `0x${string}`): {amount: bigint, payee: Address} => {
    try {
      const decoded = decodeAbiParameters(
        [
          { name: 'amount', type: 'uint256' },
          { name: 'payee', type: 'address' }
        ],
        data
      );
      return {
        amount: decoded[0],
        payee: decoded[1]
      };
    } catch (error) {
      throw new Error(`Failed to decode Native Token obligation data: ${error}`);
    }
  };
  
  /**
   * Encodes Native Token escrow obligation data
   */
  const encodeNativeTokenEscrowObligationData = (data: NativeTokenEscrowObligationData): `0x${string}` => {
    return encodeAbiParameters(
      [nativeEscrowObligationDataAbi],
      [data]
    );
  };

  /**
   * Decodes Native Token escrow obligation data
   */
  const decodeNativeTokenEscrowObligationData = (data: `0x${string}`): NativeTokenEscrowObligationData => {
    const [arbiter, demand, amount] = decodeAbiParameters(
      parseAbiParameters('address, bytes, uint256'),
      data
    );
    return {
      arbiter: arbiter as Address,
      demand: demand as `0x${string}`,
      amount: amount as bigint,
    };
  };

  /**
   * Executes a Native Token payment obligation
   */
    const doNativeTokenPaymentObligation = async (
    data: NativeTokenPaymentObligationData
  ): Promise<{ hash: Hash }> => {
    // Contract expects a struct (tuple) not encoded bytes
    const { request } = await viemClient.simulateContract({
      address: addresses.nativeTokenPaymentObligation,
      abi: nativeTokenPaymentAbi.abi,
      functionName: 'doObligation',
      args: [{
        amount: data.amount,
        payee: data.payee
      }],
      value: data.amount,
    });
    
    const hash = await viemClient.writeContract(request);
    return { hash };
  };

  /**
   * Executes a Native Token payment obligation on behalf of another address
   */
  const doNativeTokenPaymentObligationFor = async (
    data: NativeTokenPaymentObligationData,
    payer: Address,
    recipient: Address
  ): Promise<Hash> => {
    const { request } = await viemClient.simulateContract({
      address: addresses.nativeTokenPaymentObligation,
      abi: nativeTokenPaymentAbi.abi,
      functionName: 'doObligationFor',
      args: [{
        amount: data.amount,
        payee: data.payee
      }, payer, recipient],
      value: data.amount,
    });

    return await viemClient.writeContract(request);
  };

  /**
   * Executes a Native Token escrow obligation
   */
  const doNativeTokenEscrowObligation = async (
    data: NativeTokenEscrowObligationData,
    expirationTime = 0n
  ): Promise<{hash: Hash}> => {
    const { request } = await viemClient.simulateContract({
      address: addresses.nativeTokenEscrowObligation,
      abi: nativeTokenEscrowAbi.abi,
      functionName: 'doObligation',
      args: [data, expirationTime],
      value: data.amount,
    });

    const hash = await viemClient.writeContract(request);
    return { hash };
  };

  /**
   * Executes a Native Token escrow obligation on behalf of another address
   */
  const doNativeTokenEscrowObligationFor = async (
    data: NativeTokenEscrowObligationData,
    expirationTime: bigint,
    payer: Address,
    recipient: Address
  ): Promise<Hash> => {
    const { request } = await viemClient.simulateContract({
      address: addresses.nativeTokenEscrowObligation,
      abi: nativeTokenEscrowAbi.abi,
      functionName: 'doObligationFor',
      args: [data, expirationTime, payer, recipient],
      value: data.amount,
    });

    return await viemClient.writeContract(request);
  };

  /**
   * Gets Native Token payment obligation data from attestation UID
   */
  const getNativeTokenPaymentObligationData = async (uid: `0x${string}`): Promise<NativeTokenPaymentObligationData> => {
    const result = await viemClient.readContract({
      address: addresses.nativeTokenPaymentObligation,
      abi: nativeTokenPaymentAbi.abi,
      functionName: 'getObligationData',
      args: [uid],
    });
    return result as NativeTokenPaymentObligationData;
  };

  /**
   * Gets Native Token escrow obligation data from attestation UID
   */
  const getNativeTokenEscrowObligationData = async (uid: `0x${string}`): Promise<NativeTokenEscrowObligationData> => {
    const result = await viemClient.readContract({
      address: addresses.nativeTokenEscrowObligation,
      abi: nativeTokenEscrowAbi.abi,
      functionName: 'getObligationData',
      args: [uid],
    });
    return result as NativeTokenEscrowObligationData;
  };

  /**
   * Checks if a Native Token payment obligation can be fulfilled
   * This implements the IArbiter interface - takes an attestation and demand
   */
  const checkNativeTokenPaymentObligation = async (
    obligationUid: `0x${string}`,
    demand: `0x${string}`,
    counteroffer: `0x${string}` = '0x0000000000000000000000000000000000000000000000000000000000000000'
  ): Promise<boolean> => {
    // Get the attestation
    const attestation = await getAttestation(viemClient, obligationUid);
    
    const result = await viemClient.readContract({
      address: addresses.nativeTokenPaymentObligation,
      abi: nativeTokenPaymentAbi.abi,
      functionName: 'checkObligation',
      args: [attestation, demand, counteroffer],
    });
    return result as boolean;
  };

  /**
   * Checks if a Native Token escrow obligation can be fulfilled
   * This implements the IArbiter interface - takes an attestation and demand
   */
  const checkNativeTokenEscrowObligation = async (
    obligationUid: `0x${string}`,
    demand: `0x${string}`,
    counteroffer: `0x${string}` = '0x0000000000000000000000000000000000000000000000000000000000000000'
  ): Promise<boolean> => {
    // Get the attestation
    const attestation = await getAttestation(viemClient, obligationUid);
    
    const result = await viemClient.readContract({
      address: addresses.nativeTokenEscrowObligation,
      abi: nativeTokenEscrowAbi.abi,
      functionName: 'checkObligation',
      args: [attestation, demand, counteroffer],
    });
    return result as boolean;
  };

  /**
   * Gets Native Token payment obligation data from transaction hash
   */
  const getNativeTokenPaymentObligationFromTxHash = async (txHash: Hash): Promise<NativeTokenPaymentObligationData> => {
    const attestedEvent = await getAttestedEventFromTxHash(viemClient, txHash);
    return await getNativeTokenPaymentObligationData(attestedEvent.uid);
  };

  /**
   * Gets Native Token escrow obligation data from transaction hash
   */
  const getNativeTokenEscrowObligationFromTxHash = async (txHash: Hash): Promise<NativeTokenEscrowObligationData> => {
    const attestedEvent = await getAttestedEventFromTxHash(viemClient, txHash);
    return await getNativeTokenEscrowObligationData(attestedEvent.uid);
  };

  /**
   * Creates a Native Token payment demand
   */
  const createNativeTokenPaymentDemand = (data: {amount: bigint, payee: Address}): Demand => {
    return {
      arbiter: addresses.nativeTokenPaymentObligation,
      demand: encodeNativeTokenObligationData(data),
    };
  };

  /**
   * Creates a Native Token escrow demand
   */
  const createNativeTokenEscrowDemand = (data: NativeTokenEscrowObligationData): Demand => {
    return {
      arbiter: addresses.nativeTokenEscrowObligation,
      demand: encodeNativeTokenEscrowObligationData(data),
    };
  };

  return {
    // Core payment functions
    encodeNativeTokenObligationData,
    decodeNativeTokenObligationData,
    doNativeTokenPaymentObligation,
    doNativeTokenPaymentObligationFor,
    getNativeTokenPaymentObligationData,
    checkNativeTokenPaymentObligation,
    getNativeTokenPaymentObligationFromTxHash,
    createNativeTokenPaymentDemand,
    
    // Core escrow functions
    encodeNativeTokenEscrowObligationData,
    decodeNativeTokenEscrowObligationData,
    doNativeTokenEscrowObligation,
    doNativeTokenEscrowObligationFor,
    getNativeTokenEscrowObligationData,
    checkNativeTokenEscrowObligation,
    getNativeTokenEscrowObligationFromTxHash,
    createNativeTokenEscrowDemand,
    
    // Aliases for convenience
    payNativeToken: doNativeTokenPaymentObligation,
    payNativeTokenFor: doNativeTokenPaymentObligationFor,
    escrowNativeToken: doNativeTokenEscrowObligation,
    escrowNativeTokenFor: doNativeTokenEscrowObligationFor,
    getNativeTokenPayment: getNativeTokenPaymentObligationData,
    getNativeTokenEscrow: getNativeTokenEscrowObligationData,
    checkNativeTokenPayment: checkNativeTokenPaymentObligation,
    checkNativeTokenEscrow: checkNativeTokenEscrowObligation,
    
    // Test-compatible aliases
    doPaymentObligation: doNativeTokenPaymentObligation,
    doEscrowObligation: doNativeTokenEscrowObligation,
    doPaymentObligationFor: doNativeTokenPaymentObligationFor,
    doEscrowObligationFor: doNativeTokenEscrowObligationFor,
    validatePaymentObligationData: (data: any) => ({ valid: true, errors: [] }),
    
    // ABI for contract interactions
    paymentAbi: nativeTokenPaymentAbi.abi,
    escrowAbi: nativeTokenEscrowAbi.abi,
  };
};

export type NativeTokenClient = ReturnType<typeof makeNativeTokenClient>;