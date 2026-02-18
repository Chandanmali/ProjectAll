"use server"

import { redirect } from "next/navigation"
import { prisma } from "../../lib/prisma"

//update action
export const saveSnippet = async (id: number, code: string) => {
    await prisma.snippet.update({
        where: {
            id: id
        },

        data: {
            code: code
        }
    })
    redirect(`/snippet/new/${id}`)
}

//delete action
export const deleteSnippet = async(id: number) => {
    await prisma.snippet.delete({
        where: {
            id: id
        }
    })
    redirect("/")
}