'use client';
import { Card, Button, CardBody } from '@nextui-org/react';

const UserOverView = () => {
  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <Card className="w-full max-w-4xl shadow-lg">
        <CardBody>
          <h2 className="text-center mb-4">
            Welcome, {user.username}!
          </h2>

          <div className="flex justify-around mb-8">
            <div className="text-center">
              <h4>Total Posts</h4>
              <p>{user.totalPosts}</p>
            </div>
            <div className="text-center">
              <h4>Followers</h4>
              <p>{user.followers}</p>
            </div>
            <div className="text-center">
              <h4>Following</h4>
              <p>{user.following}</p>
            </div>
          </div>

          <h4 className="mt-4 mb-2">Your Posts</h4>
          <div className="flex flex-col space-y-4 mb-8">
            {user.posts.map((post) => (
              <Card key={post.id} className="shadow-sm">
                <CardBody>
                  <p className="font-semibold">{post.title}</p>
                  <p className="text-gray-500">{post.date}</p>
                  <p>{post.snippet}</p>
                </CardBody>
              </Card>
            ))}
          </div>
          <Button color="primary" className="mb-4">
            View All Posts
          </Button>

          <h4 className="mt-4 mb-2">Your Followers</h4>
          <div className="flex flex-col space-y-2 mb-8">
            {user.followersList.map((follower) => (
              <p key={follower.id}>{follower.name}</p>
            ))}
          </div>
          <Button color="primary" className="mb-4">
            View All Followers
          </Button>

          <h4 className="mt-4 mb-2">Users You Follow</h4>
          <div className="flex flex-col space-y-2 mb-8">
            {user.followingList.map((followedUser) => (
              <p key={followedUser.id}>{followedUser.name}</p>
            ))}
          </div>
          <Button color="primary" className="mb-4">
            View All Followed Users
          </Button>

          <h4 className="mt-4 mb-2">Recent Notifications</h4>
          <div className="flex flex-col space-y-2 mb-8">
            {user.notifications.map((notification, index) => (
              <p key={index}>{notification}</p>
            ))}
          </div>
          <Button color="primary" className="mb-4">
            View All Notifications
          </Button>

          <div className="flex justify-between">
            <Button color="secondary">Create New Post</Button>
            <Button color="secondary">Manage Profile</Button>
            <Button color="secondary">Settings</Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default UserOverView;

const user = {
    username: 'JohnDoe',
    totalPosts: 10,
    followers: 25,
    following: 15,
    posts: [
      { id: 1, title: 'First Post', date: '2024-01-01', snippet: 'This is my first post.' },
      // Add more posts as needed
    ],
    followersList: [
      { id: 1, name: 'Jane Smith' },
      // Add more followers as needed
    ],
    followingList: [
      { id: 1, name: 'Mike Johnson' },
      // Add more followed users as needed
    ],
    notifications: [
      'Jane liked your post',
      'Mike started following you',
      // Add more notifications as needed
    ],
  };
