import * as XLSX from "xlsx"

export interface ExcelOrderData {
  orderId: string
  customerName: string
  email: string
  phone: string
  address: string
  product: string
  model: string
  purchaseDate: string
  orderValue: number
}

export function parseExcelFile(buffer: Buffer): ExcelOrderData[] {
  try {
    const workbook = XLSX.read(buffer, { type: "buffer" })
    const sheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[sheetName]

    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][]

    if (jsonData.length < 2) {
      throw new Error("Excel file must have at least a header row and one data row")
    }

    const headers = jsonData[0].map((h: any) => String(h).toLowerCase().trim())
    const dataRows = jsonData.slice(1)

    const orders: ExcelOrderData[] = []

    for (const row of dataRows) {
      if (!row || row.length === 0) continue

      const order: any = {}

      // Map headers to expected fields
      headers.forEach((header, index) => {
        const value = row[index]
        if (value === undefined || value === null) return

        if (header.includes("order") && header.includes("id")) {
          order.orderId = String(value).toUpperCase().trim()
        } else if (header.includes("customer") && header.includes("name")) {
          order.customerName = String(value).trim()
        } else if (header.includes("email")) {
          order.email = String(value).trim()
        } else if (header.includes("phone")) {
          order.phone = String(value).trim()
        } else if (header.includes("address")) {
          order.address = String(value).trim()
        } else if (header.includes("product") && header.includes("name")) {
          order.product = String(value).trim()
        } else if (header.includes("product") && header.includes("model")) {
          order.model = String(value).trim()
        } else if (header.includes("purchase") && header.includes("date")) {
          // Handle date formatting
          if (typeof value === "number") {
            // Excel date serial number
            const date = XLSX.SSF.parse_date_code(value)
            order.purchaseDate = `${date.y}-${String(date.m).padStart(2, "0")}-${String(date.d).padStart(2, "0")}`
          } else {
            order.purchaseDate = String(value).trim()
          }
        } else if (header.includes("order") && header.includes("value")) {
          order.orderValue = Number.parseFloat(String(value)) || 0
        }
      })

      // Validate required fields
      if (order.orderId && order.customerName && order.phone && order.product) {
        orders.push({
          orderId: order.orderId,
          customerName: order.customerName,
          email: order.email || "",
          phone: order.phone,
          address: order.address || "",
          product: order.product,
          model: order.model || "",
          purchaseDate: order.purchaseDate || "",
          orderValue: order.orderValue || 0,
        })
      }
    }

    return orders
  } catch (error) {
    console.error("Excel parsing error:", error)
    throw new Error("Failed to parse Excel file")
  }
}
