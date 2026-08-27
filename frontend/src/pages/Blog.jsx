import { useEffect, useMemo, useState } from 'react'
import { getBlogPosts } from '../lib/blog.js'
import './Blog.css'

function Blog() {
  const [activeTab, setActiveTab] = useState('blog')
  const [sort, setSort] = useState('Latest')
  const [posts, setPosts] = useState([])
  const [status, setStatus] = useState('loading') // loading | ready | error

  useEffect(() => {
    let active = true
    getBlogPosts()
      .then((p) => active && (setPosts(p), setStatus('ready')))
      .catch(() => active && setStatus('error'))
    return () => { active = false }
  }, [])

  const sortedPosts = useMemo(() => {
    const list = [...posts]
    if (sort === 'Oldest') list.sort((a, b) => new Date(a.date) - new Date(b.date))
    else list.sort((a, b) => new Date(b.date) - new Date(a.date)) // Latest / Popular
    return list
  }, [posts, sort])

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
          <form className="blog-hero__form" onSubmit={(e) => e.preventDefault()}>
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

            {activeTab === 'blog' && (
              <div className="blog-sort">
                <select
                  className="blog-sort__select"
                  aria-label="Sort posts"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                >
                  <option>Latest</option>
                  <option>Oldest</option>
                </select>
              </div>
            )}
          </div>

          {activeTab === 'events' ? (
            <p className="blog-empty">Events are coming soon — check back later.</p>
          ) : status === 'loading' ? (
            <p className="blog-empty">Loading posts…</p>
          ) : status === 'error' ? (
            <p className="blog-empty">
              We couldn&rsquo;t load the blog right now. Please try again later.
            </p>
          ) : sortedPosts.length === 0 ? (
            <p className="blog-empty">No posts published yet.</p>
          ) : (
            <div className="blog-grid">
              {sortedPosts.map((post) => (
                <article className={`blog-card ${post.image ? '' : 'blog-card--noimg'}`} key={post.id}>
                  {post.image && (
                    <div className="blog-card__img">
                      <img
                        src={post.image}
                        alt=""
                        loading="lazy"
                        onError={(e) => {
                          const box = e.currentTarget.closest('.blog-card__img')
                          if (box) box.style.display = 'none'
                        }}
                      />
                    </div>
                  )}
                  <div className="blog-card__meta">
                    <span className="blog-card__author">
                      <img src={post.avatar} alt="" onError={(e) => { e.currentTarget.style.display = 'none' }} />
                      {post.author}
                    </span>
                    <span className="blog-card__time">{post.readTime}</span>
                  </div>
                  <h3 className="blog-card__title">{post.title}</h3>
                  <p className="blog-card__excerpt">{post.excerpt}</p>
                  <a
                    href={post.link}
                    className="blog-card__btn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read More
                  </a>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

export default Blog
