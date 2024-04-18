'use client';
import { useState } from 'react';
import FormData from '@/components/form/formData';
import ListCard from '@/components/card/listCard';

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
      <FormData
        onSubmit={isUpdating ? handleUpdate : handlePost}
        onValueTitle={newTitle}
        onHandleTitleChange={handleTitleChange}
        onValueContent={newContent}
        onHandleContentChange={handleContentChange}
        onButtonStatus={isUpdating ? 'Update Data' : 'Post Data'}
      />
      <div className="my-10">
        {dataArray.map((item, index) => (
          <ListCard
            key={index}
            onQuery={dataArray[index]}
            onTitle={item.title}
            onItemContent={item.content}
            onPublished={item.published}
            onIndexChoosen={() => indexChoosen(index)}
            onCancelUpdate={handleCancelUpdate}
            onDeletePost={() => handleDeletePost(item.id)}
            onUpdate={isUpdating}
          />
        ))}
      </div>
    </div>
  );
}
