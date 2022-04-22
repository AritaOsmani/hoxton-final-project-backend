import { Prisma, PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs'


const prisma = new PrismaClient({ log: ['error', 'query', 'info', 'warn'] })

const users: Prisma.UserCreateInput[] = [
    {
        name: 'Arita',
        email: 'arita@email.com',
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
        name: 'Visard',
        email: 'visard@email.com',
        username: 'visard',
        password: bcrypt.hashSync('visard', 8),
        avatar: 'https://avatars.dicebear.com/api/avataaars/Visard.svg',

    },
    {
        name: 'Egon',
        email: 'egon@email.com',
        username: 'egon',
        password: bcrypt.hashSync('egon', 8),
        avatar: 'https://avatars.dicebear.com/api/avataaars/Egon.svg',
    },
    {
        name: 'Marvin',
        email: 'marvin@email.com',
        username: 'marvin',
        password: bcrypt.hashSync('marvin', 8),
        avatar: 'https://avatars.dicebear.com/api/avataaars/Marvin.svg',
    },
    {
        name: 'Rinor',
        email: 'rinor@email.com',
        username: 'rinor',
        password: bcrypt.hashSync('rinor', 8),
        avatar: 'https://avatars.dicebear.com/api/avataaars/Rinor.svg',
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

    },
    {
        name: 'Artiola',
        username: 'artiola',
        email: 'artiola@email.com',
        password: bcrypt.hashSync('artiola', 8),
        avatar: 'https://avatars.dicebear.com/api/avataaars/Artiola.svg',

    },
    {
        name: 'Desintila',
        username: 'desintila',
        email: 'desintila@email.com',
        password: bcrypt.hashSync('desintila', 8),
        avatar: 'https://avatars.dicebear.com/api/avataaars/Desintila.svg',

    },
    {
        name: 'Besim',
        username: 'besim',
        email: 'besim@email.com',
        password: bcrypt.hashSync('besim', 8),
        avatar: 'https://avatars.dicebear.com/api/avataaars/Besim.svg',

    },
    {
        name: 'Endi',
        username: 'endi',
        email: 'endi@email.com',
        password: bcrypt.hashSync('endi', 8),
        avatar: 'https://avatars.dicebear.com/api/avataaars/Endi.svg',

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
    {
        title: 'Yellow Poster Girl',
        link: 'https://dr.savee-cdn.com/things/thumbnails/6/2/294856fb2f97b00a948eeb.jpg',
        category: 'Art',
        user: {
            connect: {
                username: 'artiola'
            }
        }
    },

    {
        title: 'Neon Girl',
        link: 'https://dr.savee-cdn.com/things/thumbnails/5/9/762b523767a07a76f62a61.jpg',
        category: 'Art',
        user: {
            connect: {
                username: 'artiola'
            }
        }
    },
    {
        title: 'Orange man',
        link: 'https://dr.savee-cdn.com/things/thumbnails/5/e/a6955cc73aad70dea0fcaa.jpg',
        category: 'Art',
        user: {
            connect: {
                username: 'artiola'
            }
        }
    },

    {
        title: 'Red and black',
        link: 'https://dr.savee-cdn.com/things/thumbnails/6/2/61bbd76e67a560187227ff.jpg',
        category: 'Art',
        user: {
            connect: {
                username: 'artiola'
            }
        }
    },
    {
        title: 'Voyage',
        link: 'https://dr.savee-cdn.com/things/thumbnails/6/2/616fedf9ba6f22190c21f6.jpg',
        category: 'Art',
        user: {
            connect: {
                username: 'desintila'
            }
        }
    },
    {
        title: 'Plant',
        link: 'https://dr.savee-cdn.com/things/thumbnails/6/2/616f48f9ba6f22190c1907.jpg',
        category: 'Art',
        user: {
            connect: {
                username: 'desintila'
            }
        }
    },
    {
        title: 'Orange smth',
        link: 'https://dr.savee-cdn.com/things/thumbnails/6/2/616efe0d92506cc953835b.jpg',
        category: 'Art',
        user: {
            connect: {
                username: 'endi'
            }
        }
    },
    {
        title: 'Orange hat',
        link: 'https://dr.savee-cdn.com/things/thumbnails/6/2/40f81df61726a6c4235be0.jpg',
        category: 'Art',
        user: {
            connect: {
                username: 'besim'
            }
        }
    },
    {
        title: 'Neutral home',
        link: 'https://dr.savee-cdn.com/things/thumbnails/6/2/616ef70d92506cc95382c5.jpg',
        category: 'Art',
        user: {
            connect: {
                username: 'besim'
            }
        }
    },
    {
        title: 'Black wall',
        link: 'https://dr.savee-cdn.com/things/thumbnails/6/2/616e55b51f4c09eedb5447.jpg',
        category: 'Art',
        user: {
            connect: {
                username: 'rinor'
            }
        }
    },
    {
        title: 'Italian House',
        link: 'https://dr.savee-cdn.com/things/thumbnails/6/2/60422ee73c1547f3890968.jpg',
        category: 'Art',
        user: {
            connect: {
                username: 'rinor'
            }
        }
    },
    {
        title: 'Marlboro',
        link: 'https://dr.savee-cdn.com/things/thumbnails/5/a/33a67822bd325d6c9ef5ac.jpg',
        category: 'Art',
        user: {
            connect: {
                username: 'rinor'
            }
        }
    },
    {
        title: 'Black background',
        link: 'https://dr.savee-cdn.com/things/thumbnails/6/2/5ac3203b65e50e10f10fb9.jpg',
        category: 'Art',
        user: {
            connect: {
                username: 'marvin'
            }
        }
    },
    {
        title: 'Aesthetics',
        link: 'https://dr.savee-cdn.com/things/thumbnails/6/2/5ac1af66aac0382c781b52.jpg',
        category: 'Art',
        user: {
            connect: {
                username: 'marvin'
            }
        }
    },
    {
        title: 'Black vase',
        link: 'https://dr.savee-cdn.com/things/thumbnails/6/2/5ac23d66aac0382c781d16.jpg',
        category: 'Art',
        user: {
            connect: {
                username: 'visard'
            }
        }
    },
    {
        title: 'Man\'s clan',
        link: 'https://dr.savee-cdn.com/things/thumbnails/5/c/115821f627d57980ddaaeb.jpg',
        category: 'Art',
        user: {
            connect: {
                username: 'visard'
            }
        }
    },
    {
        title: 'Lost man',
        link: 'https://dr.savee-cdn.com/things/thumbnails/6/2/54260cd97f6444a0933a95.jpg',
        category: 'Art',
        user: {
            connect: {
                username: 'egon'
            }
        }
    },
    {
        title: 'white 1',
        link: 'https://dr.savee-cdn.com/things/5/6/c79275c6e6107a6f3c8462.jpeg',
        category: 'Art',
        user: {
            connect: {
                username: 'artiola'
            }
        }
    },
    {
        title: 'white 2',
        link: 'https://dr.savee-cdn.com/things/thumbnails/5/7/4de2f5d9bbfcef5ce3b560.jpg',
        category: 'Art',
        user: {
            connect: {
                username: 'artiola'
            }
        }
    },
    {
        title: 'white 3',
        link: 'https://dr.savee-cdn.com/things/thumbnails/5/7/4de2fbd9bbfcef5ce3b565.jpg',
        category: 'Art',
        user: {
            connect: {
                username: 'artiola'
            }
        }
    },
    {
        title: 'white 4',
        link: 'https://dr.savee-cdn.com/things/thumbnails/5/6/c797c2c6e6107a6f3c888a.jpg',
        category: 'Art',
        user: {
            connect: {
                username: 'artiola'
            }
        }
    },
    {
        title: 'white 5',
        link: 'https://dr.savee-cdn.com/things/5/9/667a7ece6f72699136235b.gif',
        category: 'Art',
        user: {
            connect: {
                username: 'artiola'
            }
        }
    },
    {
        title: 'white 6',
        link: 'https://dr.savee-cdn.com/things/thumbnails/5/9/4d77c32f118c1c4c50bc17.jpg',
        category: 'Art',
        user: {
            connect: {
                username: 'artiola'
            }
        }
    },
    {
        title: 'white 7',
        link: 'https://dr.savee-cdn.com/things/thumbnails/5/9/665dc4ce6f72699135dbd6.jpg',
        category: 'Art',
        user: {
            connect: {
                username: 'artiola'
            }
        }
    },
    {
        title: 'white 8',
        link: 'https://dr.savee-cdn.com/things/thumbnails/5/8/7d4703e119eb2073a02c84.jpg',
        category: 'Art',
        user: {
            connect: {
                username: 'artiola'
            }
        }
    },
    {
        title: 'white 9',
        link: 'https://dr.savee-cdn.com/things/thumbnails/5/a/169537aca7a45d9d7aad5c.jpg',
        category: 'Art',
        user: {
            connect: {
                username: 'artiola'
            }
        }
    },
    {
        title: 'white 10',
        link: 'https://dr.savee-cdn.com/things/thumbnails/5/9/665dd6ce6f72699135dc0b.jpg',
        category: 'Art',
        user: {
            connect: {
                username: 'artiola'
            }
        }
    },
    {
        title: 'pink-1',
        link: 'https://dr.savee-cdn.com/things/thumbnails/5/9/773b042eea075250960826.jpg',
        category: 'Art',
        user: {
            connect: {
                username: 'artiola'
            }
        }
    },
    {
        title: 'pink-2',
        link: 'https://dr.savee-cdn.com/things/thumbnails/6/1/2e5f1db8cc2f70c072ca1a.jpg',
        category: 'Art',
        user: {
            connect: {
                username: 'artiola'
            }
        }
    },
    {
        title: 'pink-3',
        link: 'https://dr.savee-cdn.com/things/thumbnails/5/9/ceb1d122bd325d6c9dddba.jpg',
        category: 'Art',
        user: {
            connect: {
                username: 'artiola'
            }
        }
    },
    {
        title: 'pink-4',
        link: 'https://dr.savee-cdn.com/things/thumbnails/5/a/84ce5bb6f6a8673d146a7f.jpg',
        category: 'Art',
        user: {
            connect: {
                username: 'artiola'
            }
        }
    },
    {
        title: 'pink-5',
        link: 'https://dr.savee-cdn.com/things/thumbnails/6/1/50f13b6fd07e3f5034bad2.jpg',
        category: 'Art',
        user: {
            connect: {
                username: 'artiola'
            }
        }
    },
    {
        title: 'pink-6',
        link: 'https://dr.savee-cdn.com/things/5/9/93200aaf6bf62f9a79578d.gif',
        category: 'Art',
        user: {
            connect: {
                username: 'artiola'
            }
        }
    },
    {
        title: 'pink-7',
        link: 'https://dr.savee-cdn.com/things/thumbnails/5/e/3b23cea9ca2657d4f8f673.jpg',
        category: 'Art',
        user: {
            connect: {
                username: 'artiola'
            }
        }
    },
    {
        title: 'pink-8',
        link: 'https://dr.savee-cdn.com/things/thumbnails/5/9/7f8d009593a643267be013.jpg',
        category: 'Art',
        user: {
            connect: {
                username: 'artiola'
            }
        }
    },
    {
        title: 'pink-9',
        link: 'https://dr.savee-cdn.com/things/thumbnails/6/0/29cd3b51d6202e37251d63.jpg',
        category: 'Art',
        user: {
            connect: {
                username: 'artiola'
            }
        }
    },
    {
        title: 'pink-10',
        link: 'https://dr.savee-cdn.com/things/thumbnails/6/2/1e9606f59decaeb7b1e051.jpg',
        category: 'Art',
        user: {
            connect: {
                username: 'artiola'
            }
        }
    },
    {
        title: 'black-1',
        link: 'https://dr.savee-cdn.com/things/thumbnails/5/c/955af8b2f8dc4dd16367c7.jpg',
        category: 'Art',
        user: {
            connect: {
                username: 'visard'
            }
        }
    },
    {
        title: 'black-2',
        link: 'https://dr.savee-cdn.com/things/thumbnails/5/c/a3570951a20524093b7163.jpg',
        category: 'Art',
        user: {
            connect: {
                username: 'visard'
            }
        }
    },
    {
        title: 'black-3',
        link: 'https://dr.savee-cdn.com/things/thumbnails/5/d/e6d7a464aa903cfe6eb766.jpg',
        category: 'Art',
        user: {
            connect: {
                username: 'visard'
            }
        }
    },
    {
        title: 'black-4',
        link: 'https://dr.savee-cdn.com/things/thumbnails/5/d/c6e3f0b2281617966230e7.jpg',
        category: 'Art',
        user: {
            connect: {
                username: 'visard'
            }
        }
    },
    {
        title: 'black-5',
        link: 'https://dr.savee-cdn.com/things/thumbnails/5/d/e90b3b2c33a037c2c47b6e.jpg',
        category: 'Art',
        user: {
            connect: {
                username: 'visard'
            }
        }
    },
    {
        title: 'black-6',
        link: 'https://dr.savee-cdn.com/things/thumbnails/5/e/10691db401b53b20c11b03.jpg',
        category: 'Art',
        user: {
            connect: {
                username: 'visard'
            }
        }
    },
    {
        title: 'black-7',
        link: 'https://dr.savee-cdn.com/things/thumbnails/5/c/0550eea7d14c4923783168.jpg',
        category: 'Art',
        user: {
            connect: {
                username: 'visard'
            }
        }
    },
    {
        title: 'black-8',
        link: 'https://dr.savee-cdn.com/things/5/b/eec0cafff57a530b4df565.jpg',
        category: 'Art',
        user: {
            connect: {
                username: 'visard'
            }
        }
    },
    {
        title: 'black-9',
        link: 'https://dr.savee-cdn.com/things/5/c/722af99ee2500efa35a1f2.gif',
        category: 'Art',
        user: {
            connect: {
                username: 'visard'
            }
        }
    },
    {
        title: 'black-10',
        link: 'https://dr.savee-cdn.com/things/5/a/01ae3c8c02225d663270a9.png',
        category: 'Art',
        user: {
            connect: {
                username: 'visard'
            }
        }
    },

    {
        title: 'Yellow-1',
        link: 'https://dr.savee-cdn.com/things/5/9/837acfc0dce3323cf49251.jpg',
        category: 'Art',
        user: {
            connect: {
                username: 'egon'
            }
        }
    },
    {
        title: 'Yellow-2',
        link: 'https://dr.savee-cdn.com/things/5/9/837acfc0dce3323cf49251.jpg',
        category: 'Art',
        user: {
            connect: {
                username: 'egon'
            }
        }
    },
    {
        title: 'Yellow-3',
        link: 'https://dr.savee-cdn.com/things/5/9/7117c7ace78b5e43fb5044.jpg',
        category: 'Art',
        user: {
            connect: {
                username: 'arita'
            }
        }
    },

    {
        title: 'Yellow-4',
        link: 'https://dr.savee-cdn.com/things/5/9/706e62bb17a81552538c97.jpg',
        category: 'Art',
        user: {
            connect: {
                username: 'ilir'
            }
        }
    },

    {
        title: 'Yellow-5',
        link: 'https://dr.savee-cdn.com/things/5/9/7117c7ace78b5e43fb5044.jpg',
        category: 'Art',
        user: {
            connect: {
                username: 'arita'
            }
        }
    },

    {
        title: 'Yellow-6',
        link: 'https://dr.savee-cdn.com/things/5/9/bf91528cf37e21677f1e27.jpg',
        category: 'Art',
        user: {
            connect: {
                username: 'artiola'
            }
        }
    },

    {
        title: 'Yellow-7',
        link: 'https://dr.savee-cdn.com/things/5/9/78a9e6d47bba7b1610036d.jpg',
        category: 'Art',
        user: {
            connect: {
                username: 'besim'
            }
        }
    },

    {
        title: 'Yellow-8',
        link: 'https://dr.savee-cdn.com/things/5/f/71ab718357893d87370da5.jpg',
        category: 'Art',
        user: {
            connect: {
                username: 'rinor'
            }
        }
    },


    {
        title: 'Yellow-9',
        link: 'https://dr.savee-cdn.com/things/6/2/0b9d1d5ce30f230b0438cf.jpg',
        category: 'Art',
        user: {
            connect: {
                username: 'desintila'
            }
        }
    },

    {
        title: 'Yellow-10',
        link: 'https://dr.savee-cdn.com/things/5/c/db00d2e8fc9477c1701e66.jpg',
        category: 'Art',
        user: {
            connect: {
                username: 'desintila'
            }
        }
    },


    {
        title: 'blue-1',
        link: 'https://dr.savee-cdn.com/things/5/e/d61c0b74667079a182613c.png',
        category: 'Art',
        user: {
            connect: {
                username: 'desintila'
            }
        }
    },

    {
        title: 'blue-2',
        link: 'https://dr.savee-cdn.com/things/5/9/829a3b8f604513d94e7561.jpg',
        category: 'Art',
        user: {
            connect: {
                username: 'arita'
            }
        }
    },

    {
        title: 'blue-3',
        link: 'https://dr.savee-cdn.com/things/6/1/cacb0a9e1cd10ee3bd3ab7.jpg',
        category: 'Art',
        user: {
            connect: {
                username: 'denis'
            }
        }
    },

    {
        title: 'blue-4',
        link: 'https://dr.savee-cdn.com/things/5/b/b26ca5e741a4736e8b8d99.png',
        category: 'Art',
        user: {
            connect: {
                username: 'adriano'
            }
        }
    },

    {
        title: 'blue-5',
        link: 'https://dr.savee-cdn.com/things/5/b/8fb70c1f8c105c5110abd0.jpg',
        category: 'Art',
        user: {
            connect: {
                username: 'adriano'
            }
        }
    },

    {
        title: 'blue-6',
        link: 'https://dr.savee-cdn.com/things/6/0/3aa3d13d091735b0d3aea6.jpg',
        category: 'Art',
        user: {
            connect: {
                username: 'marvin'
            }
        }
    },

    {
        title: 'blue-7',
        link: 'https://dr.savee-cdn.com/things/5/f/f41e34254a3c511ad41961.png',
        category: 'Art',
        user: {
            connect: {
                username: 'egon'
            }
        }
    },

    {
        title: 'blue-8',
        link: 'https://dr.savee-cdn.com/things/6/1/e86c1baf79aee6429987ad.png',
        category: 'Art',
        user: {
            connect: {
                username: 'visard'
            }
        }
    },

    {
        title: 'blue-9',
        link: 'https://dr.savee-cdn.com/things/5/7/83c267f44c17df43ff0083.jpg',
        category: 'Art',
        user: {
            connect: {
                username: 'endi'
            }
        }
    },

    {
        title: 'blue-10',
        link: 'https://dr.savee-cdn.com/things/5/f/8eefb4884fe33f1db32a7e.jpg',
        category: 'Art',
        user: {
            connect: {
                username: 'endi'
            }
        }
    },

    {
        title: 'green 1',
        link: 'https://dr.savee-cdn.com/things/thumbnails/6/2/444ddf5646ff25c167877b.jpg',
        category: 'Art',
        user: {
            connect: {
                username: 'besim'
            }
        }
    },
    {
        title: 'green 2',
        link: 'https://dr.savee-cdn.com/things/thumbnails/5/9/9726d99f3b9b66df83f6e9.jpg',
        category: 'Art',
        user: {
            connect: {
                username: 'besim'
            }
        }
    },
    {
        title: 'green 3',
        link: 'https://dr.savee-cdn.com/things/thumbnails/5/a/2b97dbb588cb5d35c7b945.jpg',
        category: 'Art',
        user: {
            connect: {
                username: 'besim'
            }
        }
    },
    {
        title: 'green 4',
        link: 'https://dr.savee-cdn.com/things/5/9/9d9d38fcb5b21e693b9d7b.gif',
        category: 'Art',
        user: {
            connect: {
                username: 'besim'
            }
        }
    },
    {
        title: 'green 5',
        link: 'https://dr.savee-cdn.com/things/5/f/e9494ddf97492512273315.gif',
        category: 'Art',
        user: {
            connect: {
                username: 'besim'
            }
        }
    },
    {
        title: 'green 6',
        link: 'https://dr.savee-cdn.com/things/thumbnails/5/f/ece8706aeffc623e305bb5.jpg',
        category: 'Art',
        user: {
            connect: {
                username: 'besim'
            }
        }
    },
    {
        title: 'green 7',
        link: 'https://dr.savee-cdn.com/things/5/9/a825f9c8511b04f96710f5.gif',
        category: 'Art',
        user: {
            connect: {
                username: 'besim'
            }
        }
    },
    {
        title: 'green 8',
        link: 'https://dr.savee-cdn.com/things/5/9/a825f8baf1a404f3ac4926.gif',
        category: 'Art',
        user: {
            connect: {
                username: 'besim'
            }
        }
    },
    {
        title: 'green 9',
        link: 'https://dr.savee-cdn.com/things/thumbnails/5/f/b5d094a3d756228e99d88b.jpg',
        category: 'Art',
        user: {
            connect: {
                username: 'besim'
            }
        }
    },
    {
        title: 'green 10',
        link: 'https://dr.savee-cdn.com/things/thumbnails/5/f/c7b180e3e9ea454434d1a0.jpg',
        category: 'Art',
        user: {
            connect: {
                username: 'besim'
            }
        }
    },
    {
        title: 'violet 1',
        link: 'https://dr.savee-cdn.com/things/5/c/c09d679098f92000abe92f.png',
        category: 'Art',
        user: {
            connect: {
                username: 'denis'
            }
        }
    },
    {
        title: 'violet 2',
        link: 'https://dr.savee-cdn.com/things/6/1/83c0ed32076cba3fff914e.jpghttps://dr.savee-cdn.com/things/5/c/c09d679098f92000abe92f.png',
        category: 'Art',
        user: {
            connect: {
                username: 'denis'
            }
        }
    },
    {
        title: 'violet 3',
        link: 'https://dr.savee-cdn.com/things/5/9/725b6cf27869348ea90b60.jpg',
        category: 'Art',
        user: {
            connect: {
                username: 'denis'
            }
        }
    },
    {
        title: 'violet 4',
        link: 'https://dr.savee-cdn.com/things/6/2/55ac9f563e177d0fe5b263.png',
        category: 'Art',
        user: {
            connect: {
                username: 'denis'
            }
        }
    },
    {
        title: 'violet 5',
        link: 'https://dr.savee-cdn.com/things/5/c/12754591c24543d36a519a.gif',
        category: 'Art',
        user: {
            connect: {
                username: 'denis'
            }
        }
    },
    {
        title: 'violet 6',
        link: 'https://dr.savee-cdn.com/things/5/f/8d0b09d2c4b87afdddabfd.jpg',
        category: 'Art',
        user: {
            connect: {
                username: 'denis'
            }
        }
    },
    {
        title: 'violet 7',
        link: 'https://dr.savee-cdn.com/things/6/0/dad1967b91464dd48a1ec8.jpg',
        category: 'Art',
        user: {
            connect: {
                username: 'denis'
            }
        }
    },
    {
        title: 'violet 8',
        link: 'https://dr.savee-cdn.com/things/5/9/760ff2b3a5fb72fbb73ad6.jpg',
        category: 'Art',
        user: {
            connect: {
                username: 'denis'
            }
        }
    },
    {
        title: 'violet 9',
        link: 'https://dr.savee-cdn.com/things/5/d/682d414291800e5f662689.png',
        category: 'Art',
        user: {
            connect: {
                username: 'denis'
            }
        }
    },
    {
        title: 'violet 10',
        link: 'https://dr.savee-cdn.com/things/5/a/a73d05e87b0251986fec89.jpg',
        category: 'Art',
        user: {
            connect: {
                username: 'denis'
            }
        }
    },
    {
        title: 'orange 1',
        link: 'https://dr.savee-cdn.com/things/thumbnails/5/a/c9a7f658524e35584ddbb8.jpg',
        category: 'Art',
        user: {
            connect: {
                username: 'desintila'
            }
        }
    },
    {
        title: 'orange 2',
        link: 'https://dr.savee-cdn.com/things/thumbnails/6/1/bb832b3b2b154a092f8a94.jpg',
        category: 'Art',
        user: {
            connect: {
                username: 'desintila'
            }
        }
    },
    {
        title: 'orange 3',
        link: 'https://dr.savee-cdn.com/things/thumbnails/5/d/b1a5bd4e791f79907702ff.jpg',
        category: 'Art',
        user: {
            connect: {
                username: 'desintila'
            }
        }
    },
    {
        title: 'orange 4',
        link: 'https://dr.savee-cdn.com/things/thumbnails/5/f/00ef19a2a95572482ae56d.jpg',
        category: 'Art',
        user: {
            connect: {
                username: 'desintila'
            }
        }
    },
    {
        title: 'orange 5',
        link: 'https://dr.savee-cdn.com/things/thumbnails/5/b/164aacef494b6aa26853b5.jpg',
        category: 'Art',
        user: {
            connect: {
                username: 'desintila'
            }
        }
    },
    {
        title: 'orange 6',
        link: 'https://dr.savee-cdn.com/things/thumbnails/5/9/668c93ce6f726991364e9a.jpg',
        category: 'Art',
        user: {
            connect: {
                username: 'desintila'
            }
        }
    },
    {
        title: 'orange 7',
        link: 'https://dr.savee-cdn.com/things/thumbnails/5/9/668c93ce6f726991364e9a.jpg',
        category: 'Art',
        user: {
            connect: {
                username: 'desintila'
            }
        }
    },
    {
        title: 'orange 8',
        link: 'https://dr.savee-cdn.com/things/thumbnails/6/0/1c75320bbf8d564ad6c6b3.jpg',
        category: 'Art',
        user: {
            connect: {
                username: 'desintila'
            }
        }
    },
    {
        title: 'orange 9',
        link: 'https://dr.savee-cdn.com/things/thumbnails/5/e/b339f303f04354d9f1d904.jpg',
        category: 'Art',
        user: {
            connect: {
                username: 'desintila'
            }
        }
    },
    {
        title: 'orange 10',
        link: 'https://dr.savee-cdn.com/things/thumbnails/6/0/34d8ab0706b77e7969f13a.jpg',
        category: 'Art',
        user: {
            connect: {
                username: 'desintila'
            }
        }
    },
    {
        title: 'dark blue 1',
        link: 'https://dr.savee-cdn.com/things/thumbnails/5/9/dcc684b588cb5d35c6defe.jpg',
        category: 'Art',
        user: {
            connect: {
                username: 'desintila'
            }
        }
    },
    {
        title: 'dark blue 2',
        link: 'https://dr.savee-cdn.com/things/thumbnails/5/a/529203c850025e10bdfeb3.jpg',
        category: 'Art',
        user: {
            connect: {
                username: 'desintila'
            }
        }
    },
    {
        title: 'dark blue 3',
        link: 'https://dr.savee-cdn.com/things/thumbnails/5/b/3350ab1c3ff31ac99ef502.jpg',
        category: 'Art',
        user: {
            connect: {
                username: 'desintila'
            }
        }
    },
    {
        title: 'dark blue 4',
        link: 'https://dr.savee-cdn.com/things/thumbnails/5/9/a821cbc8511b04f96710aa.jpg',
        category: 'Art',
        user: {
            connect: {
                username: 'desintila'
            }
        }
    },
    {
        title: 'dark blue 5',
        link: 'https://dr.savee-cdn.com/things/thumbnails/5/c/8e08d13176632fb8fbd243.jpg',
        category: 'Art',
        user: {
            connect: {
                username: 'desintila'
            }
        }
    },
    {
        title: 'dark blue 6',
        link: 'https://dr.savee-cdn.com/things/thumbnails/5/d/bd2e694a66fd3ea658317a.jpg',
        category: 'Art',
        user: {
            connect: {
                username: 'desintila'
            }
        }
    },
    {
        title: 'dark blue 7',
        link: 'https://dr.savee-cdn.com/things/thumbnails/6/0/116428a4c87f402dd4fcf7.jpg',
        category: 'Art',
        user: {
            connect: {
                username: 'desintila'
            }
        }
    },
    {
        title: 'dark blue 8',
        link: 'https://dr.savee-cdn.com/things/thumbnails/5/d/cef65ed925d63814207a73.jpg',
        category: 'Art',
        user: {
            connect: {
                username: 'desintila'
            }
        }
    },
    {
        title: 'dark blue 9',
        link: 'https://dr.savee-cdn.com/things/thumbnails/5/f/92ef404f560c0eaa1b92fc.jpg',
        category: 'Art',
        user: {
            connect: {
                username: 'desintila'
            }
        }
    },
    {
        title: 'dark blue 10',
        link: 'https://dr.savee-cdn.com/things/thumbnails/6/2/1537e6ec92f210820d30cc.jpg',
        category: 'Art',
        user: {
            connect: {
                username: 'desintila'
            }
        }
    },
]

// const saved: Prisma.SavedCreateInput[] = [
//     {
//         user: {
//             connect: {
//                 username: 'arita'
//             }
//         },
//         image: {
//             connect: {
//                 id: 2
//             }
//         }
//     },
//     {
//         user: {
//             connect: {
//                 username: 'nicolas'
//             }
//         },
//         image: {
//             connect: {
//                 id: 1
//             }
//         }
//     },
//     {
//         user: {
//             connect: {
//                 username: 'ed'
//             }
//         },
//         image: {
//             connect: {
//                 id: 3
//             }
//         }
//     }
// ]

const colors: Prisma.ColorCreateInput[] = [

    {
        name: 'ffffff'
    },
    //Hiri
    {
        name: 'efefef'
    },
    //Gjelbert
    {
        name: '91cb5d'
    },

    //Verdhe
    {
        name: 'ebe405'
    },
    //Portokalli
    {
        name: 'f96600'
    },

    //Pink
    {
        name: 'e76f99'
    },
    //Blu
    {
        name: '003fa2'
    },
    //Lejla
    {
        name: '762099'
    },
    //Kaltert e erret
    {
        name: '050e23'
    },

    //black
    {
        name: '000000'
    },


]

const imageColors: Prisma.ImageColorsCreateInput[] = [
    {
        image: {
            connect: {
                id: 31
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
                id: 31
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
                id: 32
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
                id: 32
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
                id: 33
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
                id: 33
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
                id: 34
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
                id: 34
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
                id: 35
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
                id: 35
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
                id: 36
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
                id: 36
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
                id: 37
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
                id: 37
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
                id: 38
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
                id: 38
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
                id: 39
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
                id: 39
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
                id: 40
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
                id: 101
            }
        },
        color: {
            connect:
            {
                id: 5
            }

        }
    },
    {
        image: {
            connect: {
                id: 102
            }
        },
        color: {
            connect:
            {
                id: 5
            }

        }
    },
    {
        image: {
            connect: {
                id: 103
            }
        },
        color: {
            connect:
            {
                id: 5
            }

        }
    },
    {
        image: {
            connect: {
                id: 104
            }
        },
        color: {
            connect:
            {
                id: 5
            }

        }
    },
    {
        image: {
            connect: {
                id: 105
            }
        },
        color: {
            connect:
            {
                id: 5
            }

        }
    },
    {
        image: {
            connect: {
                id: 106
            }
        },
        color: {
            connect:
            {
                id: 5
            }

        }
    },
    {
        image: {
            connect: {
                id: 107
            }
        },
        color: {
            connect:
            {
                id: 5
            }

        }
    },
    {
        image: {
            connect: {
                id: 108
            }
        },
        color: {
            connect:
            {
                id: 5
            }

        }
    },
    {
        image: {
            connect: {
                id: 109
            }
        },
        color: {
            connect:
            {
                id: 5
            }

        }
    },
    {
        image: {
            connect: {
                id: 110
            }
        },
        color: {
            connect:
            {
                id: 5
            }

        }
    },

    {
        image: {
            connect: {
                id: 61
            }
        },
        color: {
            connect:
            {
                id: 4
            }

        }
    },
    {
        image: {
            connect: {
                id: 62
            }
        },
        color: {
            connect:
            {
                id: 4
            }

        }
    }, {
        image: {
            connect: {
                id: 63
            }
        },
        color: {
            connect:
            {
                id: 4
            }

        }
    }, {
        image: {
            connect: {
                id: 64
            }
        },
        color: {
            connect:
            {
                id: 4
            }

        }
    }, {
        image: {
            connect: {
                id: 65
            }
        },
        color: {
            connect:
            {
                id: 4
            }

        }
    }, {
        image: {
            connect: {
                id: 66
            }
        },
        color: {
            connect:
            {
                id: 4
            }

        }
    }, {
        image: {
            connect: {
                id: 67
            }
        },
        color: {
            connect:
            {
                id: 4
            }

        }
    }, {
        image: {
            connect: {
                id: 68
            }
        },
        color: {
            connect:
            {
                id: 4
            }

        }
    }, {
        image: {
            connect: {
                id: 69
            }
        },
        color: {
            connect:
            {
                id: 4
            }

        }
    }, {
        image: {
            connect: {
                id: 70
            }
        },
        color: {
            connect:
            {
                id: 4
            }

        }
    },
    {
        image: {
            connect: {
                id: 41
            }
        },
        color: {
            connect:
            {
                id: 6
            }

        }
    },
    {
        image: {
            connect: {
                id: 42
            }
        },
        color: {
            connect:
            {
                id: 6
            }

        }
    },
    {
        image: {
            connect: {
                id: 43
            }
        },
        color: {
            connect:
            {
                id: 6
            }

        }
    },
    {
        image: {
            connect: {
                id: 44
            }
        },
        color: {
            connect:
            {
                id: 6
            }

        }
    },
    {
        image: {
            connect: {
                id: 45
            }
        },
        color: {
            connect:
            {
                id: 6
            }

        }
    },
    {
        image: {
            connect: {
                id: 46
            }
        },
        color: {
            connect:
            {
                id: 6
            }

        }
    },
    {
        image: {
            connect: {
                id: 47
            }
        },
        color: {
            connect:
            {
                id: 6
            }

        }
    },
    {
        image: {
            connect: {
                id: 48
            }
        },
        color: {
            connect:
            {
                id: 6
            }

        }
    },
    {
        image: {
            connect: {
                id: 49
            }
        },
        color: {
            connect:
            {
                id: 6
            }

        }
    },
    {
        image: {
            connect: {
                id: 50
            }
        },
        color: {
            connect:
            {
                id: 6
            }

        }
    },
    {
        image: {
            connect: {
                id: 111
            }
        },
        color: {
            connect:
            {
                id: 9
            }

        }
    },
    {
        image: {
            connect: {
                id: 112
            }
        },
        color: {
            connect:
            {
                id: 9
            }

        }
    },
    {
        image: {
            connect: {
                id: 113
            }
        },
        color: {
            connect:
            {
                id: 9
            }

        }
    },
    {
        image: {
            connect: {
                id: 114
            }
        },
        color: {
            connect:
            {
                id: 9
            }

        }
    },
    {
        image: {
            connect: {
                id: 115
            }
        },
        color: {
            connect:
            {
                id: 9
            }

        }
    },
    {
        image: {
            connect: {
                id: 116
            }
        },
        color: {
            connect:
            {
                id: 9
            }

        }
    },
    {
        image: {
            connect: {
                id: 117
            }
        },
        color: {
            connect:
            {
                id: 9
            }

        }
    },
    {
        image: {
            connect: {
                id: 118
            }
        },
        color: {
            connect:
            {
                id: 9
            }

        }
    },
    {
        image: {
            connect: {
                id: 119
            }
        },
        color: {
            connect:
            {
                id: 9
            }

        }
    },
    {
        image: {
            connect: {
                id: 120
            }
        },
        color: {
            connect:
            {
                id: 9
            }

        }
    },
    {
        image: {
            connect: {
                id: 40
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
                id: 51
            }
        },
        color: {
            connect:
            {
                id: 10
            }

        }
    },

    {
        image: {
            connect: {
                id: 52
            }
        },
        color: {
            connect:
            {
                id: 10
            }

        }
    },
    {
        image: {
            connect: {
                id: 53
            }
        },
        color: {
            connect:
            {
                id: 10
            }

        }
    },
    {
        image: {
            connect: {
                id: 54
            }
        },
        color: {
            connect:
            {
                id: 10
            }

        }
    },
    {
        image: {
            connect: {
                id: 55
            }
        },
        color: {
            connect:
            {
                id: 10
            }

        }
    },
    {
        image: {
            connect: {
                id: 56
            }
        },
        color: {
            connect:
            {
                id: 10
            }

        }
    },
    {
        image: {
            connect: {
                id: 57
            }
        },
        color: {
            connect:
            {
                id: 10
            }

        }
    },
    {
        image: {
            connect: {
                id: 58
            }
        },
        color: {
            connect:
            {
                id: 10
            }

        }
    },
    {
        image: {
            connect: {
                id: 60
            }
        },
        color: {
            connect:
            {
                id: 10
            }

        }
    },
    {
        image: {
            connect: {
                id: 81
            }
        },
        color: {
            connect:
            {
                id: 3
            }

        }
    },
    {
        image: {
            connect: {
                id: 82
            }
        },
        color: {
            connect:
            {
                id: 3
            }

        }
    },
    {
        image: {
            connect: {
                id: 83
            }
        },
        color: {
            connect:
            {
                id: 3
            }

        }
    },
    {
        image: {
            connect: {
                id: 85
            }
        },
        color: {
            connect:
            {
                id: 3
            }

        }
    },
    {
        image: {
            connect: {
                id: 86
            }
        },
        color: {
            connect:
            {
                id: 3
            }

        }
    },
    {
        image: {
            connect: {
                id: 87
            }
        },
        color: {
            connect:
            {
                id: 3
            }

        }
    },
    {
        image: {
            connect: {
                id: 88
            }
        },
        color: {
            connect:
            {
                id: 3
            }

        }
    },
    {
        image: {
            connect: {
                id: 89
            }
        },
        color: {
            connect:
            {
                id: 3
            }

        }
    },
    {
        image: {
            connect: {
                id: 90
            }
        },
        color: {
            connect:
            {
                id: 3
            }

        }
    },
    {
        image: {
            connect: {
                id: 91
            }
        },
        color: {
            connect:
            {
                id: 8
            }

        }
    },
    {
        image: {
            connect: {
                id: 92
            }
        },
        color: {
            connect:
            {
                id: 8
            }

        }
    },
    {
        image: {
            connect: {
                id: 93
            }
        },
        color: {
            connect:
            {
                id: 8
            }

        }
    },
    {
        image: {
            connect: {
                id: 94
            }
        },
        color: {
            connect:
            {
                id: 8
            }

        }
    },
    {
        image: {
            connect: {
                id: 95
            }
        },
        color: {
            connect:
            {
                id: 8
            }

        }
    },
    {
        image: {
            connect: {
                id: 96
            }
        },
        color: {
            connect:
            {
                id: 8
            }

        }
    },
    {
        image: {
            connect: {
                id: 97
            }
        },
        color: {
            connect:
            {
                id: 8
            }

        }
    },
    {
        image: {
            connect: {
                id: 98
            }
        },
        color: {
            connect:
            {
                id: 8
            }

        }
    },
    {
        image: {
            connect: {
                id: 99
            }
        },
        color: {
            connect:
            {
                id: 8
            }

        }
    },
    {
        image: {
            connect: {
                id: 100
            }
        },
        color: {
            connect:
            {
                id: 8
            }

        }
    },

    {
        image: {
            connect: {
                id: 71
            }
        },
        color: {
            connect:
            {
                id: 7
            }

        }
    },
    {
        image: {
            connect: {
                id: 72
            }
        },
        color: {
            connect:
            {
                id: 7
            }

        }
    },
    {
        image: {
            connect: {
                id: 73
            }
        },
        color: {
            connect:
            {
                id: 7
            }

        }
    },
    {
        image: {
            connect: {
                id: 74
            }
        },
        color: {
            connect:
            {
                id: 7
            }

        }
    },
    {
        image: {
            connect: {
                id: 75
            }
        },
        color: {
            connect:
            {
                id: 7
            }

        }
    },
    {
        image: {
            connect: {
                id: 76
            }
        },
        color: {
            connect:
            {
                id: 7
            }

        }
    },
    {
        image: {
            connect: {
                id: 77
            }
        },
        color: {
            connect:
            {
                id: 7
            }

        }
    },
    {
        image: {
            connect: {
                id: 78
            }
        },
        color: {
            connect:
            {
                id: 7
            }

        }
    },
    {
        image: {
            connect: {
                id: 79
            }
        },
        color: {
            connect:
            {
                id: 7
            }

        }
    },
    {
        image: {
            connect: {
                id: 80
            }
        },
        color: {
            connect:
            {
                id: 7
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
    // for (const save of saved) {
    //     await prisma.saved.create({ data: save })
    // }
    for (const color of colors) {
        await prisma.color.create({ data: color })
    }
    for (const imageColor of imageColors) {
        await prisma.imageColors.create({ data: imageColor })
    }
}

createStuff()
