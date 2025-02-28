@extends('layouts.dashboard')

@section('title', 'Meal Plans')

@section('dashboard-content')
<div class="row mb-4">
    <div class="col-12">
        <div class="card">
            <div class="card-header">
                <h5 class="card-title mb-0"><i class="fas fa-utensils me-2"></i> Your Current Plan</h5>
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
                            
                            <button class="btn btn-outline-danger">Cancel Plan</button>
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
                        <p class="text-muted">You don't have an active meal plan. Select a plan from below to continue.</p>
                    </div>
                @endif
            </div>
        </div>
    </div>
</div>

<h4 class="mb-3">Available Plans</h4>

<div class="row">
    @foreach($availablePlans as $plan)
        <div class="col-md-4 mb-4">
            <div class="card h-100 {{ $user->active_meal_plan_id == $plan->id ? 'border-primary' : '' }}">
                <div class="card-header">
                    <h5 class="card-title mb-0">{{ $plan->name }}</h5>
                </div>
                <div class="card-body">
                    <p class="card-text">{{ $plan->description }}</p>
                    <div class="mb-3">
                        <span class="badge bg-primary">{{ ucfirst($plan->duration) }}</span>
                        @if($plan->is_vegetarian)
                            <span class="badge bg-success ms-2">Vegetarian</span>
                        @endif
                    </div>
                    <div class="d-flex align-items-baseline mb-3">
                        <h3 class="mb-0">₹{{ number_format($plan->price, 2) }}</h3>
                        <span class="text-muted ms-2">per {{ $plan->duration }}</span>
                    </div>
                    <ul class="list-group list-group-flush mb-3">
                        <li class="list-group-item"><i class="fas fa-check text-success me-2"></i> Breakfast, Lunch, Dinner</li>
                        @if($plan->duration != 'daily')
                            <li class="list-group-item"><i class="fas fa-check text-success me-2"></i> Weekend special meals</li>
                        @endif
                        @if($plan->duration == 'monthly')
                            <li class="list-group-item"><i class="fas fa-check text-success me-2"></i> Tea/Coffee included</li>
                        @endif
                    </ul>
                </div>
                <div class="card-footer">
                    @if($user->active_meal_plan_id == $plan->id)
                        <button class="btn btn-primary w-100" disabled>Current Plan</button>
                    @else
                        <form action="{{ route('student.select-plan', $plan->id) }}" method="POST">
                            @csrf
                            <button type="submit" class="btn btn-outline-primary w-100">Select Plan</button>
                        </form>
                    @endif
                </div>
            </div>
        </div>
    @endforeach
</div>

<div class="alert alert-info mt-3">
    <i class="fas fa-info-circle me-2"></i> Meal plans can be changed at any time. Changes will take effect from the next billing cycle.
</div>
@endsection
