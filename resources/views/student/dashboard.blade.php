@extends('layouts.dashboard')

@section('title', 'Student Dashboard')

@section('content')
<div class="container-fluid px-4">
    <h1 class="mt-4">Student Dashboard</h1>
    <ol class="breadcrumb mb-4">
        <li class="breadcrumb-item active">Dashboard</li>
    </ol>
    
    <!-- Welcome Banner -->
    <div class="row mb-4">
        <div class="col-12">
            <div class="card bg-primary text-white">
                <div class="card-body p-4">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h3 class="mb-2">Welcome, {{ Auth::user()->name ?? 'Student' }}!</h3>
                            <p class="mb-0">Here's your meal plan and payment summary</p>
                        </div>
                        <div>
                            <i class="fas fa-utensils fa-3x"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Stats Cards -->
    <div class="row">
        <div class="col-xl-3 col-md-6">
            <div class="card bg-success text-white mb-4">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h5 class="mb-0">{{ $currentPlan->name ?? 'No Active Plan' }}</h5>
                            <div class="small">Current Meal Plan</div>
                        </div>
                        <div>
                            <i class="fas fa-calendar-check fa-2x"></i>
                        </div>
                    </div>
                </div>
                <div class="card-footer d-flex align-items-center justify-content-between">
                    <a class="small text-white stretched-link" href="{{ route('student.meal-plans') }}">View Details</a>
                    <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                </div>
            </div>
        </div>
        <div class="col-xl-3 col-md-6">
            <div class="card bg-primary text-white mb-4">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h5 class="mb-0">{{ $daysRemaining ?? 0 }} Days</h5>
                            <div class="small">Remaining in Plan</div>
                        </div>
                        <div>
                            <i class="fas fa-hourglass-half fa-2x"></i>
                        </div>
                    </div>
                </div>
                <div class="card-footer d-flex align-items-center justify-content-between">
                    <a class="small text-white stretched-link" href="#">Renew Plan</a>
                    <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                </div>
            </div>
        </div>
        <div class="col-xl-3 col-md-6">
            <div class="card bg-warning text-white mb-4">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h5 class="mb-0">₹{{ number_format($walletBalance ?? 0) }}</h5>
                            <div class="small">Wallet Balance</div>
                        </div>
                        <div>
                            <i class="fas fa-wallet fa-2x"></i>
                        </div>
                    </div>
                </div>
                <div class="card-footer d-flex align-items-center justify-content-between">
                    <a class="small text-white stretched-link" href="{{ route('student.payments') }}">Add Money</a>
                    <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                </div>
            </div>
        </div>
        <div class="col-xl-3 col-md-6">
            <div class="card bg-info text-white mb-4">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h5 class="mb-0">{{ $totalMealsConsumed ?? 0 }}</h5>
                            <div class="small">Meals Consumed</div>
                        </div>
                        <div>
                            <i class="fas fa-utensils fa-2x"></i>
                        </div>
                    </div>
                </div>
                <div class="card-footer d-flex align-items-center justify-content-between">
                    <a class="small text-white stretched-link" href="#">View History</a>
                    <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Today's Menu -->
    <div class="row mb-4">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <i class="fas fa-utensils me-1"></i>
                    Today's Menu ({{ now()->format('l, F j, Y') }})
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-4 mb-3">
                            <div class="card h-100">
                                <div class="card-header bg-light">
                                    <h5 class="mb-0">Breakfast</h5>
                                    <small class="text-muted">7:30 AM - 9:30 AM</small>
                                </div>
                                <div class="card-body">
                                    @if(isset($todaysMenu) && isset($todaysMenu['breakfast']))
                                        <h6>{{ $todaysMenu['breakfast']->name }}</h6>
                                        <p>{{ $todaysMenu['breakfast']->description }}</p>
                                        @if($todaysMenu['breakfast']->is_vegetarian)
                                            <span class="badge bg-success">Vegetarian</span>
                                        @else
                                            <span class="badge bg-danger">Non-Vegetarian</span>
                                        @endif
                                        <span class="badge bg-info">{{ $todaysMenu['breakfast']->calories }} Cal</span>
                                    @else
                                        <h6>Poha with Chai</h6>
                                        <p>Flattened rice with vegetables and spices, served with tea</p>
                                        <span class="badge bg-success">Vegetarian</span>
                                        <span class="badge bg-info">220 Cal</span>
                                    @endif
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 mb-3">
                            <div class="card h-100">
                                <div class="card-header bg-light">
                                    <h5 class="mb-0">Lunch</h5>
                                    <small class="text-muted">12:30 PM - 2:30 PM</small>
                                </div>
                                <div class="card-body">
                                    @if(isset($todaysMenu) && isset($todaysMenu['lunch']))
                                        <h6>{{ $todaysMenu['lunch']->name }}</h6>
                                        <p>{{ $todaysMenu['lunch']->description }}</p>
                                        @if($todaysMenu['lunch']->is_vegetarian)
                                            <span class="badge bg-success">Vegetarian</span>
                                        @else
                                            <span class="badge bg-danger">Non-Vegetarian</span>
                                        @endif
                                        <span class="badge bg-info">{{ $todaysMenu['lunch']->calories }} Cal</span>
                                    @else
                                        <h6>Rajma Chawal</h6>
                                        <p>Kidney bean curry with steamed rice, salad, and papad</p>
                                        <span class="badge bg-success">Vegetarian</span>
                                        <span class="badge bg-info">420 Cal</span>
                                    @endif
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 mb-3">
                            <div class="card h-100">
                                <div class="card-header bg-light">
                                    <h5 class="mb-0">Dinner</h5>
                                    <small class="text-muted">7:30 PM - 9:30 PM</small>
                                </div>
                                <div class="card-body">
                                    @if(isset($todaysMenu) && isset($todaysMenu['dinner']))
                                        <h6>{{ $todaysMenu['dinner']->name }}</h6>
                                        <p>{{ $todaysMenu['dinner']->description }}</p>
                                        @if($todaysMenu['dinner']->is_vegetarian)
                                            <span class="badge bg-success">Vegetarian</span>
                                        @else
                                            <span class="badge bg-danger">Non-Vegetarian</span>
                                        @endif
                                        <span class="badge bg-info">{{ $todaysMenu['dinner']->calories }} Cal</span>
                                    @else
                                        <h6>Roti with Mixed Veg</h6>
                                        <p>Wheat flatbread with mixed vegetable curry and dal</p>
                                        <span class="badge bg-success">Vegetarian</span>
                                        <span class="badge bg-info">350 Cal</span>
                                    @endif
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-footer d-flex align-items-center justify-content-between">
                    <a class="small text-primary stretched-link" href="#">View Full Week Menu</a>
                    <div class="small text-primary"><i class="fas fa-angle-right"></i></div>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Recent Transactions and Announcements -->
    <div class="row">
        <div class="col-xl-6">
            <div class="card mb-4">
                <div class="card-header">
                    <i class="fas fa-history me-1"></i>
                    Recent Transactions
                </div>
                <div class="card-body">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Description</th>
                                <th>Amount</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            @if(isset($recentTransactions) && count($recentTransactions) > 0)
                                @foreach($recentTransactions as $transaction)
                                <tr>
                                    <td>{{ $transaction->created_at->format('M d, Y') }}</td>
                                    <td>{{ $transaction->description }}</td>
                                    <td>₹{{ number_format($transaction->amount) }}</td>
                                    <td>
                                        @if($transaction->status == 'completed')
                                            <span class="badge bg-success">Completed</span>
                                        @elseif($transaction->status == 'pending')
                                            <span class="badge bg-warning">Pending</span>
                                        @else
                                            <span class="badge bg-danger">Failed</span>
                                        @endif
                                    </td>
                                </tr>
                                @endforeach
                            @else
                                <tr>
                                    <td>May 15, 2023</td>
                                    <td>Monthly Meal Plan Payment</td>
                                    <td>₹3,200</td>
                                    <td><span class="badge bg-success">Completed</span></td>
                                </tr>
                                <tr>
                                    <td>May 10, 2023</td>
                                    <td>Wallet Recharge</td>
                                    <td>₹500</td>
                                    <td><span class="badge bg-success">Completed</span></td>
                                </tr>
                                <tr>
                                    <td>May 5, 2023</td>
                                    <td>Extra Meal Purchase</td>
                                    <td>₹150</td>
                                    <td><span class="badge bg-success">Completed</span></td>
                                </tr>
                            @endif
                        </tbody>
                    </table>
                </div>
                <div class="card-footer d-flex align-items-center justify-content-between">
                    <a class="small text-primary stretched-link" href="{{ route('student.payments') }}">View All Transactions</a>
                    <div class="small text-primary"><i class="fas fa-angle-right"></i></div>
                </div>
            </div>
        </div>
        <div class="col-xl-6">
            <div class="card mb-4">
                <div class="card-header">
                    <i class="fas fa-bullhorn me-1"></i>
                    Announcements
                </div>
                <div class="card-body">
                    <div class="list-group">
                        @if(isset($announcements) && count($announcements) > 0)
                            @foreach($announcements as $announcement)
                            <a href="#" class="list-group-item list-group-item-action">
                                <div class="d-flex w-100 justify-content-between">
                                    <h5 class="mb-1">{{ $announcement->title }}</h5>
                                    <small>{{ $announcement->created_at->diffForHumans() }}</small>
                                </div>
                                <p class="mb-1">{{ $announcement->content }}</p>
                                <small>{{ $announcement->author }}</small>
                            </a>
                            @endforeach
                        @else
                            <a href="#" class="list-group-item list-group-item-action">
                                <div class="d-flex w-100 justify-content-between">
                                    <h5 class="mb-1">Special Dinner on Saturday</h5>
                                    <small>3 days ago</small>
                                </div>
                                <p class="mb-1">We are organizing a special dinner this Saturday with regional cuisines. Don't miss it!</p>
                                <small>Mess Committee</small>
                            </a>
                            <a href="#" class="list-group-item list-group-item-action">
                                <div class="d-flex w-100 justify-content-between">
                                    <h5 class="mb-1">Maintenance Work</h5>
                                    <small>1 week ago</small>
                                </div>
                                <p class="mb-1">The dining hall will be closed for maintenance on Sunday from 3 PM to 5 PM. Packed meals will be provided.</p>
                                <small>Hostel Administration</small>
                            </a>
                            <a href="#" class="list-group-item list-group-item-action">
                                <div class="d-flex w-100 justify-content-between">
                                    <h5 class="mb-1">New Meal Plan Options</h5>
                                    <small>2 weeks ago</small>
                                </div>
                                <p class="mb-1">We have introduced new meal plan options. Check them out and upgrade your plan!</p>
                                <small>Mess Manager</small>
                            </a>
                        @endif
                    </div>
                </div>
                <div class="card-footer d-flex align-items-center justify-content-between">
                    <a class="small text-primary stretched-link" href="#">View All Announcements</a>
                    <div class="small text-primary"><i class="fas fa-angle-right"></i></div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection