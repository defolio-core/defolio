import { useMutation } from '@tanstack/react-query';
import { createAuthNonce, verifyAuth } from '../client/mutations/walletAuth';
import { useAccount, useNetwork, useSignMessage } from 'wagmi';
import { SiweMessage } from 'siwe';
import { useState } from 'react';
import { useMe } from './useMe';

export const useSignIn = () => {
  const [loading, setLoading] = useState(false);
  const { chain } = useNetwork()
  const account = useAccount();
  const { refetch: refetchMe } = useMe();
  const createAuthNonceMutation = useMutation({
    mutationFn: createAuthNonce
  });
  const verifyAuthMutation = useMutation({
    mutationFn: verifyAuth
  });
  const { signMessageAsync } = useSignMessage()

  const signIn = async () => {
    if (!account.address || !chain?.id) {
      throw new Error('Account or chain not found');
    }
    setLoading(true);
    try {      
      const { nonce, nonceSessionId } = await createAuthNonceMutation.mutateAsync();
      const siweMessage = new SiweMessage({
        domain: window.location.host,
        address: account.address,
        statement: 'Sign in with Ethereum to the app.',
        uri: window.location.origin,
        version: '1',
        chainId: chain.id,
        nonce: nonce,
      })
      const message = siweMessage.prepareMessage();
      const signature = await signMessageAsync({
        message,
      });
      const { token } = await verifyAuthMutation.mutateAsync({
        nonceSessionId,
        message,
        signature
      });
      localStorage.setItem('token', token);
      await refetchMe();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  return {
    signIn,
    isLoading: loading,
  }
};
