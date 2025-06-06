import ExcelJS from 'exceljs';

export async function getEmployeeTestData(sheetName: string = '', rowNumber: number = 2) {
  const filePath = 'src/utils/Random_Employee_Data.xlsx';
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);

  const sheet = workbook.getWorksheet(sheetName);
  if (!sheet) throw new Error(`Sheet ${sheetName} not found`);

  const headerRowValues = sheet.getRow(1).values;
  if (!headerRowValues || !Array.isArray(headerRowValues)) {
    throw new Error('Row values are not available or not an array');
  }
  const headers = headerRowValues.slice(1) as string[];
  const rowValues = sheet.getRow(rowNumber)?.values;
  if (!rowValues || !Array.isArray(rowValues)) {
    throw new Error(`Row values for row ${rowNumber} are not available or not an array`);
  }
  const row = rowValues.slice(1);

  const data: Record<string, any> = {};
  headers.forEach((header, index) => {
    data[header] = row[index];
  });

  // Optional: format dates
  if (data['Date of Birth']) {
    const dob = data['Date of Birth'];
    if (typeof dob === 'number') {
      const excelEpoch = new Date(1899, 11, 30);
      const jsDate = new Date(excelEpoch.getTime() + dob * 86400000);
      data['Date of Birth'] = jsDate.toISOString().split('T')[0];
    }
  }
//console.log(data);
  return data;
  
}
