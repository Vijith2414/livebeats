from django.shortcuts import render,redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login,logout
from .forms import Signupform
from django.contrib import messages
from django.contrib.auth.models import User
from django.contrib.auth.forms import AuthenticationForm

def home(request):
    return render(request ,'home.html')

def Signup(request):
    if request.method =='POST':
        form = Signupform(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            email = form.cleaned_data['email']
            password = form.cleaned_data['password']

            user = User.objects.create_user(username=username,email=email, password=password)
            user.save()

            messages.success(request,"your account has been created successfully!")
            return redirect('login')
    else:
        form =Signupform()
    return render(request,'signup.html',{'form':form}) 

def log_in(request):
    if request.method == 'POST':
        form = AuthenticationForm(data = request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request,user)
            return redirect('home')
    else:
        form = AuthenticationForm()
    return render(request,'login.html',{'form':form})

@login_required(login_url='/login/')
def log_out(request):
    if request.method == 'POST':
        logout(request)
        return redirect('login')
    
    context = {
        'user': request.user
    }
    return render(request, 'logout.html', context)
 
