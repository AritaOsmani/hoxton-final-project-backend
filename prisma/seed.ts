import { Prisma, PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs'


const prisma = new PrismaClient({ log: ['error', 'query', 'info', 'warn'] })

const users: Prisma.UserCreateInput[] = [
    {
        name: 'Arita',
        email: 'artia@email.com',
        username: 'arita',
        password: bcrypt.hashSync('arita', 8),
        avatar: 'https://avatars.dicebear.com/api/avataaars/Arita.svg'
    },
    {
        name: 'Ilir',
        email: 'ilir@email.com',
        username: 'ilir',
        password: bcrypt.hashSync('ilir1234', 8),
        avatar: 'https://avatars.dicebear.com/api/avataaars/Ilir.svg',

    },
    {
        name: 'Adriano',
        email: 'adriano@email.com',
        username: 'adriano',
        password: bcrypt.hashSync('adriano', 8),
        avatar: 'https://avatars.dicebear.com/api/avataaars/Adriano.svg',


    },
    {
        name: 'Denis',
        email: 'denis@email.com',
        username: 'denis',
        password: bcrypt.hashSync('denis', 8),
        avatar: 'https://avatars.dicebear.com/api/avataaars/Denis.svg',


    },
    {
        name: 'Nicolas',
        email: 'nicolas@email.com',
        username: 'nicolas',
        password: bcrypt.hashSync('nicolas', 8),
        avatar: 'https://avatars.dicebear.com/api/avataaars/Nicolas.svg',
        following: {
            connect: [
                {
                    username: 'ilir'
                },
                {
                    username: 'denis'
                },

            ]
        }

    },
    {
        name: 'Ed',
        email: 'ed@email.com',
        username: 'ed',
        password: bcrypt.hashSync('ed', 8),
        avatar: 'https://avatars.dicebear.com/api/avataaars/Ed.svg',
        following: {
            connect: [{
                username: 'ilir'
            },
            {
                username: 'nicolas'
            }
            ]
        }

    }

]


const images: Prisma.ImageCreateInput[] = [
    {
        title: 'Cloud',
        link: 'https://dr.savee-cdn.com/things/6/2/30c8f087a8d9e5bd48ede9.jpg',
        category: 'Abstract',
        user: {
            connect: {
                username: 'arita'
            }
        }
    },
    {
        title: 'Nike',
        link: 'https://dr.savee-cdn.com/things/6/2/5425bb970f7c412772a5f9.jpg',
        category: 'Sport',
        user: {
            connect: {
                username: 'ilir'
            }
        }
    },
    {
        title: 'Walking',
        link: 'https://dr.savee-cdn.com/things/6/2/4b87ba4b883e51eb848905.jpg',
        category: 'Nature',
        user: {
            connect: {
                username: 'adriano'
            }
        }
    },

]

const saved: Prisma.SavedCreateInput[] = [
    {
        user: {
            connect: {
                username: 'arita'
            }
        },
        image: {
            connect: {
                id: 2
            }
        }
    },
    {
        user: {
            connect: {
                username: 'nicolas'
            }
        },
        image: {
            connect: {
                id: 1
            }
        }
    },
    {
        user: {
            connect: {
                username: 'ed'
            }
        },
        image: {
            connect: {
                id: 3
            }
        }
    }
]

const colors: Prisma.ColorCreateInput[] = [
    {
        name: '#ffffff'
    },
    {
        name: '#efefef'
    },
    {
        name: '#050e23'
    }
]

const imageColors: Prisma.ImageColorsCreateInput[] = [
    {
        image: {
            connect: {
                id: 2
            }
        },
        color: {
            connect:
            {
                id: 1
            }

        }
    },
    {
        image: {
            connect: {
                id: 2
            }
        },
        color: {
            connect:
            {
                id: 2
            }

        }
    },
    {
        image: {
            connect: {
                id: 3
            }
        },
        color: {
            connect:
            {
                id: 3
            }

        }
    },
]

async function createStuff() {
    for (const user of users) {
        await prisma.user.create({ data: user })
    }
    for (const image of images) {
        await prisma.image.create({ data: image })
    }
    for (const save of saved) {
        await prisma.saved.create({ data: save })
    }
    for (const color of colors) {
        await prisma.color.create({ data: color })
    }
    for (const imageColor of imageColors) {
        await prisma.imageColors.create({ data: imageColor })
    }
}

createStuff()
