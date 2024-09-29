import NewsFeed from '@/src/components/pages/NewsFeed/NewsFeed';
// import { postsData } from '@/src/components/pages/NewsFeed/postData';

const Home = () => {
  
  return (
    <div>
      <NewsFeed posts={postsData} />
    </div>
  );
};

export default Home;

const postsData = [
  {
    id: 1,
    title: 'Latest Tech Trends',
    date: '2024-09-15',
    snippet: 'Explore the latest trends in technology...',
    category: 'tech',
  },
  {
    id: 2,
    title: 'Healthy Living Tips',
    date: '2024-09-12',
    snippet: 'Here are some tips for a healthier lifestyle...',
    category: 'lifestyle',
  },
  {
    id: 3,
    title: 'Global News Roundup',
    date: '2024-09-10',
    snippet: 'Catch up on the latest global news...',
    category: 'news',
  },
  {
    id: 4,
    title: 'The Future of AI',
    date: '2024-09-05',
    snippet: 'What does the future hold for AI technologies?',
    category: 'tech',
  },
];