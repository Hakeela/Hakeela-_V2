const { MongoClient } = require('mongodb')

let clientPromise

function getClient() {
    if (!process.env.MONGODB_URI) {
        throw new Error('MONGODB_URI is not configured')
    }

    if (!clientPromise) {
        const client = new MongoClient(process.env.MONGODB_URI)
        clientPromise = client.connect()
    }

    return clientPromise
}

module.exports = async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST')
        return res.status(405).json({ error: 'Method not allowed' })
    }

    const { first, last, email, phone, program, mode, support, scholarship, scholarshipReason } = req.body || {}
    const values = { first, last, email, phone, program, mode, support, scholarship }

    if (Object.values(values).some((value) => typeof value !== 'string' || !value.trim())) {
        return res.status(400).json({ error: 'Please complete all required fields.' })
    }

    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
        return res.status(400).json({ error: 'Please provide a valid email address.' })
    }

    if (!['Yes', 'No'].includes(scholarship)) {
        return res.status(400).json({ error: 'Please select whether you are applying for a scholarship.' })
    }

    if (scholarship === 'Yes' && (typeof scholarshipReason !== 'string' || !scholarshipReason.trim())) {
        return res.status(400).json({ error: 'Please explain why you should be selected for a scholarship.' })
    }

    try {
        const client = await getClient()
        const database = client.db(process.env.MONGODB_DB || 'hakversity')

        await database.collection('applications').insertOne({
            ...Object.fromEntries(Object.entries({ ...values, scholarshipReason: scholarship === 'Yes' ? scholarshipReason : '' }).map(([key, value]) => [key, value.trim()])),
            createdAt: new Date(),
        })

        return res.status(201).json({ message: 'Application received.' })
    } catch (error) {
        console.error('Application submission failed:', error)
        return res.status(500).json({ error: 'We could not submit your application. Please try again.' })
    }
}
