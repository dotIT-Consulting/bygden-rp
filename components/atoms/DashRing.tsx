import { Center, RingProgress, Text } from "@mantine/core"
import type { MantineColor } from '@mantine/core';
import { ReactNode } from "react";

const getColor = (value: number) => {

  switch (true) {
    case value >= 75:
      return 'orange';
    case value >= 50:
      return 'yellow';
    default:
      return 'green';
  }
}

const DashRing = ({
  icon,
  value = 1,
  maxValue = 1,
  title,
  subtitle,
  color = null,
} : {
  icon?: ReactNode,
  value?: number,
  maxValue?: number,
  title?: string,
  subtitle?: string
  color?: MantineColor | null
}) => {

  const statsValue = (100 * value) / maxValue;

  return (
    <>
      <RingProgress
        size={80}
        roundCaps
        thickness={8}
        sections={[{ value: statsValue, color: color ? color : getColor(statsValue) }]}
        label={
          <Center>
            {icon}
          </Center>
        }
      />

      <div>
        <Text color="dimmed" size="xs" transform="uppercase" weight={700}>
          {title}
        </Text>
        <Text weight={700} size="xl">
          {subtitle}
        </Text>
      </div>
    </>
  )
}

export {
  DashRing
}