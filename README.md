# eSewa Payment Gateway – Next.js Demo App

This is a simple Next.js demo application to test the **eSewa payment gateway** integration using the sandbox environment.  
The app demonstrates how to initiate a payment, handle success/failure redirects, and (optionally) verify payments.

---

## 🚀 Features
- Simple payment initiation form
- Redirects to eSewa payment page
- Handles success and failure callbacks
- Optional payment verification via API route
- Sandbox-ready (safe for testing)

---

## 🛠 Tech Stack
- Next.js
- React
- Node.js

---

## 📂 Pages Overview

### `/`
**Home Page**
- Enter payment amount
- Auto-generates a product/order ID
- Redirects to eSewa when "Pay with eSewa" is clicked

### `/payment/success`
**Success Page**
- Display payment success message
- Shows amount, product ID, and reference ID returned by eSewa
- (Optional) Calls API to verify payment

### `/payment/failure`
**Failure Page**
- Display payment failed or cancelled message
- Option to retry payment

---

## 🔁 Payment Flow

1. User enters amount on Home page  
2. App submits a POST form to eSewa  
3. User completes or cancels payment on eSewa  
4. eSewa redirects to:
   - Success URL (`/payment/success`)
   - Failure URL (`/payment/failure`)
5. App displays payment result

---

## 🔐 eSewa Parameters Used
- `amt` – Amount
- `tAmt` – Total amount
- `pid` – Product / Order ID
- `scd` – Merchant code
- `su` – Success URL
- `fu` – Failure URL

---

## 🧪 Sandbox Usage
This demo is intended for **testing only** using eSewa sandbox credentials.  
Do not use real merchant codes or production URLs.

---

## 📌 Notes
- eSewa requires a **POST form submission**, not a fetch request
- Always verify payment on the backend before confirming orders
- This demo can be extended for real-world usage

---

## 📈 Possible Improvements
- Store transactions in a database
- Add payment verification API
- Support production environment
- Improve UI/UX

---

## 📄 License
This project is for educational and testing purposes only.
