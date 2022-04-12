import express from 'express'
import { PrismaClient } from '@prisma/client'
import cors from 'cors'
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 4001

const prisma = new PrismaClient({ log: ['query', 'error', 'warn', 'info'] })

function createToken(id: number) {
    return jwt.sign({ id: id }, process.env.MY_SECRET, { expiresIn: '3days' })
}

async function getUserFromToken(token: string) {
    const decodedToken = jwt.verify(token, process.env.MY_SECRET)
    const user = await prisma.user.findUnique({
        // @ts-ignore
        where: { id: decodedToken.id },
        select: {
            id: true, email: true, name: true, username: true, avatar: true,
            _count: true, followedBy: true, following: true, images: true, saved: true,
            collections: true, searchedBy: true, searchedFor: true
        }
    })
    return (user)
}

app.get('/users', async (req, res) => {
    try {
        const users = await prisma.user.findMany()
        res.send(users)
    } catch (err) {
        //@ts-ignore
        res.status(400).send(err.message)
    }
})

app.post('/sign-in', async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await prisma.user.findUnique({
            where: { email: email }
        })
        //@ts-ignore
        const passwordMatches = bcrypt.compareSync(password, user.password)
        if (user && passwordMatches) {
            const userToSend = await prisma.user.findUnique({
                where: { email: email },
                select: {
                    id: true, email: true, name: true, username: true, avatar: true,
                    _count: true, followedBy: true, following: true, images: true, saved: true,
                    collections: true, searchedBy: true, searchedFor: true
                }
            })
            res.send({ user: userToSend, token: createToken(user.id) })
        } else {
            throw Error()
        }
    } catch (err) {
        //@ts-ignore
        res.status(400).send({ error: 'User/password invalid.' })
    }
})

app.post('/sign-up', async (req, res) => {
    const { email, password, name, username } = req.body

    try {
        const hash = bcrypt.hashSync(password, 8)
        const user = await prisma.user.create({
            data: {
                email,
                password: hash,
                name,
                username
            },
            select: {
                id: true, email: true, name: true, username: true, avatar: true,
                _count: true, followedBy: true, following: true, images: true, saved: true,
                collections: true, searchedBy: true, searchedFor: true
            }
        })
        res.send({ user, token: createToken(user.id) })
    } catch (err) {
        //@ts-ignore
        res.status(400).send({ error: 'User/password invalid.' })
    }
})

app.get('/validate', async (req, res) => {
    const token = req.headers.authorization

    try {
        // @ts-ignore
        const user = await getUserFromToken(token)
        res.send(user)
    } catch (err) {
        //@ts-ignore
        res.status(400).send(err.message)
    }
})

app.listen(PORT, () => {
    console.log(`Server runing on: http://localhost:${PORT}/`)
})