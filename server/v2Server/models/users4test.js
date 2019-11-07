
export const users = [

  // for signup
  // data 0 test firstName required
  {
    firstName: '',
    lastName: 'nkurunziza',
    email: 'emmanuel@gmail.com',
    password: 'nkurunziza123',
  },
  // data 1 test lastName required
  {
    firstName: 'Emmanuel',
    lastName: '',
    email: 'emmanuel@gmail.com',
    password: 'nkurunziza123',
  },
  // data 2 test email required
  {
    firstName: 'Emmanuel',
    lastName: 'Nkurunziza',
    email: '',
    password: 'nkurunziza123',
  },
  // valid 3 data test signup successful and if email has been used
  {
    email: 'emmanuel@gmail.com',
    firstName: 'Emmanuel',
    lastName: 'Nkurunziza',
    password: 'nkurunziza123',
  },
  // valid 4 data test signin email required
  {
    email: '',
    password: 'nkurunziza123',
  },
  // data # 5 a different user (successfully created)
  {
    email: 'emmanuel1@gmail.com',
    firstName: 'Emmanuel1',
    lastName: 'Nkurunziza1',
    password: 'nkurunziza12345',
  },
  // data # 6 a different user (signin)
  {
    email: 'emmanuel1@gmail.com',
    password: 'nkurunziza12345',
  },
  // data # 7 a different user (successfully created)
  {
    email: 'emmanuel2@gmail.com',
    firstName: 'Emmanuel2',
    lastName: 'Nkurunziza2',
    password: 'nkurunziza123456789',
  },
  // data # 8 a different user (signin)
  {
    email: 'emmanuel2@gmail.com',
    password: 'nkurunziza123456789',
  },
  // data # 9 empty password
  {
    firstName: 'emmanuel',
    lastName: 'nkurunziza',
    email: 'emmanuel@gmail.com',
    password: '',
  },
];
