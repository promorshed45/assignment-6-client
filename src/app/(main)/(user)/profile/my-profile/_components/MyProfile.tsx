// components/MyProfile.js

import { Card, Avatar, Button, CardBody } from '@nextui-org/react';

const MyProfile = () => {
  return (
    <div className="flex flex-col items-center p-4 bg-white/10 shadow-lg rounded-lg max-w-lg mx-auto">
      <Avatar
        size='lg'
        src={user.profilePicture}
        alt={user.name}
        className="mb-4 size-16"
      />
      <div className="flex space-x-8 mb-4">
        <div className="flex flex-col items-center">
          <span className="font-bold">{user.postsCount}</span>
          <span>Posts</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-bold">{user.followersCount} </span>
          <span>Followers</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-bold">{user.followingCount}</span>
          <span>Following</span>
        </div>
      </div>
      <Button color="primary">
        Edit Profile
      </Button>

      <div className="mt-4 w-full">
        <h2 className="text-lg font-semibold mb-2">Posts</h2>
        {user.posts.map((post, index) => (
          <Card key={index} className="mb-2">
            <CardBody>
              <p>{post.content}</p>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyProfile;

const user = {
    name: 'John Doe',
    profilePicture: 'https://example.com/profile.jpg',
    postsCount: 10,
    followersCount: 100,
    followingCount: 50,
    posts: [
      { content: 'This is my first post!' },
      { content: 'Hello world!' },
      { content: 'Learning Next.js is fun!' },
      // Add more posts as needed
    ],
  };