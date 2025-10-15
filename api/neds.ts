export default async function handler(req: any, res: any) {
  // path comes from the rewrite (?path=$1)
  const segs = Array.isArray(req.query?.path)
    ? req.query.path
    : req.query?.path
      ? [req.query.path]
      : []
  const forwardPath = '/' + segs.join('/')

  const qIndex = req.url.indexOf('?')
  const search = qIndex === -1 ? '' : req.url.slice(qIndex).replace(/^\?path=[^&]*&?/, '?') // drop our helper param

  const target = `https://api.neds.com.au${forwardPath}${search}`

  const upstream = await fetch(target, { headers: { accept: 'application/json' } })
  const body = await upstream.text()

  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Content-Type', upstream.headers.get('content-type') ?? 'application/json')
  res.status(upstream.status).send(body)
}
