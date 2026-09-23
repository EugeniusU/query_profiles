import { PrismaClient, Prisma } from "../dist/generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const profileData: Prisma.ProfileCreateInput[] = [
    {
        name: "Alice",
        description: "Test profile for Alice",
        experiences: {
            create: [
                {
                    company: "Company name 1",
                    position: "Backend developer",
                    startedAt: new Date("2018-01-10"),
                    finishedAt: new Date("2019-01-10"),
                    project: {
                        create: {
                            name: "Project 1",
                            description: "First project",
                            projectLink: "https://example.org",
                            sourceCode: "https://github.com",
                        }
                    }
                },
                {
                    company: "Company name 2",
                    position: "Backend developer",
                    startedAt: new Date("2019-05-17"),
                    finishedAt: new Date("2020-07-10"),
                    project: {
                        create: {
                            name: "Project 2",
                        }
                    }
                },
                {
                    company: "Company name 3",
                    position: "NodeJS services engineer",
                    startedAt: new Date("2020-10-11"),
                    finishedAt: null,
                    project: {
                        create: {
                            name: "Project 3",
                            description: "Highload project with realtime data processing"
                        }
                    }
                }
            ]
        },
        skills: {
            create: [
                {
                    name: "Algorithms"
                },
                {
                    name: "Data structures"
                },
                {
                    name: "NodeJS expert"
                }
            ]
        }
    },
    {
        name: "Bob",
        description: "Test profile for Bob",
        experiences: {
            create: [
                {
                    company: "Company name 4",
                    position: "Frontend developer",
                    startedAt: new Date("2020-10-10"),
                    finishedAt: new Date("2024-01-17"),
                    project: {
                        create: {
                            name: "Project 1",
                            description: "Just for testing",
                            projectLink: "https://example.org",
                            sourceCode: "https://github.com",
                        }
                    }
                },
                {
                    company: "Company name 5",
                    position: "Fullstack",
                    startedAt: new Date("2024-04-01"),
                    finishedAt: new Date("2026-07-11"),
                    project: {
                        create: {
                            name: "Project 2",
                            description: "Other project"
                        }
                    }
                }
            ]   
        },
        skills: {
            connectOrCreate: [
                {
                    where: {
                        name: "Algorithms"
                    },
                    create: {
                        name: "Algorithms"
                    }
                },
                {
                    where: {
                        name: "Data structures"
                    },
                    create: {
                        name: "Data structures"
                    }
                }
            ]
        }
    }
];

async function main() {
    console.log("start seeding");

    for (const item of profileData) {
        const existProfile = await prisma.profile.findFirst({
            where: { name: item.name }
        });

        if (existProfile) {
            console.log("Find exist profile, skip");
            continue;
        }

       const profile = await prisma.profile.create({
            data: item
       });

       console.log("Insert profile with id", profile.id);        
    }
    
    console.log("seeding finished");
}

main()
.then(async () => {
    await prisma.$disconnect();
})
.catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
})