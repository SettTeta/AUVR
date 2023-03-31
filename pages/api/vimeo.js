import { Vimeo } from 'vimeo';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const api = new Vimeo(null, null, process.env.VIMEO_TOKEN);
    
    try {
      const response = await api.requestAsync({
        method: 'GET',
        path: req.query.path,
        headers: { Accept: 'application/vnd.vimeo.*+json;version=3.4' },
      });

      res.status(200).send(response.body);
    } catch (error) {
      res.status(500).send(error);
      console.log('[Server] ' + error);
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
