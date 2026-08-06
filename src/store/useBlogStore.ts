import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { defaultBlogPosts } from '../data/blogPosts';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  createdAt: string;
}

interface BlogState {
  posts: BlogPost[];
  addPost: (post: Omit<BlogPost, 'id' | 'slug' | 'createdAt'>) => void;
  updatePost: (id: string, post: Partial<Omit<BlogPost, 'id' | 'createdAt'>>) => void;
  deletePost: (id: string) => void;
}

const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
};

export const useBlogStore = create<BlogState>()(
  persist(
    (set) => ({
      posts: defaultBlogPosts,
      addPost: (postData) =>
        set((state) => ({
          posts: [
            {
              ...postData,
              id: crypto.randomUUID(),
              slug: generateSlug(postData.title),
              createdAt: new Date().toISOString(),
            },
            ...state.posts,
          ],
        })),
      updatePost: (id, postData) =>
        set((state) => ({
          posts: state.posts.map((post) =>
            post.id === id ? { ...post, ...postData, slug: postData.title ? generateSlug(postData.title) : post.slug } : post
          ),
        })),
      deletePost: (id) =>
        set((state) => ({
          posts: state.posts.filter((post) => post.id !== id),
        })),
    }),
    {
      name: 'word-generator-blog',
    }
  )
);
