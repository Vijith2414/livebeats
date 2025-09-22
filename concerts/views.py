from django.shortcuts import render,redirect
from .forms import Concertform
from .forms import Concert
from django.contrib.auth.decorators import login_required,user_passes_test

def is_admin(user):
     return user.is_superuser

@login_required(login_url='/login/')
# for creating the concert
@user_passes_test(is_admin)

def concert_create(request):
    if request.method == 'POST':
        form = Concertform(request.POST)
        if form.is_valid():
            form.save()
            return redirect('create')
    else:
            form =Concertform()
    return render(request, 'create.html',{'form': form})


#for reading the concert
def concert_read(request):
     concert_list =  Concert.objects.all()
     return render(request,'read.html',{'concert_list':concert_list})

#for updating the concert
@login_required(login_url='/login/')
@user_passes_test(is_admin)
def concert_update(request,pk):
     concert = Concert.objects.get(pk=pk)
     if request.method == 'POST':
          form = Concertform(request.POST,instance=concert)
          if form.is_valid():
               form.save()
               return redirect('read')
     else:
          form = Concertform(instance=concert)
     return render(request,'update.html', {'form':form})

#for deleting the concerts
@login_required(login_url='/login/')
@user_passes_test(is_admin)
def concert_delete(request,pk):
     concert = Concert.objects.get(pk=pk)
     if request.method == 'POST':
          concert.delete()
          return redirect('read')
     return render(request,'delete.html',{'concert':concert})     
