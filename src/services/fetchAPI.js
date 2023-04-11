async function fetchAPI() {
  const request = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await request.json();

  return data;
}

export default fetchAPI;
