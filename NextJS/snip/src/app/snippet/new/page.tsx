
import { notFound, redirect } from 'next/navigation';
import React from 'react';
import { prisma } from '../../../../lib/prisma';

function NewSnipp() {

  const createSnippet = async(formData: FormData) => {

    "use server"// use server directives
    const title = formData.get("title") as string;
    const code = formData.get("code") as string;

    

    const snippet = await prisma.snippet.create({
      data: {
        title,
        code
      }
    })

    if(!snippet)
    {
      notFound()
    }
    console.log(snippet)
    redirect("/")

  }
  
  return (
    <form action={createSnippet}>
      <div className='min-h-screen flex justify-center'>
        <div className='flex flex-col items-center gap-13 mt-30  text-white'>

          <div className='flex justify-center gap-5'> 
            <label className='text-3xl font-semibold' htmlFor="">Title: </label>
            <input
              className='border border-slate-500 px-5 py-2 rounded-lg w-[600px]' type="text"
              name='title'
              placeholder='Enter your title'
            />
          </div>

          <div className='flex justify-center gap-5'>
            <label className='text-3xl font-semibold' htmlFor="">Code: </label>
            <textarea
              className='border border-slate-500 px-5 py-4 rounded-lg w-[600px]' name="code" id="code"
              placeholder='Enter the code'>
            </textarea>
          </div>

          <div className='flex flex-col gap-5  text-2xl font-semibold ' >
            <button className='bg-slate-800 w-[700px] text-center rounded-lg py-2 cursor-pointer
            '>submit</button>
            <button className='bg-slate-800 w-[700px] text-center rounded-lg py-2 cursor-pointer'>Home</button>
          </div>
          
        </div>
      </div>
    </form>
  )
}

export default NewSnipp
