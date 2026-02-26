
import { prisma } from '../src/prisma.js'

async function main() {
    await prisma.author.create({
        data: {
            email: 'author1@example.org',
            name: 'author one'
        }
    })
    await prisma.author.create({
        data: {
            email: 'author2@example.org',
            name: 'author two'
        }
    })
    await prisma.author.create({
        data: {
            email: 'author3@example.org',
            name: 'author three'
        }
    })
    await prisma.author.create({
        data: {
            email: 'author4@example.org',
            name: 'author four'
        }
    })
    await prisma.author.create({
        data: {
            email: 'author5@example.org',
            name: 'author five'
        }
    })
    await prisma.author.create({
        data: {
            email: 'author6@example.org',
            name: 'author six'
        }
    })
    await prisma.author.create({
        data: {
            email: 'author7@example.org',
            name: 'author seven'
        }
    })
    await prisma.author.create({
        data: {
            email: 'author8@example.org',
            name: 'author seven'
        }
    })
    await prisma.author.create({
        data: {
            email: 'author9@example.org',
            name: 'author seven'
        }
    })
    await prisma.author.create({
        data: {
            email: 'author10@example.org',
            name: 'author seven'
        }
    })
    await prisma.author.create({
        data: {
            email: 'author11@example.org',
            name: 'author seven'
        }
    })

    //Ellefu fréttir
    await prisma.news.create({
        data: {
            slug:"frett-eitt",
            title:"Frétt eitt",
            excerpt:"Þetta er stutt frétt",
            content: "Þetta er löng frétt",
            published:false,
            authorId:1
        }
    })

        await prisma.news.create({
        data: {
            slug:"frett-tvo",
            title:"Frétt tvö",
            excerpt:"Þetta er stutt frétt",
            content: "Þetta er löng frétt",
            published:true,
            authorId:2
        }
    })

        await prisma.news.create({
        data: {
            slug:"frett-thrir",
            title:"Frettt þrjú",
            excerpt:"Þetta er stutt frétt",
            content: "Þetta er löng frétt",
            published:false,
            authorId:3
        }
    })

        await prisma.news.create({
        data: {
            slug:"frett-fjorir",
            title:"Frétt fjögur",
            excerpt:"Þetta er stutt frétt",
            content: "Þetta er löng frétt",
            published:true,
            authorId:4
        }
    })

        await prisma.news.create({
        data: {
            slug:"frett-fimm",
            title:"Frétt fimm",
            excerpt:"Þetta er stutt frétt",
            content: "Þetta er löng frétt",
            published:false,
            authorId:5
        }
    })

        await prisma.news.create({
        data: {
            slug:"frett-sex",
            title:"Frétt sex",
            excerpt:"Þetta er stutt frétt",
            content: "Þetta er löng frétt",
            published:true,
            authorId:6
        }
    })

        await prisma.news.create({
        data: {
            slug:"frett-sjo",
            title:"Frétt sjö",
            excerpt:"Þetta er stutt frétt",
            content: "Þetta er löng frétt",
            published:false,
            authorId:7
        }
    })

        await prisma.news.create({
        data: {
            slug:"frett-atta",
            title:"Frétt átta",
            excerpt:"Þetta er stutt frétt",
            content: "Þetta er löng frétt",
            published:true,
            authorId:1
        }
    })

        await prisma.news.create({
        data: {
            slug:"frett-niu",
            title:"Frétt níu",
            excerpt:"Þetta er stutt frétt",
            content: "Þetta er löng frétt",
            published:false,
            authorId:1
        }
    })

        await prisma.news.create({
        data: {
            slug:"frettt-tiu",
            title:"Frétt tíu",
            excerpt:"Þetta er stutt frétt",
            content: "Þetta er löng frétt",
            published:true,
            authorId:7
        }
    })

        await prisma.news.create({
        data: {
            slug:"frett-ellefu",
            title:"Frétt ellefu",
            excerpt:"Þetta er stutt frétt",
            content: "Þetta er löng frétt",
            published:false,
            authorId:1
        }
    })
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });