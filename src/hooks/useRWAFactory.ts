'use client';

import { useState, useEffect } from 'react';
import { useReadContract, useWriteContract, useWaitForTransactionReceipt, useAccount, useChainId } from 'wagmi';
import { Address, Abi } from 'viem';
import { factoryContractABI, factoryContractAddress } from '../config/contract';
import { mantleTestnet } from '../config/chains';

export type UseRWAFactoryConfig = {
    enabled?: boolean;
    chainId?: number;
};

/**
 * Property information structure returned from contract
 */
export interface PropertyInfo {
    assetName: string;
    assetType: string;
    description: string;
    isOwner: boolean;
    approximatedValue: bigint;
    totalSupply: bigint;
    propertyAddress: string;
    squareMeters: bigint;
}

/**
 * Parsed property information with converted values
 */
export interface ParsedPropertyInfo {
    assetName: string;
    assetType: string;
    description: string;
    isOwner: boolean;
    approximatedValue: string;
    totalSupply: string;
    propertyAddress: string;
    squareMeters: string;
}

/**
 * Launch property parameters
 */
export interface LaunchPropertyParams {
    assetName: string;
    assetType: string;
    description: string;
    isOwner: boolean;
    approximatedValue: bigint;
    totalSupply: bigint;
    propertyAddress: string;
    squareMeters: bigint;
    uri: string;
}

/**
 * Hook to launch a new RWA property
 */
export function useRWAFactoryLaunchProperty(factoryAddress?: Address, config: UseRWAFactoryConfig = {}) {
    const { address, isConnected } = useAccount();
    const chainId = useChainId();
    const { writeContractAsync, data: hash, error, isPending, isSuccess, reset: resetWrite } = useWriteContract();
    const { isLoading: isConfirming, isSuccess: isConfirmed, data: receipt } = useWaitForTransactionReceipt({
        hash,
    });

    const launchProperty = async (params: LaunchPropertyParams) => {
        if (!isConnected || !address) {
            throw new Error('Please connect your wallet to continue.');
        }

        if (chainId !== mantleTestnet.id) {
            throw new Error(`Please switch to ${mantleTestnet.name} (Chain ID: ${mantleTestnet.id}) to continue.`);
        }

        const contractAddress = factoryAddress || (factoryContractAddress as Address);
        if (!contractAddress) {
            throw new Error('Factory address is required.');
        }

        try {
            const txHash = await writeContractAsync({
                address: contractAddress,
                abi: factoryContractABI as Abi,
                functionName: 'launchProperty',
                args: [
                    params.assetName,
                    params.assetType,
                    params.description,
                    params.isOwner,
                    params.approximatedValue,
                    params.totalSupply,
                    params.propertyAddress,
                    params.squareMeters,
                    params.uri,
                ],
            });
            return txHash;
        } catch (err) {
            console.error('writeContractAsync error:', err);
            throw err;
        }
    };

    return {
        launchProperty,
        hash,
        error,
        isPending,
        isSuccess,
        isConfirming,
        isConfirmed,
        receipt,
        reset: resetWrite,
    };
}

/**
 * Hook to get all property addresses from the factory
 */
export function useRWAFactoryGetAllProperties(factoryAddress?: Address, config: UseRWAFactoryConfig = {}) {
    const contractAddress = factoryAddress || (factoryContractAddress as Address);
    const { data, isLoading, error, refetch } = useReadContract({
        address: contractAddress,
        abi: factoryContractABI as Abi,
        functionName: 'getAllProperties',
        query: {
            enabled: config.enabled !== false && !!contractAddress,
        },
    });

    return {
        data: data as Address[] | undefined,
        isLoading,
        error,
        refetch,
    };
}

/**
 * Hook to get the total number of properties
 */
export function useRWAFactoryGetPropertyCount(factoryAddress?: Address, config: UseRWAFactoryConfig = {}) {
    const contractAddress = factoryAddress || (factoryContractAddress as Address);
    const { data, isLoading, error, refetch } = useReadContract({
        address: contractAddress,
        abi: factoryContractABI as Abi,
        functionName: 'getPropertyCount',
        query: {
            enabled: config.enabled !== false && !!contractAddress,
        },
    });

    return {
        data: data ? (data as bigint).toString() : undefined,
        rawData: data as bigint | undefined,
        isLoading,
        error,
        refetch,
    };
}

/**
 * Hook to get a property address by index
 */
export function useRWAFactoryGetProperty(
    index: bigint,
    factoryAddress?: Address,
    config: UseRWAFactoryConfig = {}
) {
    const contractAddress = factoryAddress || (factoryContractAddress as Address);
    const { data, isLoading, error, refetch } = useReadContract({
        address: contractAddress,
        abi: factoryContractABI as Abi,
        functionName: 'getProperty',
        args: [index],
        query: {
            enabled: config.enabled !== false && !!contractAddress,
        },
    });

    return {
        data: data as Address | undefined,
        isLoading,
        error,
        refetch,
    };
}

/**
 * Hook to get property information
 */
