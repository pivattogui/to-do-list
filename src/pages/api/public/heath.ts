import { NextApiRequest, NextApiResponse } from "next";

//Endpoint para não deixar o planetscale dormir, pois ele é gratuito e dorme depois de x dias sem uso
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        await prisma.user.findUnique({
            where: {
                email: "teste@teste.com"
            }
        })

        return res.status(200).json({ message: 'ok' })
    } catch (err) {
        return res.status(400).json({ error: err })
    }
}