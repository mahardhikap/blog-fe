import React from 'react';
import Link from 'next/link';

export default function ListCard({
  onQuery,
  onItemContent,
  onTitle,
  onPublished,
  onIndexChoosen,
  onCancelUpdate,
  onDeletePost,
  onUpdate,
}) {
  return (
    <div>
      <Link href={{ pathname: `/detail`, query: onQuery }}>
        <div className="p-2 black rounded-lg shadow-md border cursor-pointer">
          <div className="font-bold text-xl truncate">{onTitle}</div>
          <div className="font-medium break-all">
            {onItemContent.slice(0, 100)}
            {onItemContent.length > 50 ? '...' : ''}
            <p className="text-blue-400 hover:text-blue-600">
              {onItemContent.length > 50 ? 'read more' : ''}
            </p>
          </div>
          <div className="text-sm text-right">{onPublished}</div>
        </div>
      </Link>
      <div className="mt-2 mb-5 flex gap-4">
        <button
          onClick={onIndexChoosen}
          className="p-2 bg-yellow-500 rounded text-white font-medium"
        >
          Update
        </button>
        {onUpdate && (
          <button
            onClick={onCancelUpdate}
            className="p-2 bg-blue-500 rounded text-white font-medium"
          >
            Cancel Update
          </button>
        )}
        {!onUpdate && (
          <button
            onClick={onDeletePost}
            className="p-2 bg-red-500 rounded text-white font-medium"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
