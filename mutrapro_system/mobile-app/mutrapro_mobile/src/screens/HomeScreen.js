import React from 'react';
import { View, Text, Button } from 'react-native';
import { useAuth } from '../auth/AuthContext';

export default function HomeScreen({ navigation }){
  const { user, logout } = useAuth();
  return (
    <View style={{ padding:16 }}>
      <Text style={{ fontSize:20, marginBottom:8 }}>Hello {user?.name} ({user?.role})</Text>
      <Button title="Orders" onPress={()=>navigation.navigate('Orders')} />
      <View style={{ height:8 }} />
      <Button title="Tasks (My)" onPress={()=>navigation.navigate('Tasks')} />
      <View style={{ height:8 }} />
      <Button title="Studio Bookings" onPress={()=>navigation.navigate('Bookings')} />
      <View style={{ height:8 }} />
      <Button title="Notifications" onPress={()=>navigation.navigate('Notifications')} />
      <View style={{ height:16 }} />
      <Button title="Logout" color="crimson" onPress={logout} />
    </View>
  );
}
