import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../../styles/Payment.module.css'

export default function PaymentFailure() {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>Payment Failed - eSewa Demo</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.failureIcon}>✗</div>
          <h1 className={styles.title}>Payment Failed</h1>
          <p className={styles.message}>
            Your payment could not be processed. This may be due to:
          </p>
          <ul className={styles.errorList}>
            <li>Payment was cancelled</li>
            <li>Insufficient balance</li>
            <li>Network error</li>
            <li>Invalid payment details</li>
          </ul>
          
          <div className={styles.actions}>
            <Link href="/" className={styles.button}>
              Try Again
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
