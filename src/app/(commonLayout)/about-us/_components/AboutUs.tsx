import React from 'react';
import { Card, Button, CardBody } from '@nextui-org/react';

const AboutUs = () => {
  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <Card className="w-full max-w-4xl shadow-lg mb-8">
        <CardBody>
          <h2 className="text-center mb-4">About Us</h2>
          <p className="mb-4">
            Welcome to our project! We are dedicated to building a platform that fosters community engagement, sharing, and learning. Our mission is to create an inclusive environment where everyone can share their ideas and connect with like-minded individuals.
          </p>
          <p className="mb-4">
            Our team is composed of passionate individuals who believe in the power of collaboration and innovation. We strive to empower users by providing the tools they need to express themselves and connect with others.
          </p>
        </CardBody>
      </Card>

      <Card className="w-full max-w-4xl shadow-lg mb-8">
        <CardBody>
          <p h3 className="mb-4">Our Mission</p>
          <p>
            Our mission is to empower individuals to share their stories and ideas in a safe and welcoming space. We believe that everyone has a voice and deserves to be heard.
          </p>
        </CardBody>
      </Card>

      <Card className="w-full max-w-4xl shadow-lg mb-8">
        <CardBody>
          <h3 className="mb-4">Meet Our Team</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member) => (
              <Card key={member.id} className="shadow-sm">
                <CardBody>
                  <p className="font-semibold">{member.name}</p>
                  <p className="text-gray-500">{member.role}</p>
                  <p>{member.bio}</p>
                </CardBody>
              </Card>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

const teamMembers = [
  {
    id: 1,
    name: 'Alice Johnson',
    role: 'Project Manager',
    bio: 'Alice is passionate about community building and project management. She ensures everything runs smoothly.',
  },
  {
    id: 2,
    name: 'Bob Smith',
    role: 'Lead Developer',
    bio: 'Bob is an experienced developer with a love for coding and technology. He drives the technical vision of the project.',
  },
  {
    id: 3,
    name: 'Charlie Davis',
    role: 'UX/UI Designer',
    bio: 'Charlie creates intuitive and beautiful designs that enhance user experience and engagement.',
  },
];

export default AboutUs;
