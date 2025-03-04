@extends('layouts.dashboard')

@section('title', 'Meal Plans')

@section('content')
<div class="container-fluid px-4">
    <h1 class="mt-4">Meal Plans</h1>
    <ol class="breadcrumb mb-4">
        <li class="breadcrumb-item"><a href="{{ route('student.dashboard') }}">Dashboard</a></li>
        <li class="breadcrumb-item active">Meal Plans</li>
    </ol>
    
    <!-- Current Plan -->
    <div class="row mb-4">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <i class="fas fa-calendar-check me-1"></i>
                    Your Current Plan
                </div>
                <div class="card-body">
                    @if(isset($currentPlan))
                    <div class="row">
                        <div class="col-md-8">
                            <h4>{{ $currentPlan->name }}</h4>
                            <p class="text-muted">{{ $currentPlan->description }}</p>
                            
                            <div class="row mt-4">
                                <div class="col-md-3 col-sm-6 mb-3">
                                    <div class="card bg-light">
                                        <div class="card-body text-center">
                                            <h3 class="mb-0">{{ $daysRemaining ?? 0 }}</h3>
                                            <small class="text-muted">Days Remaining</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-3 col-sm-6 mb-3">
                                    <div class="card bg-light">
                                        <div class="card-body text-center">
                                            <h3 class="mb-0">{{ $currentPlan->duration_days ?? 0 }}</h3>
                                            <small class="text-muted">Total Days</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-3 col-sm-6 mb-3">
                                    <div class="card bg-light">
                                        <div class="card-body text-center">
                                            <h3 class="mb-0">₹{{ number_format($currentPlan->price ?? 0) }}</h3>
                                            <small class="text-muted">Plan Price</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-3 col-sm-6 mb-3">
                                    <div class="card bg-light">
                                        <div class="card-body text-center">
                                            <h3 class="mb-0">{{ $currentPlan->start_date ? date('M d', strtotime($currentPlan->start_date)) : 'May 01' }}</h3>
                                            <small class="text-muted">Start Date</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="card h-100">
                                <div class="card-body">
                                    <h5 class="card-title">Plan Status</h5>
                                    <div class="progress mb-3" style="height: 25px;">
                                        @php
                                            $daysRemaining = $daysRemaining ?? 0;
                                            $totalDays = $currentPlan->duration_days ?? 30;
                                            $percentComplete = 100 - (($daysRemaining / $totalDays) * 100);
                                        @endphp
                                        <div class="progress-bar bg-success" role="progressbar" style="width: {{ $percentComplete }}%" aria-valuenow="{{ $percentComplete }}" aria-valuemin="0" aria-valuemax="100">{{ round($percentComplete) }}% Complete</div>
                                    </div>
                                    <p class="card-text">Your plan will expire on <strong>{{ $currentPlan->end_date ? date('F d, Y', strtotime($currentPlan->end_date)) : 'May 30, 2023' }}</strong></p>
                                    <div class="d-grid gap-2">
                                        <button class="btn btn-primary" type="button">Renew Plan</button>
                                        <button class="btn btn-outline-secondary" type="button">Change Plan</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    @else
                    <div class="alert alert-warning">
                        <i class="fas fa-exclamation-triangle me-2"></i>
                        You don't have an active meal plan. Please select a plan below to continue.
                    </div>
                    @endif
                </div>
            </div>
        </div>
    </div>
    
    <!-- Available Plans -->
    <div class="row mb-4">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <i class="fas fa-list-alt me-1"></i>
                    Available Meal Plans
                </div>
                <div class="card-body">
                    <div class="row">
                        @if(isset($availablePlans) && count($availablePlans) > 0)
                            @foreach($availablePlans as $plan)
                            <div class="col-lg-3 col-md-6 mb-4">
                                <div class="card h-100 card-hover">
                                    <div class="card-header bg-primary text-white text-center">
                                        <h5 class="mb-0">{{ $plan->name }}</h5>
                                    </div>
                                    <div class="card-body">
                                        <h3 class="text-center mb-3">₹{{ number_format($plan->price) }}</h3>
                                        <p class="text-muted">{{ $plan->description }}</p>
                                        <ul class="list-group list-group-flush mb-3">
                                            <li class="list-group-item"><i class="fas fa-calendar-day me-2"></i> {{ $plan->duration_days }} Days</li>
                                            <li class="list-group-item"><i class="fas fa-utensils me-2"></i> 3 Meals per day</li>
                                            <li class="list-group-item"><i class="fas fa-check-circle me-2 text-success"></i> Veg & Non-veg options</li>
                                        </ul>
                                        <div class="d-grid">
                                            <button class="btn btn-primary">Select Plan</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            @endforeach
                        @else
                            <div class="col-lg-3 col-md-6 mb-4">
                                <div class="card h-100 card-hover">
                                    <div class="card-header bg-primary text-white text-center">
                                        <h5 class="mb-0">Daily Plan</h5>
                                    </div>
                                    <div class="card-body">
                                        <h3 class="text-center mb-3">₹150</h3>
                                        <p class="text-muted">Basic meal plan for a single day</p>
                                        <ul class="list-group list-group-flush mb-3">
                                            <li class="list-group-item"><i class="fas fa-calendar-day me-2"></i> 1 Day</li>
                                            <li class="list-group-item"><i class="fas fa-utensils me-2"></i> 3 Meals per day</li>
                                            <li class="list-group-item"><i class="fas fa-check-circle me-2 text-success"></i> Veg & Non-veg options</li>
                                        </ul>
                                        <div class="d-grid">
                                            <button class="btn btn-primary">Select Plan</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-6 mb-4">
                                <div class="card h-100 card-hover">
                                    <div class="card-header bg-primary text-white text-center">
                                        <h5 class="mb-0">Weekly Plan</h5>
                                    </div>
                                    <div class="card-body">
                                        <h3 class="text-center mb-3">₹900</h3>
                                        <p class="text-muted">Standard meal plan for one week</p>
                                        <ul class="list-group list-group-flush mb-3">
                                            <li class="list-group-item"><i class="fas fa-calendar-day me-2"></i> 7 Days</li>
                                            <li class="list-group-item"><i class="fas fa-utensils me-2"></i> 3 Meals per day</li>
                                            <li class="list-group-item"><i class="fas fa-check-circle me-2 text-success"></i> Veg & Non-veg options</li>
                                        </ul>
                                        <div class="d-grid">
                                            <button class="btn btn-primary">Select Plan</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-6 mb-4">
                                <div class="card h-100 card-hover border-primary">
                                    <div class="card-header bg-primary text-white text-center">
                                        <h5 class="mb-0">Monthly Plan</h5>
                                        <span class="badge bg-warning">Popular</span>
                                    </div>
                                    <div class="card-body">
                                        <h3 class="text-center mb-3">₹3,200</h3>
                                        <p class="text-muted">Premium meal plan for a full month</p>
                                        <ul class="list-group list-group-flush mb-3">
                                            <li class="list-group-item"><i class="fas fa-calendar-day me-2"></i> 30 Days</li>
                                            <li class="list-group-item"><i class="fas fa-utensils me-2"></i> 3 Meals per day</li>
                                            <li class="list-group-item"><i class="fas fa-check-circle me-2 text-success"></i> Veg & Non-veg options</li>
                                        </ul>
                                        <div class="d-grid">
                                            <button class="btn btn-primary">Select Plan</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-6 mb-4">
                                <div class="card h-100 card-hover">
                                    <div class="card-header bg-primary text-white text-center">
                                        <h5 class="mb-0">Semester Plan</h5>
                                    </div>
                                    <div class="card-body">
                                        <h3 class="text-center mb-3">₹15,000</h3>
                                        <p class="text-muted">Complete meal plan for the entire semester</p>
                                        <ul class="list-group list-group-flush mb-3">
                                            <li class="list-group-item"><i class="fas fa-calendar-day me-2"></i> 120 Days</li>
                                            <li class="list-group-item"><i class="fas fa-utensils me-2"></i> 3 Meals per day</li>
                                            <li class="list-group-item"><i class="fas fa-check-circle me-2 text-success"></i> Veg & Non-veg options</li>
                                        </ul>
                                        <div class="d-grid">
                                            <button class="btn btn-primary">Select Plan</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        @endif
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Weekly Menu -->
    <div class="row">
        <div class="col-12">
            <div class="card mb-4">
                <div class="card-header">
                    <i class="fas fa-calendar-week me-1"></i>
                    Weekly Menu
                </div>
                <div class="card-body">
                    <ul class="nav nav-tabs" id="menuTabs" role="tablist">
                        @php
                            $days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                            $today = strtolower(date('l'));
                        @endphp
                        
                        @foreach($days as $index => $day)
                            <li class="nav-item" role="presentation">
                                <button class="nav-link {{ strtolower($day) == $today ? 'active' : '' }}" 
                                        id="{{ strtolower($day) }}-tab" 
                                        data-bs-toggle="tab" 
                                        data-bs-target="#{{ strtolower($day) }}" 
                                        type="button" 
                                        role="tab" 
                                        aria-controls="{{ strtolower($day) }}" 
                                        aria-selected="{{ strtolower($day) == $today ? 'true' : 'false' }}">
                                    {{ $day }}
                                </button>
                            </li>
                        @endforeach
                    </ul>
                    <div class="tab-content pt-4" id="menuTabsContent">
                        @foreach($days as $day)
                            <div class="tab-pane fade {{ strtolower($day) == $today ? 'show active' : '' }}" 
                                 id="{{ strtolower($day) }}" 
                                 role="tabpanel" 
                                 aria-labelledby="{{ strtolower($day) }}-tab">
                                
                                <div class="row">
                                    <div class="col-md-4 mb-3">
                                        <div class="card h-100">
                                            <div class="card-header bg-light">
                                                <h5 class="mb-0">Breakfast</h5>
                                                <small class="text-muted">7:30 AM - 9:30 AM</small>
                                            </div>
                                            <div class="card-body">
                                                @if(isset($weeklyMenu) && isset($weeklyMenu[strtolower($day)]) && isset($weeklyMenu[strtolower($day)]['breakfast']))
                                                    <h6>{{ $weeklyMenu[strtolower($day)]['breakfast']->name }}</h6>
                                                    <p>{{ $weeklyMenu[strtolower($day)]['breakfast']->description }}</p>
                                                    @if($weeklyMenu[strtolower($day)]['breakfast']->is_vegetarian)
                                                        <span class="badge bg-success">Vegetarian</span>
                                                    @else
                                                        <span class="badge bg-danger">Non-Vegetarian</span>
                                                    @endif
                                                    <span class="badge bg-info">{{ $weeklyMenu[strtolower($day)]['breakfast']->calories }} Cal</span>
                                                @else
                                                    @php
                                                        $breakfastItems = [
                                                            'monday' => ['Idli Sambar', 'Steamed rice cakes served with lentil soup', true, 250],
                                                            'tuesday' => ['Poha', 'Flattened rice with vegetables and spices', true, 220],
                                                            'wednesday' => ['Bread Omelette', 'Bread served with egg omelette', false, 320],
                                                            'thursday' => ['Upma', 'Semolina porridge with vegetables', true, 230],
                                                            'friday' => ['Aloo Paratha', 'Wheat flatbread stuffed with spiced potatoes', true, 350],
                                                            'saturday' => ['Dosa', 'Fermented rice and lentil crepe', true, 280],
                                                            'sunday' => ['Chole Bhature', 'Spiced chickpeas with fried bread', true, 450]
                                                        ];
                                                        $dayLower = strtolower($day);
                                                    @endphp
                                                    <h6>{{ $breakfastItems[$dayLower][0] }}</h6>
                                                    <p>{{ $breakfastItems[$dayLower][1] }}</p>
                                                    @if($breakfastItems[$dayLower][2])
                                                        <span class="badge bg-success">Vegetarian</span>
                                                    @else
                                                        <span class="badge bg-danger">Non-Vegetarian</span>
                                                    @endif
                                                    <span class="badge bg-info">{{ $breakfastItems[$dayLower][3] }} Cal</span>
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
                                                @if(isset($weeklyMenu) && isset($weeklyMenu[strtolower($day)]) && isset($weeklyMenu[strtolower($day)]['lunch']))
                                                    <h6>{{ $weeklyMenu[strtolower($day)]['lunch']->name }}</h6>
                                                    <p>{{ $weeklyMenu[strtolower($day)]['lunch']->description }}</p>
                                                    @if($weeklyMenu[strtolower($day)]['lunch']->is_vegetarian)
                                                        <span class="badge bg-success">Vegetarian</span>
                                                    @else
                                                        <span class="badge bg-danger">Non-Vegetarian</span>
                                                    @endif
                                                    <span class="badge bg-info">{{ $weeklyMenu[strtolower($day)]['lunch']->calories }} Cal</span>
                                                @else
                                                    @php
                                                        $lunchItems = [
                                                            'monday' => ['Rice and Dal', 'Steamed rice with lentil curry', true, 380],
                                                            'tuesday' => ['Rajma Chawal', 'Kidney bean curry with rice', true, 420],
                                                            'wednesday' => ['Chicken Biryani', 'Spiced rice with chicken', false, 550],
                                                            'thursday' => ['Paneer Butter Masala with Roti', 'Cottage cheese in tomato gravy with wheat flatbread', true, 480],
                                                            'friday' => ['Fish Curry with Rice', 'Fish in spiced gravy with steamed rice', false, 520],
                                                            'saturday' => ['Chole with Bhature', 'Spiced chickpeas with fried bread', true, 580],
                                                            'sunday' => ['Veg Pulao', 'Rice cooked with vegetables and spices', true, 400]
                                                        ];
                                                        $dayLower = strtolower($day);
                                                    @endphp
                                                    <h6>{{ $lunchItems[$dayLower][0] }}</h6>
                                                    <p>{{ $lunchItems[$dayLower][1] }}</p>
                                                    @if($lunchItems[$dayLower][2])
                                                        <span class="badge bg-success">Vegetarian</span>
                                                    @else
                                                        <span class="badge bg-danger">Non-Vegetarian</span>
                                                    @endif
                                                    <span class="badge bg-info">{{ $lunchItems[$dayLower][3] }} Cal</span>
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
                                                @if(isset($weeklyMenu) && isset($weeklyMenu[strtolower($day)]) && isset($weeklyMenu[strtolower($day)]['dinner']))
                                                    <h6>{{ $weeklyMenu[strtolower($day)]['dinner']->name }}</h6>
                                                    <p>{{ $weeklyMenu[strtolower($day)]['dinner']->description }}</p>
                                                    @if($weeklyMenu[strtolower($day)]['dinner']->is_vegetarian)
                                                        <span class="badge bg-success">Vegetarian</span>
                                                    @else
                                                        <span class="badge bg-danger">Non-Vegetarian</span>
                                                    @endif
                                                    <span class="badge bg-info">{{ $weeklyMenu[strtolower($day)]['dinner']->calories }} Cal</span>
                                                @else
                                                    @php
                                                        $dinnerItems = [
                                                            'monday' => ['Roti with Mixed Veg', 'Wheat flatbread with mixed vegetable curry', true, 350],
                                                            'tuesday' => ['Egg Curry with Rice', 'Egg in spiced gravy with steamed rice', false, 420],
                                                            'wednesday' => ['Dal Khichdi', 'Rice and lentil porridge', true, 320],
                                                            'thursday' => ['Butter Chicken with Naan', 'Chicken in tomato gravy with leavened flatbread', false, 650],
                                                            'friday' => ['Aloo Gobi with Roti', 'Potato and cauliflower curry with wheat flatbread', true, 380],
                                                            'saturday' => ['Mutton Curry with Rice', 'Mutton in spiced gravy with steamed rice', false, 580],
                                                            'sunday' => ['Veg Thali', 'Assorted vegetarian dishes with rice and bread', true, 520]
                                                        ];
                                                        $dayLower = strtolower($day);
                                                    @endphp
                                                    <h6>{{ $dinnerItems[$dayLower][0] }}</h6>
                                                    <p>{{ $dinnerItems[$dayLower][1] }}</p>
                                                    @if($dinnerItems[$dayLower][2])
                                                        <span class="badge bg-success">Vegetarian</span>
                                                    @else
                                                        <span class="badge bg-danger">Non-Vegetarian</span>
                                                    @endif
                                                    <span class="badge bg-info">{{ $dinnerItems[$dayLower][3] }} Cal</span>
                                                @endif
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        @endforeach
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

@section('scripts')
<script>
    // Initialize Bootstrap tabs
    document.addEventListener('DOMContentLoaded', function() {
        var triggerTabList = [].slice.call(document.querySelectorAll('#menuTabs button'));
        triggerTabList.forEach(function(triggerEl) {
            var tabTrigger = new bootstrap.Tab(triggerEl);
            triggerEl.addEventListener('click', function(event) {
                event.preventDefault();
                tabTrigger.show();
            });
        });
    });
</script>
@endsection