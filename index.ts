import * as express from 'express';
import { PrismaClient } from '@prisma/client'
import * as cors from 'cors'
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

//Get all users
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

//Get all images - if a user is logged in his/her images don't show
app.get('/images', async (req, res) => {
    const token = req.headers.authorization || ''
    try {
        if (token) {
            const user = await getUserFromToken(token)
            if (user) {
                const allImages = await prisma.image.findMany({ where: { userId: { not: user.id } }, include: { user: true } })
                res.status(200).send(allImages)

            } else {
                res.status(400).send({ erro: 'Invalid token' })
            }
        }
        else {
            const allImages = await prisma.image.findMany()
            res.status(200).send(allImages)
        }

    } catch (err) {
        //@ts-ignore
        res.status(400).send({ error: err.message })
    }
})

//Follow a user
app.patch('/follow', async (req, res) => {
    const token = req.headers.authorization || ''
    const { username } = req.body
    try {
        const user = await getUserFromToken(token)
        if (user) {
            const newFollowing = await prisma.user.update({
                where: { id: user.id }, data: {
                    following: {
                        connect: {
                            username: username
                        }
                    }
                },
                include: { following: true }
            })

            res.status(200).send(newFollowing)

        } else {
            res.status(400).send({ error: 'Invalid token' })
        }

    } catch (err) {
        //@ts-ignore
        res.status(400).send({ error: err.message })
    }
})

//Unfollow a user
app.patch('/unfollow', async (req, res) => {
    const token = req.headers.authorization || ''
    const { username } = req.body
    try {
        const user = await getUserFromToken(token)
        if (user) {
            const unfollow = await prisma.user.update({
                where: { id: user.id }, data: {
                    following: {
                        disconnect: { username }
                    }
                },
                include: { following: true }
            })
            res.status(200).send({ unfollow })
        } else {
            res.status(400).send({ error: 'Invalid token' })
        }

    } catch (err) {
        //@ts-ignore
        res.status(400).send({ error: err.message })
    }
})

//Get all followers of a user
app.get('/getFollowers/:userId', async (req, res) => {
    const userId = Number(req.params.userId)
    try {
        const userFound = await prisma.user.findUnique({ where: { id: userId }, include: { followedBy: true } })
        if (userFound) {
            const followers = userFound.followedBy
            res.status(200).send(followers)
        } else {
            res.status(400).send({ error: "User not found" })
        }

    } catch (err) {
        //@ts-ignore
        res.status(400).send({ error: err.message })
    }
})

//Get all the people a user is following
app.get('/getFollowing/:userId', async (req, res) => {

    const userId = Number(req.params.userId)
    try {
        const userFound = await prisma.user.findUnique({ where: { id: userId }, include: { following: true } })
        if (userFound) {
            const following = userFound.following
            res.status(200).send(following)
        } else {
            res.status(400).send({ error: "User not found" })
        }


    } catch (err) {
        //@ts-ignore
        res.status(400).send({ error: err.message })
    }
})

//Get a single user by username
app.get('/users/:username', async (req, res) => {
    const username = req.params.username
    try {
        const user = await prisma.user.findUnique({ where: { username }, include: { followedBy: true, following: true, _count: { select: { followedBy: true, following: true } } } })
        if (user) {
            res.status(200).send(user)
        } else {
            res.status(404).send({ error: 'User not found!' })
        }

    } catch (err) {
        //@ts-ignore
        res.status(400).send({ error: err.message })
    }
})

//Get all images of a user
app.get('/images/:userId', async (req, res) => {
    const userId = Number(req.params.userId)
    try {
        const images = await prisma.image.findMany({ where: { userId }, include: { user: true, ImageColors: true, Saved: true, collections: true } })
        res.status(200).send(images)

    } catch (err) {
        //@ts-ignore
        res.status(400).send({ error: err.message })
    }
})

//Get all the collections the user has
app.get('/collections/:userId', async (req, res) => {
    const userId = Number(req.params.userId)
    try {
        const collections = await prisma.collection.findMany({ where: { userId }, include: { images: true, saved: true } })
        res.status(200).send(collections)
    } catch (err) {
        //@ts-ignore
        res.status(400).send({ error: err.message })
    }
})

//Get the images for a collection
app.get('/collectionImages/:collectionId', async (req, res) => {
    const collectionId = Number(req.params.collectionId)
    try {
        const collectionAndImages = await prisma.collection.findUnique({ where: { id: collectionId }, include: { images: { include: { user: true } } } })
        const images = collectionAndImages.images
        res.status(200).send(images)

    } catch (err) {
        //@ts-ignore
        res.status(400).send({ error: err.message })
    }

})


// One Image
app.get('/oneImage/:id', async (req, res) => {
    const id = Number(req.params.id)
    try {
        const image = await prisma.image.findUnique({ where: { id: id } })
        res.status(200).send(image)
    } catch (err) {
        //@ts-ignore
        res.status(400).send({ error: err.message })
    }
})

//Get all the users who saved an image based on the imageId
app.get('/savedImages/:imageId', async (req, res) => {
    const imageId = Number(req.params.imageId)
    try {
        const savedImages = await prisma.saved.findMany({ where: { imageId }, include: { user: true } })
        res.status(200).send(savedImages.map(saved => saved.user))
    } catch (err) {
        //@ts-ignore
        res.status(400).send({ error: err.message })
    }
})


app.listen(PORT, () => {
    console.log(`Server runing on: http://localhost:${PORT}/`)
})