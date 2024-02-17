import { URL } from 'url';

const myUrl = new URL('http://www.example.com/p/a/t/h?query=string#hash');

console.log('Href:', myUrl.href);
console.log('Hostname:', myUrl.hostname);
console.log('Pathname:', myUrl.pathname);
console.log('Search:', myUrl.search);
console.log('Hash:', myUrl.hash);
