import { MongoClient, type Db, type Collection } from "mongodb"

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017"
const DB_NAME = "mayson_warranty"

let cachedClient: MongoClient | null = null
let cachedDb: Db | null = null

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  const client = new MongoClient(MONGODB_URI)
  await client.connect()

  const db = client.db(DB_NAME)

  cachedClient = client
  cachedDb = db

  return { client, db }
}

export interface CustomerOrder {
  _id?: string
  orderId: string
  customerName: string
  email: string
  phone: string
  address: string
  product: string
  model: string
  purchaseDate: string
  orderValue: number
  createdAt: Date
}

export interface WarrantyRecord {
  _id?: string
  orderId: string
  customerName: string
  email: string
  phone: string
  address: string
  product: string
  model: string
  purchaseDate: string
  activationDate: string
  expiryDate: string
  status: "Active" | "Expired"
  createdAt: Date
}

export interface ClaimRecord {
  _id?: string
  claimId: string
  orderId: string
  customerName: string
  product: string
  problemDescription: string
  imageUrl?: string
  submissionDate: string
  status: "Under Review" | "Approved" | "Rejected" | "Resolved"
  createdAt: Date
}

export async function getCustomerOrdersCollection(): Promise<Collection<CustomerOrder>> {
  const { db } = await connectToDatabase()
  return db.collection<CustomerOrder>("customer_orders")
}

export async function getWarrantyRecordsCollection(): Promise<Collection<WarrantyRecord>> {
  const { db } = await connectToDatabase()
  return db.collection<WarrantyRecord>("warranty_records")
}

export async function getClaimRecordsCollection(): Promise<Collection<ClaimRecord>> {
  const { db } = await connectToDatabase()
  return db.collection<ClaimRecord>("claim_records")
}

export async function findOrderById(orderId: string): Promise<CustomerOrder | null> {
  const collection = await getCustomerOrdersCollection()
  return await collection.findOne({ orderId: orderId.toUpperCase() })
}

export async function findWarrantyByOrderId(orderId: string): Promise<WarrantyRecord | null> {
  const collection = await getWarrantyRecordsCollection()
  return await collection.findOne({ orderId: orderId.toUpperCase() })
}

export async function isWarrantyActive(warranty: WarrantyRecord): Promise<boolean> {
  const today = new Date()
  const expiryDate = new Date(warranty.expiryDate)
  return today <= expiryDate && warranty.status === "Active"
}
