'use client'
import PostDetails from './_components/PostDetails';

interface IProps {
    params: {
      id: string;
    };
  }

const page = ({ params: { id } }: IProps) => {
    return (
        
        <div className="container mx-auto my-3 max-w-[720px]">
          {/* <Post key={post?._id} post={post} /> */}
          <PostDetails post={postData} />
        </div>
    );
};

export default page;

const postData = {
    title: 'Exploring the Universe',
    date: '2024-09-29',
    content: 'The universe is vast and full of wonders. From black holes to distant galaxies, exploring the universe reveals the mysteries of our existence.',
    upvotes: 42,
    comments: [
      { id: 1, text: 'Great article! Really insightful.' },
      { id: 2, text: 'I love astronomy. Can’t wait to read more!' },
    ],
  };