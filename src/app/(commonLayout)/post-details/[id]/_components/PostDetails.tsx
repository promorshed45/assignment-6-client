'use client'
import { Button } from '@nextui-org/button';
import { Card, CardBody } from '@nextui-org/card';
import { Input } from '@nextui-org/input';
import React, { useState } from 'react';

const PostDetails = ({ post }) => {
  const [comments, setComments] = useState(post.comments || []);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (newComment.trim()) {
      const updatedComments = [...comments, { id: comments.length + 1, text: newComment }];
      setComments(updatedComments);
      setNewComment('');
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <Card className="w-full max-w-4xl shadow-lg mb-6">
        <CardBody>
          <h2 className="mb-4">{post.title}</h2>
          <p className="text-gray-500 mb-4">{post.date}</p>
          <p>{post.content}</p>
          <div className="flex justify-between mt-4">
            <p>Upvotes: {post.upvotes}</p>
            <Button color="primary" onClick={() => alert('Upvoted!')}>Upvote</Button>
          </div>
        </CardBody>
      </Card>

      <Card className="w-full max-w-4xl shadow-lg mb-6">
        <CardBody>
          <h4 className="mb-4">Comments</h4>
          <div className="flex flex-col space-y-2 mb-4">
            {comments.map(comment => (
              <p key={comment.id} className="p-2 bg-gray-200 rounded">
                {comment.text}
              </p>
            ))}
          </div>
          <Input 
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Button className="mt-4" onClick={handleAddComment}>
            Submit Comment
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default PostDetails;
