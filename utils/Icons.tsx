import * as Tabler from '@tabler/icons';
import { ITablerIcons } from './Types';

const Icons = ({ type, color, size, stroke }: ITablerIcons) => {
  if (type === typeof undefined) {
    return null
  }

  //@ts-expect-error
  const Icon = Tabler[type] as Tabler.TablerIcon;
  return (
    <Icon color={color} size={size} stroke={stroke} />
  )
}

export {
  Icons
}