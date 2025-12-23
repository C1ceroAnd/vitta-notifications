import React from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useNotificationTestViewModel } from '../../viewmodel/useNotificationTestViewModel';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { colors, spacing, fonts, fontSizes, borderRadius } from '../themes/theme';

export default function NotificationTester() {
  const { 
    loading, 
    lastAction, 
    triggerNutritionistNotification, 
    triggerPatientNotification 
  } = useNotificationTestViewModel();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.surface} />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.header}>
            <View style={styles.headerTexts}>
                <Text style={styles.headerGreeting}>Ambiente de Teste</Text>
                <Text style={styles.headerTitle}>Validação de Push</Text>
            </View>
        </View>

        {lastAction ? (
          <View style={styles.feedbackContainer}>
            <Feather name="info" size={20} color={colors.primary} />
            <Text style={styles.feedbackText}>{lastAction}</Text>
          </View>
        ) : null}

        <View style={styles.sectionTitleWrapper}>
             <Feather name="activity" size={18} color={colors.textSecondary} />
             <Text style={styles.sectionLabel}>VISÃO NUTRICIONISTA</Text>
        </View>

        <Card 
            title="Novos Agendamentos" 
            subtitle="Simule o recebimento de uma solicitação de consulta de um paciente."
            variant="white"
        >
            <Button 
                title="Receber Solicitação" 
                onPress={triggerNutritionistNotification}
                loading={loading}
                variant="primary"
            />
        </Card>

        <View style={[styles.sectionTitleWrapper, { marginTop: spacing.lg }]}>
             <Feather name="user" size={18} color={colors.textSecondary} />
             <Text style={styles.sectionLabel}>VISÃO PACIENTE</Text>
        </View>

        <Card 
            title="Status da Consulta"
            subtitle="Simule a resposta da nutricionista para o paciente."
            variant="white"
        >
            <Button 
                title="Consulta Aceita ✅" 
                onPress={() => triggerPatientNotification('accepted')} 
                loading={loading}
                variant="secondary"
            />
            
            <View style={styles.row}>
                <View style={{ flex: 1 }}>
                    <Button 
                        title="Recusar" 
                        onPress={() => triggerPatientNotification('rejected')} 
                        loading={loading}
                        variant="danger"
                    />
                </View>
                <View style={{ width: spacing.md }} />
                <View style={{ flex: 1 }}>
                    <Button 
                        title="Cancelar" 
                        onPress={() => triggerPatientNotification('canceled')} 
                        loading={loading}
                        variant="outline"
                    />
                </View>
            </View>
        </Card>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: colors.surface 
  },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xl,
    marginTop: spacing.sm,
  },
  headerTexts: {
      flex: 1,
  },
  headerGreeting: {
      fontSize: fontSizes.md,
      color: colors.textSecondary,
      fontFamily: fonts.regular,
      marginBottom: 2,
  },
  headerTitle: {
      fontSize: 28,
      color: colors.text,
      fontFamily: fonts.bold,
  },
  avatarPlaceholder: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: colors.primaryLight,
      alignItems: 'center',
      justifyContent: 'center',
  },
  sectionTitleWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
      marginBottom: spacing.sm,
      paddingLeft: spacing.xs,
  },
  sectionLabel: {
      fontSize: fontSizes.sm,
      fontFamily: fonts.bold,
      color: colors.textSecondary,
      letterSpacing: 1,
      textTransform: 'uppercase',
  },
  row: {
      flexDirection: 'row',
  },
  feedbackContainer: {
    backgroundColor: colors.primaryLight,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  feedbackText: {
    color: colors.primary,
    fontFamily: fonts.medium,
    fontSize: fontSizes.sm,
    flex: 1,
  }
});