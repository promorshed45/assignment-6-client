
import { Navbar } from '@/src/components/navbar';
import { ReactNode } from 'react';

const layout = ({children}:{children: ReactNode}) => {
    return (
        <div className="relative flex flex-col h-screen">
            <Navbar />
            <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
              {children}
            </main>
            
          </div>
    );
};

export default layout;