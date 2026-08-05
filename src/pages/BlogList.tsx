import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useBlogStore } from '../store/useBlogStore';

export const BlogList: React.FC = () => {
  const { posts } = useBlogStore();

  return (
    <main className="relative z-10 w-full min-h-screen pt-32 pb-16 px-6 pointer-events-auto">
      <Helmet>
        <title>Blog - Vocentra.</title>
        <meta name="description" content="Explore insights, guides, and thoughts on communication, vocabulary, and personal growth." />
      </Helmet>

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-7xl font-serif font-medium tracking-tight text-primary mb-6">
            Insights.
          </h1>
          <p className="text-secondary mb-16 max-w-lg">
            Thoughts and guides on communication, vocabulary, and mastering your words.
          </p>
        </motion.div>

        <div className="flex flex-col gap-8">
          {posts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Link 
                to={`/blog/${post.slug}`}
                className="block group bg-white/40 dark:bg-black/40 backdrop-blur-md border border-white/20 dark:border-white/10 p-8 rounded-3xl hover:bg-white/60 dark:hover:bg-white/5 transition-all duration-300"
              >
                <div className="text-xs text-secondary tracking-widest uppercase font-semibold mb-3">
                  {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
                <h2 className="text-2xl md:text-3xl font-serif font-medium text-primary mb-3 group-hover:opacity-80 transition-opacity">
                  {post.title}
                </h2>
                <p className="text-secondary line-clamp-2 leading-relaxed">
                  {post.excerpt}
                </p>
              </Link>
            </motion.div>
          ))}

          {posts.length === 0 && (
            <p className="text-secondary italic">No posts published yet.</p>
          )}
        </div>
      </div>
    </main>
  );
};
