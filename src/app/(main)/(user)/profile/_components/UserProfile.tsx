'use client'
import { Button } from '@nextui-org/button';
import { Card, CardBody } from '@nextui-org/card';
import React from 'react';

const UserProfile = () => {
    return (
        <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
        <Card className="w-full max-w-4xl shadow-lg mb-8">
          <CardBody>
            <h2 className="text-center mb-4">{user.username}'s Profile</h2>
            
            <div className="flex flex-col md:flex-row justify-between mb-6">
              <div className="text-center">
                <h4>Followers</h4>
                <p>{user.followers.length}</p>
              </div>
              <div className="text-center">
                <h4>Following</h4>
                <p>{user.following.length}</p>
              </div>
            </div>
  
            <Button color="primary" className="w-full" onClick={user.onEditProfile}>
              Edit Profile
            </Button>
          </CardBody>
        </Card>
  
        <Card className="w-full max-w-4xl shadow-lg mb-8">
          <CardBody>
            <h4 className="mb-4">Your Posts</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          </CardBody>
        </Card>
  
        <Card className="w-full max-w-4xl shadow-lg mb-8">
          <CardBody>
            <h4 className="mb-4">Your Followers</h4>
            <div className="flex flex-col space-y-2">
              {user.followers.map((follower) => (
                <p key={follower.id}>{follower.name}</p>
              ))}
            </div>
          </CardBody>
        </Card>
  
        <Card className="w-full max-w-4xl shadow-lg mb-8">
          <CardBody>
            <h4 className="mb-4">Users You Follow</h4>
            <div className="flex flex-col space-y-2">
              {user.following.map((followedUser) => (
                <p key={followedUser.id}>{followedUser.name}</p>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    );
};

export default UserProfile;

const user = {
    username: 'JohnDoe',
    followers: [
      { id: 1, name: 'Jane Smith' },
      { id: 2, name: 'Mike Johnson' },
    ],
    following: [
      { id: 1, name: 'Emily Davis' },
      { id: 2, name: 'Robert Brown' },
    ],
    posts: [
      { id: 1, title: 'My First Post', date: '2024-01-01', snippet: 'This is my first post!' },
      { id: 2, title: 'Another Day', date: '2024-02-01', snippet: 'Just sharing my thoughts.' },
    ],
    onEditProfile: () => {
      console.log('Edit Profile Clicked');
    },
  };
  