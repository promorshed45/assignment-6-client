"use client";

import { Button } from "@nextui-org/react";
import Image from "next/image";

const AboutUs = () => {
  return (
    <section className="">
      <div className="mx-auto">
        {/* Company Overview */}

        <div className="grid grid-cols-3 gap-10">
          {/* Vision */}
          <div>
            <h1 className="text-3xl font-semibold text-center mb-4">
              Our Vision
            </h1>
            <h1 className="text-lg text-gray-700 mb-8">
              To create a world where every traveler feels empowered to embark
              on their own adventure, discovering new cultures and experiences.
            </h1>
          </div>

          <div>
            {/* Mission */}
            <h1 className="text-3xl font-semibold text-center mb-4">
              Our Mission
            </h1>
            <h1 className="text-lg text-gray-700 mb-8">
              We aim to provide practical travel tips, destination guides, and
              cultural insights, making travel accessible and enjoyable for
              everyone.
            </h1>
          </div>

          <div>
            {/* What We Do */}
            <h1 className="text-3xl font-semibold text-center mb-4">
              What We Do
            </h1>
            <div className="mb-8  pl-5">
              <h1 className="text-lg  text-gray-700 mb-2">
                We provide a wealth of information about diverse destinations,
                including:
              </h1>
              <ul className="list-disc list-inside text-gray-700">
                <li>Comprehensive Guides</li>
                <li>Travel Tips</li>
                <li>Cultural Insights</li>
                <li>Traveler Stories</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Our Team */}
        <h1 className="text-3xl font-semibold text-center py-4">Our Team</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-5">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="p-4 bg-white/10 rounded-lg shadow-lg text-center"
            >
              <Image
                alt={member.name}
                className="w-32 h-32 mx-auto rounded-full mb-4"
                height={350}
                src="https://i.pravatar.cc/150?u=a04258114e29026708c"
                width={350}
              />
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <h1 className="text-gray-600">{member.role}</h1>
              <h1 className="mt-2">{member.description}</h1>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-8">
          <Button className="bg-rose-500 text-white hover:bg-rose-600 transition duration-200">
            Join Us on Our Journey
          </Button>
        </div>
      </div>
    </section>
  );
};

// Sample team member data
const teamMembers = [
  {
    name: "Jane Doe",
    role: "Founder & Chief Explorer",
    description:
      "A seasoned traveler with a passion for discovering off-the-beaten-path locations.",
    image: "/path/to/jane.jpg",
  },
  {
    name: "John Smith",
    role: "Content Strategist & Travel Writer",
    description:
      "With a background in journalism, John crafts engaging stories and guides.",
    image: "/path/to/john.jpg",
  },
  {
    name: "Sarah Lee",
    role: "Photographer & Visual Storyteller",
    description:
      "Sarah captures the beauty of travel through her lens, inspiring our guides.",
    image: "/path/to/sarah.jpg",
  },
  {
    name: "Mark Chen",
    role: "Technical Director",
    description:
      "Mark ensures our website runs smoothly and efficiently for our users.",
    image: "/path/to/mark.jpg",
  },
];

export default AboutUs;
