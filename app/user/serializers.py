from django.contrib.auth import get_user_model, authenticate
from django.utils.translation import ugettext_lazy as _

from rest_framework import serializers
from rest_framework_simplejwt.settings import api_settings

class UserSerializer(serializers.ModelSerializer):
    
	token=serializers.SerializerMethodField()
	class Meta:
		model = get_user_model()
		fields = ('email', 'password', 'name','token')
		extra_kwargs = {'password': {'write_only': True, 'min_length': 7}}

	def get_token(self, obj):
		jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
		jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

		payload = jwt_payload_handler(obj)
		token = jwt_encode_handler(payload)
		return token

	def create(self, validated_data):
		return get_user_model().objects.create_user(**validated_data)

	def update(self, instance, validated_data):
		#Update a user name and password successfully and return it
		password= validated_data.pop('password',None)
		user = super().update(instance, validated_data)

		if password:
			user.set_password(password)
			user.save()

		return user


class AuthTokenSerializer(serializers.Serializer):
	#Serializer for user authentication
	email = serializers.CharField()
	password = serializers.CharField(
		style = {'input_type' : 'password'},
		trim_whitespace = False
	)

	def validate(self,attrs):
		#validate and authenticate the user
		email = attrs.get('email')
		password = attrs.get('password')

		user = authenticate(
			request = self.context.get('request'),
			username = email,
			password = password
		)
		if not user:
			msg= _('Unable to authenticate with the provied credentials')
			raise serializers.ValidationError(msg, code='authentication')

		attrs['user'] = user
		return attrs