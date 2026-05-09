export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'Missing id' });
  }

  try {
    const response = await fetch('https://jsonblob.com/api/jsonBlob/' + id, {
      headers: { 'Accept': 'application/json' },
    });

    if (!response.ok) {
      throw new Error('jsonblob returned ' + response.status);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error('load error:', err);
    res.status(500).json({ error: 'Failed to load. The link may be invalid.' });
  }
}
