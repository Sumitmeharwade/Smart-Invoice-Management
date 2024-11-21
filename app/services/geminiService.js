import { GoogleGenerativeAI } from "@google/generative-ai";
import * as XLSX from "xlsx";

const genAI = new GoogleGenerativeAI("AIzaSyBFZN9LQHVVnTD9deSn2kcn7DXna6QgPxk");

export const extractDataFromFile = async (file) => {
  try {
    console.log("Starting file extraction:", file.type);
    if (
      file.type.includes("sheet") ||
      file.name.endsWith(".xlsx") ||
      file.name.endsWith(".xls")
    ) {
      return await handleExcelFile(file);
    } else if (file.type.includes("pdf") || file.type.includes("image")) {
      return await handleImageOrPdf(file);
    } else {
      throw new Error(`Unsupported file type: ${file.type}`);
    }
  } catch (error) {
    console.error("Extraction error:", error);
    return {
      success: false,
      error: error.message || "Failed to extract data from file",
    };
  }
};
const handleExcelFile = async (file) => {
    try {
      const reader = new FileReader();
  
      // Wrap the reader logic in a Promise
      const parsedData = await new Promise((resolve, reject) => {
        reader.onload = async (e) => {
          try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: "array" });
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  
            const dataString = JSON.stringify(jsonData);
            const model = genAI.getGenerativeModel({
              model: "gemini-1.5-pro-latest",
            });
  
            const prompt = `Analyze the uploaded file, which may be an Excel file, a PDF document, or an image of an invoice, and extract structured data into JSON objects as outlined below. Ensure accurate processing and proper alignment with the specified schema.

                            Data Extraction Requirements:  
                            1. Invoices Tab:  
                            - Required Fields:  
                                - serialNumber  
                                - customerName  
                                - productName  
                                - quantity  
                                - tax  
                                - totalAmount  
                                - date  
                            - Include all rows detailing transactions or invoices.  
                            
                            2. Products Tab:  
                            - Required Fields:  
                                - productName  
                                - quantity  
                                - unitPrice  
                                - tax  
                                - priceWithTax  
                            - Optional Field:  
                                - discount (if applicable)  
                            - Summarize or group product data by name where appropriate.  
                            
                            3. Customers Tab:  
                            - Required Fields:  
                                - customerName  
                                - phoneNumber  
                                - totalPurchaseAmount  
                            - Optional Fields (if available):  
                                - emailAddress  
                                - address  
                            - Ensure a comprehensive dataset by incorporating all relevant customer information.
                            
                            File Handling and Data Extraction Guidelines:  
                            - For images or PDF files: Use OCR technology to accurately extract text before processing the data.  
                            - For Excel files: Prioritize well-structured sheets containing transaction data. If multiple sheets exist, identify and extract relevant data accordingly.  
                            - Validate and clean the data to ensure accuracy. Flag incomplete or uncertain entries.  
                            
                            Output Requirements:  
                            - Deliver the output as a valid JSON object with the structure:  
                            {
                                "invoices": [
                                    {
                                        "serialNumber": "<value>",
                                        "customerName": "<value>",
                                        "productName": "<value>",
                                        "quantity": <value>,
                                        "tax": <value>,
                                        "totalAmount": <value>,
                                        "date": "<DD-MM-YYYY>"
                                    }
                                ],
                                "products": [
                                    {
                                        "productName": "<value>",
                                        "quantity": <value>,
                                        "unitPrice": <value>,
                                        "tax": <value>,
                                        "priceWithTax": <value>,
                                        "discount": "<optional value>"
                                    }
                                ],
                                "customers": [
                                    {
                                        "customerName": "<value>",
                                        "phoneNumber": "<value>",
                                        "totalPurchaseAmount": <value>,
                                        "emailAddress": "<optional value>",
                                        "address": "<optional value>"
                                    }
                                ]
                            }
                            
            Additional Instructions:  
            - All numerical values (e.g., quantities, totals, tax) must be formatted as numbers.  
            - Use DD-MM-YYYY format for dates.  
            - Infer missing or unclear values where feasible and flag any uncertainties.  
            - Respond only with the JSON output. Avoid additional explanations or text.
            - Ensure that all the data is returned,do not remove any data from the output or add // ... (rest of the invoices).
            - Give the complete JSON output`;
  
            const result = await model.generateContent([dataString, prompt]);
            const response = await result.response;
            let res = response.text();
  
            // Remove first 7 characters and last 3 characters to get the JSON response
            res = res.substring(7);
            res = res.slice(0, -3);
            console.log("Gemini response:", res);
  
            const parsedData = JSON.parse(res);
            console.log("Parsed data:", parsedData);
  
            resolve(parsedData); // Resolve with the parsed data
          } catch (err) {
            reject(err); // Reject in case of any errors
          }
        };
  
        reader.onerror = (err) => reject(err); // Reject on file reader error
  
        reader.readAsArrayBuffer(file); // Start reading the file as an ArrayBuffer
      });
  
      console.log("This should execute after the Gemini response.");
  
      return {
        success: true,
        data: parsedData,
      };
    } catch (error) {
      console.error("Excel file processing error:", error);
      throw error;
    }
  };
  
