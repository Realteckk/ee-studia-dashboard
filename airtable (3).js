const PAT = 'patdlIA6zj6DYxzWR.cf55a1320af1eac765354bdc7dd4644b46100dd3d1c65d3c26a397179fd9a46f';
const BASE = 'appEDduD0UB3MG5Z1';

exports.handler = async function(event) {
  const tableId = event.queryStringParameters && event.queryStringParameters.table;
  const offset = event.queryStringParameters && event.queryStringParameters.offset;

  if (!tableId) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing table parameter' }) };
  }

  let url = `https://api.airtable.com/v0/${BASE}/${tableId}`;
  if (offset) url += `?offset=${offset}`;

  try {
    const res = await fetch(url, { headers: { Authorization: 'Bearer ' + PAT } });
    const data = await res.json();
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify(data)
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
