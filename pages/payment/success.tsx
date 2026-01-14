import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../../styles/Payment.module.css'

export default function PaymentSuccess() {
  const router = useRouter()
  const [paymentData, setPaymentData] = useState<{
    amt?: string
    refId?: string
    oid?: string
  }>({})

  useEffect(() => {
    if (router.isReady) {
      setPaymentData({
        amt: router.query.amt as string,
        refId: router.query.refId as string,
        oid: router.query.oid as string,
      })
    }
  }, [router.isReady, router.query])

  return (
    <>
      <Head>
        <title>Payment Success - eSewa Demo</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.successIcon}>✓</div>
          <h1 className={styles.title}>Payment Successful!</h1>
          <p className={styles.message}>
            Your payment has been processed successfully.
          </p>
          
          <div className={styles.details}>
            <h2 className={styles.detailsTitle}>Payment Details</h2>
            {paymentData.amt && (
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Amount:</span>
                <span className={styles.detailValue}>NPR {paymentData.amt}</span>
              </div>
            )}
            {paymentData.oid && (
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Product ID:</span>
                <span className={styles.detailValue}>{paymentData.oid}</span>
              </div>
            )}
            {paymentData.refId && (
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Reference ID:</span>
                <span className={styles.detailValue}>{paymentData.refId}</span>
              </div>
            )}
          </div>
          
          <div className={styles.actions}>
            <Link href="/" className={styles.button}>
              Make Another Payment
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
