import React, { useState } from "react";
import { Delete } from "@material-ui/icons";
import { useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";

function getLocalItems() {
  const list = localStorage.getItem("task");

  if (list) {
    return JSON.parse(list);
  } else {
    return [];
  }
}

function Content() {
  const [text, setText] = useState("");
  const [task, setTask] = useState([]);
  const [sahi, setSahi] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [doneList, setDoneList] = useState([]);

  function handleText(event) {
    setText(event.target.value);

    setSahi(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setTask([...task, text]);
    setSahi(true);
  }

  function removeTask(a) {
    const finalData = task.filter((element, index) => {
      return index !== a;
    });

    setTask(finalData);
  }

  useEffect(() => {
    localStorage.setItem("task", JSON.stringify(task));
  }, [task]);

  function handleForm() {
    setShowForm(true);
  }

  function handleFormOff() {
    setShowForm(false);
  }

  const onHandleTodoChange = (index) => {
    doneList.push(task[index]);
    removeTask(index);
  };

  function removeDoneList(i) {
    const finalData = doneList.filter((element, index) => {
      return index !== i;
    });

    setDoneList(finalData);
  }

  const handleDoneListChange = (index) => {
    task.push(doneList[index]);
    removeDoneList(index);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Things to get done</h1>
      <h3 className="mt-10 text-xl font-semibold">Things to do</h3>
      <div className="mt-3 ">
        {task.map((value, index) => {
          if (value === "") {
            setSahi(false);
          }
          return (
            <div className="flex items-center space-x-2.5">
              <input
                type="checkbox"
                onClick={() => onHandleTodoChange(index)}
              />
              <div className="text-base font-semibold text-gray-700">
                {value}
              </div>

              <Delete
                onClick={() => removeTask(index)}
                className="text-5xl text-red-500 cursor-pointer"
              />
            </div>
          );
        })}
      </div>
      <button
        className="flex items-center justify-center gap-1 px-5 py-2 mt-5 text-white bg-blue-500 rounded-full"
        onClick={handleForm}
      >
        {" "}
        <span>
          {" "}
          <AiOutlinePlus />
        </span>
        Add a todo{" "}
      </button>{" "}
      <form
        onSubmit={handleSubmit}
        className={
          showForm == false
            ? "hidden"
            : "p-6 mt-5 space-y-4 border border-gray-100 rounded-md shadow-sm"
        }
      >
        <h3 className="text-lg font-medium">Write your todo</h3>
        <input
          required
          onChange={handleText}
          type="text"
          placeholder="Write your todo here"
          className="p-3 border border-gray-300 rounded-md shadow-sm h-9 w-72 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
        <div>
          <button
            disabled={sahi}
            type="submit"
            className="font-medium px-4 py-1.5 text-white bg-blue-500 border border-blue-500 rounded-md"
          >
            Save
          </button>
          <button
            onClick={handleFormOff}
            type="button"
            className="px-4 py-1.5 ml-3 font-medium border border-gray-300 rounded-md"
          >
            Cancel
          </button>
        </div>
      </form>
      <h3 className="mt-4 text-xl font-semibold">Things done</h3>
      <div className="mt-3 ">
        {doneList.map((value, index) => {
          return (
            <div className="flex items-center space-x-2.5">
              <input
                checked={true}
                onClick={() => handleDoneListChange(index)}
                type="checkbox"
              />
              <div className="text-base font-semibold text-gray-700">
                {value}
              </div>

              <Delete
                onClick={() => removeDoneList(index)}
                className="text-5xl text-red-500 cursor-pointer"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Content;
