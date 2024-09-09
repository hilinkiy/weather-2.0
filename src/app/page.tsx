import { Header } from '@/components/Header'
import Main from '@/components/Main'

export default function Home() {
  return (
    <div className='h-[70vh] w-[40vw] bg-white/15 rounded-2xl px-5'>
      <Header />
      <Main />
    </div>
  )
}