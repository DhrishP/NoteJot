
import {Note, Tag} from "../Props/Notes_Tags";
import { useMemo, useState } from "react";
import CreatableReactSelect from 'react-select/creatable'
import { Link } from "react-router-dom";
import NoteCard from "./NoteCard";
import EditModal from "./EditModal";

type ReactSelectProps ={
  SetSelectedTags: React.Dispatch<React.SetStateAction<Tag[]>>
  SelectedTags:Tag[]
  Availabletags:Tag[]

  
}
type NoteListProps ={
  Notes:Note[]
  Availabletags:Tag[]
  Deletetag:(id:string) => void
  
}


const ReactSelect = ({ SelectedTags, SetSelectedTags, Availabletags   }: ReactSelectProps) => {
  return (
    <>
      <label className="block mb-2 text-lg font-label font-medium text-gray-900">Tags</label>
      <CreatableReactSelect
        options={Availabletags.map((tag) => {
          return { value: tag.id, label: tag.label };
        })}
        className="w-[20rem] md:w-[30rem] text-gray-900 bg-gray-50 rounded-lg text-md font-light border border-gray-300 focus:ring-blue-500 focus:border-blue-500 placeholder:font-light font-label"
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

function NoteList({ Notes, Availabletags ,Deletetag}: NoteListProps) {
  const [Title, Settitle] = useState<string>("");
  const [SelectedTags, SetSelectedTags] = useState<Tag[]>([]);
  const FilterNotes = useMemo(() => {
    return Notes.filter((note) => {
      return (
        (Title === "" || note.title.toLowerCase().includes(Title.toLowerCase())) &&
        (SelectedTags.length === 0 || SelectedTags.every((tag) => note.tags.some((notetag) => notetag.id === tag.id)))
      );
    });
  }, [Title, SelectedTags, Notes]);

  return (
    <>
      <div className="min-h-screen w-full">
        <div className="flex w-full justify-between">
          <h1 className="mt-10 ml-4 text-3xl font-semibold font-pixel mb-10">NoteList</h1>
          <div className="self-center mr-1  md:mr-4 space-x-2">
            <Link
              to="./new"
              className="px-4 py-3 font-mono hover:bg-blue-600 text-white bg-blue-500 rounded-lg"
            >
              Create
            </Link>
          
            <EditModal tags={Availabletags}  Deletetag={Deletetag}/>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col md:flex-row justify-evenly items-center mx-4 md:mx-44">
            <div className="mt-4 md:mt-0">
              <label className="block mb-2 text-lg font-label text-gray-900">Title</label>
              <input
                onChange={(e) => {
                  Settitle(e.target.value);
                }}
                type="text"
                className="p-2.5 w-[20rem] md:w-[30rem] text-lg placeholder:text-md text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 font-pixel"
                placeholder="Title"
              />
            </div>
            <div className="mt-4 md:mt-0">
              <ReactSelect
                SetSelectedTags={SetSelectedTags}
                Availabletags={Availabletags}
                SelectedTags={SelectedTags}
              />
            </div>
          </div>
          <div className="mx-4 md:mx-44 mt-10 justify-evenly items-center flex flex-wrap">
            {FilterNotes.map((note) => {
              return (
                <div key={note.id}>
                  <NoteCard title={note.title} id={note.id} tags={note.tags} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
 
   </>
  )
}

export default NoteList