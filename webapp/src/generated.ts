import {
  useContractRead,
  UseContractReadConfig,
  useContractWrite,
  UseContractWriteConfig,
  usePrepareContractWrite,
  UsePrepareContractWriteConfig,
  useContractEvent,
  UseContractEventConfig,
} from 'wagmi'
import {
  ReadContractResult,
  WriteContractMode,
  PrepareWriteContractResult,
} from 'wagmi/actions'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DeFolioSpace
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const deFolioSpaceABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [{ name: '_owner', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_postId', internalType: 'uint256', type: 'uint256' }],
    name: 'archivePost',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_postId', internalType: 'uint256', type: 'uint256' }],
    name: 'getPost',
    outputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'string', type: 'string' },
      { name: '', internalType: 'string', type: 'string' },
      { name: '', internalType: 'bool', type: 'bool' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_slug', internalType: 'string', type: 'string' }],
    name: 'getPostBySlug',
    outputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'string', type: 'string' },
      { name: '', internalType: 'bool', type: 'bool' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'posts',
    outputs: [
      { name: 'postId', internalType: 'uint256', type: 'uint256' },
      { name: 'date', internalType: 'uint256', type: 'uint256' },
      { name: 'ipfsCID', internalType: 'string', type: 'string' },
      { name: 'slug', internalType: 'string', type: 'string' },
      { name: 'archived', internalType: 'bool', type: 'bool' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_slug', internalType: 'string', type: 'string' },
      { name: '_ipfsCID', internalType: 'string', type: 'string' },
    ],
    name: 'publishPost',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'string', type: 'string' }],
    name: 'slugToPostId',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalPosts',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_postId', internalType: 'uint256', type: 'uint256' },
      { name: '_ipfsCID', internalType: 'string', type: 'string' },
    ],
    name: 'updatePost',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DeFolioSpaceFactory
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const deFolioSpaceFactoryABI = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'newContractAddress',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'ownerAddress',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'ContractDeployed',
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'deployContract',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'deployedContracts',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getDeployedContracts',
    outputs: [{ name: '', internalType: 'address[]', type: 'address[]' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link deFolioSpaceABI}__.
 */
export function useDeFolioSpaceRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof deFolioSpaceABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof deFolioSpaceABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: deFolioSpaceABI,
    ...config,
  } as UseContractReadConfig<
    typeof deFolioSpaceABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link deFolioSpaceABI}__ and `functionName` set to `"getPost"`.
 */
export function useDeFolioSpaceGetPost<
  TFunctionName extends 'getPost',
  TSelectData = ReadContractResult<typeof deFolioSpaceABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof deFolioSpaceABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: deFolioSpaceABI,
    functionName: 'getPost',
    ...config,
  } as UseContractReadConfig<
    typeof deFolioSpaceABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link deFolioSpaceABI}__ and `functionName` set to `"getPostBySlug"`.
 */
export function useDeFolioSpaceGetPostBySlug<
  TFunctionName extends 'getPostBySlug',
  TSelectData = ReadContractResult<typeof deFolioSpaceABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof deFolioSpaceABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: deFolioSpaceABI,
    functionName: 'getPostBySlug',
    ...config,
  } as UseContractReadConfig<
    typeof deFolioSpaceABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link deFolioSpaceABI}__ and `functionName` set to `"owner"`.
 */
export function useDeFolioSpaceOwner<
  TFunctionName extends 'owner',
  TSelectData = ReadContractResult<typeof deFolioSpaceABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof deFolioSpaceABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: deFolioSpaceABI,
    functionName: 'owner',
    ...config,
  } as UseContractReadConfig<
    typeof deFolioSpaceABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link deFolioSpaceABI}__ and `functionName` set to `"posts"`.
 */
export function useDeFolioSpacePosts<
  TFunctionName extends 'posts',
  TSelectData = ReadContractResult<typeof deFolioSpaceABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof deFolioSpaceABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: deFolioSpaceABI,
    functionName: 'posts',
    ...config,
  } as UseContractReadConfig<
    typeof deFolioSpaceABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link deFolioSpaceABI}__ and `functionName` set to `"slugToPostId"`.
 */
