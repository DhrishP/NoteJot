import {Navigate, Route,Routes} from 'react-router-dom'
import Home from './Pages/Home'
import NewNote from './Pages/NewNote'
import {UseLocalStorage} from './CustomHooks/UseLocalStorage'
import { LocalStorageNotes, NoteProps, Tag } from './Props/Notes_Tags'
import { useMemo } from 'react'
import { v4 as uuidV4 } from "uuid"


function App() {
  const  SubmitForm = ({tags,...data}:NoteProps) =>{
      SetNewnote(prevval =>{
        return [...prevval,{...data,id:uuidV4(),tagIds:tags.map(tag => tag.id)}]
      })
  }

  const [Newnote,SetNewnote] = UseLocalStorage<LocalStorageNotes[]>("NOTES",[])
  const [Tags,SetTags] = UseLocalStorage<Tag[]>("Tags",[])

  const NoteAndTag = useMemo(()=>{
    return Newnote.map(note =>{
      return {...note,tags:Tags.filter(tag => note.id.includes(tag.id))}
    })
  },[NewNote,Tags])

  const addtag = (tag:Tag) =>{
    SetTags(prev => [...prev,tag])
  }

  return (
    <>
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/new' element={<NewNote Submitform={SubmitForm} OnAddtag={addtag} Availabletags={Tags}/>}/>
    <Route path='*' element={<Navigate to={'/'}/>} />
    <Route path='/:id'>
    <Route index element={<h1>show</h1>}/>
    <Route path='edit' element={<h1>Edit</h1>}/>
    </Route>


   </Routes>
    </>
  )
}

export default App
