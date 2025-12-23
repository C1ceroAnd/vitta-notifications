import { Slot } from 'expo-router';
import React, { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { View } from 'react-native';

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function Layout() {
  useEffect(() => {
    SplashScreen.hideAsync().catch((err) => {
      console.warn("Erro ao esconder splash screen:", err);
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Slot />
    </View>
  );
}