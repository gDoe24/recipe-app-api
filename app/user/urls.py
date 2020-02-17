from django.urls import path, include

from user import views
from knox import views as knox_views

app_name='user'

urlpatterns = [
	path('create/', views.CreateUserView.as_view(), name='create'),
	path('token/', include('knox.urls')),
	path('me/', views.ManageUserView.as_view(), name='me'),
]