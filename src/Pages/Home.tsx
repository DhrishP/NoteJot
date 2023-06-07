import NoteList from "../Components/NoteList"
import { Note, Tag } from "../Props/Notes_Tags"

type HomeProps ={
  Notes:Note[]
  tags:Tag[]
  Deletetag:(id:string) => void
}
function Home({Notes,tags,Deletetag}:HomeProps) {
  return (
    <>
    <NoteList Deletetag={Deletetag} Availabletags={tags} Notes={Notes}/>
    </>
  )
}

export default Home