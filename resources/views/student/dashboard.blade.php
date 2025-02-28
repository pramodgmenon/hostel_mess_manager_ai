@extends('layouts.dashboard')

@section('title', 'Student Dashboard')

@section('dashboard-content')
<div class="row">
    <div class="col-12">
        <div class="alert alert-info">
            <i class="fas fa-info-circle me-2"></i> Welcome back, {{ Auth::user()->name }}! Your current balance is ₹{{ number_format(Auth::user()->balance, 2) }}
        </div>
    </div>
</div>

<!-- Meal Plan Section -->
<div class="card mb-4">
    <div class="card-header">
        <h5 class="card-title mb-0"><i class="fas fa-utensils me-2"></i> Your Current Meal Plan</h5>
    </div>
    <div class="card-body">
        @if($activePlan)
            <div class="row">
                <div class="col-md-8">
                    <h4>{{ $activePlan->name }}</h4>
                    <p class="text-muted">{{ $activePlan->description }}</p>
                    
                    <div class="mb-3">
                        <span class="badge bg-primary">{{ ucfirst($activePlan->duration) }}</span>
                        <span class="badge bg-success ms-2">Active</span>
                        @if($activePlan->is_vegetarian)
                            <span class="badge bg-success ms-2">Vegetarian</span>
                        @endif
                    </div>
                    
                    <ul class="list-group list-group-flush mb-3">
                        <li class="list-group-item"><i class="fas fa-check text-success me-2"></i> Breakfast, Lunch, Dinner</li>
                        <li class="list-group-item"><i class="fas fa-check text-success me-2"></i> Weekend special meals</li>
                        <li class="list-group-item"><i class="fas fa-check text-success me-2"></i> Tea/Coffee included</li>
                    </ul>
                    
                    <div class="d-flex">
                        <a href="{{ route('student.meal-plans') }}" class="btn btn-outline-primary me-2">View Menu</a>
                        <button class="btn btn-outline-danger">Cancel Plan</button>
                    </div>
                </div>
                <div class="col-md-4 text-center">
                    <div class="card h-100">
                        <div class="card-body d-flex flex-column justify-content-center">
                            <h3 class="display-4 mb-0">₹{{ number_format($activePlan->price, 2) }}</h3>
                            <p class="text-muted">per {{ $activePlan->duration }}</p>
                            <p class="mt-2 mb-0"><i class="fas fa-clock text-muted me-1"></i> Renews on {{ now()->addDays(30)->format('d M, Y') }}</p>
                        </div>
                    </div>
                </div>
            </div>
        @else
            <div class="text-center py-4">
                <i class="fas fa-utensils fa-3x text-muted mb-3"></i>
                <h5>No Active Meal Plan</h5>
                <p class="text-muted">You don't have an active meal plan. Select a plan to continue.</p>
                <a href="{{ route('student.meal-plans') }}" class="btn btn-primary">Browse Meal Plans</a>
            </div>
        @endif
    </div>
</div>

<!-- Payment Section -->
<div class="card">
    <div class="card-header d-flex justify-content-between align-items-center">
        <h5 class="card-title mb-0"><i class="fas fa-credit-card me-2"></i> Recent Payments</h5>
        <a href="{{ route('student.payments') }}" class="btn btn-sm btn-primary">View All</a>
    </div>
    <div class="card-body">
        @if(count($payments) > 0)
            <div class="table-responsive">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Description</th>
                            <th>Amount</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($payments as $payment)
                            <tr>
                                <td>{{ $payment->created_at->format('d M, Y') }}</td>
                                <td>{{ $payment->description }}</td>
                                <td>₹{{ number_format($payment->amount, 2) }}</td>
                                <td>
                                    @if($payment->status == 'completed')
                                        <span class="badge bg-success">Completed</span>
                                    @elseif($payment->status == 'pending')
                                        <span class="badge bg-warning">Pending</span>
                                    @else
                                        <span class="badge bg-danger">Failed</span>
                                    @endif
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        @else
            <div class="text-center py-4">
                <i class="fas fa-receipt fa-3x text-muted mb-3"></i>
                <h5>No Payment History</h5>
                <p class="text-muted">You haven't made any payments yet.</p>
                <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addPaymentModal">Add Payment</button>
            </div>
        @endif
    </div>
</div>

<!-- Add Payment Modal -->
<div class="modal fade" id="addPaymentModal" tabindex="-1" aria-labelledby="addPaymentModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="addPaymentModalLabel">Add Payment</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form action="{{ route('student.add-payment') }}" method="POST">
                @csrf
                <div class="modal-body">
                    <div class="mb-3">
                        <label for="amount" class="form-label">Amount (₹)</label>
                        <input type="number" class="form-control" id="amount" name="amount" min="1" required>
                    </div>
                    <div class="mb-3">
                        <label for="payment_method" class="form-label">Payment Method</label>
                        <select class="form-select" id="payment_method" name="payment_method" required>
                            <option value="">Select payment method</option>
                            <option value="upi">UPI</option>
                            <option value="card">Credit/Debit Card</option>
                            <option value="netbanking">Net Banking</option>
                            <option value="cash">Cash</option>
                        </select>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="submit" class="btn btn-primary">Pay Now</button>
                </div>
            </form>
        </div>
    </div>
</div>
@endsection
