from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.decorators import login_required
from django.db import transaction
from django.shortcuts import render, redirect
from accounts.forms import SignUpForm, UserForm, ProfileForm
from accounts.models import create_user_profile, Profile


def signup(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=raw_password)
            login(request, user)
            return redirect('/accounts/profile')
    else:
        form = SignUpForm()
    return render(request, 'signup.html', {'form': form})


@login_required
@transaction.atomic
def update_profile(request):
    if request.method == 'POST':
        user_form = UserForm(request.POST, instance=request.user)
        profile_form = ProfileForm(request.POST, instance=request.user.profile)
        if user_form.is_valid() and profile_form.is_valid():
            user_form.save()
            profile_form.save()
            return redirect('/accounts/profile')
        else:
            return redirect('/accounts/profile')
    else:
        user_form = UserForm(instance=request.user)
        profile_form = ProfileForm(instance=request.user.profile)
    return render(request, '/accounts/profile.html', {
        'user_form': user_form,
        'profile_form': profile_form
    })


@login_required
def profile(request):
    user_form = UserForm(instance=request.user)
    user_profile = Profile.objects.get_or_create(user=request.user)
    profile_form = ProfileForm(instance=request.user.profile)
    return render(request, "profile.html", {'user_form':user_form,'profile_form':profile_form})

