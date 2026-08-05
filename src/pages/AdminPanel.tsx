import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Edit3, X, Lock } from 'lucide-react';
import { useBlogStore, type BlogPost } from '../store/useBlogStore';

export const AdminPanel: React.FC = () => {
  const { posts, addPost, updatePost, deletePost } = useBlogStore();
  const [editingPost, setEditingPost] = useState<Partial<BlogPost> | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('adminAuth') === 'true';
  });
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'vocentra-admin') {
      setIsAuthenticated(true);
      sessionStorage.setItem('adminAuth', 'true');
      setLoginError(false);
    } else {
      setLoginError(true);
      setPassword('');
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost?.title || !editingPost?.content) return;

    if (editingPost.id) {
      updatePost(editingPost.id, {
        title: editingPost.title,
        excerpt: editingPost.excerpt,
        content: editingPost.content,
      });
    } else {
      addPost({
        title: editingPost.title,
        excerpt: editingPost.excerpt || '',
        content: editingPost.content,
      });
    }
    setEditingPost(null);
  };

  if (!isAuthenticated) {
    return (
      <main className="relative z-10 w-full min-h-screen flex items-center justify-center px-6 pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white/40 dark:bg-black/40 backdrop-blur-xl border border-white/20 dark:border-white/10 p-10 rounded-[2.5rem] shadow-2xl flex flex-col items-center"
        >
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
            <Lock size={28} />
          </div>
          <h1 className="text-3xl font-serif font-medium text-primary mb-2 text-center">Restricted Access</h1>
          <p className="text-secondary text-center mb-8">Enter your credentials to manage content.</p>
          
          <form onSubmit={handleLogin} className="w-full">
            <input
              type="password"
              required
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin password..."
              className={`w-full bg-white/50 dark:bg-white/5 border ${loginError ? 'border-red-500' : 'border-primary/20 dark:border-white/10'} rounded-2xl px-5 py-4 text-primary outline-none focus:border-primary/50 transition-colors mb-4`}
            />
            {loginError && <p className="text-red-500 text-sm text-center mb-4">Incorrect password.</p>}
            <button
              type="submit"
              className="w-full py-4 bg-primary text-background rounded-2xl font-medium shadow-lg hover:opacity-90 transition-opacity"
            >
              Access Dashboard
            </button>
          </form>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="relative z-10 w-full min-h-screen pt-32 pb-24 px-6 pointer-events-auto">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-serif font-medium tracking-tight text-primary mb-4">
              Admin Panel
            </h1>
            <p className="text-secondary">Manage your blog content.</p>
          </div>
          <button
            onClick={() => setEditingPost({ title: '', excerpt: '', content: '' })}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-background rounded-full font-medium hover:opacity-90 transition-opacity"
          >
            <Plus size={18} /> New Post
          </button>
        </div>

        {editingPost ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/40 dark:bg-black/40 backdrop-blur-xl border border-white/20 dark:border-white/10 p-8 rounded-3xl"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-serif font-medium text-primary">
                {editingPost.id ? 'Edit Post' : 'Create New Post'}
              </h2>
              <button onClick={() => setEditingPost(null)} className="text-secondary hover:text-primary">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSave} className="flex flex-col gap-6">
              <div>
                <label className="block text-sm font-medium text-secondary mb-2">Title</label>
                <input
                  type="text"
                  required
                  value={editingPost.title || ''}
                  onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                  className="w-full bg-white/50 dark:bg-white/5 border border-primary/20 dark:border-white/10 rounded-xl px-4 py-3 text-primary outline-none focus:border-primary/50 transition-colors"
                  placeholder="Enter post title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary mb-2">Excerpt (Optional SEO Summary)</label>
                <textarea
                  value={editingPost.excerpt || ''}
                  onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                  className="w-full bg-white/50 dark:bg-white/5 border border-primary/20 dark:border-white/10 rounded-xl px-4 py-3 text-primary outline-none focus:border-primary/50 transition-colors resize-none h-24"
                  placeholder="Brief summary for the blog feed..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary mb-2">Content (Supports markdown structure visually)</label>
                <textarea
                  required
                  value={editingPost.content || ''}
                  onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                  className="w-full bg-white/50 dark:bg-white/5 border border-primary/20 dark:border-white/10 rounded-xl px-4 py-3 text-primary outline-none focus:border-primary/50 transition-colors resize-y min-h-[300px]"
                  placeholder="Write your article here..."
                />
              </div>

              <div className="flex justify-end gap-4 mt-4">
                <button
                  type="button"
                  onClick={() => setEditingPost(null)}
                  className="px-6 py-3 text-secondary hover:text-primary font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 bg-primary text-background rounded-full font-medium shadow-lg hover:scale-105 transition-transform"
                >
                  Save Post
                </button>
              </div>
            </form>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white/30 dark:bg-white/5 border border-primary/10 dark:border-white/10 p-6 rounded-2xl flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-medium text-primary mb-2 line-clamp-1">{post.title}</h3>
                  <p className="text-sm text-secondary mb-6">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex justify-end gap-3 border-t border-primary/10 dark:border-white/10 pt-4 mt-auto">
                  <button
                    onClick={() => setEditingPost(post)}
                    className="p-2 text-secondary hover:text-primary transition-colors bg-white/50 dark:bg-white/5 rounded-lg"
                    title="Edit"
                  >
                    <Edit3 size={16} />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('Are you sure you want to delete this post?')) {
                        deletePost(post.id);
                      }
                    }}
                    className="p-2 text-secondary hover:text-red-500 transition-colors bg-white/50 dark:bg-white/5 rounded-lg"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};
