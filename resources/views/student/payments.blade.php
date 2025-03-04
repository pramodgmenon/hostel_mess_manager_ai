@extends('layouts.dashboard')

@section('title', 'Payments')

@section('content')
<div class="container-fluid px-4">
    <h1 class="mt-4">Payments</h1>
    <ol class="breadcrumb mb-4">
        <li class="breadcrumb-item"><a href="{{ route('student.dashboard') }}">Dashboard</a></li>
        <li class="breadcrumb-item active">Payments</li>
    </ol>
    
    <!-- Payment Summary -->
    <div class="row mb-4">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <i class="fas fa-wallet me-1"></i>
                    Payment Summary
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-8">
                            <div class="row">
                                <div class="col-md-4 col-sm-6 mb-3">
                                    <div class="card bg-primary text-white h-100">
                                        <div class="card-body">
                                            <div class="d-flex justify-content-between align-items-center">
                                                <div>
                                                    <h5 class="mb-0">₹{{ number_format($walletBalance ?? 500) }}</h5>
                                                    <div class="small">Wallet Balance</div>
                                                </div>
                                                <div>
                                                    <i class="fas fa-wallet fa-2x"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4 col-sm-6 mb-3">
                                    <div class="card bg-success text-white h-100">
                                        <div class="card-body">
                                            <div class="d-flex justify-content-between align-items-center">
                                                <div>
                                                    <h5 class="mb-0">₹{{ number_format($totalPaid ?? 3850) }}</h5>
                                                    <div class="small">Total Paid</div>
                                                </div>
                                                <div>
                                                    <i class="fas fa-check-circle fa-2x"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4 col-sm-6 mb-3">
                                    <div class="card bg-danger text-white h-100">
                                        <div class="card-body">
                                            <div class="d-flex justify-content-between align-items-center">
                                                <div>
                                                    <h5 class="mb-0">₹{{ number_format($dueAmount ?? 0) }}</h5>
                                                    <div class="small">Due Amount</div>
                                                </div>
                                                <div>
                                                    <i class="fas fa-exclamation-circle fa-2x"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="mt-3">
                                <h5>Current Meal Plan</h5>
                                <div class="table-responsive">
                                    <table class="table table-bordered">
                                        <thead class="table-light">
                                            <tr>
                                                <th>Plan</th>
                                                <th>Start Date</th>
                                                <th>End Date</th>
                                                <th>Amount</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            @if(isset($currentPlan))
                                                <tr>
                                                    <td>{{ $currentPlan->name }}</td>
                                                    <td>{{ $currentPlan->start_date ? date('M d, Y', strtotime($currentPlan->start_date)) : 'May 01, 2023' }}</td>
                                                    <td>{{ $currentPlan->end_date ? date('M d, Y', strtotime($currentPlan->end_date)) : 'May 30, 2023' }}</td>
                                                    <td>₹{{ number_format($currentPlan->price ?? 3200) }}</td>
                                                    <td><span class="badge bg-success">Active</span></td>
                                                </tr>
                                            @else
                                                <tr>
                                                    <td>Monthly Plan</td>
                                                    <td>May 01, 2023</td>
                                                    <td>May 30, 2023</td>
                                                    <td>₹3,200</td>
                                                    <td><span class="badge bg-success">Active</span></td>
                                                </tr>
                                            @endif
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="card">
                                <div class="card-header bg-primary text-white">
                                    <h5 class="mb-0">Add Money to Wallet</h5>
                                </div>
                                <div class="card-body">
                                    <form>
                                        <div class="mb-3">
                                            <label for="amount" class="form-label">Amount (₹)</label>
                                            <input type="number" class="form-control" id="amount" placeholder="Enter amount" min="100" step="100" required>
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label">Payment Method</label>
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="paymentMethod" id="upi" value="upi" checked>
                                                <label class="form-check-label" for="upi">
                                                    UPI
                                                </label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="paymentMethod" id="card" value="card">
                                                <label class="form-check-label" for="card">
                                                    Credit/Debit Card
                                                </label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="paymentMethod" id="netbanking" value="netbanking">
                                                <label class="form-check-label" for="netbanking">
                                                    Net Banking
                                                </label>
                                            </div>
                                        </div>
                                        <div class="d-grid">
                                            <button type="submit" class="btn btn-primary">Proceed to Payment</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Payment History -->
    <div class="row mb-4">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <i class="fas fa-history me-1"></i>
                    Payment History
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>Transaction ID</th>
                                    <th>Date</th>
                                    <th>Description</th>
                                    <th>Amount</th>
                                    <th>Payment Method</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                @if(isset($payments) && count($payments) > 0)
                                    @foreach($payments as $payment)
                                    <tr>
                                        <td>{{ $payment->transaction_id }}</td>
                                        <td>{{ $payment->created_at->format('M d, Y') }}</td>
                                        <td>{{ $payment->description }}</td>
                                        <td>₹{{ number_format($payment->amount) }}</td>
                                        <td>{{ ucfirst($payment->payment_method) }}</td>
                                        <td>
                                            @if($payment->status == 'completed')
                                                <span class="badge bg-success">Completed</span>
                                            @elseif($payment->status == 'pending')
                                                <span class="badge bg-warning">Pending</span>
                                            @else
                                                <span class="badge bg-danger">Failed</span>
                                            @endif
                                        </td>
                                        <td>
                                            <button class="btn btn-sm btn-outline-primary">View</button>
                                        </td>
                                    </tr>
                                    @endforeach
                                @else
                                    <tr>
                                        <td>TXN123456789</td>
                                        <td>May 15, 2023</td>
                                        <td>Monthly Meal Plan Payment</td>
                                        <td>₹3,200</td>
                                        <td>UPI</td>
                                        <td><span class="badge bg-success">Completed</span></td>
                                        <td>
                                            <button class="btn btn-sm btn-outline-primary">View</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>TXN123456788</td>
                                        <td>May 10, 2023</td>
                                        <td>Wallet Recharge</td>
                                        <td>₹500</td>
                                        <td>Card</td>
                                        <td><span class="badge bg-success">Completed</span></td>
                                        <td>
                                            <button class="btn btn-sm btn-outline-primary">View</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>TXN123456787</td>
                                        <td>May 05, 2023</td>
                                        <td>Extra Meal Purchase</td>
                                        <td>₹150</td>
                                        <td>Wallet</td>
                                        <td><span class="badge bg-success">Completed</span></td>
                                        <td>
                                            <button class="btn btn-sm btn-outline-primary">View</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>TXN123456786</td>
                                        <td>Apr 30, 2023</td>
                                        <td>Wallet Recharge</td>
                                        <td>₹1,000</td>
                                        <td>Net Banking</td>
                                        <td><span class="badge bg-success">Completed</span></td>
                                        <td>
                                            <button class="btn btn-sm btn-outline-primary">View</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>TXN123456785</td>
                                        <td>Apr 15, 2023</td>
                                        <td>Weekly Meal Plan Payment</td>
                                        <td>₹900</td>
                                        <td>UPI</td>
                                        <td><span class="badge bg-success">Completed</span></td>
                                        <td>
                                            <button class="btn btn-sm btn-outline-primary">View</button>
                                        </td>
                                    </tr>
                                @endif
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="card-footer">
                    <nav aria-label="Page navigation">
                        <ul class="pagination justify-content-center mb-0">
                            <li class="page-item disabled">
                                <a class="page-link" href="#" tabindex="-1" aria-disabled="true">Previous</a>
                            </li>
                            <li class="page-item active"><a class="page-link" href="#">1</a></li>
                            <li class="page-item"><a class="page-link" href="#">2</a></li>
                            <li class="page-item"><a class="page-link" href="#">3</a></li>
                            <li class="page-item">
                                <a class="page-link" href="#">Next</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Payment Methods -->
    <div class="row">
        <div class="col-12">
            <div class="card mb-4">
                <div class="card-header">
                    <i class="fas fa-credit-card me-1"></i>
                    Saved Payment Methods
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-4 mb-3">
                            <div class="card">
                                <div class="card-body">
                                    <div class="d-flex justify-content-between align-items-center mb-3">
                                        <h5 class="card-title mb-0">UPI</h5>
                                        <i class="fas fa-mobile-alt fa-2x text-primary"></i>
                                    </div>
                                    <p class="card-text">student@okbank</p>
                                    <div class="d-flex justify-content-between">
                                        <span class="badge bg-success">Default</span>
                                        <div>
                                            <button class="btn btn-sm btn-outline-primary me-2">Edit</button>
                                            <button class="btn btn-sm btn-outline-danger">Remove</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 mb-3">
                            <div class="card">
                                <div class="card-body">
                                    <div class="d-flex justify-content-between align-items-center mb-3">
                                        <h5 class="card-title mb-0">Credit Card</h5>
                                        <i class="fas fa-credit-card fa-2x text-primary"></i>
                                    </div>
                                    <p class="card-text">XXXX XXXX XXXX 4567</p>
                                    <div class="d-flex justify-content-between">
                                        <span class="text-muted">Expires: 05/25</span>
                                        <div>
                                            <button class="btn btn-sm btn-outline-primary me-2">Edit</button>
                                            <button class="btn btn-sm btn-outline-danger">Remove</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 mb-3">
                            <div class="card h-100 border-dashed">
                                <div class="card-body d-flex flex-column justify-content-center align-items-center">
                                    <i class="fas fa-plus-circle fa-3x text-muted mb-3"></i>
                                    <h5 class="card-title">Add New Payment Method</h5>
                                    <button class="btn btn-primary mt-3">Add Method</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Receipt Modal -->
