import Button from '@/components/Button'
import { Link } from 'expo-router'
import React from 'react'
import { Text, View } from 'react-native'

const profileScreen = () => {
  return (
    <View>
      <Text>hiiii user</Text>
      <Link href={'/(user)'} asChild>
        <Button text="User" />
      </Link>
    </View>
  )
}

export default profileScreen
