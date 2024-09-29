'use client';
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import React, { useState } from "react";
import { Card, CardBody } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";

const categories = [
  { key: 'all', label: 'All' },
  { key: 'tech', label: 'Tech' },
  { key: 'lifestyle', label: 'Lifestyle' },
  { key: 'news', label: 'News' }
];

const sortOptions = [
  { value: 'latest', label: 'Latest' },
  { value: 'alphabetical', label: 'Alphabetical' }
];

const postsData = [
  {
    id: 1,
    title: "Latest Tech Trends",
    date: "2024-09-15",
    snippet: "Explore the latest trends in technology...",
    category: "tech",
  },
  {
    id: 2,
    title: "Healthy Living Tips",
    date: "2024-09-12",
    snippet: "Here are some tips for a healthier lifestyle...",
    category: "lifestyle",
  },
  {
    id: 3,
    title: "Global News Roundup",
    date: "2024-09-10",
    snippet: "Catch up on the latest global news...",
    category: "news",
  },
  {
    id: 4,
    title: "The Future of AI",
    date: "2024-09-05",
    snippet: "What does the future hold for AI technologies?",
    category: "tech",
  },
];

const NewsFeed = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("latest");

  const filteredPosts = postsData
    .filter((post) => filter === "all" || post.category === filter)
    .filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const sortedPosts = filteredPosts.sort((a, b) => {
    if (sort === "latest") {
      return new Date(b.date) - new Date(a.date);
    }
    return a.title.localeCompare(b.title);
  });

  return (
    <div className="flex flex-col items-center p-8 min-h-screen">
      <div className="w-full max-w-2xl mb-6">
        <Input
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border-b-2 border-gray-300 focus:border-blue-500"
        />

        <div className="flex justify-between mt-4">
          <Select
            label="Category"
            placeholder="Select a category"
            selectionMode="single"
            className="max-w-xs"
            onChange={(values) => setFilter(values[0])}
          >
            {categories.map((category) => (
              <SelectItem key={category.key} value={category.key}>
                {category.label}
              </SelectItem>
            ))}
          </Select>

          <Select
            label="Sort By"
            placeholder="Latest"
            value={sort}
            onChange={(value) => setSort(value)}
            className="w-1/3"
          >
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-2xl">
        {sortedPosts.map((post) => (
          <Card key={post.id} className="shadow-lg border border-gray-200 rounded-lg">
            <CardBody>
              <h2 className="font-bold text-xl mb-2 hover:text-blue-600 transition">{post.title}</h2>
              <p className="text-gray-500 text-sm mb-2">{new Date(post.date).toLocaleDateString()}</p>
              <p className="text-gray-700 mb-4">{post.snippet}</p>
              <Link
              href={`/post-details/${post.id}`}              >
              <Button
                color="primary"
                className="mt-2"
              >
                Read More
              </Button>
              </Link>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default NewsFeed;
