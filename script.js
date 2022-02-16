const button = document.querySelector('.button');
const audioElement = document.querySelector('#audio');

function toggleButton() {
  button.disabled = !button.disabled;
}

async function getQuotes() {
  let arr = [];
  const url = 'https://the-one-api.dev/v2/movie/5cd95395de30eff6ebccde5c/quote';
  const token = 'oHdHI3yVumwoPFLR5dJ_';
  const headers = {
    'Authorization': `Bearer ${token}`
  }

  try {
    const res = await fetch(url, {headers});
    const data = await res.json();

    for(let i = 0; i < data.docs.length; ++i)
    {
      arr.push(data.docs[i].dialog);
    }
  } catch(e) {
    console.log(e);
  }

  return arr;
}

async function randomize() {
  let rand = [];
  rand = await getQuotes();
  return rand[Math.floor(Math.random() * rand.length)];
}

async function tellQuote() {
  let str = await randomize();
  VoiceRSS.speech({
    key: '22cac3eb8aa84277ad2b5b6f9aa58523',
    src: str,
    hl: 'en-gb',
    v: 'harry',
    r: 0, 
    c: 'mp3',
    f: '48khz_16bit_stereo',
    ssml: false
  });
  toggleButton();
}

button.addEventListener('click', tellQuote);
audioElement.addEventListener('ended', toggleButton);