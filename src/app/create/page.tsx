'use client'
import { getGetUsersQueryKey, useCreateUser } from '@/api/generated'
import { CreateUserBody } from '@/api/model'
import FieldError from '@/components/FieldError'
import { Button } from '@heroui/button'
import { userSchema } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import {
  ChevronLeftIcon,
  EnvelopeIcon,
  UserIcon,
  UserPlusIcon,
} from '@heroicons/react/24/solid'
import { useRouter } from 'next/navigation'
import { Input } from '@heroui/input'
import { addToast } from '@heroui/toast'

export default function Create() {
  const { mutateAsync, isPending } = useCreateUser()
  const queryClient = useQueryClient()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateUserBody>({
    resolver: zodResolver(userSchema),
  })

  const onSubmit = (data: CreateUserBody) => {
    console.log(data)
    mutateAsync({ data })
      .then(() => {
        addToast({
          title: 'Alerta',
          description: 'Usuário criado com sucesso',
          color: 'success',
        })
        queryClient.invalidateQueries({ queryKey: getGetUsersQueryKey() })
        reset()
      })
      .catch(error => {
        addToast({
          title: 'Alerta',
          description: error.response.data.message,
          color: 'danger',
        })
      })
  }
  const router = useRouter()

  return (
    <div className='flex flex-col justify-center items-center h-svh px-10 md:px-60 lg:px-80'>
      <div className='flex justify-between items-center gap-2 w-full'>
        <Button
          isIconOnly
          variant='light'
          color='primary'
          onPress={() => router.back()}
        >
          <ChevronLeftIcon className='size-5' />
        </Button>
        <h1 className='text-lg font-bold mt-2'>Adicionar Usuário</h1>
      </div>
      <div className='flex flex-col justify-center mt-10 w-full'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            autoComplete='off'
            startContent={<UserIcon className='size-5' />}
            placeholder='Nome completo'
            {...register('nome')}
          />
          <FieldError>{errors.nome?.message}</FieldError>
          <Input
            autoComplete='off'
            startContent={<EnvelopeIcon className='size-5' />}
            placeholder='E-mail'
            {...register('email')}
          />
          <FieldError>{errors.email?.message}</FieldError>
          <Button
            type='submit'
            isDisabled={isPending}
            variant='shadow'
            color='primary'
            isLoading={isPending}
            className='flex items-center justify-center gap-2 my-5 w-full'
          >
            Adicionar
          </Button>
        </form>
      </div>
    </div>
  )
}
