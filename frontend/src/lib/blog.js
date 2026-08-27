// Blog content is managed in WordPress (blog.hakeela.org) and pulled via the
// WordPress REST API (CORS-enabled JSON — the RSS feed can't be fetched from
// the browser). Posts are mapped to the shape the Hakeela blog card expects.

const WP_BASE = 'https://blog.hakeela.org/wp-json/wp/v2'
const FALLBACK_AVATAR = '/avatar.png'

function decodeEntities(str = '') {
  const el = document.createElement('textarea')
  el.innerHTML = str
  return el.value
}

function stripHtml(html = '') {
  const tmp = document.createElement('div')
  tmp.innerHTML = html
  return (tmp.textContent || tmp.innerText || '').replace(/\s+/g, ' ').trim()
}

function readTime(html = '') {
  const words = stripHtml(html).split(/\s+/).filter(Boolean).length
  return `${Math.max(1, Math.round(words / 200))} min`
}

function pickImage(media) {
  if (!media) return null
  const sizes = media.media_details?.sizes
  return (
    sizes?.medium_large?.source_url ||
    sizes?.large?.source_url ||
    media.source_url ||
    null
  )
}

/** Fetch published posts from WordPress, newest first. */
export async function getBlogPosts({ perPage = 12 } = {}) {
  const res = await fetch(`${WP_BASE}/posts?per_page=${perPage}&_embed`)
  if (!res.ok) throw new Error(`Failed to load posts (${res.status})`)
  const data = await res.json()

  return data.map((p) => {
    const media = p._embedded?.['wp:featuredmedia']?.[0]
    const author = p._embedded?.author?.[0]
    const excerpt = stripHtml(p.excerpt?.rendered || '')
      .replace(/\s*\[[.…]+\]\s*$/, '')
      .replace(/\s*Continue reading.*$/i, '')
      .trim()

    return {
      id: p.id,
      title: decodeEntities(p.title?.rendered || 'Untitled'),
      excerpt,
      image: pickImage(media),
      author: decodeEntities(author?.name || 'Hakeela'),
      avatar: author?.avatar_urls?.['48'] || author?.avatar_urls?.['96'] || FALLBACK_AVATAR,
      date: p.date,
      readTime: readTime(p.content?.rendered || p.excerpt?.rendered || ''),
      link: p.link,
    }
  })
}
