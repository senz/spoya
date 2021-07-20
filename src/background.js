const spoUrlRegexp = /https:\/\/open\.spotify\.com\/track\/([\w\d]+)/;
const spoTitleRegexp = /"og:title"\scontent="(.+?)"/;
const spoArtistRegexp = /"twitter:audio:artist_name"\scontent="(.+?)"/;

chrome.omnibox.onInputEntered.addListener(async (text) => {
    let match = spoUrlRegexp.exec(text);
    if (match === null) {
        return;
    }

    const [url] = match;
    let respo = await fetch(url);
    if (!respo.ok) {
        return;
    }

    const spoRes = await respo.text();

    match = spoArtistRegexp.exec(spoRes);
    if (match === null) {
        return;
    }
    const [,artist] = match;

    match = spoTitleRegexp.exec(spoRes);
    if (match === null) {
        return;
    }
    const [,title] = match;    

    respo = await fetch("https://api.music.yandex.net/search?type=all&page=0&text=" + encodeURI(`${artist} - ${title}`));
    if (!respo.ok) {
        return;
    }

    const yaRes = await respo.json();

    console.log(yaRes.result.best);
    var newURL = 'https://music.yandex.ru/track/' + yaRes.result.best.result.id;
    chrome.tabs.create({ url: newURL });
  });
