import type { NextApiRequest, NextApiResponse } from 'next'
import CryptoJS from 'crypto-js'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { message, secretKey } = req.body

  if (!message || !secretKey) {
    return res.status(400).json({ error: 'Message and secretKey are required' })
  }

  try {
    const hash = CryptoJS.HmacSHA256(message, secretKey)
    const signature = hash.toString(CryptoJS.enc.Base64)
    
    return res.status(200).json({ signature })
  } catch (error) {
    return res.status(500).json({ error: 'Failed to generate signature' })
  }
}
