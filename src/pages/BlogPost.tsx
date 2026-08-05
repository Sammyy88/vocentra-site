import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useBlogStore } from '../store/useBlogStore';

export const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { posts } = useBlogStore();
  
  const post = posts.find(p => p.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <main className="relative z-10 w-full min-h-screen pt-32 pb-24 px-6 pointer-events-auto">
      {/* Dynamic SEO Tags */}
      <Helmet>
        <title>{post.title} - Vocentra.</title>
        <meta name="description" content={post.excerpt} />
        {/* Open Graph Tags for Social Sharing */}
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
      </Helmet>

      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-2 text-sm text-secondary hover:text-primary transition-colors mb-12"
          >
            <ArrowLeft size={16} /> Back to Blog
          </Link>

          <div className="text-sm text-secondary tracking-widest uppercase font-semibold mb-6">
            {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </div>
          
          <h1 className="text-4xl md:text-6xl font-serif font-medium tracking-tight text-primary mb-12 leading-tight">
            {post.title}
          </h1>

          <div className="prose prose-lg dark:prose-invert prose-p:leading-relaxed prose-p:text-secondary prose-headings:font-serif prose-headings:font-medium max-w-none whitespace-pre-wrap">
            {post.content}
          </div>
        </motion.div>
      </div>
    </main>
  );
};
