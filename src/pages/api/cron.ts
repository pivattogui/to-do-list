import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { method } = req

    switch (method) {
        case 'GET': {
            try {
                return res.status(200).json({ message: 'ok' })
            } catch (err) {
                return res.status(400).json({ error: err })
            }
        }
    }
}