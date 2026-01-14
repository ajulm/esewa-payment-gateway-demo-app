import { useState } from 'react'
import Head from 'next/head'
import CryptoJS from 'crypto-js'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [amount, setAmount] = useState<string>('')
  const [productId, setProductId] = useState<string>('')

  const generateTransactionUuid = () => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }

  const generateSignature = (message: string, secretKey: string): string => {
    const hash = CryptoJS.HmacSHA256(message, secretKey)
    return CryptoJS.enc.Base64.stringify(hash)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const amountNum = parseInt(amount, 10)
    if (!amount || isNaN(amountNum) || amountNum <= 0) {
      alert('Please enter a valid integer amount')
      return
    }
    
    const transactionUuid = generateTransactionUuid()
    setProductId(transactionUuid)
    
    // eSewa API parameters according to documentation
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000')
    const productCode = process.env.NEXT_PUBLIC_ESEWA_MERCHANT_CODE || 'EPAYTEST'
    const secretKey = process.env.NEXT_PUBLIC_ESEWA_SECRET_KEY || '8gBm/:&EnhH.1/q('
    
    // Calculate amounts (for demo: tax_amount = 0, service charge = 0, delivery charge = 0)
    const taxAmount = '0'
    const productServiceCharge = '0'
    const productDeliveryCharge = '0'
    const totalAmount = amountNum.toString()
    
    // Create signature message: total_amount,transaction_uuid,product_code
    const signedFieldNames = 'total_amount,transaction_uuid,product_code'
    const signatureMessage = `total_amount=${totalAmount},transaction_uuid=${transactionUuid},product_code=${productCode}`
    const signature = generateSignature(signatureMessage, secretKey)
    
    // Create and submit form to eSewa
    const form = document.createElement('form')
    form.method = 'POST'
    // Use the correct eSewa sandbox URL (hardcoded to ensure it works)
    const esewaUrl = 'https://rc-epay.esewa.com.np/api/epay/main/v2/form'
    form.action = esewaUrl
    
    // Debug: log the URL and parameters
    console.log('eSewa URL:', esewaUrl)
    console.log('Signature Message:', signatureMessage)
    console.log('Signature:', signature)
    
    // eSewa API v2 required parameters
    const params = {
      amount: totalAmount,
      tax_amount: taxAmount,
      total_amount: totalAmount,
      transaction_uuid: transactionUuid,
      product_code: productCode,
      product_service_charge: productServiceCharge,
      product_delivery_charge: productDeliveryCharge,
      success_url: `${appUrl}/payment/success`,
      failure_url: `${appUrl}/payment/failure`,
      signed_field_names: signedFieldNames,
      signature: signature,
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
