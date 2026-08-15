import app from './app'

const PORT = Number(process.env.PORT ?? 4000)

app.listen(PORT, () => {
  console.log(`API Kampung Mandiri Sentra Tempe berjalan di http://localhost:${PORT}`)
})
