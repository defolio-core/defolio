import { FC } from 'react'

export interface NetworkLabelProps {
  color?: string
  name?: string
}

export const NetworkLabel: FC<NetworkLabelProps> = ({
  name = 'Unknown',
  color = '#BBC0C4',
}) => {
  return (
    <div>
    <span
      className="inline-block w-2 h-2 rounded-full mr-1"
      style={{ backgroundColor: color }}
    />
      <span className="opacity-60 text-xs">{name}</span>
    </div>
  );
}
