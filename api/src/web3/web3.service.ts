import { Injectable, OnModuleInit } from '@nestjs/common';
import Web3 from 'web3';

const NETWORKS = {
  local: {
    url: process.env.WEB3_PROVIDER_LOCAL_URL,
  },
  testnet: {
    url: process.env.WEB3_PROVIDER_TESTNET_URL,
  },
  mainnet: {
    url: process.env.WEB3_PROVIDER_MAINNET_URL,
  },
};

@Injectable()
export class Web3Service extends Web3 implements OnModuleInit {
  onModuleInit() {
    const url = NETWORKS[process.env.WEB3_PROVIDER_NETWORK || 'local'].url;
    const provider = new Web3.providers.HttpProvider(url);
    this.setProvider(provider);
  }
}
