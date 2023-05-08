import { useState } from 'react';

function PetCommunity() {
  const [comments, setComments] = useState([]) as any;

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const comment = data.get('comment');
    setComments([...comments, comment]);
  };

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
          {comments.map((comment: any, index: any) => (
            <p key={index}>{comment}</p>
          ))}
        </div>
      ) : (
        <p>No comments yet</p>
      )}
    </div>
  );
}

export default PetCommunity;
