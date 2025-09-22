from django import forms
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError

# class Meta:
#     model = User
#     fields = ['username' , 'email', 'password' ]
class Signupform(forms.Form):
    username = forms.CharField(max_length=250,required=True)
    email = forms.EmailField(required=True)
    password = forms.CharField(widget=forms.PasswordInput,required=True)
    confirm_password = forms.CharField(widget=forms.PasswordInput,required=True)

    def clean_username(self):
        username=self.cleaned_data['username']
        if User.objects.filter(username=username).exists():
            raise ValidationError("username is already taken.")
        return username
    
    def clean_email(self):
        email = self.cleaned_data['email']
        if User.objects.filter(email=email).exists():
            raise ValidationError("email already in use")
        return email
    
    def clean(self):
        cleaned_data= super().clean()
        password = cleaned_data.get("password")
        confirm_password = cleaned_data.get("confirm_password")
        if password!= confirm_password:
            raise ValidationError("passwords do not match")
        return cleaned_data
