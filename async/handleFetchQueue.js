const urls = Array.from({ length: 10 }, (v, k) => k);

const fetch = function (idx) {
  return new Promise((resolve) => {
    console.log(`start request ${idx}`);
    const timeout = parseInt(Math.random() * 1e4);
    setTimeout(() => {
      console.log(`end request ${idx}`);
      resolve(idx);
    }, timeout);
  });
};

const max = 4;

const callback = () => {
  console.log("run callback");
};

function handleFetchQueue(urls, max, callback) {
  const urlLens = urls.length;
  let i = 0;
  const promiseQuenes = [];
  const result = [];
  const handleFetch = (url) => {
    const req = fetch(url).then((res) => {
      result.push(res);
      if (result.length < urlLens && i + 1 < urlLens) {
        promiseQuenes.shift();
        i = i + 1;
        handleFetch(urls[i]);
      } else if (result.length === urlLens) {
        typeof callback === "function" && callback(result);
      }
    });
    promiseQuenes.push(req);
    if (promiseQuenes.length < max) {
      i = i + 1;
      handleFetch(urls[i]);
    }
  };
  handleFetch(urls[i]);
}

handleFetchQueue(urls, max, callback);
