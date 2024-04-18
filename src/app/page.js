'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [dataArray, setDataArray] = useState([
    {
      id: 1,
      title: 'Title 1',
      content:
        ' Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque quisquam rerum aperiam et neque temporibus saepe maxime nulla. Aperiam, aliquid distinctio? Iure soluta ipsa magnam sit dolore molestiae velit necessitatibus.',
      published: '17/4/2024',
    },
    {
      id: 2,
      title: 'Title 2',
      content:
        ' Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque quisquam rerum aperiam et neque temporibus saepe maxime nulla. Aperiam, aliquid distinctio? Iure soluta ipsa magnam sit dolore molestiae velit necessitatibus.',
      published: '18/4/2024',
    },
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [indexToUpdate, setIndexToUpdate] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setNewContent(event.target.value);
  };

  const indexChoosen = (id) => {
    setIndexToUpdate(id);
    setNewTitle(dataArray[id].title);
    setNewContent(dataArray[id].content);
    setIsUpdating(true);
  };

  const handleCancelUpdate = () => {
    setIsUpdating(false);
    setIndexToUpdate(null);
    setNewTitle('');
    setNewContent('');
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    const newDataArray = [...dataArray];
    if (
      indexToUpdate !== null &&
      indexToUpdate >= 0 &&
      indexToUpdate < newDataArray.length
    ) {
      newDataArray[indexToUpdate].title = newTitle;
      newDataArray[indexToUpdate].content = newContent;
      setDataArray(newDataArray);
      setNewTitle('');
      setNewContent('');
      setIndexToUpdate(null);
      setIsUpdating(false);
    } else {
      console.error('Invalid index!');
    }
  };

  const handlePost = (event) => {
    event.preventDefault();
    const newDataArray = [...dataArray];
    const publishDate = new Date().getDate();
    const publishMonth = new Date().getMonth() + 1;
    const publishYear = new Date().getFullYear();
    const publishSaveDate =
      publishDate + '/' + publishMonth + '/' + publishYear;
    const newId = dataArray.length + 1;
    newDataArray.push({
      id: newId,
      title: newTitle,
      content: newContent,
      published: publishSaveDate,
    });
    setDataArray(newDataArray);
    setNewTitle('');
    setNewContent('');
  };

  const handleDeletePost = (id) => {
    const newDataArray = dataArray.filter((item) => item.id !== id);
    setDataArray(newDataArray);
  };

  return (
    <div className="container mx-auto w-11/12 sm:w-1/2">
      <h2 className="text-center font-bold">
        {isUpdating ? 'Update Data' : 'Post Data'}
      </h2>
      <form onSubmit={isUpdating ? handleUpdate : handlePost}>
        <label htmlFor="newTitle">Title</label>
        <input
          type="text"
          id="newTitle"
          value={newTitle}
          onChange={handleTitleChange}
          className="w-full p-3 border-2 border-black rounded-lg"
          required
        />
        <label htmlFor="newContent">Content</label>
        <textarea
          id="newContent"
          value={newContent}
          onChange={handleContentChange}
          className="w-full p-3 border-2 border-black rounded-lg"
          required
        />
        <button
          type="submit"
          className="font-bold p-3 w-full bg-green-400 rounded-lg text-white hover:bg-green-600"
        >
          {isUpdating ? 'Update Data' : 'Post Data'}
        </button>
      </form>
      <div className="my-10">
        {dataArray.map((item, index) => (
          <div key={index}>
            <Link href={{ pathname: `/detail`, query: dataArray[index] }}>
              <div className="p-2 black rounded-lg shadow-md border cursor-pointer">
                <div className="font-bold text-xl truncate">{item.title}</div>
                <div className="font-medium break-all">
                  {item.content.slice(0, 100)}
                  {item.content.length > 50 ? '...' : ''}
                  <p className="text-blue-400 hover:text-blue-600">
                    {item.content.length > 50 ? 'read more' : ''}
                  </p>
                </div>
                <div className="text-sm text-right">{item.published}</div>
              </div>
            </Link>
            <div className="mt-2 mb-5 flex gap-4">
              <button
                onClick={() => indexChoosen(index)}
                className="p-2 bg-yellow-500 rounded text-white font-medium"
              >
                Update
              </button>
              {isUpdating && (
                <button
                  onClick={handleCancelUpdate}
                  className="p-2 bg-blue-500 rounded text-white font-medium"
                >
                  Cancel Update
                </button>
              )}
              {!isUpdating && (
                <button
                  onClick={() => handleDeletePost(item.id)}
                  className="p-2 bg-red-500 rounded text-white font-medium"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
