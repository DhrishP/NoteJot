import { Navigate, Outlet, useOutletContext, useParams } from "react-router-dom"
import { Note } from "../Props/Notes_Tags"

type NoteLayoutProps ={
    notes:Note[]
}

export const NoteLayout = ({notes}:NoteLayoutProps) => {
    const {id }= useParams<string>()
    const isPresent = notes.find(note =>{
        return (note.id === id)
    })

    if (isPresent === null) {
        <Navigate to={'/'} /> 
    }

  return (
    <Outlet context={isPresent} />
  )
}


export function LayoutContext(){
    return useOutletContext<Note>() // passes the context 
}