// const handleExcelFile = async (file) => {
//   try {
//     const reader = new FileReader();
//     var flag=false;
    
//     reader.onload = async (e) => {
//       const data = new Uint8Array(e.target.result);
//       const workbook = XLSX.read(data, { type: "array" });
//       const firstSheetName = workbook.SheetNames[0];
//       const worksheet = workbook.Sheets[firstSheetName];
//       const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

//       const dataString = JSON.stringify(jsonData);
//       const model = genAI.getGenerativeModel({
//         model: "gemini-1.5-pro-latest",
//       });

//       const prompt = `Analyze the uploaded file, which may be an Excel file, a PDF document, or an image of an invoice, and extract structured data into JSON objects as outlined below. Ensure accurate processing and proper alignment with the specified schema.

//     Data Extraction Requirements:  
//     1. Invoices Tab:  
//        - Required Fields:  
//          - serialNumber  
//          - customerName  
//          - productName  
//          - quantity  
//          - tax  
//          - totalAmount  
//          - date  
//        - Include all rows detailing transactions or invoices.  
    
//     2. Products Tab:  
//        - Required Fields:  
//          - productName  
//          - quantity  
//          - unitPrice  
//          - tax  
//          - priceWithTax  
//        - Optional Field:  
//          - discount (if applicable)  
//        - Summarize or group product data by name where appropriate.  
    
//     3. Customers Tab:  
//        - Required Fields:  
//          - customerName  
//          - phoneNumber  
//          - totalPurchaseAmount  
//        - Optional Fields (if available):  
//          - emailAddress  
//          - address  
//        - Ensure a comprehensive dataset by incorporating all relevant customer information.
    
//     File Handling and Data Extraction Guidelines:  
//     - For images or PDF files: Use OCR technology to accurately extract text before processing the data.  
//     - For Excel files: Prioritize well-structured sheets containing transaction data. If multiple sheets exist, identify and extract relevant data accordingly.  
//     - Validate and clean the data to ensure accuracy. Flag incomplete or uncertain entries.  
    
//     Output Requirements:  
//     - Deliver the output as a valid JSON object with the structure:  
//     {
//         "invoices": [
//             {
//                 "serialNumber": "<value>",
//                 "customerName": "<value>",
//                 "productName": "<value>",
//                 "quantity": <value>,
//                 "tax": <value>,
//                 "totalAmount": <value>,
//                 "date": "<DD-MM-YYYY>"
//             }
//         ],
//         "products": [
//             {
//                 "productName": "<value>",
//                 "quantity": <value>,
//                 "unitPrice": <value>,
//                 "tax": <value>,
//                 "priceWithTax": <value>,
//                 "discount": "<optional value>"
//             }
//         ],
//         "customers": [
//             {
//                 "customerName": "<value>",
//                 "phoneNumber": "<value>",
//                 "totalPurchaseAmount": <value>,
//                 "emailAddress": "<optional value>",
//                 "address": "<optional value>"
//             }
//         ]
//     }
    
