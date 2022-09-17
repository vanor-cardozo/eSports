import express from 'express';
import cors from 'cors';

import { PrismaClient } from '@prisma/client';
import { convertHourStringToMinutes } from './utils/convert-hour-string-to-minute';
import { convertMinutesToHourString } from './utils/convert-minutes-to-hour-string';

const PORT = 3333;

const app = express();

app.use(express.json());
app.use(cors());

const prisma = new PrismaClient({
    log: ['query']
});

app.get('/games', async (req, res) => {
    const games = await prisma.game.findMany({
        include: {
            _count: {
                select: {
                    ads: true,
                }
            }
        }
    })
    return res.status(200).json(games);
});

app.post('/games/:id/ads',async (req, res) => {
    const gameId = req.params.id;
    const body = req.body;
    console.log(body)

    const ad = await prisma.ad.create({
        data: {
            gameId,
            name: body.name,
            yearsPlaying: body.yearsPlaying,
            discord: body.discord,
            weekDays: body.weekDays.join(','),
            hourStart: convertHourStringToMinutes(body.hourStart),
            hourEnd: convertHourStringToMinutes(body.hourEnd),
            useVoiceChannel: body.useVoiceChannel,
        }
    })
    return res.status(201).json(ad);
});

app.get('/games/:id/ads',async (req, res) => {
    const gameId = req.params.id;

    const ads = await prisma.ad.findMany({
        select: {
            id: true,
            name: true,
            weekDays: true,
            yearsPlaying: true,
            hourStart: true,
            hourEnd: true,
        },
        where: {
            gameId,
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
    return res.status(200).json(ads.map(ad => {
        return {
            ...ad,
            weekDays: ad.weekDays.split(','),
            hourStart: convertMinutesToHourString(ad.hourStart),
            hourEnd: convertMinutesToHourString(ad.hourEnd),
        }
    }));
});

app.get('/ads/:id/discord',async (req, res) => {
    const adId = req.params.id;

    const ad = await prisma.ad.findFirstOrThrow({
        select: {
            discord: true,
        },
        where: {
            id: adId,
        }
    });
    return res.status(200).json(ad);
});

app.listen(PORT);