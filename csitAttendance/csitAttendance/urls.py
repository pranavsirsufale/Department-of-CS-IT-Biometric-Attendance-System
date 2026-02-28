from django.contrib import admin
from django.urls import path
from django.urls import include
from app.views import MyTokenObtainPairView
from rest_framework_simplejwt.views import (TokenObtainPairView, TokenRefreshView)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include('app.urls')),
    #login 
    # path("api/v1/login/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/v1/login/", MyTokenObtainPairView.as_view(), name="user_auth"),
    path("api/v1/token/refresh/", TokenRefreshView.as_view(), name="token_refresh")
]
