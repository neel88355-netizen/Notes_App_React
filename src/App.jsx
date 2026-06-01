import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
function App() {
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [task, setTask] = useState(
    JSON.parse(localStorage.getItem("task")) || [],
  );
  useEffect(() => {
    localStorage.setItem("task", JSON.stringify(task));
  }, [task]);
  const formSubmit = (e) => {
    e.preventDefault();
    setTask([...task, { title, description }]);
    setTitle("");
    setDescription("");
  };

  const deleteNote = (Id) => {
    let copyTask = [...task];
    copyTask.splice(Id, 1);
    setTask(copyTask);
  };

  return (
    <>
      <div className="h-screen lg:flex bg-black text-white">
        <form
          onSubmit={formSubmit}
          className="flex items-start lg:w-1/2 gap-4 flex-col p-10"
        >
          <h1 className="font-bold text-2xl mb-5">Add Notes</h1>
          <input
            type="text"
            placeholder="Enter Notes Heading"
            className="p-5 border-2 w-140 rounded outline-none px-5 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            type="text"
            placeholder="Write Details"
            className="p-5 border-2 w-140 h-30 rounded outline-none px-5 py-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button className="bg-white active:bg-gray-200 cursor-pointer w-140 text-black outline-none inline px-5 py-2 rounded">
            Add Notes
          </button>
        </form>
        <div className="p-10 lg:border-l-2 lg:w-1/2">
          <h1 className="font-bold text-2xl mb-5">Recent Notes</h1>
          <div className="flex items-start justify-start flex-wrap gap-8 overflow-auto h-full">
            {task.map((value, index) => {
              return (
                <div
                  className=" relative w-45 h-62 rounded-2xl p-4 bg-linear-to-br from-blue-300 to-purple-300 text-black"
                  key={index}
                >
                  <h1 className="leading-tight text-xl mt-5 font-bold">
                    {value.title}
                  </h1>
                  <p className="mt-2 leading-tight font-medium text-gray-500">
                    {value.description}
                  </p>

                  <button
                    className="absolute bottom-3 bg-red-500 px-12.5 text-white font-semibold py-1.5 rounded-md cursor-pointer hover:bg-red-600 transition duration-300"
                    onClick={() => deleteNote(index)}
                  >
                    Delete
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
