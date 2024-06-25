import { app } from './src/app'

const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
    console.log(`Server listening on port: ${PORT}`)
})
