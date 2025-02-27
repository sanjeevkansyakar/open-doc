'use client';

import { usePaginatedQuery } from 'convex/react';

import { Navbar } from './navbar';
import { TemplatesGallery } from './templates-gallery';
import { DocumentsTable } from './documents-table';

import { api } from '../../../convex/_generated/api';
import { useSearchParam } from '@/hooks/use-search-param';

export default function Home() {
  const [search] = useSearchParam();
  const { results, status, loadMore } = usePaginatedQuery(api.documents.get, { search }, { initialNumItems: 5 });

  return (
    <div className='flex flex-col min-h-screen'>
      <div className='fixed top-0 left-0 right-0 z-10 h-16 bg-white p-4'>
        <Navbar />
      </div>
      <div className='mt-16'>
        <TemplatesGallery />
        <DocumentsTable documents={results} status={status} loadMore={loadMore} />
      </div>
    </div>
  );
}

// 6 57 28