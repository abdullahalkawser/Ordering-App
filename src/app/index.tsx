import { View, Text, ActivityIndicator } from 'react-native';
import React from 'react';

import { Link, Redirect } from 'expo-router';
import Button from '@/components/Button';

import { supabase } from '@/lib/supabase';
import { useAuth } from '@/providers/AuthProvider';

const index = () => {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!session) {
    return (
<Redirect  href={'/sign-in'}/>
    );
  }
  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
      <Link href={'/(user)'} asChild>
        <Button text="User" />
      </Link>
      <Link href={'/(admin)'} asChild>
        <Button text="Admin" />
      </Link>
      <Link href={'/sign-in'} asChild>
      <Button text="Sign in" />
    </Link>

    <Button onPress={()=> supabase.auth.signOut()} text="Sign out" />
    </View>
  );
};

export default index;