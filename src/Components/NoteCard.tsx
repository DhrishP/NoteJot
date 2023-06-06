import { Navigate, useNavigate } from "react-router-dom"
import { Tag } from "../Props/Notes_Tags"

type NoteCardProps ={
  title:string,
  id:string,
  tags:Tag[]

}

const NoteCard = ({title,tags,id}:NoteCardProps) => {
  const navigate = useNavigate()
  return (
    
    
     
    <div key={id} onClick={()=>{navigate(`/${id}`)}} className="w-[20rem] md:w-[30rem] mx-4 mb-5 font-label cursor-pointer rounded overflow-hidden border border-black hover:shadow-xl">

      <div className="px-4 py-4 flex items-center justify-center ">
        <div className="font-semibold  text-4xl mb-2 ">{title}</div>
  
      </div>
      <div className="px-4 py-4  flex justify-center mb-4">
        {
          tags.map(tag => {
            return (
              <>
               <span key={tag.id} className="inline-block   bg-blue-200 rounded-full px-6 py-1 font-bold text-md text-gray-700 mr-2">
         {tag.label}
        </span>
              </>
            )
          })
        }
       
      </div>
      </div>
   
  )
}

export default NoteCard