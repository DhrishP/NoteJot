import { FormEvent, useRef, useState} from 'react'
import CreatableReactSelect from 'react-select/creatable'
import { NoteProps, Tag } from '../Props/Notes_Tags'
import { v4 as uuidV4 } from "uuid"
import { useNavigate } from 'react-router-dom'

type NewNoteprops = {
    Submitform:(data:NoteProps) => void
    OnAddtag:(tag:Tag) => void
    Availabletags:Tag[]
}

type ReactSelectProps ={
    SetSelectedTags: React.Dispatch<React.SetStateAction<Tag[]>>
    SelectedTags:Tag[]
    Availabletags:Tag[]
    OnAddtag:(tag:Tag) =>void
}

const ReactSelect = ({SelectedTags,SetSelectedTags,Availabletags,OnAddtag}:ReactSelectProps) =>{
    return(
        <>
        <label  className="block mb-2  text-sm font-medium text-gray-900 ">Tags</label>
        <CreatableReactSelect  onCreateOption={label=>{const newtag = {id:uuidV4(),label};OnAddtag(newtag);SetSelectedTags(prev => [...prev,newtag])}} options={Availabletags.map(tag=>{return {value:tag.id,label:tag.label}})} className='w-[30rem]  text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500   font-mono  ' value={SelectedTags.map(tags => { return {label:tags.label,value:tags.id}} )} onChange={(tags => {SetSelectedTags(tags.map(tag => { return { label:tag.label , id:tag.value} }))  
        })} isMulti/>
        </>
    )
}


function NewNote({Submitform,OnAddtag,Availabletags}:NewNoteprops){
    const TitleRef = useRef<HTMLTextAreaElement>(null)
    const BodyRef = useRef<HTMLTextAreaElement>(null)
    const navigate = useNavigate()
    const [SelectedTags,SetSelectedTags] = useState<Tag[]>([])

    const handlechange = (e: FormEvent) =>{
            e.preventDefault()
            Submitform({
                title:TitleRef.current!.value,
                body:BodyRef.current!.value,
                tags:SelectedTags

            }
            )
            navigate('..')
            
          

    }
  return (
   <>
   <div className="h-screen w-screen">
    <h1 className="font-bold mt-10 ml-16 text-xl font-mono block mb-10 /">New Note</h1>
     <form action="" className="flex flex-col " onSubmit={(e)=>handlechange(e)}>
    <div className="flex  justify-evenly  items-center mx-44">
        <div>
    <label  className="block mb-2 text-sm font-medium text-gray-900 ">Title</label>
<textarea required style={{resize:"none"}}  ref={TitleRef}  rows={1} className=" p-2.5 w-[30rem]  text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500    font-mono " placeholder="Title"></textarea>
</div>
 <div>
    <ReactSelect SetSelectedTags={SetSelectedTags} OnAddtag={OnAddtag} Availabletags={Availabletags} SelectedTags={SelectedTags}/>
</div>
    

    </div>
   <div className="mx-44 mt-10 ">
    <label  className="block mb-2 text-sm font-medium text-gray-900 ">Body</label>
   
<textarea required ref={BodyRef}  rows={15} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500   " placeholder="Write your thoughts here..."></textarea>
</div>
<div className="flex mx-44  justify-end space-x-4 mt-6 ">
    <button className="px-4 py-2 font-mono hover:bg-blue-600 text-white  bg-blue-500 rounded-lg ">
        Save
    </button>
    <button className="px-4 hover:bg-gray-300 border border-black py-2 font-mono   bg-white rounded-lg ">
        Cancel
    </button>

</div>
</form>

   </div>
 
   </>
  )
}

export default NewNote