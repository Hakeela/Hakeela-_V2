import { MongoClient } from 'mongodb'

let cachedClient = null

async function getClient(uri) {
    if (cachedClient) return cachedClient
    const client = new MongoClient(uri)
    await client.connect()
    cachedClient = client
    return client
}

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed.' })
    }

    const uri = process.env.MONGODB_URI
    const dbName = process.env.MONGODB_DB || 'HAKEELA'

    if (!uri) {
        return res.status(500).json({ error: 'MONGODB_URI is not configured.' })
    }

    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {}

    const payload = {
        fullName: String(body.fullName || '').trim(),
        email: String(body.email || '').trim(),
        phone: String(body.phone || '').trim(),
        countryCity: String(body.countryCity || '').trim(),
        disability: String(body.disability || '').trim(),
        commit100Percent: String(body.commit100Percent || '').trim(),
        acceptTerms: Boolean(body.acceptTerms),
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
        const client = await getClient(uri)
        const db = client.db(dbName)
        const result = await db.collection('hakabilitytech_fellowship_applications').insertOne(payload)

        return res.status(201).json({
            success: true,
            message: 'Your fellowship application has been submitted successfully.',
            id: result.insertedId,
        })
    } catch (error) {
        console.error('Unable to save Hak-AbilityTech application:', error)
        return res.status(500).json({ error: 'Unable to submit application. Please try again later.' })
    }
}
