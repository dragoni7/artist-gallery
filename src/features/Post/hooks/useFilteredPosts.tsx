import { Post } from '@/types';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function useFilteredPosts(posts: Post[]) {
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(posts);
  const [searchParams] = useSearchParams();

  function filterPosts(posts: Post[]): Post[] {
    var filtered = posts.filter((post) => !post.tags.some((t) => t.name === 'nsfw'));

    if (!searchParams.has('tags')) return filtered;

    var tags = searchParams.get('tags')?.split(',');

    filtered = filtered.filter((post) =>
      tags?.every((tag) => post.tags.some((t) => t.name === tag))
    );
    return filtered;
  }

  useEffect(() => {
    setFilteredPosts(filterPosts(posts));
  }, [posts, searchParams]);

  return filteredPosts;
}
