import { ExclamationCircleIcon } from '@heroicons/react/24/solid'

export default function FieldError({
  children,
}: { children: React.ReactNode }) {
  return (
    <div className='text-red-500 text-sm mb-5 mt-2 flex items-center gap-2'>
      {children && (
        <>
          <ExclamationCircleIcon className='size-5' />
          {children}
        </>
      )}
    </div>
  )
}
