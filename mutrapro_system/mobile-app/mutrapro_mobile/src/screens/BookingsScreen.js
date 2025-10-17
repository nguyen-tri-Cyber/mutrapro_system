import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useAuth } from '../auth/AuthContext';
import { myBookings, listStudios } from '../services/api';

export default function BookingsScreen(){
  const { token } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [studios, setStudios] = useState([]);
  useEffect(()=>{ (async()=>{ setBookings(await myBookings(token)); setStudios(await listStudios(token)); })(); }, []);
  return (
    <View style={{ padding:16 }}>
      <Text style={{ fontWeight:'bold' }}>Studios</Text>
      <FlatList data={studios} keyExtractor={it=>String(it.id)} renderItem={({item})=>(<Text>{item.name} - {item.location} - {item.status}</Text>)} />
      <Text style={{ fontWeight:'bold', marginTop:16 }}>My Bookings</Text>
      <FlatList data={bookings} keyExtractor={it=>String(it.id)} renderItem={({item})=>(<Text>#{item.id} studio:{item.studio_id} {item.start_time}→{item.end_time} [{item.status}]</Text>)} />
    </View>
  );
}
