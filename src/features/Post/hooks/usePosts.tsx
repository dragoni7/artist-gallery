import { Post, Tag } from '@/types';
import { useEffect, useState } from 'react';

export default function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  async function fetchPosts() {
    setLoading(true);
    try {
      const response = await fetch('/data-api/rest/Post');

      if (!response.ok) throw new Error('Error fetching posts!');

      const posts = await response.json();
      setPosts(
        posts.value.reverse().map((item: any): Post => {
          return {
            id: item.Id,
            source: item.Source,
            description: item.Description ?? '',
            tags: item.Tags.split(',').map((t: string): Tag => {
              return { name: t };
            }),
            date: item.Date,
            title: item.Title,
          };
        })
      );
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return { posts, fetchPosts, loading };
}