<div class="modal fade" id="receiptModal" tabindex="-1" aria-labelledby="receiptModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="receiptModalLabel">Payment Receipt</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="row mb-4">
                        <div class="col-12 text-center">
                            <h4>Hostel Mess Management System</h4>
                            <p class="mb-0">123 University Road, Campus Area</p>
                            <p>City, State - 123456</p>
                        </div>
                    </div>
                    <div class="row mb-4">
                        <div class="col-6">
                            <h6>Receipt No: TXN123456789</h6>
                            <p>Date: May 15, 2023</p>
                        </div>
                        <div class="col-6 text-end">
                            <h6>Student Details:</h6>
                            <p class="mb-0">Name: Student Name</p>
                            <p class="mb-0">ID: STU12345</p>
                            <p>Mobile: 9876543210</p>
                        </div>
                    </div>
                    <div class="row mb-4">
                        <div class="col-12">
                            <table class="table table-bordered">
                                <thead class="table-light">
                                    <tr>
                                        <th>Description</th>
                                        <th>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Monthly Meal Plan (May 01, 2023 - May 30, 2023)</td>
                                        <td>₹3,200.00</td>
                                    </tr>
                                    <tr>
                                        <td class="text-end"><strong>Total</strong></td>
                                        <td><strong>₹3,200.00</strong></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="row mb-4">
                        <div class="col-6">
                            <h6>Payment Method:</h6>
                            <p>UPI (student@okbank)</p>
                        </div>
                        <div class="col-6 text-end">
                            <h6>Payment Status:</h6>
                            <p><span class="badge bg-success">Completed</span></p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 text-center">
                            <p class="mb-0">Thank you for your payment!</p>
                            <p class="small text-muted">This is a computer-generated receipt and does not require a signature.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary"><i class="fas fa-download me-2"></i>Download</button>
                <button type="button" class="btn btn-success"><i class="fas fa-print me-2"></i>Print</button>
            </div>
        </div>
    </div>
</div>
@endsection

@section('styles')
<style>
    .border-dashed {
        border-style: dashed;
        border-width: 2px;
        border-color: #dee2e6;
    }
</style>
@endsection

@section('scripts')
<script>
    // Initialize modal functionality
    document.addEventListener('DOMContentLoaded', function() {
        // Show receipt modal when view button is clicked
        const viewButtons = document.querySelectorAll('.btn-outline-primary');
        const receiptModal = new bootstrap.Modal(document.getElementById('receiptModal'));
        
        viewButtons.forEach(button => {
            button.addEventListener('click', function() {
                receiptModal.show();
            });
        });
    });
</script>
@endsection