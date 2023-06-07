import {Navigate, Route,Routes} from 'react-router-dom'
import Home from './Pages/Home'
import NewNote from './Pages/NewNote'
import {UseLocalStorage} from './CustomHooks/UseLocalStorage'
import { LocalStorageNotes, Note, NoteProps, Tag } from './Props/Notes_Tags'
import { useMemo } from 'react'
import { v4 as uuidV4 } from "uuid"
import {NoteLayout} from './Pages/NoteLayout'

import EditNote from './Components/EditNote'


function App() {
  const [Newnotes,SetNewnote] = UseLocalStorage<LocalStorageNotes[]>("NOTES",[])
  const [Tags,SetTags] = UseLocalStorage<Tag[]>("Tags",[])

  const  SubmitForm = ({tags,...data}:NoteProps) =>{
      SetNewnote(prevval =>{
        return [...prevval,{...data,id:uuidV4(),tagIds:tags.map(tag => tag.id)}]
      })
  }

  const DeleteNote = (id:string) =>{
    SetNewnote(PrevNote =>{
      return PrevNote.filter(note => note.id != id)
    })
  }

  const OnUpdateTag = (id:string,label:string) => {
        Tags.map(Tag =>{
          if (Tag.id ==  id) {
            return {...Tag,label:label}
          }else{
            return Tag
          }
        })
  }

  const OnUpdateForm = (id:string,{tags,...data}:NoteProps) =>{
    SetNewnote(prevNotes =>{
      return prevNotes.map(note =>{
        if(note.id === id){
          return {...note,...data,tagIds:tags.map(tag => tag.id)}
        }else{
          return note
        }
      })
    })
  }

  const Deletetag = (id:string) =>{
     SetTags(prevval =>{
     return prevval.filter(tag => tag.id!=id)
     })
  }

 

  const NotesAndTag = useMemo(()=>{
    return Newnotes.map(note =>{
      return {...note,tags:Tags.filter(tag => note.tagIds.includes(tag.id))}
    })
  },[Newnotes,Tags])

  
  
  const addtag = (tag:Tag) =>{
    SetTags(prev => [...prev,tag])
  }

  return (
    <>
   <Routes>
    <Route path='/' element={<Home Notes={NotesAndTag}  Deletetag={Deletetag} tags={Tags}/>}/>
    <Route path='/new' element={<NewNote Submitform={SubmitForm} OnAddtag={addtag} Availabletags={Tags}/>}/>
    <Route path='*' element={<Navigate to={'/'}/>} />
    <Route path='/:id' element={<NoteLayout notes={NotesAndTag}/>}>
    <Route index element={<Note deletenote={DeleteNote}/>}/>
    <Route path='edit' element={<EditNote OnUpdateTag={}/>}/>
    </Route>


   </Routes>
    </>
  )
}

export default App
