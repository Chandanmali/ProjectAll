"use client"
import React, { useState } from 'react'
import { Editor } from '@monaco-editor/react'
import type { Snippet } from '@prisma/client'
import { saveSnippet } from '@/action'
import { redirect } from 'next/navigation'

function CodeEditor({ snippet }: { snippet: Snippet }) {

  const [code, setCode] = useState(snippet.code)

  
  const updateValueHandler = (value: string = "") => {
    setCode(value)
  }
  
  const saveSnippetAction = saveSnippet.bind(null, snippet.id, code)


  return (

    <form action={saveSnippetAction}>
      <div className='text-white relative top-13 text-end pr-20 '>
        <button type='submit' className='rounded-md bg-lime-500 px-5 text-2xl py-1 font-semibold cursor-pointer'>save</button>
      </div>

      {/* Monaco code editor */}
      <div className='px-20'>
        <div className='flex relative top-20 p-2 rounded-2xl border border-white '>
          <Editor
            height="70vh"
            theme='vs-dark'
            defaultLanguage="javascript"
            defaultValue={code}
            onChange={updateValueHandler}
          //onMount={handleEditorDidMount}
          />
         
        </div>
        

      </div>


    </form>
  )
}

export default CodeEditor
