import { useState } from 'react'
import './Blog.css'

// Static placeholder posts
const posts = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  image: '/hero-2.png',
  author: 'Victor Eyo',
  avatar: '/team-victor.png',
  readTime: '3 min',
  title: 'From Community Project to Global Organization',
  excerpt:
    'Learn how Hakeela started, why it started and the impact the Edtech organization has been making in regions across Africa, and why Hakeela is the literally the Future.',
}))

function Blog() {
  const [activeTab, setActiveTab] = useState('blog')

  return (
    <main className="blog-page">
      {/* Subscribe banner */}
      <section className="blog-hero">
        <div className="blog-hero__panel">
          <h1 className="blog-hero__title">
            &ldquo;Building Africa&rsquo;s future tech talents and Inclusive
            edtech solutions&rdquo;
          </h1>
          <p className="blog-hero__subtitle">
            Subscribe to get updates on our blog and events
          </p>
          <form
            className="blog-hero__form"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              className="blog-hero__input"
              placeholder="Enter Email"
              aria-label="Email address"
            />
            <button type="submit" className="blog-hero__submit">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* List */}
      <section className="blog-list">
        <div className="blog-list__inner">
          <div className="blog-list__toolbar">
            <div className="blog-tabs" role="tablist">
              <button
                role="tab"
                aria-selected={activeTab === 'blog'}
                className={`blog-tab ${activeTab === 'blog' ? 'is-active' : ''}`}
                onClick={() => setActiveTab('blog')}
              >
                Blog
              </button>
              <button
                role="tab"
                aria-selected={activeTab === 'events'}
                className={`blog-tab ${activeTab === 'events' ? 'is-active' : ''}`}
                onClick={() => setActiveTab('events')}
              >
                Events
              </button>
            </div>

            <div className="blog-sort">
              <select className="blog-sort__select" aria-label="Sort posts">
                <option>Latest</option>
                <option>Oldest</option>
                <option>Popular</option>
              </select>
            </div>
          </div>

          <div className="blog-grid">
            {posts.map((post) => (
              <article className="blog-card" key={post.id}>
                <div className="blog-card__img">
                  <img src={post.image} alt="" />
                </div>
                <div className="blog-card__meta">
                  <span className="blog-card__author">
                    <img src={post.avatar} alt="" />
                    {post.author}
                  </span>
                  <span className="blog-card__time">{post.readTime}</span>
                </div>
                <h3 className="blog-card__title">{post.title}</h3>
                <p className="blog-card__excerpt">{post.excerpt}</p>
                <a href="#" className="blog-card__btn">
                  Read More
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export default Blog
