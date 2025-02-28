<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Hostel Mess Management System</title>
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        body {
            font-family: 'Figtree', sans-serif;
        }
        .hero {
            background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)), url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop');
            background-size: cover;
            background-position: center;
            color: white;
            padding: 100px 0;
            margin-bottom: 50px;
        }
        .feature-icon {
            font-size: 2rem;
            margin-bottom: 1rem;
            color: #0d6efd;
        }
        .footer {
            background-color: #343a40;
            color: white;
            padding: 30px 0;
            margin-top: 50px;
        }
    </style>
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <a class="navbar-brand" href="#">
                <i class="fas fa-utensils me-2"></i> Hostel Mess Management
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    @if (Route::has('login'))
                        @auth
                            @if (Auth::user()->user_type === 'management')
                                <li class="nav-item">
                                    <a href="{{ route('admin.dashboard') }}" class="nav-link">Dashboard</a>
                                </li>
                            @else
                                <li class="nav-item">
                                    <a href="{{ route('student.dashboard') }}" class="nav-link">Dashboard</a>
                                </li>
                            @endif
                        @else
                            <li class="nav-item">
                                <a href="{{ route('login') }}" class="nav-link">Log in</a>
                            </li>
                        @endauth
                    @endif
                </ul>
            </div>
        </div>
    </nav>

    <section class="hero text-center">
        <div class="container">
            <h1 class="display-4 fw-bold">Hostel Mess Management System</h1>
            <p class="lead">A comprehensive solution for managing student hostel mess operations, billing, and payments</p>
            @if (Route::has('login'))
                @auth
                    @if (Auth::user()->user_type === 'management')
                        <a href="{{ route('admin.dashboard') }}" class="btn btn-primary btn-lg mt-3">Go to Dashboard</a>
                    @else
                        <a href="{{ route('student.dashboard') }}" class="btn btn-primary btn-lg mt-3">Go to Dashboard</a>
                    @endif
                @else
                    <a href="{{ route('login') }}" class="btn btn-primary btn-lg mt-3">Login to System</a>
                @endauth
            @endif
        </div>
    </section>

    <section class="features">
        <div class="container">
            <h2 class="text-center mb-5">Key Features</h2>
            <div class="row text-center">
                <div class="col-md-4 mb-4">
                    <div class="feature-icon">
                        <i class="fas fa-utensils"></i>
                    </div>
                    <h3>Meal Plan Management</h3>
                    <p>Configure pricing for daily, weekly, and monthly meal packages with customizable 7-day rotating menu offering multiple options per meal.</p>
                </div>
                <div class="col-md-4 mb-4">
                    <div class="feature-icon">
                        <i class="fas fa-credit-card"></i>
                    </div>
                    <h3>Payment System</h3>
                    <p>Handle advance payments from students, generate receipts, and track payment status with options for students to pay balances for selected services.</p>
                </div>
                <div class="col-md-4 mb-4">
                    <div class="feature-icon">
                        <i class="fas fa-box"></i>
                    </div>
                    <h3>Inventory Management</h3>
                    <p>Track purchases, manage supplier invoices, handle store operations including receipts, issues, and returns.</p>
                </div>
            </div>
            <div class="row text-center mt-4">
                <div class="col-md-4 mb-4">
                    <div class="feature-icon">
                        <i class="fas fa-chart-bar"></i>
                    </div>
                    <h3>Reporting Dashboard</h3>
                    <p>Generate financial reports for payment dues, monthly expenses, and income with visual analytics for management decision-making.</p>
                </div>
                <div class="col-md-4 mb-4">
                    <div class="feature-icon">
                        <i class="fas fa-users"></i>
                    </div>
                    <h3>User Management</h3>
                    <p>Different access levels for students and hostel management team with secure authentication.</p>
                </div>
                <div class="col-md-4 mb-4">
                    <div class="feature-icon">
                        <i class="fas fa-mobile-alt"></i>
                    </div>
                    <h3>Mobile Friendly</h3>
                    <p>Access the system from any device with a responsive design that works on desktops, tablets, and smartphones.</p>
                </div>
            </div>
        </div>
    </section>

    <footer class="footer">
        <div class="container text-center">
            <p>&copy; {{ date('Y') }} Hostel Mess Management System. All rights reserved.</p>
        </div>
    </footer>

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
