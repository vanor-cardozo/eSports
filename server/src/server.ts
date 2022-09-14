import express from 'express';

const app = express();

const PORT = 3333;

app.get('/ads', (req, res) => {
    return res.json([
        { id: 1, name: 'Anúncio 1' },
        { id: 2, name: 'Anúncio 2' },
        { id: 3, name: 'Anúncio 3' },
        { id: 4, name: 'Anúncio 4' },
        { id: 5, name: 'Anúncio 5' },
    ]);
});

app.listen(PORT);