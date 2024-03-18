// cookied.mjs
import { v4 as uuidv4 } from 'uuid';

export function parseCookies(req, res, next) {
    const cookies = req.get('Cookie');
    req.hwCookies = {}; // initialize hwCookies object

    if (cookies) {
        const parsedCookies = cookies.split(';').map(cookie => cookie.trim().split('='));
        parsedCookies.forEach(cookie => {
            const [name, value] = cookie;
            req.hwCookies[name] = value;
        });
    }

    next(); // proceed to the next middleware
}

const sessions = {}; // session storage

export function manageSession(req, res, next) {
    let sessionId = req.hwCookies.sessionId;

    if (!sessionId || !sessions[sessionId]) {
        // generate a new session ID and store it
        sessionId = uuidv4();
        sessions[sessionId] = { favColor: '#fff' }; // default background color
        res.append('Set-Cookie', `sessionId=${sessionId}; HttpOnly`);
        console.log(`Session generated: ${sessionId}`);
    } else {
        console.log(`Session already exists: ${sessionId}`);
    }

    // attach session data to the request object
    req.hwSession = sessions[sessionId];
    req.hwSession.sessionId = sessionId; // for debugging purposes only

    next();
}
