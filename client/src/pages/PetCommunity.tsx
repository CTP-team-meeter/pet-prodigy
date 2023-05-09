import { useState, useEffect } from "react";
import { getApiUrl } from "../util/util";
import { ftruncate } from "fs";

type Comment = {
  _id: string;
  comment: string;
  replies: Array<string>;
  user: {
    username: string;
    _id: string;
  };
};

function PetCommunity() {
  const [comments, setComments] = useState<Array<Comment>>([]); //should be typed appropriately

  const handleSubmit = (event: any) => {
    // event.preventDefault();
    // const data = new FormData(event.target);
    // const comment = data.get("comment");
    // setComments([...comments, comment]);
  };
  const getAllComments = async () => {
    const res = await fetch(getApiUrl("comments"));
    const data = await res.json();
    setComments(data);
    return;
  };

  useEffect(() => {
    const fetchedComments = getAllComments();
  }, []);

  return (
    <div>
      <h1>Pet Community</h1>
      <form method="post" onSubmit={handleSubmit}>
        <br />
        <textarea
          id="comment"
          name="comment"
          rows={4}
          cols={50}
          placeholder="Write a comment...."
        />
        <br />
        <input
          className="bg-secondary border-2 rounded-md cursor-pointer p-2"
          type="submit"
          value="Submit"
        />
      </form>

      <br />
      <br />

      {comments.length > 0 ? (
        <div>
          <h2>Comments</h2>
          {comments.map((comment: Comment) => (
            <>
              <div>{comment.user.username}</div>
              <p key={comment._id}>{comment.comment}</p>
            </>
          ))}
        </div>
      ) : (
        <p>No comments yet</p>
      )}
    </div>
  );
}

export default PetCommunity;