export function useRWAFactoryGetPropertyInfo(
    propertyAddress?: Address,
    factoryAddress?: Address,
    config: UseRWAFactoryConfig = {}
) {
    const contractAddress = factoryAddress || (factoryContractAddress as Address);
    const { data, isLoading, error, refetch } = useReadContract({
        address: contractAddress,
        abi: factoryContractABI as Abi,
        functionName: 'getPropertyInfo',
        args: propertyAddress ? [propertyAddress] : undefined,
        query: {
            enabled: config.enabled !== false && !!contractAddress && !!propertyAddress,
        },
    });

    const [parsedInfo, setParsedInfo] = useState<ParsedPropertyInfo | null>(null);

    useEffect(() => {
        if (!data) {
            setParsedInfo(null);
            return;
        }

        try {
            const result = data as [string, string, string, boolean, bigint, bigint, string, bigint];
            const [assetName, assetType, description, isOwner, approximatedValue, totalSupply, propertyAddress, squareMeters] = result;
            setParsedInfo({
                assetName,
                assetType,
                description,
                isOwner,
                approximatedValue: approximatedValue.toString(),
                totalSupply: totalSupply.toString(),
                propertyAddress,
                squareMeters: squareMeters.toString(),
            });
        } catch (err) {
            console.error('Error parsing property info:', err);
            setParsedInfo(null);
        }
    }, [data]);

    return {
        data: parsedInfo,
        rawData: data as [string, string, string, boolean, bigint, bigint, string, bigint] | undefined,
        isLoading,
        error,
        refetch,
    };
}

/**
 * Hook to check if an address is a valid property
 */
export function useRWAFactoryIsValidProperty(
    propertyAddress?: Address,
    factoryAddress?: Address,
    config: UseRWAFactoryConfig = {}
) {
    const contractAddress = factoryAddress || (factoryContractAddress as Address);
    const { data, isLoading, error, refetch } = useReadContract({
        address: contractAddress,
        abi: factoryContractABI as Abi,
        functionName: 'isValidProperty',
        args: propertyAddress ? [propertyAddress] : undefined,
        query: {
            enabled: config.enabled !== false && !!contractAddress && !!propertyAddress,
        },
    });

    return {
        data: data as boolean | undefined,
        isLoading,
        error,
        refetch,
    };
}

/**
 * Hook to get all properties for a specific user
 */
export function useRWAFactoryGetUserProperties(
    userAddress?: Address,
    factoryAddress?: Address,
    config: UseRWAFactoryConfig = {}
) {
    const contractAddress = factoryAddress || (factoryContractAddress as Address);
    const { data, isLoading, error, refetch } = useReadContract({
        address: contractAddress,
        abi: factoryContractABI as Abi,
        functionName: 'getUserProperties',
        args: userAddress ? [userAddress] : undefined,
        query: {
            enabled: config.enabled !== false && !!contractAddress && !!userAddress,
        },
    });

    return {
        data: data as Address[] | undefined,
        isLoading,
        error,
        refetch,
    };
}

/**
 * Hook to get the current user's properties
 */
export function useRWAFactoryGetCurrentUserProperties(
    factoryAddress?: Address,
    config: UseRWAFactoryConfig = {}
) {
    const { address } = useAccount();
    return useRWAFactoryGetUserProperties(address, factoryAddress, config);
}

/**
 * Hook to get the number of properties for a user
 */
export function useRWAFactoryGetUserPropertyCount(
    userAddress?: Address,
    factoryAddress?: Address,
    config: UseRWAFactoryConfig = {}
) {
    const contractAddress = factoryAddress || (factoryContractAddress as Address);
    const { data, isLoading, error, refetch } = useReadContract({
        address: contractAddress,
        abi: factoryContractABI as Abi,
        functionName: 'getUserPropertyCount',
        args: userAddress ? [userAddress] : undefined,
        query: {
            enabled: config.enabled !== false && !!contractAddress && !!userAddress,
        },
    });

    return {
        data: data ? (data as bigint).toString() : undefined,
        rawData: data as bigint | undefined,
        isLoading,
        error,
        refetch,
    };
}

/**
 * Hook to get the current user's property count
 */
export function useRWAFactoryGetCurrentUserPropertyCount(
    factoryAddress?: Address,
    config: UseRWAFactoryConfig = {}
) {
    const { address } = useAccount();
    return useRWAFactoryGetUserPropertyCount(address, factoryAddress, config);
}

/**
 * Hook to get a user's property by index
 */
export function useRWAFactoryGetUserPropertyByIndex(
    userAddress: Address,
    index: bigint,
    factoryAddress?: Address,
    config: UseRWAFactoryConfig = {}
) {
    const contractAddress = factoryAddress || (factoryContractAddress as Address);
    const { data, isLoading, error, refetch } = useReadContract({
        address: contractAddress,
        abi: factoryContractABI as Abi,
        functionName: 'getUserPropertyByIndex',
        args: [userAddress, index],
        query: {
            enabled: config.enabled !== false && !!contractAddress,
        },
    });

    return {
        data: data as Address | undefined,
        isLoading,
        error,
        refetch,
    };
}

/**
 * Combined hook for all RWA Factory operations
 */
export function useRWAFactory(factoryAddress?: Address, config: UseRWAFactoryConfig = {}) {
    const { address } = useAccount();
    const launchProperty = useRWAFactoryLaunchProperty(factoryAddress, config);
    const allProperties = useRWAFactoryGetAllProperties(factoryAddress, config);
    const propertyCount = useRWAFactoryGetPropertyCount(factoryAddress, config);
    const userProperties = useRWAFactoryGetCurrentUserProperties(factoryAddress, config);
    const userPropertyCount = useRWAFactoryGetCurrentUserPropertyCount(factoryAddress, config);

    return {
        launchProperty,
        allProperties,
        propertyCount,
        userProperties,
        userPropertyCount,
        factoryAddress: factoryAddress || (factoryContractAddress as Address),
    };
}

