import ExcelJS from 'exceljs';
import { faker } from '@faker-js/faker';

function randomDate(start: Date, end: Date): string {
  const d = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return d.toISOString().slice(0, 10);
}

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

async function generateRandomEmployeeExcel() {
  const workbook = new ExcelJS.Workbook();

  // --- Personal Details ---
  const personalSheet = workbook.addWorksheet('Personal Details');
  personalSheet.columns = [
    { header: 'Employee Full Name', key: 'fullName' },
    { header: 'Middle Name', key: 'middleName' },
    { header: 'Employee ID', key: 'employeeId' },
    { header: 'Other ID', key: 'otherId' },
    { header: "Driving License", key: 'licenseNumber' },
    { header: 'License Expiry Date', key: 'licenseExpiry' },
    { header: 'Nationality', key: 'nationality' },
    { header: 'Marital Status', key: 'maritalStatus' },
    { header: 'Date of Birth', key: 'dob' },
    { header: 'Gender', key: 'gender' },
    { header: 'Blood Type', key: 'bloodType' },
    { header: 'Test_Field', key: 'testField' },
  ];

  // Random data generators
  const genders = ['Male', 'Female'];
  const maritalStatuses = ['Single', 'Married', 'Divorced', 'Widowed'];
  const nationalities = ['Canadian', 'American', 'British', 'Australian', 'Indian'];
  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  personalSheet.addRow({
    fullName: faker.name.firstName() + ' ' + faker.name.lastName(),
    middleName: faker.name.firstName(),
    employeeId: faker.number.int({ min: 1000, max: 9999 }).toString(),
    otherId: faker.string.alphanumeric(6).toUpperCase(),
    licenseNumber: faker.string.alphanumeric(8).toUpperCase(),
    licenseExpiry: randomDate(new Date(), new Date(2035, 11, 31)),
    nationality: randomChoice(nationalities),
    maritalStatus: randomChoice(maritalStatuses),
    dob: randomDate(new Date(1950, 0, 1), new Date(2000, 11, 31)),
    gender: randomChoice(genders),
    bloodType: randomChoice(bloodTypes),
    testField: 'Sample Text',
  });

  // --- Contact Details ---
  const contactSheet = workbook.addWorksheet('Contact Details');
  contactSheet.columns = [
    { header: 'Street 1', key: 'street1' },
    { header: 'Street 2', key: 'street2' },
    { header: 'City', key: 'city' },
    { header: 'State/Province', key: 'state' },
    { header: 'Zip/Postal Code', key: 'zip' },
    { header: 'Country', key: 'country' },
    { header: 'Telephone Home', key: 'phoneHome' },
    { header: 'Telephone Mobile', key: 'phoneMobile' },
    { header: 'Telephone Work', key: 'phoneWork' },
    { header: 'Work Email', key: 'workEmail' },
    { header: 'Other Email', key: 'otherEmail' },
  ];

  function sanitizePhone(input: string): string {
  return input.replace(/[^0-9+\-\/()]/g, ''); // Remove anything not allowed
}

contactSheet.addRow({
  street1: faker.address.streetAddress(),
  street2: faker.address.secondaryAddress(),
  city: faker.address.city(),
  state: faker.address.state(),
  zip: faker.address.zipCode(),
  country: faker.address.country(),
  phoneHome: sanitizePhone(faker.phone.number()),
  phoneMobile: sanitizePhone(faker.phone.number()),
  phoneWork: sanitizePhone(faker.phone.number()),
  workEmail: faker.internet.email(),
  otherEmail: faker.internet.email(),
});

  // --- Work Experience ---
  const workExpSheet = workbook.addWorksheet('Work Experience');
  workExpSheet.columns = [
    { header: 'Company', key: 'company' },
    { header: 'Job Title', key: 'jobTitle' },
    { header: 'From', key: 'from' },
    { header: 'To', key: 'to' },
    { header: 'Comment', key: 'comment' },
  ];

  const fromDate = faker.date.past({ years: 10 });
  const toDate = faker.date.between({ from: fromDate, to: new Date() });

  workExpSheet.addRow({
    company: faker.company.name(),
    jobTitle: faker.name.jobTitle(),
    from: fromDate.toISOString().slice(0, 10),
    to: toDate.toISOString().slice(0, 10),
    comment: faker.lorem.sentence(),
  });

  // --- Education ---
  const educationSheet = workbook.addWorksheet('Education');
  educationSheet.columns = [
    { header: 'Level', key: 'level' },
    { header: 'Institute', key: 'institute' },
    { header: 'Major/Specialization', key: 'major' },
    { header: 'Year', key: 'year' },
    { header: 'GPA/Score', key: 'gpa' },
    { header: 'Start Date', key: 'startDate' },
    { header: 'End Date', key: 'endDate' },
  ];

  const eduStartDate = faker.date.past({ years: 15 });
  const eduEndDate = faker.date.between({ from: eduStartDate, to: new Date() });

  educationSheet.addRow({
    level: randomChoice(["High School", "Associate Degree", "Bachelor's Degree", "Master's Degree", "PhD"]),
    institute: faker.company.name() + " University",
    major: faker.name.jobArea(),
    year: eduEndDate.getFullYear().toString(),
    gpa: (Math.random() * 1.5 + 2.5).toFixed(2),
    startDate: eduStartDate.toISOString().slice(0, 10),
    endDate: eduEndDate.toISOString().slice(0, 10),
  });

  // --- Skills ---
  const skillsSheet = workbook.addWorksheet('Skills');
  skillsSheet.columns = [
    { header: 'Skill', key: 'skill' },
    { header: 'Years of Experience', key: 'yearsExp' },
    { header: 'Comments', key: 'comments' },
  ];

  skillsSheet.addRow({
    skill: faker.hacker.verb() + " " + faker.hacker.noun(),
    yearsExp: faker.number.int({ min: 1, max: 10 }),
    comments: faker.lorem.sentence(),
  });

  // --- Languages ---
  const languagesSheet = workbook.addWorksheet('Languages');
  languagesSheet.columns = [
    { header: 'Language', key: 'language' },
    { header: 'Fluency', key: 'fluency' },
    { header: 'Competency', key: 'competency' },
    { header: 'Comments', key: 'comments' },
  ];

  const fluencies = ['Basic', 'Conversational', 'Fluent', 'Native'];
  const competencies = ['Poor', 'Fair', 'Good', 'Excellent'];

  languagesSheet.addRow({
    language: faker.helpers.arrayElement(['EN', 'FR', 'ES', 'DE', 'IT', 'ZH', 'JA', 'RU', 'AR', 'HI']),
    fluency: randomChoice(fluencies),
    competency: randomChoice(competencies),
    comments: faker.lorem.sentence(),
  });

  // Save workbook
  await workbook.xlsx.writeFile('src/utils/Random_Employee_Data.xlsx');
  console.log('Excel file generated: Random_Employee_Data.xlsx');
}

generateRandomEmployeeExcel().catch(console.error);
