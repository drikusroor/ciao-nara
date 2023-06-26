import Button from '../Button/Button'

interface IThumbProps {
  up: boolean
  active?: boolean
  count: number
  onClick: () => void
}

const Thumb = ({ up, active, count, onClick }: IThumbProps) => {
  return (
    <Button onClick={onClick} variant={active ? 'filled' : 'outlined'}>
      {up ? '👍' : '👎'} {count}
    </Button>
  )
}

export default Thumb
