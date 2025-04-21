'use client'
import UserListComponent from '@/components/UserList'
import { UserPlusIcon } from '@heroicons/react/24/solid'
import { Button } from '@heroui/react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  return (
    <div className='flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-8 sm:p-20'>
      <div className='flex items-center justify-between gap-4 w-full'>
        <h1 className='text-2xl font-bold'>Usuários</h1>
        <Button
          startContent={<UserPlusIcon className='size-5' />}
          color='primary'
          variant='shadow'
          onPress={() => router.push('/create')}
        >
          Adicionar
        </Button>
      </div>
      <UserListComponent />
    </div>
  )
}
