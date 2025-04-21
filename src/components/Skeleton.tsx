import { Skeleton } from '@heroui/react'

export default function SkeletonComponent() {
  return (
    <div className='w-full flex items-center gap-3'>
      <div>
        <Skeleton className='flex rounded-full w-12 h-12' />
      </div>
      <div className='w-full flex flex-col gap-2'>
        <Skeleton className='h-3 sm:w-1/6 rounded-lg' />
        <Skeleton className='h-3 sm:w-3/12 rounded-lg' />
      </div>
    </div>
  )
}
