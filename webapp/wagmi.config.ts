import { defineConfig } from '@wagmi/cli';
import { react } from '@wagmi/cli/plugins';
import DeFolioSpace from './src/abi/DeFolioSpace.json';
 
export default defineConfig({
  out: 'src/generated.ts',
  contracts: [
    {
      name: 'DeFolioSpace',
      abi: DeFolioSpace,
    }
  ],
  plugins: [
    react(),
  ],
})