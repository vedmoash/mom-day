export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const response = await fetch('https://jsonblob.com/api/jsonBlob', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    if (!response.ok) {
      throw new Error('jsonblob returned ' + response.status);
    }

    // jsonblob returns the blob URL in the Location header
    const location = response.headers.get('location') || response.url;
    const id = location.split('/').pop();

    if (!id) throw new Error('No ID returned from jsonblob');

    res.status(200).json({ id });
  } catch (err) {
    console.error('save error:', err);
    res.status(500).json({ error: 'Failed to save. Please try again.' });
  }
}
