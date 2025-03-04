# Hostel Pantry Billing & Payment System

## About

A comprehensive Laravel 11 web application for managing student hostel mess operations, billing, and payments with role-based access for students and management staff.

## Features

- **Authentication & User Management:** Login system using mobile number and password with different access levels for students and hostel management team.
- **Meal Plan Management:** Configure pricing for daily, weekly, and monthly meal packages with customizable 7-day rotating menu offering multiple options per meal.
- **Payment System:** Handle advance payments from students, generate receipts, and track payment status with options for students to pay balances for selected services.
- **Inventory Management:** Track purchases, manage supplier invoices, handle store operations including receipts, issues, and returns.
- **Reporting Dashboard:** Generate financial reports for payment dues, monthly expenses, and income with visual analytics for management decision-making.

## Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/hostel-pantry-system.git
cd hostel-pantry-system
```

2. Install dependencies
```bash
composer install
npm install
```

3. Create environment file and generate application key
```bash
cp .env.example .env
php artisan key:generate
```

4. Configure your database in the .env file
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=hostel_mess
DB_USERNAME=root
DB_PASSWORD=
```

5. Run migrations and seed the database
```bash
php artisan migrate --seed
```

6. Compile assets
```bash
npm run dev
```

7. Start the development server
```bash
php artisan serve
```

## Login Credentials

- **Student:** Mobile: 9876543210 / Password: student123
- **Admin:** Mobile: 1234567890 / Password: admin123

## Technologies Used

- Laravel 11
- MySQL
- Bootstrap 5
- Vite
- Font Awesome