//     Additional Instructions:  
//     - All numerical values (e.g., quantities, totals, tax) must be formatted as numbers.  
//     - Use DD-MM-YYYY format for dates.  
//     - Infer missing or unclear values where feasible and flag any uncertainties.  
//     - Respond only with the JSON output. Avoid additional explanations or text.`;



//       const result = await model.generateContent([dataString, prompt]);
//       const response = await result.response;
//     var res = response.text();
//     // remove first 7 characters and last 3 characters to get the JSON response
//     res = res.substring(7);
//     res = res.slice(0, -3);
//     console.log("Gemini response:", res);
//     const parsedData = JSON.parse(res);
//       console.log("Parsed data:", parsedData);
//       flag=true;
//       return {  
//         success: true,
//         data: parsedData,
//       };
//     };
//     //wait for the async fuction to finish
    
//   } catch (error) {
//     console.error("Excel file processing error:", error);
//     throw error;
//   }
// };


const handleImageOrPdf = async (file) => {
  try {
    console.log("Processing Image/PDF file...");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });

    const fileData = await fileToGenerativeArtifact(file);

    const prompt = `Analyze the uploaded file, which may be an Excel file, a PDF document, or an image of an invoice, and extract structured data into JSON objects as outlined below. Ensure accurate processing and proper alignment with the specified schema.

    Data Extraction Requirements:  
    1. Invoices Tab:  
       - Required Fields:  
         - serialNumber  
         - customerName  
         - productName  
         - quantity  
         - tax  
         - totalAmount  
         - date  
       - Include all rows detailing transactions or invoices.  
    
    2. Products Tab:  
       - Required Fields:  
         - productName  
         - quantity  
         - unitPrice  
         - tax  
         - priceWithTax  
       - Optional Field:  
         - discount (if applicable)  
       - Summarize or group product data by name where appropriate.  
    
    3. Customers Tab:  
       - Required Fields:  
         - customerName  
         - phoneNumber  
         - totalPurchaseAmount  
       - Optional Fields (if available):  
         - emailAddress  
         - address  
       - Ensure a comprehensive dataset by incorporating all relevant customer information.
    
    File Handling and Data Extraction Guidelines:  
    - For images or PDF files: Use OCR technology to accurately extract text before processing the data.  
    - For Excel files: Prioritize well-structured sheets containing transaction data. If multiple sheets exist, identify and extract relevant data accordingly.  
    - Validate and clean the data to ensure accuracy. Flag incomplete or uncertain entries.  
    
    Output Requirements:  
    - Deliver the output as a valid JSON object with the structure:  
    {
        "invoices": [
            {
                "serialNumber": "<value>",
                "customerName": "<value>",
                "productName": "<value>",
                "quantity": <value>,
                "tax": <value>,
                "totalAmount": <value>,
                "date": "<DD-MM-YYYY>"
            }
        ],
        "products": [
            {
                "productName": "<value>",
                "quantity": <value>,
                "unitPrice": <value>,
                "tax": <value>,
                "priceWithTax": <value>,
                "discount": "<optional value>"
            }
        ],
        "customers": [
            {
                "customerName": "<value>",
                "phoneNumber": "<value>",
                "totalPurchaseAmount": <value>,
                "emailAddress": "<optional value>",
                "address": "<optional value>"
            }
        ]
    }
    
    Additional Instructions:  
    - All numerical values (e.g., quantities, totals, tax) must be formatted as numbers.  
    - Use DD-MM-YYYY format for dates.  
    - Infer missing or unclear values where feasible and flag any uncertainties.  
    - Respond only with the JSON output. Avoid additional explanations or text.`;



    const result = await model.generateContent([fileData, prompt]);
    const response = await result.response;
    var res = response.text();
    // remove first 7 characters and last 3 characters to get the JSON response
    res = res.substring(7);
    res = res.slice(0, -3);
    console.log("Gemini response:", res);
    const parsedData = JSON.parse(res);
    return {
      success: true,
      data: parsedData,
    };
  } catch (error) {
    console.error("Image/PDF processing error:", error);
    throw error;
  }
};

const fileToGenerativeArtifact = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve({
        inlineData: {
          data: reader.result.split(",")[1],
          mimeType: file.type,
        },
      });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};