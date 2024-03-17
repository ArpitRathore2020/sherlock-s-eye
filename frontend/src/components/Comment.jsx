import React from "react";
import { formatDistanceToNow } from "date-fns";

function Comment({ content, author, timestamp }) {
  const authorName =
    author && author.name ? author.name : localStorage.getItem("name");
  const commentTime = formatDistanceToNow(new Date(timestamp), {
    addSuffix: true,
  });

  return (
    <div className=" p-2 mt-2 bg-gray-300 dark:bg-gray-800 rounded-lg text-gray-600 dark:text-white">
      <div className="text-lg font-bold">
        {authorName}
        <span className="ml-2 text-sm font-normal">- {commentTime}</span>
      </div>
      <div>{content}</div>
    </div>
  );
}

export default Comment;
