@extends('layouts.dashboard')

@section('title', 'Admin Dashboard')

@section('dashboard-content')
<div class="row mb-4">
    <div class="col-md-3">
        <div class="card">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <h6 class="text-muted">Total Students</h6>
                        <h3 class="mb-0">{{ $stats['totalStudents'] }}</h3>
                    </div>
                    <div class="bg-light p-3 rounded">
                        <i class="fas fa-users text-primary"></i>
                    </div>
                </div>
                <div class="mt-3 text-success">
                    <i class="fas fa-arrow-up"></i> 12% increase
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-3">
        <div class="card">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <h6 class="text-muted">Active Meal Plans</h6>
                        <h3 class="mb-0">{{ $stats['activeMealPlans'] }}</h3>
                    </div>
                    <div class="bg-light p-3 rounded">
                        <i class="fas fa-utensils text-success"></i>
                    </div>
                </div>
                <div class="mt-3 text-success">
                    <i class="fas fa-arrow-up"></i> 8% increase
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-3">
        <div class="card">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <h6 class="text-muted">Pending Payments</h6>
                        <h3 class="mb-0">₹{{ number_format($stats['pendingPayments'], 2) }}</h3>
                    </div>
                    <div class="bg-light p-3 rounded">
                        <i class="fas fa-credit-card text-danger"></i>
                    </div>
                </div>
                <div class="mt-3 text-danger">
                    <i class="fas fa-arrow-up"></i> 5% increase
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-3">
        <div class="card">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <h6 class="text-muted">Inventory Status</h6>
                        <h3 class="mb-0">{{ $stats['inventoryStatus'] }}</h3>
                    </div>
                    <div class="bg-light p-3 rounded">
                        <i class="fas fa-box text-info"></i>
                    </div>
                </div>
                <div class="mt-3">
                    <span class="text-muted">Current stock level</span>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="card mb-4">
    <div class="card-header">
        <h5 class="card-title mb-0">Quick Actions</h5>
    </div>
    <div class="card-body">
        <div class="d-flex flex-wrap gap-2">
            <a href="{{ route('admin.meal-plans.create') }}" class="btn btn-primary">
                <i class="fas fa-plus-circle me-2"></i> Add Meal Plan
            </a>
            <button class="btn btn-secondary">
                <i class="fas fa-credit-card me-2"></i> Record Payment
            </button>
            <a href="{{ route('admin.inventory') }}" class="btn btn-outline-primary">
                <i class="fas fa-box me-2"></i> Manage Inventory
            </a>
            <a href="{{ route('admin.reports') }}" class="btn btn-outline-primary">
                <i class="fas fa-file-alt me-2"></i> Generate Report
            </a>
            <a href="{{ route('admin.menu-editor') }}" class="btn btn-outline-primary">
                <i class="fas fa-calendar-alt me-2"></i> Meal Schedule
            </a>
            <button class="btn btn-outline-primary">
                <i class="fas fa-users me-2"></i> Manage Students
            </button>
            <button class="btn btn-outline-primary">
                <i class="fas fa-shopping-cart me-2"></i> Suppliers
            </button>
        </div>
    </div>
</div>

<div class="row">
    <div class="col-12">
        <div class="card">
            <div class="card-header">
                <h5 class="card-title mb-0">System Modules</h5>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-md-3 mb-4">
                        <div class="card h-100">
                            <div class="card-header bg-light d-flex align-items-center">
                                <div class="rounded-circle bg-white p-2 me-3">
                                    <i class="fas fa-utensils text-warning"></i>
                                </div>
                                <h6 class="card-title mb-0">Meal Plan Management</h6>
                            </div>
                            <div class="card-body">
                                <p class="card-text">Configure pricing for daily, weekly, and monthly meal packages with customizable 7-day rotating menu.</p>
                            </div>
                            <div class="card-footer">
                                <a href="{{ route('admin.meal-plans') }}" class="btn btn-primary w-100">Manage Meal Plans</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3 mb-4">
                        <div class="card h-100">
                            <div class="card-header bg-light d-flex align-items-center">
                                <div class="rounded-circle bg-white p-2 me-3">
                                    <i class="fas fa-credit-card text-success"></i>
                                </div>
                                <h6 class="card-title mb-0">Payment System</h6>
                            </div>
                            <div class="card-body">
                                <p class="card-text">Handle advance payments from students, generate receipts, and track payment status.</p>
                            </div>
                            <div class="card-footer">
                                <button class="btn btn-primary w-100">Manage Payments</button>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3 mb-4">
                        <div class="card h-100">
                            <div class="card-header bg-light d-flex align-items-center">
                                <div class="rounded-circle bg-white p-2 me-3">
                                    <i class="fas fa-box text-primary"></i>
                                </div>
                                <h6 class="card-title mb-0">Inventory Management</h6>
                            </div>
                            <div class="card-body">
                                <p class="card-text">Track purchases, manage supplier invoices, handle store operations including receipts