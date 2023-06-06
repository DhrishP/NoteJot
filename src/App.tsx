import {Navigate, Route,Routes} from 'react-router-dom'
import Home from './Pages/Home'
import NewNote from './Pages/NewNote'
import {UseLocalStorage} from './CustomHooks/UseLocalStorage'
import { LocalStorageNotes, NoteProps, Tag } from './Props/Notes_Tags'
import { useMemo } from 'react'
import { v4 as uuidV4 } from "uuid"
import {NoteLayout} from './Pages/NoteLayout'
import Note from './Components/Note'


function App() {
  const  SubmitForm = ({tags,...data}:NoteProps) =>{
      SetNewnote(prevval =>{
        return [...prevval,{...data,id:uuidV4(),tagIds:tags.map(tag => tag.id)}]
      })
  }

  const [Newnote,SetNewnote] = UseLocalStorage<LocalStorageNotes[]>("NOTES",[])
  const [Tags,SetTags] = UseLocalStorage<Tag[]>("Tags",[])

  const NotesAndTag = useMemo(()=>{
    return Newnote.map(note =>{
      return {...note,tags:Tags.filter(tag => note.tagIds.includes(tag.id))}
    })
  },[NewNote,Tags])

  
  
  const addtag = (tag:Tag) =>{
    SetTags(prev => [...prev,tag])
  }

  return (
    <>
   <Routes>
    <Route path='/' element={<Home Notes={NotesAndTag} tags={Tags}/>}/>
    <Route path='/new' element={<NewNote Submitform={SubmitForm} OnAddtag={addtag} Availabletags={Tags}/>}/>
    <Route path='*' element={<Navigate to={'/'}/>} />
    <Route path='/:id' element={<NoteLayout notes={NotesAndTag}/>}>
    <Route index element={<Note/>}/>
    <Route path='edit' element={<h1>Edit</h1>}/>
    </Route>


   </Routes>
    </>
  )
}

export default App
