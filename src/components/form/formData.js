import React from 'react';

export default function FormData({
  onSubmit,
  onValueTitle,
  onHandleTitleChange,
  onValueContent,
  onHandleContentChange,
  onButtonStatus,
}) {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <label htmlFor="newTitle">Title</label>
        <input
          type="text"
          id="newTitle"
          value={onValueTitle}
          onChange={onHandleTitleChange}
          className="w-full p-3 border-2 border-black rounded-lg"
          required
        />
        <label htmlFor="newContent">Content</label>
        <textarea
          id="newContent"
          value={onValueContent}
          onChange={onHandleContentChange}
          className="w-full p-3 border-2 border-black rounded-lg"
          required
        />
        <button
          type="submit"
          className="font-bold p-3 w-full bg-green-400 rounded-lg text-white hover:bg-green-600"
        >
          {onButtonStatus}
        </button>
      </form>
    </div>
  );
}
