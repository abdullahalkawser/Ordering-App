import { View, Text, TextInput } from 'react-native';
import React, { useState } from 'react';
import Button from '../../components/Button';
import { Link, Stack } from 'expo-router';

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View className='flex-1 justify-center p-5 bg-white'>
      <Stack.Screen options={{ title: 'Sign in' }} />

      <Text className='text-gray-600'>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="jon@gmail.com"
        className='border border-gray-300 p-2 mt-1 mb-5 bg-white rounded'
      />

      <Text className='text-gray-600'>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder=""
        className='border border-gray-300 p-2 mt-1 mb-5 bg-white rounded'
        secureTextEntry
      />

      <Button text="Sign in" />
      
      <Link href="/sign-up" asChild>
        <Text className='self-center font-bold text-blue-500 mt-5'>
          Create an account
        </Text>
      </Link>
    </View>
  );
};

export default SignInScreen;
