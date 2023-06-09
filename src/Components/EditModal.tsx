import { useState } from "react";
import { Tag } from "../Props/Notes_Tags";


type Editmodalprops ={
    tags:Tag[]
    Deletetag:(id:string) => void
  
}

const EditModal = ({tags,Deletetag}:Editmodalprops) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleModalToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        className="px-4 py-2 transition ease-in-out duration-150 hover:bg-gray-300 border border-black font-mono bg-white rounded-lg"
        type="button"
        onClick={handleModalToggle}
      >
        Edit tags
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
          <div className="relative  bg-white rounded-lg p-8">
          <div className="flex flex-row items-center justify-between"><h2 className="text-2xl font-bold mb-4 font-pixel">Edit tags</h2> 
          {/* <div  className="text-2xl font-bold font-label self-start cursor-pointer mb-6">+</div> */}
          </div>
       
            {
                tags.map((tag)=>{
                    return(
                        <>
                        <div onClick={()=>{Deletetag(tag.id)}} key={tag.id} className="w-full h-10 mb-2 px-16 bg-gray-200 rounded-md shadow-sm flex items-center justify-between hover:bg-red-500 transition ease-in cursor-pointer">
  <p className="text-gray-600 text-lg font-label  ">{tag.label}</p>
 
</div></>
                    )
                })
            }

            <button
              className="mt-4 px-4 py-2 bg-white hover:bg-gray-100 transition ease-in border border-black text-gray-700 rounded-lg"
              onClick={handleModalToggle}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default EditModal;
