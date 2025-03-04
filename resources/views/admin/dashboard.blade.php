@extends('layouts.dashboard')

@section('title', 'Admin Dashboard')

@section('content')
<div class="container-fluid px-4">
    <h1 class="mt-4">Admin Dashboard</h1>
    <ol class="breadcrumb mb-4">
        <li class="breadcrumb-item active">Dashboard</li>
    </ol>
    
    <!-- Stats Cards -->
    <div class="row">
        <div class="col-xl-3 col-md-6">
            <div class="card bg-primary text-white mb-4">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h5 class="mb-0">{{ $totalStudents ?? 0 }}</h5>
                            <div class="small">Total Students</div>
                        </div>
                        <div>
                            <i class="fas fa-users fa-2x"></i>
                        </div>
                    </div>
                </div>
                <div class="card-footer d-flex align-items-center justify-content-between">
                    <a class="small text-white stretched-link" href="#">View Details</a>
                    <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                </div>
            </div>
        </div>
        <div class="col-xl-3 col-md-6">
            <div class="card bg-success text-white mb-4">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h5 class="mb-0">₹{{ number_format($totalRevenue ?? 0) }}</h5>
                            <div class="small">Monthly Revenue</div>
                        </div>
                        <div>
                            <i class="fas fa-rupee-sign fa-2x"></i>
                        </div>
                    </div>
                </div>
                <div class="card-footer d-flex align-items-center justify-content-between">
                    <a class="small text-white stretched-link" href="#">View Details</a>
                    <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                </div>
            </div>
        </div>
        <div class="col-xl-3 col-md-6">
            <div class="card bg-warning text-white mb-4">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h5 class="mb-0">{{ $activeMealPlans ?? 0 }}</h5>
                            <div class="small">Active Meal Plans</div>
                        </div>
                        <div>
                            <i class="fas fa-utensils fa-2x"></i>
                        </div>
                    </div>
                </div>
                <div class="card-footer d-flex align-items-center justify-content-between">
                    <a class="small text-white stretched-link" href="#">View Details</a>
                    <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                </div>
            </div>
        </div>
        <div class="col-xl-3 col-md-6">
            <div class="card bg-danger text-white mb-4">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h5 class="mb-0">{{ $lowStockItems ?? 0 }}</h5>
                            <div class="small">Low Stock Items</div>
                        </div>
                        <div>
                            <i class="fas fa-exclamation-triangle fa-2x"></i>
                        </div>
                    </div>
                </div>
                <div class="card-footer d-flex align-items-center justify-content-between">
                    <a class="small text-white stretched-link" href="#">View Details</a>
                    <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Quick Actions -->
    <div class="row mb-4">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <i class="fas fa-bolt me-1"></i>
                    Quick Actions
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-3 col-sm-6 mb-3">
                            <a href="#" class="btn btn-primary w-100 py-3">
                                <i class="fas fa-plus-circle me-2"></i> Add New Student
                            </a>
                        </div>
                        <div class="col-md-3 col-sm-6 mb-3">
                            <a href="#" class="btn btn-success w-100 py-3">
                                <i class="fas fa-utensils me-2"></i> Create Meal Plan
                            </a>
                        </div>
                        <div class="col-md-3 col-sm-6 mb-3">
                            <a href="#" class="btn btn-warning w-100 py-3">
                                <i class="fas fa-shopping-cart me-2"></i> Add Inventory
                            </a>
                        </div>
                        <div class="col-md-3 col-sm-6 mb-3">
                            <a href="#" class="btn btn-info w-100 py-3">
                                <i class="fas fa-chart-bar me-2"></i> Generate Report
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Recent Activity and Payment Status -->
    <div class="row">
        <div class="col-xl-6">
            <div class="card mb-4">
                <div class="card-header">
                    <i class="fas fa-history me-1"></i>
                    Recent Activity
                </div>
                <div class="card-body">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Student</th>
                                <th>Activity</th>
                            </tr>
                        </thead>
                        <tbody>
                            @if(isset($recentActivities) && count($recentActivities) > 0)
                                @foreach($recentActivities as $activity)
                                <tr>
                                    <td>{{ $activity->created_at->format('M d, Y') }}</td>
                                    <td>{{ $activity->user->name }}</td>
                                    <td>{{ $activity->description }}</td>
                                </tr>
                                @endforeach
                            @else
                                <tr>
                                    <td colspan="3" class="text-center">No recent activities</td>
                                </tr>
                                <tr>
                                    <td>May 15, 2023</td>
                                    <td>Rahul Sharma</td>
                                    <td>Purchased Monthly Meal Plan</td>
                                </tr>
                                <tr>
                                    <td>May 14, 2023</td>
                                    <td>Priya Patel</td>
                                    <td>Made payment of ₹3,200</td>
                                </tr>
                                <tr>
                                    <td>May 14, 2023</td>
                                    <td>Amit Singh</td>
                                    <td>Updated meal preferences</td>
                                </tr>
                                <tr>
                                    <td>May 13, 2023</td>
                                    <td>Neha Gupta</td>
                                    <td>Registered for Weekly Plan</td>
                                </tr>
                            @endif
                        </tbody>
                    </table>
                </div>
                <div class="card-footer small text-muted">
                    Updated yesterday at 11:59 PM
                </div>
            </div>
        </div>
        <div class="col-xl-6">
            <div class="card mb-4">
                <div class="card-header">
                    <i class="fas fa-money-bill-wave me-1"></i>
                    Payment Status
                </div>
                <div class="card-body">
                    <div class="chart-container" style="position: relative; height:300px;">
                        <canvas id="paymentStatusChart"></canvas>
                    </div>
                </div>
                <div class="card-footer small text-muted">
                    Updated yesterday at 11:59 PM
                </div>
            </div>
        </div>
    </div>
    
    <!-- Inventory Status -->
    <div class="row">
        <div class="col-12">
            <div class="card mb-4">
                <div class="card-header">
                    <i class="fas fa-warehouse me-1"></i>
                    Inventory Status
                </div>
                <div class="card-body">
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Category</th>
                                <th>Current Stock</th>
                                <th>Reorder Level</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            @if(isset($inventoryItems) && count($inventoryItems) > 0)
                                @foreach($inventoryItems as $item)
                                <tr>
                                    <td>{{ $item->name }}</td>
                                    <td>{{ $item->category }}</td>
                                    <td>{{ $item->quantity }} {{ $item->unit }}</td>
                                    <td>{{ $item->reorder_level }} {{ $item->unit }}</td>
                                    <td>
                                        @if($item->quantity <= $item->reorder_level)
                                            <span class="badge bg-danger">Low Stock</span>
                                        @else
                                            <span class="badge bg-success">Adequate</span>
                                        @endif
                                    </td>
                                </tr>
                                @endforeach
                            @else
                                <tr>
                                    <td>Rice</td>
                                    <td>Grains</td>
                                    <td>25 kg</td>
                                    <td>20 kg</td>
                                    <td><span class="badge bg-success">Adequate</span></td>
                                </tr>
                                <tr>
                                    <td>Wheat Flour</td>
                                    <td>Grains</td>
                                    <td>10 kg</td>
                                    <td>15 kg</td>
                                    <td><span class="badge bg-danger">Low Stock</span></td>
                                </tr>
                                <tr>
                                    <td>Cooking Oil</td>
                                    <td>Oils</td>
                                    <td>5 liters</td>
                                    <td>10 liters</td>
                                    <td><span class="badge bg-danger">Low Stock</span></td>
                                </tr>
                                <tr>
                                    <td>Potatoes</td>
                                    <td>Vegetables</td>
                                    <td>30 kg</td>
                                    <td>15 kg</td>
                                    <td><span class="badge bg-success">Adequate</span></td>
                                </tr>
                            @endif
                        </tbody>
                    </table>
                </div>
                <div class="card-footer d-flex align-items-center justify-content-between">
                    <a class="small text-primary stretched-link" href="#">View All Inventory</a>
                    <div class="small text-primary"><i class="fas fa-angle-right"></i></div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

@section('scripts')
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
    // Payment Status Chart
    var ctx = document.getElementById('paymentStatusChart').getContext('2d');
    var paymentStatusChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Paid', 'Pending', 'Overdue'],
            datasets: [{
                data: [65, 25, 10],
                backgroundColor: ['#28a745', '#ffc107', '#dc3545'],
                hoverBackgroundColor: ['#218838', '#e0a800', '#c82333'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            },
            cutout: '70%'
        }
    });
</script>
@endsection