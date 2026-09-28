import { MongoClient } from 'mongodb'

export default async function handler(req, res) {
    const uri = process.env.MONGODB_URI
    const dbName = process.env.MONGODB_DB || 'HAKEELA'

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
}
