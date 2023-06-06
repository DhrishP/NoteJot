import { Link, useNavigate } from "react-router-dom"
import { LayoutContext } from "../Pages/NoteLayout"


const Note = () => {
    const note = LayoutContext()
    const navigate = useNavigate()
  return (
<div className="h-screen">
  <div className="w-screen flex justify-between mt-10">
    <div className="ml-4 flex flex-col">
      <span className="font-bold sm:text-3xl text-xl md:text-5xl font-pixel">{note.title}</span>
      <div className="mt-2 font-label font-bold text-md flex">
        {note.tags &&
          note.tags.map((tag) => {
            return (
              <>
                <span
                  key={note.id}
                  className="inline-block text-center bg-blue-400 rounded-full px-2 md:px-6 py-1 font-bold text-sm text-gray-700 mr-2"
                >
                  {tag.label}
                </span>
              </>
            );
          })}
      </div>
    </div>
    <div className="
    md:mr-8
    mr-2 space-x-1 md:space-x-3">
      <Link
        to="./edit"
        className="px-2 md:px-6 py-2 md:py-3 font-pixel text-lg font-semibold hover:bg-blue-600 text-white bg-blue-500 rounded-lg"
      >
        Edit
      </Link>
      <Link
        to="./edit"
        className="px-2 md:px-6 py-2 md:py-3 font-pixel text-lg hover:bg-red-600 text-white bg-red-500 rounded-lg"
      >
        Delete
      </Link>
      <Link
        to=".."
        className="px-2 md:px-6 py-2 md:py-3 hover:bg-gray-300 border border-black font-bold font-pixel text-lg bg-white rounded-lg"
      >
        Back
      </Link>
    </div>
  </div>
  <div className="max-w-screen mx-4 mt-10 font-mono text-md font-semibold">
    {note.body}
  </div>
</div>

  )
}

export default Note