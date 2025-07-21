import * as XLSX from "xlsx"

export interface CustomerData {
  orderId: string
  customerName: string
  productName: string
  productModel: string
  purchaseDate: string
  orderValue: string
}


export interface WarrantyRecord {
  orderId: string
  customerName: string
  email: string
  phone: string
  productName: string
  productModel: string
  purchaseDate: string
  activationDate: string
  expiryDate: string
  status: string
}

export interface ClaimRecord {
  claimId: string
  orderId: string
  customerName: string
  productName: string
  problemDescription: string
  submissionDate: string
  status: string
  uploadedFiles?: string
}

export function parseExcelFile(file: File): Promise<CustomerData[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        console.log("Raw parsed data:", jsonData); // 🔍 Check what's actually being parsed

        const customerData: CustomerData[] = jsonData.map((row: any, index: number) => {
          const order = {
            orderId: row["Order ID"] || "",
            customerName: row["Customer Name"] || "",
            productName: row["Product Name"] || "",
            productModel: row["Product Model"] || "",
            purchaseDate: row["Purchase Date"] || "",
            orderValue: row["Order Value"] || "",
          };
          console.log(`Extracted row ${index + 1}:`, order); // 🔍 Inspect each row's parsed result
          return order;
        });

        resolve(customerData);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsArrayBuffer(file);
  });
}



export function createWarrantyExcel(warranties: WarrantyRecord[]): ArrayBuffer {
  const worksheet = XLSX.utils.json_to_sheet(warranties)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, "Warranties")
  return XLSX.write(workbook, { bookType: "xlsx", type: "array" })
}

export function createClaimsExcel(claims: ClaimRecord[]): ArrayBuffer {
  const worksheet = XLSX.utils.json_to_sheet(claims)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, "Claims")
  return XLSX.write(workbook, { bookType: "xlsx", type: "array" })
}

export function downloadExcel(data: ArrayBuffer, filename: string) {
  const blob = new Blob([data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}


