import { defineConfig } from '@wagmi/cli';
import { react } from '@wagmi/cli/plugins';
import DeFolioSpace from './src/abi/DeFolioSpace.json';
import DeFolioSpaceFactory from './src/abi/DeFolioSpaceFactory.json';
 
export default defineConfig({
  out: 'src/generated.ts',
  contracts: [
    {
      name: 'DeFolioSpace',
      abi: DeFolioSpace,
    },
    {
      name: 'DeFolioSpaceFactory',
      abi: DeFolioSpaceFactory,
    }
  ],
  plugins: [
    react(),
  ],
})