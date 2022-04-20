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
        const users = await prisma.user.findMany( { select: { id: true, name: true, email: true, username: true, avatar: true, images: true } } )
        const userToSend = users.filter(user => user.images.length > 0 )
        res.send(userToSend)
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
        const userFound = await prisma.user.findUnique({ where: { id: userId }, include: { followedBy: { include: { images: true } } } })
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
        const userFound = await prisma.user.findUnique({ where: { id: userId }, include: { following: { include: { images: true } } } })
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
        const collections = await prisma.collection.findMany({ where: { userId }, include: { saved: { include: { image: true } }, _count: { select: { saved: true } } } })
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
        const collection = await prisma.collection.findUnique({ where: { id: collectionId }, include: { saved: { include: { image: true } } } })
        res.status(200).send(collection)
    } catch (err) {
        //@ts-ignore
        res.status(400).send({ error: err.message })
    }

})

//Get collections per image
app.get('/imageCollections/:imageId', async (req, res) => {
    const token = req.headers.authorization || ''
    const imageId = Number(req.params.imageId)
    try {
        const user = await getUserFromToken(token)
        if (user) {

            const match = await prisma.saved.findMany({
                where: { imageId, userId: user.id }, include:
                    { collection: { include: { _count: { select: { saved: true } }, saved: { include: { image: true } } } } }
            })
            let collections = (match.map(c => c.collection)).filter(c => c !== null)
            res.status(200).send(collections)
        } else {
            res.status(400).send({ error: 'Invalid token' })
        }


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
    const token = req.headers.authorization || ''
    const imageId = Number(req.params.imageId)
    try {
        const user = await getUserFromToken(token)
        if (user) {
            const savedImages = await prisma.saved.findMany({ where: { imageId, userId: { not: user.id } }, include: { user: true }, distinct: ['userId'] })
            res.status(200).send(savedImages.map(saved => saved.user))
        } else {
            res.status(400).send({ error: 'Invalid token' })
        }

    } catch (err) {
        //@ts-ignore
        res.status(400).send({ error: err.message })
    }
})

//Save an image 
app.post('/save', async (req, res) => {
    const token = req.headers.authorization || ''
    const { imageId, collectionId } = req.body
    try {
        const user = await getUserFromToken(token)
        if (user) {
            if (collectionId) {
                const collectionMatch = await prisma.collection.findUnique({ where: { id: collectionId } })
                if (collectionMatch) {
                    const alreadySaved = await prisma.saved.findFirst({ where: { userId: user.id, imageId, collectionId: collectionId } })

                    if (alreadySaved) {
                        return res.status(400).send({ error: 'You already saved this image' })
                    } else {
                        const newSaved = await prisma.saved.create({
                            data: {
                                userId: user.id,
                                imageId: imageId,
                                collectionId: collectionId
                            },
                            include: {
                                user: true,
                                collection: true
                            }
                        })
                        res.status(200).send(newSaved)
                    }


                } else {
                    res.status(404).send({ error: 'Collection not found' })
                }
            } else {
                const alreadySaved = await prisma.saved.findFirst({ where: { userId: user.id, imageId } })

                if (alreadySaved) {
                    return res.status(400).send({ error: 'You already saved this image' })
                } else {
                    const newSaved = await prisma.saved.create({
                        data: {
                            userId: user.id,
                            imageId: imageId
                        }
                    })
                    res.status(200).send(newSaved)
                }
            }

        } else {
            res.status(400).send({ error: 'Invalid token' })
        }

    } catch (err) {
        //@ts-ignore
        res.status(400).send({ error: err.message })
    }
})

//Get saved images
app.get('/saved/:username', async (req, res) => {
    const username = req.params.username
    try {
        const user = await prisma.user.findUnique({ where: { username } })
        if (user) {
            const allSaved = await prisma.saved.findMany({ where: { userId: user.id }, include: { image: true }, distinct: ['imageId'] })
            const allSavedImages = []
            for (const image of allSaved) {
                allSavedImages.push(image.image)
            }
            res.status(200).send(allSavedImages)

        } else {
            res.status(404).send({ error: 'User not found' })
        }

    } catch (err) {
        //@ts-ignore
        res.status(400).send({ error: err.message })
    }

})

//Create a collection
app.post('/collections', async (req, res) => {
    const token = req.headers.authorization || ''
    const { name } = req.body
    try {
        const user = await getUserFromToken(token)
        if (user) {

            const newCollection = await prisma.collection.create({ data: { userId: user.id, name }, include: { saved: { include: { image: true } } } })
            res.status(200).send(newCollection)
        } else {
            res.status(400).send({ error: 'Invalid token' })
        }

    } catch (err) {
        //@ts-ignore
        res.status(400).send({ error: err.message })
    }
})

//Search for a user or image
app.get('/search', async (req, res) => {
    let q = req.query.q
    let type = req.query.type
    if (q) {
        if (type === undefined) {
            // const images = await prisma.image.findMany({ where: { title: { contains: q + "" } }, include: { user: true, ImageColors: { include: { color: { select: { name: true } } } } } })
            const images = await prisma.image.findMany({
                where: {
                    ImageColors: {
                        some: {
                            color: {
                                name: q + ""
                            }
                        }
                    }
                },
                include: {
                    user: true
                }
            })
            res.status(200).send(images)
        }

        if (type === 'items') {
            const images = await prisma.image.findMany({ where: { title: { contains: q + "" } }, include: { user: true } })
            return res.status(200).send(images)
        }
        if (type === 'users') {
            const users = await prisma.user.findMany({ where: { OR: [{ username: { contains: q + '' } }, { name: { contains: q + '' } }] } })

            return res.status(200).send(users)
        }
    } else {
        res.status(400).send({ error: 'No query provided!' })
    }
})

//Get suggested accounts
app.get('/suggested', async (req, res) => {
    const token = req.headers.authorization || ''
    try {
        const user = await getUserFromToken(token)
        if (user) {
            let suggested = await prisma.user.findMany({
                where: {
                    followedBy: {
                        none: {
                            username: user.username
                        }
                    }
                }
            })
            suggested = suggested.filter(u => u.id !== user.id)
            res.status(200).send(suggested)

        } else {
            res.status(400).send({ error: 'Invalid token' })
        }

    } catch (err) {
        //@ts-ignore
        res.status(400).send({ error: err.message })
    }
})

//Get most popular images
app.get('/popular', async (req, res) => {
    try {
        let popular = await prisma.image.findMany({
            include: {
                _count: {
                    select: {
                        Saved: true
                    }
                }
            }
        })
        popular = popular.filter(p => p._count.Saved > 2)
        res.status(200).send(popular)

    } catch (err) {
        //@ts-ignore
        res.status(400).send({ error: err.message })
    }
})

//Get all colors
app.get('/colors', async (req, res) => {
    try {
        const colors = await prisma.color.findMany()
        res.status(200).send(colors)
    } catch (err) {
        //@ts-ignore
        res.status(400).send({ error: err.message })
    }
})

//Update user
app.patch('/update', async (req, res) => {
    const token = req.headers.authorization || ''
    const { name, email, username, password, avatar } = req.body
    try {
        const user = await getUserFromToken(token)
        if (user) {
            const updatedUser = await prisma.user.update({ where: { id: user.id }, data: { name, email, username, password, avatar: (avatar !== null) ? avatar : user.avatar}, 
                select: {
                    id: true, email: true, name: true, username: true, avatar: true,
                    _count: true, followedBy: true, following: true, images: true, saved: true,
                    collections: true, searchedBy: true, searchedFor: true
                } })
            res.status(200).send(updatedUser)
        } else {
            res.status(400).send({ error: 'Invalid token' })
        }


    } catch (err) {
        //@ts-ignore
        res.status(400).send({ error: err.message })
    }
})
app.listen(PORT, () => {
    console.log(`Server runing on: http://localhost:${PORT}/`)
})