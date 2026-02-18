import React from 'react'
import { prisma } from '../../../../../lib/prisma'
import Link from 'next/link'
import { deleteSnippet } from '@/action'
import { notFound } from 'next/navigation'


async function EditPage({ params }: { params: Promise<{ id: string }> }) {

  const { id } = await params


  const snippet = await prisma.snippet.findUnique({
    where: {
      id: parseInt(id)
    }
  })
  //console.log(snippet)

  if(!snippet)
  {
    notFound()
  }


  const deleteSnippetAction = deleteSnippet.bind(null, parseInt(id))

  return (
    <div className='text-white'>
      <div>
        <div className='flex justify-end gap-10  pt-10 pr-20'>

          <Link href={`/snippet/new/${snippet?.id}/edit`}>
            <button className='text-white bg-green-500 px-8 py-2 cursor-pointer text-xl rounded-xl font-semibold shadow-2xl'>Edit</button>
          </Link>
          
          <form action={deleteSnippetAction}>
            <button type='submit' className='text-white bg-red-500 px-8 py-2 cursor-pointer text-xl rounded-xl font-semibold shadow-2xl'>Delete</button>
          </form>
          
        </div>

        <div className='mt-10 flex flex-col items-center gap-5'>
          <p className='text-3xl font-semibold italic'><span className=''>Title</span>: {snippet?.title}</p>

          <pre className='border w-[800px] px-5 mb-5 py-4  bg-slate-900 rounded-lg'>
            <code className='text-md text-green-400'>
              {snippet?.code}
            </code>
          </pre>

        </div>
      </div>
    </div>
  )
}

export default EditPage
