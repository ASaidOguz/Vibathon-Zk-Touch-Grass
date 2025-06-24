import { useState, useEffect, useCallback } from 'react';
import { connect, disconnect, getStarknet } from 'get-starknet';
import { AccountInterface, ProviderInterface } from 'starknet';

export interface WalletState {
  account: AccountInterface | null;
  address: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  provider: ProviderInterface | null;
  walletName: string | null;
}

export function useStarknetWallet() {
  const [walletState, setWalletState] = useState<WalletState>({
    account: null,
    address: null,
    isConnected: false,
    isConnecting: false,
    provider: null,
    walletName: null,
  });

  const [error, setError] = useState<string | null>(null);

  // Check if wallet is already connected on mount
  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    try {
      const starknet = getStarknet();
      if (starknet?.isConnected) {
        setWalletState({
          account: starknet.account,
          address: starknet.selectedAddress,
          isConnected: true,
          isConnecting: false,
          provider: starknet.provider,
          walletName: starknet.name || 'Unknown',
        });
      }
    } catch (err) {
      console.error('Error checking wallet connection:', err);
    }
  };

  const connectWallet = useCallback(async (walletId?: string) => {
    setWalletState(prev => ({ ...prev, isConnecting: true }));
    setError(null);

    try {
      const options = walletId ? { modalMode: 'neverAsk', modalTheme: 'dark' } : { modalTheme: 'dark' };
      const starknet = await connect(options);

      if (!starknet) {
        throw new Error('Failed to connect to wallet');
      }

      await starknet.enable();

      setWalletState({
        account: starknet.account,
        address: starknet.selectedAddress,
        isConnected: true,
        isConnecting: false,
        provider: starknet.provider,
        walletName: starknet.name || 'Unknown',
      });

      return starknet;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to connect wallet';
      setError(errorMessage);
      setWalletState(prev => ({ ...prev, isConnecting: false }));
      throw new Error(errorMessage);
    }
  }, []);

  const disconnectWallet = useCallback(async () => {
    try {
      await disconnect();
      setWalletState({
        account: null,
        address: null,
        isConnected: false,
        isConnecting: false,
        provider: null,
        walletName: null,
      });
      setError(null);
    } catch (err: any) {
      console.error('Error disconnecting wallet:', err);
      setError(err.message || 'Failed to disconnect wallet');
    }
  }, []);

  const formatAddress = useCallback((address: string | null) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }, []);

  return {
    ...walletState,
    error,
    connectWallet,
    disconnectWallet,
    formatAddress,
  };
}