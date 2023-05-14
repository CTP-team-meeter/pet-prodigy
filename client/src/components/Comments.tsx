import { useState, useEffect } from "react";
import { getApiUrl } from "../util/util";
import { Comment } from "../types/comment";

type CommentsProps = {
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  comments: Comment[];
};

const Comments = ({ comments, setComments }: CommentsProps) => {
  const getAllComments = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(getApiUrl("comments"), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setComments(data);
    return;
  };
  useEffect(() => {
    const fetchedComments = getAllComments();
  }, []);

  return (
    <>
      {comments.length > 0 ? (
        <div>
          <h2>Comments</h2>
          {comments.map((comment: Comment) => (
            <div key={comment._id}>
              <div className="flex w-80 mx-auto justify-start">
                <h2 style={{ fontSize: "1.5rem" }} className="">
                  {comment.user.username}:
                </h2>

                <p>&nbsp; {comment.comment}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No comments yet</p>
      )}
    </>
  );
};

export default Comments;
