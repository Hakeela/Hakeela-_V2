import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { MongoClient } from 'mongodb'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.join(__dirname, '.env.local') })
dotenv.config()

const app = express()
const port = process.env.PORT || 4000
const uri = process.env.MONGODB_URI
const dbName = process.env.MONGODB_DB || 'HAKEELA'

app.use(cors())
app.use(express.json({ limit: '1mb' }))

app.get('/api/health', async (req, res) => {
    if (!uri) {
        return res.status(500).json({ ok: false, message: 'MONGODB_URI is not configured.' })
    }

    try {
        const client = new MongoClient(uri)
        await client.connect()
        await client.db(dbName).command({ ping: 1 })
        await client.close()
        return res.json({ ok: true, database: dbName, message: 'MongoDB connection is healthy.' })
    } catch (error) {
        console.error('MongoDB health check failed:', error)
        return res.status(500).json({ ok: false, message: 'MongoDB connection failed.', error: error.message })
    }
})

app.post('/api/hakabilitytech', async (req, res) => {
    if (!uri) {
        return res.status(500).json({ error: 'MONGODB_URI is not configured.' })
    }

    const payload = {
        fullName: String(req.body?.fullName || '').trim(),
        email: String(req.body?.email || '').trim(),
        phone: String(req.body?.phone || '').trim(),
        countryCity: String(req.body?.countryCity || '').trim(),
        disability: String(req.body?.disability || '').trim(),
        commit100Percent: String(req.body?.commit100Percent || '').trim(),
        acceptTerms: Boolean(req.body?.acceptTerms),
        createdAt: new Date(),
        source: 'hak-abilitytech',
    }

    if (!payload.fullName || !payload.email || !payload.phone || !payload.countryCity || !payload.disability || !payload.commit100Percent) {
        return res.status(400).json({ error: 'Please complete all required fields.' })
    }

    if (payload.commit100Percent !== 'Yes') {
        return res.status(400).json({ error: 'You must confirm you are ready to commit 100% to the fellowship.' })
    }

    if (!payload.acceptTerms) {
        return res.status(400).json({ error: 'Please confirm that you understand the fellowship is free and unserious students may be removed.' })
    }

    try {
        const client = new MongoClient(uri)
        await client.connect()
        const db = client.db(dbName)
        const result = await db.collection('hakabilitytech_fellowship_applications').insertOne(payload)
        await client.close()

        return res.status(201).json({
            success: true,
            message: 'Your fellowship application has been submitted successfully.',
            id: result.insertedId,
        })
    } catch (error) {
        console.error('Unable to save Hak-AbilityTech application:', error)
        return res.status(500).json({ error: 'Unable to submit application. Please try again later.' })
    }
})

app.listen(port, () => {
    console.log(`Hak-AbilityTech API running on http://localhost:${port}`)
})
