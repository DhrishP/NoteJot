import { FormEvent, useRef, useState} from 'react'
import CreatableReactSelect from 'react-select/creatable'
import { NoteProps, Tag } from '../Props/Notes_Tags'
import { v4 as uuidV4 } from "uuid"
import { useNavigate } from 'react-router-dom'

type NewNoteprops = {
   OnUpdateTag:(data:NoteProps) => void
    OnUpdatetag:(tag:Tag) => void
    Availabletags:Tag[]
}

type ReactSelectProps ={
    SetSelectedTags: React.Dispatch<React.SetStateAction<Tag[]>>
    SelectedTags:Tag[]
    Availabletags:Tag[]
    OnUpdatetag:(tag:Tag) =>void
}

const ReactSelect = ({ SelectedTags, SetSelectedTags, Availabletags, OnUpdatetag }: ReactSelectProps) => {
    return (
      <>
        <label className="block mb-2 text-lg font-label font-medium text-gray-900">Tags</label>
        <CreatableReactSelect
          onCreateOption={(label) => {
            const newtag = { id: uuidV4(), label };
            OnAddtag(newtag);
            SetSelectedTags((prev) => [...prev, newtag]);
          }}
          options={Availabletags.map((tag) => {
            return { value: tag.id, label: tag.label };
          })}
          className="w-[21.7rem] sm:w-[25rem] md:w-[45rem] md:p-1 shadow-md text-gray-900 bg-gray-50 rounded-lg text-md font-light border border-gray-300 focus:ring-blue-500 focus:border-blue-500 placeholder:font-light font-label"
          value={SelectedTags.map((tags) => {
            return { label: tags.label, value: tags.id };
          })}
          onChange={(tags) => {
            SetSelectedTags(
              tags.map((tag) => {
                return { label: tag.label, id: tag.value };
              })
            );
          }}
          isMulti
        />
      </>
    );
  };
  
  function EditNote({ OnUpdateform, OnUpdateTag, Availabletags }: NewNoteprops) {
    const TitleRef = useRef<HTMLTextAreaElement>(null);
    const BodyRef = useRef<HTMLTextAreaElement>(null);
    const navigate = useNavigate();
    const [SelectedTags, SetSelectedTags] = useState<Tag[]>([]);
  
    const handleChange = (e: FormEvent) => {
      e.preventDefault();
      OnUpdateTag({
        title: TitleRef.current!.value,
        body: BodyRef.current!.value,
        tags: SelectedTags,
      });
      navigate("..");
    };
  
    return (
      <>
        <div className="h-screen w-screen">
          <h1 className="mt-10 ml-16 text-3xl font-semibold font-pixel block mb-10">New Note</h1>
          <form action="" className="flex flex-col" onSubmit={(e) => handleChange(e)}>
            <div className="flex flex-col mx-4 md:flex-row md:justify-between">
              <div className="w-full md:w-1/2 md:mr-4">
                <label className="block mb-2 text-lg font-label text-gray-900">Title</label>
                <textarea
                  required
                  style={{ resize: "none" }}
                  ref={TitleRef}
                  rows={1}
                  className="p-2.5 w-full text-lg placeholder:text-md text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 font-pixel"
                  placeholder="Title"
                ></textarea>
              </div>
              <div className="w-full md:w-1/2 mt-4 md:mt-0">
                <ReactSelect
                  SetSelectedTags={SetSelectedTags}
                  OnUpdatetag={OnUpdateTag}
                  Availabletags={Availabletags}
                  SelectedTags={SelectedTags}
                />
              </div>
            </div>
            <div className="mx-4 mt-10">
              <label className="block mb-2 text-lg font-label text-gray-900">Body</label>
              <textarea
                required
                ref={BodyRef}
                rows={15}
                className="font-pixel text-lg block p-2.5 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Write your thoughts here..."
              ></textarea>
            </div>
            <div className="flex md:mx-6 mx-4 mt-3 py-4 md:py-0 md:mt-6 justify-end space-x-4 ">
              <button className="px-3 md:px-4   py-2 font-mono hover:bg-blue-600 text-white bg-blue-500 rounded-lg">Save</button>
              <button onClick={()=>{navigate('..')}} className="px-3 md:px-4 hover:bg-gray-300 border border-black py-2 font-mono bg-white rounded-lg">Cancel</button>
            </div>
          </form>
        </div>
      </>
    );
  }
  

export default EditNote
