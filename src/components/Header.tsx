import { Button } from './ui/button'
import { Input } from './ui/input'

export const Header = () => {
	return (
		<div className='px-5 py-5 flex items-center justify-center'>
			<div className='flex items-center gap-3'>
				<Input placeholder='Выбрать город' />
				<Button className='bg-transparent border-[1px] border-white hover:bg-transparent'>Поиск</Button>
			</div>
		</div>
	)
}