export function useDeFolioSpaceSlugToPostId<
  TFunctionName extends 'slugToPostId',
  TSelectData = ReadContractResult<typeof deFolioSpaceABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof deFolioSpaceABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: deFolioSpaceABI,
    functionName: 'slugToPostId',
    ...config,
  } as UseContractReadConfig<
    typeof deFolioSpaceABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link deFolioSpaceABI}__ and `functionName` set to `"totalPosts"`.
 */
export function useDeFolioSpaceTotalPosts<
  TFunctionName extends 'totalPosts',
  TSelectData = ReadContractResult<typeof deFolioSpaceABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof deFolioSpaceABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: deFolioSpaceABI,
    functionName: 'totalPosts',
    ...config,
  } as UseContractReadConfig<
    typeof deFolioSpaceABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link deFolioSpaceABI}__.
 */
export function useDeFolioSpaceWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof deFolioSpaceABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof deFolioSpaceABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof deFolioSpaceABI, TFunctionName, TMode>({
    abi: deFolioSpaceABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link deFolioSpaceABI}__ and `functionName` set to `"archivePost"`.
 */
export function useDeFolioSpaceArchivePost<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof deFolioSpaceABI,
          'archivePost'
        >['request']['abi'],
        'archivePost',
        TMode
      > & { functionName?: 'archivePost' }
    : UseContractWriteConfig<typeof deFolioSpaceABI, 'archivePost', TMode> & {
        abi?: never
        functionName?: 'archivePost'
      } = {} as any,
) {
  return useContractWrite<typeof deFolioSpaceABI, 'archivePost', TMode>({
    abi: deFolioSpaceABI,
    functionName: 'archivePost',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link deFolioSpaceABI}__ and `functionName` set to `"publishPost"`.
 */
export function useDeFolioSpacePublishPost<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof deFolioSpaceABI,
          'publishPost'
        >['request']['abi'],
        'publishPost',
        TMode
      > & { functionName?: 'publishPost' }
    : UseContractWriteConfig<typeof deFolioSpaceABI, 'publishPost', TMode> & {
        abi?: never
        functionName?: 'publishPost'
      } = {} as any,
) {
  return useContractWrite<typeof deFolioSpaceABI, 'publishPost', TMode>({
    abi: deFolioSpaceABI,
    functionName: 'publishPost',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link deFolioSpaceABI}__ and `functionName` set to `"updatePost"`.
 */
export function useDeFolioSpaceUpdatePost<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof deFolioSpaceABI,
          'updatePost'
        >['request']['abi'],
        'updatePost',
        TMode
      > & { functionName?: 'updatePost' }
    : UseContractWriteConfig<typeof deFolioSpaceABI, 'updatePost', TMode> & {
        abi?: never
        functionName?: 'updatePost'
      } = {} as any,
) {
  return useContractWrite<typeof deFolioSpaceABI, 'updatePost', TMode>({
    abi: deFolioSpaceABI,
    functionName: 'updatePost',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link deFolioSpaceABI}__.
 */
export function usePrepareDeFolioSpaceWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof deFolioSpaceABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: deFolioSpaceABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof deFolioSpaceABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link deFolioSpaceABI}__ and `functionName` set to `"archivePost"`.
 */
export function usePrepareDeFolioSpaceArchivePost(
  config: Omit<
    UsePrepareContractWriteConfig<typeof deFolioSpaceABI, 'archivePost'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: deFolioSpaceABI,
    functionName: 'archivePost',
    ...config,
  } as UsePrepareContractWriteConfig<typeof deFolioSpaceABI, 'archivePost'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link deFolioSpaceABI}__ and `functionName` set to `"publishPost"`.
 */
export function usePrepareDeFolioSpacePublishPost(
  config: Omit<
    UsePrepareContractWriteConfig<typeof deFolioSpaceABI, 'publishPost'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: deFolioSpaceABI,
    functionName: 'publishPost',
    ...config,
  } as UsePrepareContractWriteConfig<typeof deFolioSpaceABI, 'publishPost'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link deFolioSpaceABI}__ and `functionName` set to `"updatePost"`.
 */
export function usePrepareDeFolioSpaceUpdatePost(
  config: Omit<
    UsePrepareContractWriteConfig<typeof deFolioSpaceABI, 'updatePost'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: deFolioSpaceABI,
    functionName: 'updatePost',
    ...config,
  } as UsePrepareContractWriteConfig<typeof deFolioSpaceABI, 'updatePost'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link deFolioSpaceFactoryABI}__.
 */
export function useDeFolioSpaceFactoryRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<
    typeof deFolioSpaceFactoryABI,
    TFunctionName
  >,
>(
  config: Omit<
    UseContractReadConfig<
      typeof deFolioSpaceFactoryABI,
      TFunctionName,
      TSelectData
    >,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: deFolioSpaceFactoryABI,
    ...config,
  } as UseContractReadConfig<
    typeof deFolioSpaceFactoryABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link deFolioSpaceFactoryABI}__ and `functionName` set to `"deployedContracts"`.
 */
export function useDeFolioSpaceFactoryDeployedContracts<
  TFunctionName extends 'deployedContracts',
  TSelectData = ReadContractResult<
    typeof deFolioSpaceFactoryABI,
    TFunctionName
  >,
>(
  config: Omit<
    UseContractReadConfig<
      typeof deFolioSpaceFactoryABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: deFolioSpaceFactoryABI,
    functionName: 'deployedContracts',
    ...config,
  } as UseContractReadConfig<
    typeof deFolioSpaceFactoryABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link deFolioSpaceFactoryABI}__ and `functionName` set to `"getDeployedContracts"`.
 */
export function useDeFolioSpaceFactoryGetDeployedContracts<
  TFunctionName extends 'getDeployedContracts',
  TSelectData = ReadContractResult<
    typeof deFolioSpaceFactoryABI,
    TFunctionName
  >,
>(
  config: Omit<
    UseContractReadConfig<
      typeof deFolioSpaceFactoryABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: deFolioSpaceFactoryABI,
    functionName: 'getDeployedContracts',
    ...config,
  } as UseContractReadConfig<
    typeof deFolioSpaceFactoryABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link deFolioSpaceFactoryABI}__.
 */
export function useDeFolioSpaceFactoryWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof deFolioSpaceFactoryABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<
        typeof deFolioSpaceFactoryABI,
        TFunctionName,
        TMode
      > & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof deFolioSpaceFactoryABI, TFunctionName, TMode>({
    abi: deFolioSpaceFactoryABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link deFolioSpaceFactoryABI}__ and `functionName` set to `"deployContract"`.
 */
export function useDeFolioSpaceFactoryDeployContract<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof deFolioSpaceFactoryABI,
          'deployContract'
        >['request']['abi'],
        'deployContract',
        TMode
      > & { functionName?: 'deployContract' }
    : UseContractWriteConfig<
        typeof deFolioSpaceFactoryABI,
        'deployContract',
        TMode
      > & {
        abi?: never
        functionName?: 'deployContract'
      } = {} as any,
) {
  return useContractWrite<
    typeof deFolioSpaceFactoryABI,
    'deployContract',
    TMode
  >({
    abi: deFolioSpaceFactoryABI,
    functionName: 'deployContract',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link deFolioSpaceFactoryABI}__.
 */
export function usePrepareDeFolioSpaceFactoryWrite<
  TFunctionName extends string,
>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof deFolioSpaceFactoryABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: deFolioSpaceFactoryABI,
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof deFolioSpaceFactoryABI,
    TFunctionName
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link deFolioSpaceFactoryABI}__ and `functionName` set to `"deployContract"`.
 */
export function usePrepareDeFolioSpaceFactoryDeployContract(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof deFolioSpaceFactoryABI,
      'deployContract'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: deFolioSpaceFactoryABI,
    functionName: 'deployContract',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof deFolioSpaceFactoryABI,
    'deployContract'
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link deFolioSpaceFactoryABI}__.
 */
export function useDeFolioSpaceFactoryEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof deFolioSpaceFactoryABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: deFolioSpaceFactoryABI,
    ...config,
  } as UseContractEventConfig<typeof deFolioSpaceFactoryABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link deFolioSpaceFactoryABI}__ and `eventName` set to `"ContractDeployed"`.
 */
export function useDeFolioSpaceFactoryContractDeployedEvent(
  config: Omit<
    UseContractEventConfig<typeof deFolioSpaceFactoryABI, 'ContractDeployed'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: deFolioSpaceFactoryABI,
    eventName: 'ContractDeployed',
    ...config,
  } as UseContractEventConfig<
    typeof deFolioSpaceFactoryABI,
    'ContractDeployed'
  >)
}
