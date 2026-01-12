"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { Terminal, CheckCircle2, ArrowRight, Copy, Check, FileCode, X, Database, ArrowRightLeft, Shield, Wallet } from 'lucide-react'

interface SDKSectionProps {
  title?: string
  description?: string
  features?: string[]
  codeExample?: React.ReactNode
  docsLink?: string
  badges?: string[]
}

export function SDKSection({
  title = "Integrated in minutes, not weeks.",
  description = "Our SDK provides a complete interface to interact with RWA Factory and Property smart contracts. Launch properties, transfer tokens, manage approvals, and query data with simple TypeScript functions.",
  features = ['Complete RWA operations', 'ERC1155 token support', 'Full TypeScript types', 'Mantle Network optimized'],
  codeExample,
  docsLink = "/sdk-demo",
  badges = ['Type-safe SDK', 'Complete API', 'Mantle Network']
}: SDKSectionProps) {
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState<'launch' | 'query' | 'transfer' | 'approval'>('launch')

  const defaultCode = (
    <>
      <div className="space-y-1">
        <div className="flex">
          <div className="w-8 text-right pr-4 text-gray-600 text-xs font-mono select-none">1</div>
          <code className="flex-1 text-[#abb2bf]">
            <span className="text-[#c678dd]">import</span> {'{'} <span className="text-[#e5c07b]">createRWAClient</span> {'}'} <span className="text-[#c678dd]">from</span> <span className="text-[#98c379]">"rwa-tokenized-sdk"</span>;
          </code>
        </div>
        <div className="flex">
          <div className="w-8 text-right pr-4 text-gray-600 text-xs font-mono select-none">2</div>
          <code className="flex-1 text-[#abb2bf]">
            <span className="text-[#c678dd]">import</span> {'{'} <span className="text-[#e5c07b]">ethers</span> {'}'} <span className="text-[#c678dd]">from</span> <span className="text-[#98c379]">"ethers"</span>;
          </code>
        </div>
        <div className="flex">
          <div className="w-8 text-right pr-4 text-gray-600 text-xs font-mono select-none">3</div>
          <code className="flex-1"></code>
        </div>
        <div className="flex">
          <div className="w-8 text-right pr-4 text-gray-600 text-xs font-mono select-none">4</div>
          <code className="flex-1 text-[#abb2bf]">
            <span className="text-[#c678dd]">const</span> <span className="text-[#e5c07b]">provider</span> = <span className="text-[#c678dd]">new</span> <span className="text-[#e5c07b]">ethers</span>.<span className="text-[#61afef]">BrowserProvider</span>(<span className="text-[#e5c07b]">window</span>.<span className="text-[#e5c07b]">ethereum</span>);
          </code>
        </div>
        <div className="flex">
          <div className="w-8 text-right pr-4 text-gray-600 text-xs font-mono select-none">5</div>
          <code className="flex-1 text-[#abb2bf]">
            <span className="text-[#c678dd]">const</span> <span className="text-[#e5c07b]">signer</span> = <span className="text-[#c678dd]">await</span> <span className="text-[#e5c07b]">provider</span>.<span className="text-[#61afef]">getSigner</span>();
          </code>
        </div>
        <div className="flex">
          <div className="w-8 text-right pr-4 text-gray-600 text-xs font-mono select-none">6</div>
          <code className="flex-1"></code>
        </div>
        <div className="flex">
          <div className="w-8 text-right pr-4 text-gray-600 text-xs font-mono select-none">7</div>
          <code className="flex-1 text-[#abb2bf]">
            <span className="text-[#c678dd]">const</span> <span className="text-[#e5c07b]">rwa</span> = <span className="text-[#61afef]">createRWAClient</span>({'{'}
          </code>
        </div>
        <div className="flex">
          <div className="w-8 text-right pr-4 text-gray-600 text-xs font-mono select-none">8</div>
          <code className="flex-1 text-[#abb2bf] pl-4">
            <span className="text-[#d19a66]">factoryAddress</span>: <span className="text-[#98c379]">"0x7d7aF5715e5671e0E3126b2428Dc2629bD9061e3"</span>
          </code>
        </div>
        <div className="flex">
          <div className="w-8 text-right pr-4 text-gray-600 text-xs font-mono select-none">9</div>
          <code className="flex-1 text-[#abb2bf]">
            {'}'});
          </code>
        </div>
        <div className="flex">
          <div className="w-8 text-right pr-4 text-gray-600 text-xs font-mono select-none">10</div>
          <code className="flex-1"></code>
        </div>
        <div className="flex">
          <div className="w-8 text-right pr-4 text-gray-600 text-xs font-mono select-none">11</div>
          <code className="flex-1 text-[#abb2bf]">
            <span className="text-[#c678dd]">const</span> <span className="text-[#e5c07b]">result</span> = <span className="text-[#c678dd]">await</span> <span className="text-[#e5c07b]">rwa</span>.<span className="text-[#61afef]">launchProperty</span>({'{'}
          </code>
        </div>
        <div className="flex">
          <div className="w-8 text-right pr-4 text-gray-600 text-xs font-mono select-none">12</div>
          <code className="flex-1 text-[#abb2bf] pl-4">
            <span className="text-[#d19a66]">assetName</span>: <span className="text-[#98c379]">"Downtown Office"</span>,
          </code>
        </div>
        <div className="flex">
          <div className="w-8 text-right pr-4 text-gray-600 text-xs font-mono select-none">13</div>
          <code className="flex-1 text-[#abb2bf] pl-4">
            <span className="text-[#d19a66]">assetType</span>: <span className="text-[#98c379]">"Real Estate"</span>,
          </code>
        </div>
        <div className="flex">
          <div className="w-8 text-right pr-4 text-gray-600 text-xs font-mono select-none">14</div>
          <code className="flex-1 text-[#abb2bf] pl-4">
            <span className="text-[#d19a66]">description</span>: <span className="text-[#98c379]">"Premium office building"</span>,
          </code>
        </div>
        <div className="flex">
          <div className="w-8 text-right pr-4 text-gray-600 text-xs font-mono select-none">15</div>
          <code className="flex-1 text-[#abb2bf] pl-4">
            <span className="text-[#d19a66]">isOwner</span>: <span className="text-[#d19a66]">true</span>,
          </code>
        </div>
        <div className="flex">
          <div className="w-8 text-right pr-4 text-gray-600 text-xs font-mono select-none">16</div>
          <code className="flex-1 text-[#abb2bf] pl-4">
            <span className="text-[#d19a66]">approximatedValue</span>: <span className="text-[#61afef]">BigInt</span>(<span className="text-[#98c379]">"1000000000000"</span>),
          </code>
        </div>
        <div className="flex">
          <div className="w-8 text-right pr-4 text-gray-600 text-xs font-mono select-none">17</div>
          <code className="flex-1 text-[#abb2bf] pl-4">
            <span className="text-[#d19a66]">totalSupply</span>: <span className="text-[#61afef]">BigInt</span>(<span className="text-[#98c379]">"1000000"</span>),
          </code>
        </div>
        <div className="flex">
          <div className="w-8 text-right pr-4 text-gray-600 text-xs font-mono select-none">18</div>
          <code className="flex-1 text-[#abb2bf] pl-4">
            <span className="text-[#d19a66]">propertyAddress</span>: <span className="text-[#98c379]">"123 Main St"</span>,
          </code>
        </div>
        <div className="flex">
          <div className="w-8 text-right pr-4 text-gray-600 text-xs font-mono select-none">19</div>
          <code className="flex-1 text-[#abb2bf] pl-4">
            <span className="text-[#d19a66]">squareMeters</span>: <span className="text-[#61afef]">BigInt</span>(<span className="text-[#98c379]">"500"</span>),
          </code>
        </div>
        <div className="flex">
          <div className="w-8 text-right pr-4 text-gray-600 text-xs font-mono select-none">20</div>
          <code className="flex-1 text-[#abb2bf] pl-4">
            <span className="text-[#d19a66]">uri</span>: <span className="text-[#98c379]">"ipfs://Qm..."</span>
          </code>
        </div>
        <div className="flex">
          <div className="w-8 text-right pr-4 text-gray-600 text-xs font-mono select-none">21</div>
          <code className="flex-1 text-[#abb2bf]">
            {'}'}, <span className="text-[#e5c07b]">signer</span>);
          </code>
        </div>
      </div>
    </>
  )

  // Code examples for different tabs
  const codeExamples = {
    launch: {
      code: defaultCode,
      copy: `import { createRWAClient } from "rwa-tokenized-sdk";
import { ethers } from "ethers";

const provider = new ethers.BrowserProvider(window.ethereum);
const signer = await provider.getSigner();

const rwa = createRWAClient({
  factoryAddress: "0x7d7aF5715e5671e0E3126b2428Dc2629bD9061e3"
});

const result = await rwa.launchProperty({
  assetName: "Downtown Office",
  assetType: "Real Estate",
  description: "Premium office building",
  isOwner: true,
  approximatedValue: BigInt("1000000000000"),
  totalSupply: BigInt("1000000"),
  propertyAddress: "123 Main St",
  squareMeters: BigInt("500"),
  uri: "ipfs://Qm..."
}, signer);`,
      fileName: "launchProperty.ts"
    },
    query: {
      code: (
        <>
          <div className="space-y-1">
            <div className="flex">
              <div className="w-8 text-right pr-4 text-gray-600 text-xs font-mono select-none">1</div>
              <code className="flex-1 text-[#abb2bf]">
                <span className="text-[#c678dd]">import</span> {'{'} <span className="text-[#e5c07b]">createRWAClient</span> {'}'} <span className="text-[#c678dd]">from</span> <span className="text-[#98c379]">"rwa-tokenized-sdk"</span>;
              </code>
            </div>
            <div className="flex">
              <div className="w-8 text-right pr-4 text-gray-600 text-xs font-mono select-none">2</div>
              <code className="flex-1 text-[#abb2bf]">
                <span className="text-[#c678dd]">import</span> {'{'} <span className="text-[#e5c07b]">ethers</span> {'}'} <span className="text-[#c678dd]">from</span> <span className="text-[#98c379]">"ethers"</span>;
              </code>
            </div>
            <div className="flex">
              <div className="w-8 text-right pr-4 text-gray-600 text-xs font-mono select-none">3</div>
              <code className="flex-1"></code>
            </div>
            <div className="flex">
              <div className="w-8 text-right pr-4 text-gray-600 text-xs font-mono select-none">4</div>
              <code className="flex-1 text-[#abb2bf]">
                <span className="text-[#c678dd]">const</span> <span className="text-[#e5c07b]">provider</span> = <span className="text-[#c678dd]">new</span> <span className="text-[#e5c07b]">ethers</span>.<span className="text-[#61afef]">JsonRpcProvider</span>(<span className="text-[#98c379]">"https://rpc.mantle.xyz"</span>);
              </code>
            </div>
            <div className="flex">
              <div className="w-8 text-right pr-4 text-gray-600 text-xs font-mono select-none">5</div>
              <code className="flex-1"></code>
            </div>
            <div className="flex">
              <div className="w-8 text-right pr-4 text-gray-600 text-xs font-mono select-none">6</div>
              <code className="flex-1 text-[#abb2bf]">
                <span className="text-[#c678dd]">const</span> <span className="text-[#e5c07b]">rwa</span> = <span className="text-[#61afef]">createRWAClient</span>({'{'}
              </code>
            </div>
            <div className="flex">
              <div className="w-8 text-right pr-4 text-gray-600 text-xs font-mono select-none">7</div>
              <code className="flex-1 text-[#abb2bf] pl-4">
                <span className="text-[#d19a66]">factoryAddress</span>: <span className="text-[#98c379]">"0x7d7aF5715e5671e0E3126b2428Dc2629bD9061e3"</span>
              </code>
            </div>
            <div className="flex">
              <div className="w-8 text-right pr-4 text-gray-600 text-xs font-mono select-none">8</div>
              <code className="flex-1 text-[#abb2bf]">
                {'}'});
              </code>
            </div>
            <div className="flex">
              <div className="w-8 text-right pr-4 text-gray-600 text-xs font-mono select-none">9</div>
              <code className="flex-1"></code>
            </div>
            <div className="flex">
              <div className="w-8 text-right pr-4 text-gray-600 text-xs font-mono select-none">10</div>
              <code className="flex-1 text-[#abb2bf]">
                <span className="text-[#c678dd]">const</span> <span className="text-[#e5c07b]">properties</span> = <span className="text-[#c678dd]">await</span> <span className="text-[#e5c07b]">rwa</span>.<span className="text-[#61afef]">getAllProperties</span>(<span className="text-[#e5c07b]">provider</span>);
              </code>
            </div>
            <div className="flex">
              <div className="w-8 text-right pr-4 text-gray-600 text-xs font-mono select-none">11</div>
              <code className="flex-1"></code>
            </div>
            <div className="flex">
              <div className="w-8 text-right pr-4 text-gray-600 text-xs font-mono select-none">12</div>
              <code className="flex-1 text-[#abb2bf]">
                <span className="text-[#c678dd]">const</span> <span className="text-[#e5c07b]">details</span> = <span className="text-[#c678dd]">await</span> <span className="text-[#e5c07b]">rwa</span>.<span className="text-[#61afef]">getPropertyDetails</span>(
              </code>
            </div>
            <div className="flex">
              <div className="w-8 text-right pr-4 text-gray-600 text-xs font-mono select-none">13</div>
              <code className="flex-1 text-[#abb2bf] pl-4">
                <span className="text-[#e5c07b]">properties</span>[<span className="text-[#d19a66]">0</span>],
              </code>
            </div>
            <div className="flex">
              <div className="w-8 text-right pr-4 text-gray-600 text-xs font-mono select-none">14</div>
              <code className="flex-1 text-[#abb2bf] pl-4">
                <span className="text-[#e5c07b]">provider</span>
              </code>
            </div>
            <div className="flex">
              <div className="w-8 text-right pr-4 text-gray-600 text-xs font-mono select-none">15</div>
              <code className="flex-1 text-[#abb2bf]">
                );
              </code>
            </div>
            <div className="flex">
              <div className="w-8 text-right pr-4 text-gray-600 text-xs font-mono select-none">16</div>
              <code className="flex-1"></code>
            </div>
            <div className="flex">
              <div className="w-8 text-right pr-4 text-gray-600 text-xs font-mono select-none">17</div>
              <code className="flex-1 text-[#abb2bf]">
                <span className="text-[#c678dd]">const</span> <span className="text-[#e5c07b]">balance</span> = <span className="text-[#c678dd]">await</span> <span className="text-[#e5c07b]">rwa</span>.<span className="text-[#61afef]">getTokenBalance</span>(
              </code>
            </div>
            <div className="flex">
              <div className="w-8 text-right pr-4 text-gray-600 text-xs font-mono select-none">18</div>
              <code className="flex-1 text-[#abb2bf] pl-4">
                <span className="text-[#e5c07b]">properties</span>[<span className="text-[#d19a66]">0</span>],
              </code>
            </div>
            <div className="flex">
              <div className="w-8 text-right pr-4 text-gray-600 text-xs font-mono select-none">19</div>
              <code className="flex-1 text-[#abb2bf] pl-4">
                <span className="text-[#98c379]">"0x..."</span>, <span className="text-[#e5c07b]">provider</span>
              </code>
            </div>
            <div className="flex">
              <div className="w-8 text-right pr-4 text-gray-600 text-xs font-mono select-none">20</div>
              <code className="flex-1 text-[#abb2bf]">
                );
              </code>
            </div>
          </div>
        </>
      ),
      copy: `import { createRWAClient } from "rwa-tokenized-sdk";
import { ethers } from "ethers";

const provider = new ethers.JsonRpcProvider("https://rpc.mantle.xyz");

const rwa = createRWAClient({
  factoryAddress: "0x7d7aF5715e5671e0E3126b2428Dc2629bD9061e3"
});

const properties = await rwa.getAllProperties(provider);
const details = await rwa.getPropertyDetails(properties[0], provider);
const balance = await rwa.getTokenBalance(properties[0], "0x...", provider);`,
      fileName: "queryProperties.ts"
    },
    transfer: {
      code: (
        <>
          <div className="space-y-1">
            <div className="flex">
              <div className="w-8 text-right pr-4 text-gray-600 text-xs font-mono select-none">1</div>
              <code className="flex-1 text-[#abb2bf]">
                <span className="text-[#c678dd]">import</span> {'{'} <span className="text-[#e5c07b]">createRWAClient</span> {'}'} <span className="text-[#c678dd]">from</span> <span className="text-[#98c379]">"rwa-tokenized-sdk"</span>;
              </code>
            </div>
            <div className="flex">
              <div className="w-8 text-right pr-4 text-gray-600 text-xs font-mono select-none">2</div>
              <code className="flex-1 text-[#abb2bf]">
                <span className="text-[#c678dd]">import</span> {'{'} <span className="text-[#e5c07b]">ethers</span> {'}'} <span className="text-[#c678dd]">from</span> <span className="text-[#98c379]">"ethers"</span>;
              </code>
            </div>
            <div className="flex">
              <div className="w-8 text-right pr-4 text-gray-600 text-xs font-mono select-none">3</div>
              <code className="flex-1"></code>
            </div>
            <div className="flex">
              <div className="w-8 text-right pr-4 text-gray-600 text-xs font-mono select-none">4</div>
              <code className="flex-1 text-[#abb2bf]">
                <span className="text-[#c678dd]">const</span> <span className="text-[#e5c07b]">provider</span> = <span className="text-[#c678dd]">new</span> <span className="text-[#e5c07b]">ethers</span>.<span className="text-[#61afef]">BrowserProvider</span>(<span className="text-[#e5c07b]">window</span>.<span className="text-[#e5c07b]">ethereum</span>);
              </code>
            </div>
            <div className="flex">
              <div className="w-8 text-right pr-4 text-gray-600 text-xs font-mono select-none">5</div>
              <code className="flex-1 text-[#abb2bf]">
                <span className="text-[#c678dd]">const</span> <span className="text-[#e5c07b]">signer</span> = <span className="text-[#c678dd]">await</span> <span className="text-[#e5c07b]">provider</span>.<span className="text-[#61afef]">getSigner</span>();
              </code>
            </div>
            <div className="flex">
              <div className="w-8 text-right pr-4 text-gray-600 text-xs font-mono select-none">6</div>
              <code className="flex-1"></code>
            </div>
            <div className="flex">
              <div className="w-8 text-right pr-4 text-gray-600 text-xs font-mono select-none">7</div>
              <code className="flex-1 text-[#abb2bf]">
                <span className="text-[#c678dd]">const</span> <span className="text-[#e5c07b]">rwa</span> = <span className="text-[#61afef]">createRWAClient</span>({'{'}
              </code>
            </div>
            <div className="flex">
              <div className="w-8 text-right pr-4 text-gray-600 text-xs font-mono select-none">8</div>
              <code className="flex-1 text-[#abb2bf] pl-4">
                <span className="text-[#d19a66]">factoryAddress</span>: <span className="text-[#98c379]">"0x7d7aF5715e5671e0E3126b2428Dc2629bD9061e3"</span>
              </code>
            </div>
            <div className="flex">
              <div className="w-8 text-right pr-4 text-gray-600 text-xs font-mono select-none">9</div>
              <code className="flex-1 text-[#abb2bf]">
                {'}'});
              </code>
            </div>
            <div className="flex">
              <div className="w-8 text-right pr-4 text-gray-600 text-xs font-mono select-none">10</div>
              <code className="flex-1"></code>
            </div>
            <div className="flex">
              <div className="w-8 text-right pr-4 text-gray-600 text-xs font-mono select-none">11</div>
              <code className="flex-1 text-[#abb2bf]">
                <span className="text-[#c678dd]">const</span> <span className="text-[#e5c07b]">txHash</span> = <span className="text-[#c678dd]">await</span> <span className="text-[#e5c07b]">rwa</span>.<span className="text-[#61afef]">transferTokens</span>(
              </code>
            </div>
            <div className="flex">
              <div className="w-8 text-right pr-4 text-gray-600 text-xs font-mono select-none">12</div>
              <code className="flex-1 text-[#abb2bf] pl-4">
                <span className="text-[#98c379]">"0xPropertyAddress"</span>,
              </code>
            </div>
            <div className="flex">
              <div className="w-8 text-right pr-4 text-gray-600 text-xs font-mono select-none">13</div>
              <code className="flex-1 text-[#abb2bf] pl-4">
                <span className="text-[#98c379]">"0xFromAddress"</span>,
              </code>
            </div>
            <div className="flex">
              <div className="w-8 text-right pr-4 text-gray-600 text-xs font-mono select-none">14</div>
              <code className="flex-1 text-[#abb2bf] pl-4">
                <span className="text-[#98c379]">"0xToAddress"</span>,
              </code>
            </div>
            <div className="flex">
              <div className="w-8 text-right pr-4 text-gray-600 text-xs font-mono select-none">15</div>
              <code className="flex-1 text-[#abb2bf] pl-4">
                <span className="text-[#d19a66]">1</span>, <span className="text-[#c678dd]">// PROPERTY_TOKEN_ID</span>
              </code>
            </div>
            <div className="flex">
              <div className="w-8 text-right pr-4 text-gray-600 text-xs font-mono select-none">16</div>
              <code className="flex-1 text-[#abb2bf] pl-4">
                <span className="text-[#61afef]">BigInt</span>(<span className="text-[#98c379]">"1000"</span>),
              </code>
            </div>
            <div className="flex">
              <div className="w-8 text-right pr-4 text-gray-600 text-xs font-mono select-none">17</div>
              <code className="flex-1 text-[#abb2bf] pl-4">
                <span className="text-[#e5c07b]">signer</span>
              </code>
            </div>
            <div className="flex">
              <div className="w-8 text-right pr-4 text-gray-600 text-xs font-mono select-none">18</div>
              <code className="flex-1 text-[#abb2bf]">
                );
              </code>
            </div>
          </div>
        </>
      ),
      copy: `import { createRWAClient } from "rwa-tokenized-sdk";
import { ethers } from "ethers";

const provider = new ethers.BrowserProvider(window.ethereum);
const signer = await provider.getSigner();

const rwa = createRWAClient({
  factoryAddress: "0x7d7aF5715e5671e0E3126b2428Dc2629bD9061e3"
});

const txHash = await rwa.transferTokens(
  "0xPropertyAddress",
  "0xFromAddress",
  "0xToAddress",
  1, // PROPERTY_TOKEN_ID
  BigInt("1000"),
  signer
);`,
      fileName: "transferTokens.ts"
    },
    approval: {
      code: (
        <>
          <div className="space-y-1">
            <div className="flex">
              <div className="w-8 text-right pr-4 text-gray-600 text-xs font-mono select-none">1</div>
              <code className="flex-1 text-[#abb2bf]">
                <span className="text-[#c678dd]">import</span> {'{'} <span className="text-[#e5c07b]">createRWAClient</span> {'}'} <span className="text-[#c678dd]">from</span> <span className="text-[#98c379]">"rwa-tokenized-sdk"</span>;
              </code>
            </div>
            <div className="flex">
              <div className="w-8 text-right pr-4 text-gray-600 text-xs font-mono select-none">2</div>
              <code className="flex-1 text-[#abb2bf]">
                <span className="text-[#c678dd]">import</span> {'{'} <span className="text-[#e5c07b]">ethers</span> {'}'} <span className="text-[#c678dd]">from</span> <span className="text-[#98c379]">"ethers"</span>;
              </code>
            </div>
            <div className="flex">
              <div className="w-8 text-right pr-4 text-gray-600 text-xs font-mono select-none">3</div>
              <code className="flex-1"></code>
            </div>
            <div className="flex">
              <div className="w-8 text-right pr-4 text-gray-600 text-xs font-mono select-none">4</div>
              <code className="flex-1 text-[#abb2bf]">
                <span className="text-[#c678dd]">const</span> <span className="text-[#e5c07b]">provider</span> = <span className="text-[#c678dd]">new</span> <span className="text-[#e5c07b]">ethers</span>.<span className="text-[#61afef]">BrowserProvider</span>(<span className="text-[#e5c07b]">window</span>.<span className="text-[#e5c07b]">ethereum</span>);
              </code>
            </div>
            <div className="flex">
              <div className="w-8 text-right pr-4 text-gray-600 text-xs font-mono select-none">5</div>
              <code className="flex-1 text-[#abb2bf]">
                <span className="text-[#c678dd]">const</span> <span className="text-[#e5c07b]">signer</span> = <span className="text-[#c678dd]">await</span> <span className="text-[#e5c07b]">provider</span>.<span className="text-[#61afef]">getSigner</span>();
              </code>
            </div>
            <div className="flex">
              <div className="w-8 text-right pr-4 text-gray-600 text-xs font-mono select-none">6</div>
              <code className="flex-1"></code>
            </div>
            <div className="flex">
              <div className="w-8 text-right pr-4 text-gray-600 text-xs font-mono select-none">7</div>
              <code className="flex-1 text-[#abb2bf]">
                <span className="text-[#c678dd]">const</span> <span className="text-[#e5c07b]">rwa</span> = <span className="text-[#61afef]">createRWAClient</span>({'{'}
              </code>
            </div>
            <div className="flex">
              <div className="w-8 text-right pr-4 text-gray-600 text-xs font-mono select-none">8</div>
              <code className="flex-1 text-[#abb2bf] pl-4">
                <span className="text-[#d19a66]">factoryAddress</span>: <span className="text-[#98c379]">"0x7d7aF5715e5671e0E3126b2428Dc2629bD9061e3"</span>
              </code>
            </div>
            <div className="flex">
              <div className="w-8 text-right pr-4 text-gray-600 text-xs font-mono select-none">9</div>
              <code className="flex-1 text-[#abb2bf]">
                {'}'});
              </code>
            </div>
            <div className="flex">
              <div className="w-8 text-right pr-4 text-gray-600 text-xs font-mono select-none">10</div>
              <code className="flex-1"></code>
            </div>
            <div className="flex">
              <div className="w-8 text-right pr-4 text-gray-600 text-xs font-mono select-none">11</div>
              <code className="flex-1 text-[#abb2bf]">
                <span className="text-[#c678dd]">await</span> <span className="text-[#e5c07b]">rwa</span>.<span className="text-[#61afef]">setApprovalForAll</span>(
              </code>
            </div>
            <div className="flex">
              <div className="w-8 text-right pr-4 text-gray-600 text-xs font-mono select-none">12</div>
              <code className="flex-1 text-[#abb2bf] pl-4">
                <span className="text-[#98c379]">"0xPropertyAddress"</span>,
              </code>
            </div>
            <div className="flex">
              <div className="w-8 text-right pr-4 text-gray-600 text-xs font-mono select-none">13</div>
              <code className="flex-1 text-[#abb2bf] pl-4">
                <span className="text-[#98c379]">"0xOperatorAddress"</span>,
              </code>
            </div>
            <div className="flex">
              <div className="w-8 text-right pr-4 text-gray-600 text-xs font-mono select-none">14</div>
              <code className="flex-1 text-[#abb2bf] pl-4">
                <span className="text-[#d19a66]">true</span>, <span className="text-[#c678dd]">// approve</span>
              </code>
            </div>
            <div className="flex">
              <div className="w-8 text-right pr-4 text-gray-600 text-xs font-mono select-none">15</div>
              <code className="flex-1 text-[#abb2bf] pl-4">
                <span className="text-[#e5c07b]">signer</span>
              </code>
            </div>
            <div className="flex">
              <div className="w-8 text-right pr-4 text-gray-600 text-xs font-mono select-none">16</div>
              <code className="flex-1 text-[#abb2bf]">
                );
              </code>
            </div>
            <div className="flex">
              <div className="w-8 text-right pr-4 text-gray-600 text-xs font-mono select-none">17</div>
              <code className="flex-1"></code>
            </div>
            <div className="flex">
              <div className="w-8 text-right pr-4 text-gray-600 text-xs font-mono select-none">18</div>
              <code className="flex-1 text-[#abb2bf]">
                <span className="text-[#c678dd]">const</span> <span className="text-[#e5c07b]">isApproved</span> = <span className="text-[#c678dd]">await</span> <span className="text-[#e5c07b]">rwa</span>.<span className="text-[#61afef]">isApprovedForAll</span>(
              </code>
            </div>
            <div className="flex">
              <div className="w-8 text-right pr-4 text-gray-600 text-xs font-mono select-none">19</div>
              <code className="flex-1 text-[#abb2bf] pl-4">
                <span className="text-[#98c379]">"0xPropertyAddress"</span>,
              </code>
            </div>
            <div className="flex">
              <div className="w-8 text-right pr-4 text-gray-600 text-xs font-mono select-none">20</div>
              <code className="flex-1 text-[#abb2bf] pl-4">
                <span className="text-[#98c379]">"0xAccountAddress"</span>,
              </code>
            </div>
            <div className="flex">
              <div className="w-8 text-right pr-4 text-gray-600 text-xs font-mono select-none">21</div>
              <code className="flex-1 text-[#abb2bf] pl-4">
                <span className="text-[#98c379]">"0xOperatorAddress"</span>,
              </code>
            </div>
            <div className="flex">
              <div className="w-8 text-right pr-4 text-gray-600 text-xs font-mono select-none">22</div>
              <code className="flex-1 text-[#abb2bf] pl-4">
                <span className="text-[#e5c07b]">provider</span>
              </code>
            </div>
            <div className="flex">
              <div className="w-8 text-right pr-4 text-gray-600 text-xs font-mono select-none">23</div>
              <code className="flex-1 text-[#abb2bf]">
                );
              </code>
            </div>
          </div>
        </>
      ),
      copy: `import { createRWAClient } from "rwa-tokenized-sdk";
import { ethers } from "ethers";

const provider = new ethers.BrowserProvider(window.ethereum);
const signer = await provider.getSigner();

const rwa = createRWAClient({
  factoryAddress: "0x7d7aF5715e5671e0E3126b2428Dc2629bD9061e3"
});

await rwa.setApprovalForAll(
  "0xPropertyAddress",
  "0xOperatorAddress",
  true, // approve
  signer
);

const isApproved = await rwa.isApprovedForAll(
  "0xPropertyAddress",
  "0xAccountAddress",
  "0xOperatorAddress",
  provider
);`,
      fileName: "manageApprovals.ts"
    }
  }

  const currentExample = codeExamples[activeTab]

  const handleCopy = async () => {
    await navigator.clipboard.writeText(currentExample.copy)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="sdk" className="py-20 bg-[#0E0E11] relative border-y border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,rgba(195,255,50,0.03)_0%,transparent_50%)]" />
      
      <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded text-[#C3FF32] text-sm font-mono mb-6 border border-[#C3FF32]/20 bg-[#C3FF32]/5">
            <Terminal size={14} /> Developer Experience
          </div>
          <h2 className="text-4xl font-bold text-white mb-6">{title}</h2>
          <p className="text-gray-400 mb-8 leading-relaxed">{description}</p>
          
          {/* Badges */}
          {badges && badges.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {badges.map((badge, i) => (
                <div key={i} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs text-gray-300 font-medium">
                  {badge}
                </div>
              ))}
            </div>
          )}
          
          <ul className="space-y-4 mb-8">
            {features.map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-gray-300">
                <div className="w-5 h-5 rounded-full bg-[#C3FF32]/20 flex items-center justify-center text-[#C3FF32]">
                  <CheckCircle2 size={12} />
                </div>
                {item}
              </li>
            ))}
          </ul>
          <Link href={docsLink} className="text-[#C3FF32] font-medium hover:underline flex items-center gap-2 group">
            Read the documentation <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform"/>
          </Link>
        </div>

        <div className="relative">
          {/* Left glow */}
          <div className="absolute -inset-1 bg-gradient-to-br from-[#C3FF32] to-transparent opacity-20 blur-md rounded-xl"></div>
          {/* Right glow */}
          <div className="absolute -inset-1 bg-gradient-to-bl from-[#C3FF32] to-transparent opacity-20 blur-md rounded-xl"></div>
          
          {/* VS Code-like IDE Window */}
          <div className="bg-[#1e1e1e] rounded-lg border border-white/10 overflow-hidden shadow-2xl relative z-10">
            {/* VS Code Title Bar */}
            <div className="bg-[#2d2d30] border-b border-white/5 px-4 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                </div>
                <div className="ml-4 flex items-center gap-2">
                  <FileCode size={12} className="text-gray-400" />
                  <span className="text-xs text-gray-400 font-mono">{currentExample.fileName}</span>
                </div>
              </div>
              <button
                onClick={handleCopy}
                className="px-3 py-1 bg-[#3e3e42] hover:bg-[#4e4e52] border border-white/5 rounded text-xs text-gray-300 font-medium flex items-center gap-1.5 transition-colors"
              >
                {copied ? (
                  <>
                    <Check size={12} className="text-[#4ec9b0]" />
                    <span className="text-[#4ec9b0]">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy size={12} />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* VS Code Tab Bar */}
            <div className="bg-[#252526] border-b border-white/5 flex items-center px-2 gap-1">
              <button
                onClick={() => setActiveTab('launch')}
                className={`px-3 py-1.5 border-t border-x border-white/5 rounded-t text-xs font-mono flex items-center gap-2 transition-colors ${
                  activeTab === 'launch'
                    ? 'bg-[#1e1e1e] text-gray-300'
                    : 'bg-[#2d2d30] text-gray-500 hover:text-gray-400'
                }`}
              >
                <FileCode size={10} />
                Launch
              </button>
              <button
                onClick={() => setActiveTab('query')}
                className={`px-3 py-1.5 border-t border-x border-white/5 rounded-t text-xs font-mono flex items-center gap-2 transition-colors ${
                  activeTab === 'query'
                    ? 'bg-[#1e1e1e] text-gray-300'
                    : 'bg-[#2d2d30] text-gray-500 hover:text-gray-400'
                }`}
              >
                <Database size={10} />
                Query
              </button>
              <button
                onClick={() => setActiveTab('transfer')}
                className={`px-3 py-1.5 border-t border-x border-white/5 rounded-t text-xs font-mono flex items-center gap-2 transition-colors ${
                  activeTab === 'transfer'
                    ? 'bg-[#1e1e1e] text-gray-300'
                    : 'bg-[#2d2d30] text-gray-500 hover:text-gray-400'
                }`}
              >
                <ArrowRightLeft size={10} />
                Transfer
              </button>
              <button
                onClick={() => setActiveTab('approval')}
                className={`px-3 py-1.5 border-t border-x border-white/5 rounded-t text-xs font-mono flex items-center gap-2 transition-colors ${
                  activeTab === 'approval'
                    ? 'bg-[#1e1e1e] text-gray-300'
                    : 'bg-[#2d2d30] text-gray-500 hover:text-gray-400'
                }`}
              >
                <Shield size={10} />
                Approval
              </button>
            </div>

            {/* VS Code Editor */}
            <div className="bg-[#1e1e1e] p-4">
              <div className="font-mono text-sm leading-relaxed">
                {codeExample || currentExample.code}
              </div>
            </div>

            {/* VS Code Status Bar */}
            <div className="bg-[#007acc] px-4 py-1.5 flex items-center justify-between text-xs text-white">
              <div className="flex items-center gap-4">
                <span className="font-mono">
                  {activeTab === 'launch' && 'Ln 11, Col 45'}
                  {activeTab === 'query' && 'Ln 10, Col 35'}
                  {activeTab === 'transfer' && 'Ln 11, Col 35'}
                  {activeTab === 'approval' && 'Ln 11, Col 40'}
                </span>
                <span className="font-mono">Spaces: 2</span>
                <span className="font-mono">TypeScript</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono">UTF-8</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional SDK Functionalities Section */}
      <div className="max-w-7xl mx-auto px-4 mt-20">
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold text-white mb-4">Complete SDK Functionality</h3>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore all the powerful features available in the RWA SDK
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Factory Operations */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-6 hover:border-[#C3FF32]/30 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#C3FF32]/10 flex items-center justify-center">
                <Database size={20} className="text-[#C3FF32]" />
              </div>
              <h4 className="text-lg font-semibold text-white">Factory Operations</h4>
            </div>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-[#C3FF32]" />
                <code className="text-xs">getAllProperties()</code>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-[#C3FF32]" />
                <code className="text-xs">getPropertyCount()</code>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-[#C3FF32]" />
                <code className="text-xs">getUserProperties()</code>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-[#C3FF32]" />
                <code className="text-xs">isValidProperty()</code>
              </li>
            </ul>
          </div>

          {/* Token Operations */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-6 hover:border-[#C3FF32]/30 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#C3FF32]/10 flex items-center justify-center">
                <Wallet size={20} className="text-[#C3FF32]" />
              </div>
              <h4 className="text-lg font-semibold text-white">Token Operations</h4>
            </div>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-[#C3FF32]" />
                <code className="text-xs">getTokenBalance()</code>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-[#C3FF32]" />
                <code className="text-xs">getBatchTokenBalances()</code>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-[#C3FF32]" />
                <code className="text-xs">transferTokens()</code>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-[#C3FF32]" />
                <code className="text-xs">batchTransferTokens()</code>
              </li>
            </ul>
          </div>

          {/* Approval Management */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-6 hover:border-[#C3FF32]/30 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#C3FF32]/10 flex items-center justify-center">
                <Shield size={20} className="text-[#C3FF32]" />
              </div>
              <h4 className="text-lg font-semibold text-white">Approval Management</h4>
            </div>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-[#C3FF32]" />
                <code className="text-xs">setApprovalForAll()</code>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-[#C3FF32]" />
                <code className="text-xs">isApprovedForAll()</code>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-[#C3FF32]" />
                <code className="text-xs">supportsInterface()</code>
              </li>
            </ul>
          </div>

          {/* Property Queries */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-6 hover:border-[#C3FF32]/30 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#C3FF32]/10 flex items-center justify-center">
                <FileCode size={20} className="text-[#C3FF32]" />
              </div>
              <h4 className="text-lg font-semibold text-white">Property Queries</h4>
            </div>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-[#C3FF32]" />
                <code className="text-xs">getPropertyDetails()</code>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-[#C3FF32]" />
                <code className="text-xs">getPropertyInfo()</code>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-[#C3FF32]" />
                <code className="text-xs">getPropertyOwner()</code>
              </li>
            </ul>
          </div>

          {/* Ownership Management */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-6 hover:border-[#C3FF32]/30 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#C3FF32]/10 flex items-center justify-center">
                <Shield size={20} className="text-[#C3FF32]" />
              </div>
              <h4 className="text-lg font-semibold text-white">Ownership Management</h4>
            </div>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-[#C3FF32]" />
                <code className="text-xs">transferFactoryOwnership()</code>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-[#C3FF32]" />
                <code className="text-xs">transferPropertyOwnership()</code>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-[#C3FF32]" />
                <code className="text-xs">getFactoryOwner()</code>
              </li>
            </ul>
          </div>

          {/* Advanced Features */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-6 hover:border-[#C3FF32]/30 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#C3FF32]/10 flex items-center justify-center">
                <Terminal size={20} className="text-[#C3FF32]" />
              </div>
              <h4 className="text-lg font-semibold text-white">Advanced Features</h4>
            </div>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-[#C3FF32]" />
                <code className="text-xs">Type-safe responses</code>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-[#C3FF32]" />
                <code className="text-xs">Error handling</code>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-[#C3FF32]" />
                <code className="text-xs">Provider agnostic</code>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-[#C3FF32]" />
                <code className="text-xs">Full TypeScript support</code>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
