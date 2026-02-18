import React from 'react'
import CodeEditor from '@/app/components/codeEditor/page'
import { prisma } from '../../../../../../lib/prisma'

async function updatePage({params} : {params: Promise<{id: string}>}) {

  const {id} = await params

  const snippet = await prisma.snippet.findUnique({
    where: {
      id: parseInt(id)
    }
  })

  return (
    <CodeEditor snippet = {snippet}/>
  )
}

export default updatePage
