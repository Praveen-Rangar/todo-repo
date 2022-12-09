import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { RiDeleteBack2Fill } from "react-icons/ri";

const getLocalItems = () => {
  let list = localStorage.getItem("task");

  if (list) {
    return JSON.parse(list);
  } else {
    return [];
  }
};

const getLocalDoneList = () => {
  let listDone = localStorage.getItem("doneList");

  if (listDone) {
    return JSON.parse(listDone);
  } else {
    return [];
  }
};

const getLocalOngoingList = () => {
  let listOngoing = localStorage.getItem("ongoingList");

  if (listOngoing) {
    return JSON.parse(listOngoing);
  } else {
    return [];
  }
};

const Content = () => {
  const [showForm, setShowForm] = useState(false);
  const [text, setText] = useState("");
  const [task, setTask] = useState(getLocalItems());
  const [doneList, setDoneList] = useState(getLocalDoneList());
  const [ongoingList, setOngoingList] = useState(getLocalOngoingList());

  console.log("doneList", doneList);

  const handleForm = () => {
    setShowForm(true);
  };

  const handleCancleForm = () => {
    setShowForm(false);
  };

  const handleText = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setText("");
    setTask([...task, text]);
  };

  useEffect(() => {
    localStorage.setItem("task", JSON.stringify(task));
  }, [task]);

  useEffect(() => {
    localStorage.setItem("doneList", JSON.stringify(doneList));
  }, [doneList]);

  useEffect(() => {
    localStorage.setItem("ongoingList", JSON.stringify(ongoingList));
  }, [ongoingList]);

  const handleRemove = (i) => {
    const finalData = task.filter((element, index) => {
      return index !== i;
    });
    setTask(finalData);
  };

  const onHandleTodoChange = (i) => {
    setDoneList([...doneList, task[i]]);
    handleRemove(i);
  };

  const removeDoneList = (i) => {
    const finalData = doneList.filter((element, index) => {
      return index !== i;
    });
    setDoneList(finalData);
  };

  const onHandleDoneListChange = (i) => {
    setOngoingList([...task, doneList[i]]);
    removeDoneList(i);
  };

  const removeOngoingList = (i) => {
    const finalData = ongoingList.filter((element, index) => {
      return index !== i;
    });
    setOngoingList(finalData);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Things to get done</h1>
      <h3 className="mt-10 text-xl font-semibold">Things to do</h3>
      <div className="mt-3 ">
        {task.map((value, index) => {
          if (value === "") {
            return;
          }

          return (
            <div className="flex items-center space-x-2.5">
              <input
                onClick={() => {
                  onHandleTodoChange(index);
                }}
                type="checkbox"
              />
              <div className="text-base font-semibold text-gray-700">
                {value}
              </div>

              <RiDeleteBack2Fill
                onClick={() => {
                  handleRemove(index);
                }}
                className="text-2xl text-red-500 cursor-pointer"
              />
            </div>
          );
        })}
      </div>
      <button
        onClick={handleForm}
        className="flex items-center justify-center gap-1 px-5 py-2 mt-5 text-white bg-blue-500 rounded-full"
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
          showForm === false
            ? "hidden"
            : "p-6 mt-5 space-y-4 border border-gray-100 rounded-md shadow-sm"
        }
      >
        <h3 className="text-lg font-medium">Write your todo</h3>
        <input
          onChange={handleText}
          required
          type="text"
          placeholder="Write your todo here"
          className="p-3 border border-gray-300 rounded-md shadow-sm h-9 w-72 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
        <div>
          <button
            type="submit"
            className="font-medium px-4 py-1.5 text-white bg-blue-500 border border-blue-500 rounded-md"
          >
            Save
          </button>
          <button
            type="button"
            onClick={handleCancleForm}
            className="px-4 py-1.5 ml-3 font-medium border border-gray-300 rounded-md"
          >
            Cancel
          </button>
        </div>
      </form>
      <h3 className="mt-4 text-xl font-semibold">Things ongoing</h3>
      <div className="mt-3 animate-pulse">
        {doneList.map((value, index) => {
          if (value === "") {
            return;
          }
          return (
            <div className="flex items-center space-x-2.5">
              <input
                onClick={() => {
                  onHandleDoneListChange(index);
                }}
                checked
                type="checkbox"
              />
              <div className="text-base font-semibold text-gray-700">
                {value}
              </div>

              <RiDeleteBack2Fill
                onClick={() => {
                  removeDoneList(index);
                }}
                className="text-2xl text-red-500 cursor-pointer"
              />
            </div>
          );
        })}
      </div>
      <h3 className="mt-4 text-xl font-semibold">Things done</h3>
      <div className="mt-3 ">
        {ongoingList.map((value, index) => {
          if (value === "") {
            return;
          }
          return (
            <div className="flex items-center space-x-2.5">
              <div className="text-base font-semibold text-gray-700">
                {value}
              </div>

              <RiDeleteBack2Fill
                onClick={() => {
                  removeOngoingList(index);
                }}
                className="text-2xl text-red-500 cursor-pointer"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Content;
