import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useAuth } from '../auth/AuthContext';
import { myNotifications } from '../services/api';

export default function NotificationsScreen(){
  const { token } = useAuth();
  const [items, setItems] = useState([]);
  useEffect(()=>{ (async()=> setItems(await myNotifications(token)))(); }, []);
  return (
    <View style={{ padding:16 }}>
      <Text style={{ fontWeight:'bold', marginBottom:8 }}>My Notifications</Text>
      <FlatList data={items} keyExtractor={it=>String(it.id)} renderItem={({item})=>(<Text>#{item.id} {item.title}: {item.message}</Text>)} />
    </View>
  );
}
