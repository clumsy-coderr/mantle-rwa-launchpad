// Contract addresses and ABIs for the application

export const paymentsAddress = "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb";

export const merchantAddress = "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb";

export const paymentsAbi = [
  {
    inputs: [
      { name: "merchant", type: "address" },
      { name: "amount", type: "uint256" },
      { name: "currency", type: "string" },
      { name: "description", type: "string" }
    ],
    name: "createPayment",
    outputs: [{ name: "paymentId", type: "uint256" }],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [{ name: "merchant", type: "address" }],
    name: "pay",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [{ name: "paymentId", type: "uint256" }],
    name: "getPayment",
    outputs: [
      { name: "merchant", type: "address" },
      { name: "amount", type: "uint256" },
      { name: "currency", type: "string" },
      { name: "description", type: "string" },
      { name: "status", type: "uint8" },
      { name: "createdAt", type: "uint256" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ name: "paymentId", type: "uint256" }],
    name: "cancelPayment",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
] as const;