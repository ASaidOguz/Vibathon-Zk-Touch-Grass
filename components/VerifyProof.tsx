// components/VerifyProof.tsx
import React, { useState } from 'react';
import { Button, Text, View, StyleSheet, Platform } from 'react-native';
import { RpcProvider, Contract } from 'starknet';
import { abi } from '../assets/abis/verifier.json'; // make sure you have ABI imported
import callData from '../assets/abis/calldata.json'; // make sure you have callData imported
const CONTRACT_ADDRESS = '0x...'; // your Starknet contract address
const RPC_URL = 'https://starknet-sepolia.public.blastapi.io'; // or another node provider

const VerifyProof = () => {
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const verifyProof = async () => {
    try {
      setLoading(true);
      setError(null);

      const provider = new RpcProvider({ nodeUrl: RPC_URL });
      const contractAddress = '0x01c4b07d5c5547fc6648386e6ce017979500f1e314fd55036fbb5e2b9e5a4318';
      const verifierContract = new Contract(abi, contractAddress, provider);
      
      //load calldata via calldata.txt
      // Check verification
      const res = await verifierContract.verify_ultra_starknet_honk_proof(callData.slice(1));
     

    // Send result to your Express server
     const server_res =  await fetch('https://f88e-78-172-223-211.ngrok-free.app/health-check', {
      method: 'GET',
      
    });
    const text = await server_res.text();
      setResult(JSON.stringify({
        proofResult: bigintToString(res),
        serverMessage: text
      }));
    } catch (e: any) {
      console.error(e);
      setError(e.message || 'Error verifying');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Button title={loading ? 'Verifying...' : 'Verify Proof'} onPress={verifyProof} disabled={loading} />
      {result && <Text style={styles.result}>Result: {result}</Text>}
      {error && <Text style={styles.error}>Error: {error}</Text>}
    </View>
  );
};

export default VerifyProof;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  result: {
    marginTop: 20,
    fontSize: 14,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  error: {
    marginTop: 20,
    color: 'red',
  },
});

function bigintToString(obj: any): any {
  if (typeof obj === 'bigint') {
    return obj.toString();
  } else if (Array.isArray(obj)) {
    return obj.map(bigintToString);
  } else if (obj !== null && typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries(obj).map(([k, v]) => [k, bigintToString(v)])
    );
  }
  return obj;
}