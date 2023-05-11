import { useState, useEffect } from "react";
import { getApiUrl } from "../util/util";

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
  const [comments, setComments] = useState<Array<Comment>>([]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const inputValue = event.target[0].value;
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    try {
      const res = await fetch(getApiUrl("comments"), {
        method: "POST",
        body: JSON.stringify({ id: userId, comment: inputValue }),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      console.log(data);
      setComments([data, ...comments]);
    } catch (err) {
      console.log(err);
    }
  };
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
          required
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
            <div key={comment._id}>
              <div>{comment.user.username}</div>
              <p>{comment.comment}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No comments yet</p>
      )}
    </div>
  );
}

export default PetCommunity;
