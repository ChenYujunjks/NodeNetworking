import { URL } from 'url';

const myUrl = new URL('/p/a/t/h', 'http://www.example.com');
myUrl.searchParams.append('query', 'string');
myUrl.hash = 'hash';

console.log('Constructed URL:', myUrl.href);
