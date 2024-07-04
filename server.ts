import { app } from 'app'
import { db } from 'db'

const PORT = process.env.PORT || 8080

app.listen(PORT, async () => {
    try {
        const [batchNo, migrations]: [number, Array<string>] = await db.migrate.latest()

        migrations.forEach((file) => {
            console.log(`Ran migration file ${file} in batch ${batchNo}.`)
        })

        const [seeds]: [Array<string>] = await db.seed.run()

        seeds.forEach((seed) => {
            console.log(`Processed seed file ${seed}.`)
        })

        console.log(`Server listening on http://localhost:${PORT}`)
    } catch (err) {
        console.error('Error starting server', err)
    }
})
