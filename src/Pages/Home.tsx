import NoteList from "../Components/NoteList"
import { Note, Tag } from "../Props/Notes_Tags"

type HomeProps ={
  Notes:Note[]
  tags:Tag[]
}
function Home({Notes,tags}:HomeProps) {
  return (
    <>
    <NoteList Availabletags={tags} Notes={Notes}/>
    </>
  )
}

export default Home