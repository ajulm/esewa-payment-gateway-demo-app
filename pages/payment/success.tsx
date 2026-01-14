import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../../styles/Payment.module.css'

export default function PaymentSuccess() {
  const router = useRouter()
  const [paymentData, setPaymentData] = useState<{
    total_amount?: string
    amount?: string
    ref_id?: string
    refId?: string
    transaction_uuid?: string
    oid?: string
    product_code?: string
    status?: string
  }>({})

  useEffect(() => {
    if (router.isReady) {
      setPaymentData({
        total_amount: router.query.total_amount as string,
        amount: router.query.amount as string,
        ref_id: router.query.ref_id as string,
        refId: router.query.refId as string,
        transaction_uuid: router.query.transaction_uuid as string,
        oid: router.query.oid as string,
        product_code: router.query.product_code as string,
        status: router.query.status as string,
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
            {(paymentData.total_amount || paymentData.amount) && (
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Amount:</span>
                <span className={styles.detailValue}>NPR {paymentData.total_amount || paymentData.amount}</span>
              </div>
            )}
            {(paymentData.transaction_uuid || paymentData.oid) && (
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Transaction UUID:</span>
                <span className={styles.detailValue}>{paymentData.transaction_uuid || paymentData.oid}</span>
              </div>
            )}
            {(paymentData.ref_id || paymentData.refId) && (
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Reference ID:</span>
                <span className={styles.detailValue}>{paymentData.ref_id || paymentData.refId}</span>
              </div>
            )}
            {paymentData.product_code && (
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Product Code:</span>
                <span className={styles.detailValue}>{paymentData.product_code}</span>
              </div>
            )}
            {paymentData.status && (
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Status:</span>
                <span className={styles.detailValue}>{paymentData.status}</span>
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
