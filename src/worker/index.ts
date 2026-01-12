import { Hono } from "hono";
const app = new Hono<{ Bindings: Env }>();

app.get("/api/", (c) => c.json({ name: "Cloudflare" }));

app.get('/api/bili-cover', async (c) => {
  const bvid = c.req.query('bvid')
  if (!bvid) return c.json({ error: 'Missing bvid' }, 400)

  try {
    const res = await fetch(`https://api.bilibili.com/x/web-interface/view?bvid=${bvid}`)
    if (!res.ok) throw new Error('Failed to fetch Bilibili API')
    const data = await res.json<any>()
    return c.json({ cover: data.data.pic })
  } catch (err: any) {
    return c.json({ error: err.message }, 500)
  }
})
app.get('/bili-cover', async (c) => {
  const bvid = c.req.query('bvid')
  if (!bvid) return c.json({ error: 'Missing bvid' }, 400)

  // Get Bilibili JSON first
  const infoRes = await fetch(`https://api.bilibili.com/x/web-interface/view?bvid=${bvid}`)
  const info = await infoRes.json<any>()
  const imageUrl = info.data.pic

  // Fetch image as a proxy
  const imageRes = await fetch(imageUrl, {
    headers: { 'Referer': 'https://www.bilibili.com' } // important!
  })
  const buffer = await imageRes.arrayBuffer()
  return c.body(buffer, 200, { 'Content-Type': 'image/jpeg' })
})

export default app;
