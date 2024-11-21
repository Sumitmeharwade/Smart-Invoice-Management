
# Automated Invoice Data Extraction and Management

A **Next.js** application powered by **Google Gemini API** to automate the extraction and organization of data from invoices. 
This tool processes files like PDFs, Excel sheets, and images, seamlessly organizing data into invoice, products and customers tabs.

## âœ¨ Features

- **AI-Powered Data Extraction**: Handles multiple file formats (Excel, PDFs, Images) to extract and structure data automatically.
- **Intuitive Tabs**:
  - **Invoices**: Serial Number, Customer Name, Product Name, Quantity, Tax, Total Amount, and Date.
  - **Products**: Name, Quantity, Unit Price, Tax, Price with Tax (optional Discount field).
  - **Customers**: Name, Phone Number, and Total Purchase Amount.
- **Real-Time Updates**: Powered by Redux for dynamic changes across all tabs.

## ðŸš€ Getting Started

### Prerequisites

- Node.js v16+  
- Google Gemini API credentials  

### Installation

1. Clone the repository:  
   ```bash
   git clone https://github.com/sumit/smart-invoice-management.git
   cd smart-invoice-management
   ```

2. Install dependencies:  
   ```bash
   npm install --legacy-peer-deps
   ```

3. Set up environment variables:  
   Create a `.env` file and add:  
   ```env
   GEMINI_API_KEY=your-api-key
   ```

4. Start the development server:  
   ```bash
   npm run dev
   ```
   Visit `http://localhost:3000`.

### Deployment

Deploy easily on **Vercel** or **Netlify** after pushing the repository to GitHub.


## ðŸ§° Tech Stack

- **Frontend**: Next.js, React, Redux  
- **AI**: Google Gemini API  
- **Deployment**: Vercel  

