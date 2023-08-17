// /api/ping
export default function ping(req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({ message: 'Pong!' });
}