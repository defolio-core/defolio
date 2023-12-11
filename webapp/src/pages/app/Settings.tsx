import { FC } from 'react'
import { AppLayout } from '../../layouts/AppLayout'

export interface SettingsProps {
  
}

export const Settings: FC<SettingsProps> = () => {
  return (
    <AppLayout title="Settings">
      <div className="p-24 bg-white border rounded-lg text-center">
        <div>
          Coming Soon!
        </div>
        <div className="mt-4 text-gray-500">
          After the Chainlink Constellation Hackathon you will be able to configure your space here.
        </div>
      </div>
    </AppLayout>
  )
}
