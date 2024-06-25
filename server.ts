import { app } from './src/app'

const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
    try {
        console.log(`Server listening on http://localhost:${PORT}`)
    } catch (err) {
        console.error('Error starting server', err)
    }
})
