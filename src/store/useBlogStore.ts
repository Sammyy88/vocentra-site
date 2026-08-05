import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
      posts: [
        {
          id: 'initial-post-1',
          slug: 'the-power-of-vocabulary',
          title: 'The Power of Vocabulary in Modern Communication',
          excerpt: 'How mastering your words can transform your personal and professional life.',
          content: 'Vocabulary is more than just knowing big words. It is about precision. When you have a strong vocabulary, you can express your thoughts clearly, concisely, and persuasively.\n\nIn the professional world, communication is arguably the most critical skill. Being able to articulate a vision, negotiate a deal, or resolve a conflict relies heavily on the words you choose. A robust vocabulary gives you the tools to adapt your message to your audience, ensuring you are understood and respected.\n\nStart small. Learn one new word a day, understand its nuances, and actively try to use it in conversation. Over time, this small habit compounds into a powerful communication arsenal.',
          createdAt: new Date().toISOString(),
        }
      ],
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
