import { useState } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [amount, setAmount] = useState<string>('')
  const [productId, setProductId] = useState<string>('')

  const generateProductId = () => {
    return `PROD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const amountNum = parseInt(amount, 10)
    if (!amount || isNaN(amountNum) || amountNum <= 0) {
      alert('Please enter a valid integer amount')
      return
    }
    
    const newProductId = generateProductId()
    setProductId(newProductId)
    
    // Create and submit form to eSewa
    const form = document.createElement('form')
    form.method = 'POST'
    // Use the correct eSewa sandbox URL
    const esewaUrl = process.env.NEXT_PUBLIC_ESEWA_SANDBOX_URL || 'https://rc-epay.esewa.com.np/api/epay/main/v2/form'
    form.action = esewaUrl
    
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000')
    
    const params = {
      amt: amount,
      psc: '0',
      pdc: '0',
      txAmt: '0',
      tAmt: amount,
      pid: newProductId,
      scd: process.env.NEXT_PUBLIC_ESEWA_MERCHANT_CODE || 'EPAYTEST',
      su: `${appUrl}/payment/success`,
      fu: `${appUrl}/payment/failure`,
    }
    
    Object.entries(params).forEach(([key, value]) => {
      const input = document.createElement('input')
      input.type = 'hidden'
      input.name = key
      input.value = value
      form.appendChild(input)
    })
    
    document.body.appendChild(form)
    form.submit()
  }

  return (
    <>
      <Head>
        <title>eSewa Payment Gateway Demo</title>
        <meta name="description" content="Demo app for eSewa payment gateway integration" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>eSewa Payment Gateway Demo</h1>
          <p className={styles.description}>
            Enter the payment amount to proceed with eSewa payment
          </p>
          
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="amount" className={styles.label}>
                Payment Amount (NPR)
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                min="1"
                step="1"
                required
                className={styles.input}
              />
            </div>
            
            <button type="submit" className={styles.button}>
              Pay with eSewa
            </button>
          </form>
          
          {productId && (
            <p className={styles.productId}>
              Product ID: <code>{productId}</code>
            </p>
          )}
        </div>
      </main>
    </>
  )
}
