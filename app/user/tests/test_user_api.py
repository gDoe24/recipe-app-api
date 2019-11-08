from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse

from rest_framework.test import APIClient
from rest_framework import status

CREATE_USER_URL = reverse('user:create')
TOKEN_URL = reverse('user:token')


def create_user(**params):
	return get_user_model().objects.create_user(**params)


class PublicUserApiTests(TestCase):
	#Test users API (public)
	def setup(self):
		self.client=APIClient()

	def test_create_user_success(self):
		#Test creating user with valid payload

		payload={
		'email':'test@londonappdev.com',
		'password':'test1234',
		'name':'name',
		}
		res=self.client.post(CREATE_USER_URL,payload)

		self.assertEqual(res.status_code, status.HTTP_201_CREATED)
		user=get_user_model().objects.get(**res.data)
		self.assertTrue(
			user.check_password(payload['password'])
		)
		self.assertNotIn('password', res.data)

	def test_duplicate_user(self):
		#test creating a user that already exists fails
		payload={
		'email':'test@londonappdev.com',
		'password':'test1234',
		}
		create_user(**payload)

		res=self.client.post(CREATE_USER_URL,payload)

		self.assertEqual(res.status_code,status.HTTP_400_BAD_REQUEST)

	def test_password_length(self):
		#test that password is more than 8 characters

		payload={'email':'test@londonappdev.com','password':'pw'}
		create_user(**payload)

		res=self.client.post(CREATE_USER_URL,payload)

		
		self.assertEqual(res.status_code,status.HTTP_400_BAD_REQUEST)
		user_exists=get_user_model().objects.filter(
			email=payload['email']
			).exists()
		self.assertTrue(user_exists)

	def test_create_token_for_user(self):
		#test that a token is created 
		payload={
		'email':'test@londonappdev.com',
		'password':'test1234',
		}
		create_user(**payload)

		res=self.client.post(TOKEN_URL,payload)

		self.assertIn('token',res.data)
		self.assertEqual(res.status_code,status.HTTP_200_OK)

	def test_create_token_invalid_credentials(self):
		#Test that token is not created for invalid id
		create_user(email='test@londonappdev.com',password='test1234')
		payload={
		'email':'test@londonappdev.com',
		'password':'wrongaf'
		}

		res=self.client.post(TOKEN_URL,payload)

		self.assertNotIn('token',res.data)
		self.assertEqual(res.status_code,status.HTTP_400_BAD_REQUEST)

	def test_create_token_no_user(self):
		#test that token is not created if the user is not in the database
		payload={
		'email':'test@londonappdev.com',
		'password':'wrongaf'
		}

		res=self.client.post(TOKEN_URL,payload)

		self.assertNotIn('token',res.data)
		self.assertEqual(res.status_code,status.HTTP_400_BAD_REQUEST)

	def test_blank_password_field(self):
		#Test that it doesn't work without a password
		payload={
		'email':'test@londappdev.com',
		'password':''
		}
		
		res=self.client.post(TOKEN_URL,payload)

		self.assertNotIn('token',res.data)
		self.assertEqual(res.status_code,status.HTTP_400_BAD_REQUEST)