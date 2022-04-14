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
        avatar: 'https://images.genius.com/afd4d325e2f476aa5cc281aac517e36f.1000x1000x1.png',


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
        title: 'Numbers',
        link: 'https://dr.savee-cdn.com/things/6/2/4ea0c1c8e8d50c47ec9d58.gif',
        category: 'Abstract',
        user: {
            connect: {
                username: 'arita'
            }
        }
    },
    {
        title: 'Gestura',
        link: 'https://dr.savee-cdn.com/things/thumbnails/6/2/4f4da3382470053e181c72.jpg',
        category: 'Art',
        user: {
            connect: {
                username: 'ilir'
            }
        }
    },
    {
        title: 'Modern House',
        link: 'https://dr.savee-cdn.com/things/thumbnails/6/2/4b8803acfdabf6e8772757.jpg',
        category: 'Nature',
        user: {
            connect: {
                username: 'adriano'
            }
        }
    },
    {
        title: 'Dua Lipa',
        link: 'https://dr.savee-cdn.com/things/thumbnails/6/2/4da55c3b0b5addef0f4d82.jpg',
        category: 'Art',
        user: {
            connect: {
                username: 'arita'
            }
        }
    },
    {
        title: 'Dark Gray',
        link: 'https://dr.savee-cdn.com/things/thumbnails/6/2/4c6f813b0b5addef0b36e3.jpg',
        category: 'Art',
        user: {
            connect: {
                username: 'ilir'
            }
        }
    },
    {
        title: 'Saying',
        link: 'https://dr.savee-cdn.com/things/thumbnails/6/2/4c91ef7839360dc9cb0949.jpg',
        category: 'Art',
        user: {
            connect: {
                username: 'adriano'
            }
        }
    },
    {
        title: 'Pink Mirror',
        link: 'https://dr.savee-cdn.com/things/thumbnails/6/2/4c830175fffa000d68ddff.jpg',
        category: 'Art',
        user: {
            connect: {
                username: 'arita'
            }
        }
    },
    {
        title: 'Palms and Car',
        link: 'https://dr.savee-cdn.com/things/thumbnails/6/2/4b87f9acfdabf6e8772675.jpg',
        category: 'Nature',
        user: {
            connect: {
                username: 'ilir'
            }
        }
    },
    {
        title: 'Adidas Shoe',
        link: 'https://dr.savee-cdn.com/things/thumbnails/6/2/4b87e3acfdabf6e8772568.jpg',
        category: 'Clothes',
        user: {
            connect: {
                username: 'ilir'
            }
        }
    },
    {
        title: 'Girl in nature',
        link: 'https://dr.savee-cdn.com/things/thumbnails/6/1/e43d8697636ac8f308392b.jpg',
        category: 'Nature',
        user: {
            connect: {
                username: 'adriano'
            }
        }
    },

    {
        title: 'Modern Art',
        link: 'https://dr.savee-cdn.com/things/thumbnails/6/2/4567ac89842e706ba83076.jpg',
        category: 'Art',
        user: {
            connect: {
                username: 'arita'
            }
        }
    },
    {
        title: 'Lifestyle',
        link: 'https://dr.savee-cdn.com/things/thumbnails/6/1/2a50925b73e2930e8c03a2.jpg',
        category: 'Nature',
        user: {
            connect: {
                username: 'adriano'
            }
        }
    },
    {
        title: 'Orange lifestyle',
        link: 'https://dr.savee-cdn.com/things/thumbnails/6/2/4389c8010aa3ee61252896.jpg',
        category: 'Nature',
        user: {
            connect: {
                username: 'ilir'
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
