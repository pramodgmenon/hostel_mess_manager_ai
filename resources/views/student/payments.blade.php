@extends('layouts.dashboard')

@section('title', 'Payments & Balance')

@section('actions')
<button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addPaymentModal">
    <i class="fas fa-plus me-2"></i> Add Payment
</button>
@endsection

@section('dashboard-content')
<div class="row mb-4">
    <div class="col-md-6">
        <div class="card h-100">
            <div class="card-header">
                <h5 class="card-title mb-0"><i class="fas fa-wallet me-2"></i> Current Balance</h5>
            </div>
            <div class="card-body">
                <div class="d-flex align-items-center">
                    <i class="fas fa-dollar-sign fa-3x text-success me-3"></i>
                    <div>
                        <h2 class="mb-0">₹{{ number_format($user->balance, 2) }}</h2>
                        <p class="text-muted mb-0">Last updated: {{ now()->format('d M, Y') }}</p>
                    </div>
                </div>
            </div>
            <div class="card-footer">
                <button class="btn btn-outline-primary w-100">
                    <i class="fas fa-receipt me-2"></i> View Statement
                </button>
            </div>
        </div>
    </div>
    
    <div class="col-md-6">
        <div class="card h-100">
            <div class="card-header">
                <h5 class="card-title mb-0"><i class="fas fa-credit-card me-2"></i> Quick Actions</h5>
            </div>
            <div class="card-body">
                <div class="d-grid gap-2">
                    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addPaymentModal">
                        <i class="fas fa-plus me-2"></i> Add Money to Balance
                    </button>
                    <button class="btn btn-outline-secondary">
                        <i class="fas fa-history me-2"></i> View Payment History
                    </button>
                    <button class="btn btn-outline-secondary">
                        <i class="fas fa-receipt me-2"></i> Download Receipt
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="card">
    <div class="card-header">
        <h5 class="card-title mb-0"><i class="fas fa-history me-2"></i> Payment History</h5>
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
                            <th>Payment Method</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($payments as $payment)
                            <tr>
                                <td>{{ $payment->created_at->format('d M, Y') }}</td>
                                <td>{{ $payment->description }}</td>
                                <td>₹{{ number_format($payment->amount, 2) }}</td>
                                <td>{{ ucfirst($payment->payment_method ?? 'N/A') }}</td>
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
            
            <div class="d-flex justify-content-center mt-4">
                {{ $payments->links() }}
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
