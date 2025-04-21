'use client'
import {
  getGetUsersQueryKey,
  useDeleteUser,
  useGetUsers,
} from '@/api/generated'

import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import SkeletonComponent from './Skeleton'
import { User } from '@heroui/user'
import { Button } from '@heroui/button'
import { TrashIcon } from '@heroicons/react/24/solid'
import { Pagination } from '@heroui/pagination'
import { useState } from 'react'
import { addToast } from '@heroui/toast'

export default function UserListComponent() {
  const { data: users, error, isLoading } = useGetUsers()
  const { mutateAsync } = useDeleteUser()
  const queryClient = useQueryClient()
  const [page, setPage] = useState(1)
  const itemsPerPage = 8
  const total = Math.ceil(users?.length! / itemsPerPage)
  const handlePageChange = (page: number) => {
    setPage(page)
  }

  if (isLoading) {
    return Array.from({ length: 3 }).map((_, index) => (
      <SkeletonComponent key={index} />
    ))
  }

  if (error) {
    return <div>Error ao carregar Usuários</div>
  }

  const handleDelete = (id: string) => {
    mutateAsync({ id })
      .then(() => {
        addToast({
          title: 'Alerta',
          description: 'Usuário eliminado com sucesso',
          color: 'success',
        })
        queryClient.invalidateQueries({ queryKey: getGetUsersQueryKey() })
      })
      .catch(error => {
        addToast({
          title: 'Alerta',
          description: error.response.data.message,
          color: 'danger',
        })
      })
  }

  return (
    <div className='w-full'>
      <div className='flex flex-col gap-8 overflow-y-auto max-h-[600px]'>
        {users
          ?.slice((page - 1) * itemsPerPage, page * itemsPerPage)
          .map(user => {
            return (
              <div
                className='flex justify-between items-center gap-1'
                key={user.id}
              >
                <User
                  avatarProps={{
                    fallback: user.nome.charAt(0).toUpperCase(),
                    color: 'primary',
                  }}
                  description={
                    <span className='text-gray-200'>{user.email}</span>
                  }
                  name={<span className='font-bold'>{user.nome}</span>}
                />
                <Button
                  variant='light'
                  isIconOnly
                  color='primary'
                  onPress={() => handleDelete(user.id!)}
                >
                  <TrashIcon className='size-5' />
                </Button>
              </div>
            )
          })}
      </div>
      <Pagination
        className='mt-8'
        showControls
        initialPage={page}
        total={total}
        onChange={handlePageChange}
      />
    </div>
  )
}
