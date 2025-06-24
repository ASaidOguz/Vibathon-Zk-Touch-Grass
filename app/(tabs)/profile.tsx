import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { User, MapPin, Award, Camera, Shield, Info, Settings, ChevronRight } from 'lucide-react-native';

import VerifyProof from '@/components/VerifyProof';

export default function ProfileScreen() {
  const handlePrivacyInfo = () => {
    Alert.alert(
      'Privacy & Zero-Knowledge Proofs',
      'TouchGrass is built with privacy first. With your Starknet wallet connected, you can generate cryptographic proofs of your movement without revealing your actual location data. Your privacy is our priority.',
      [{ text: 'Got it!' }]
    );
  };

  const handleDataExport = () => {
    Alert.alert(
      'Export Data',
      'Your walk data and proofs can be exported at any time. This feature ensures you always have control over your data.',
      [{ text: 'Coming Soon' }]
    );
  };

  return (
    <LinearGradient
      colors={['#0F172A', '#1E293B', '#334155']}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <LinearGradient
              colors={['#22C55E', '#16A34A']}
              style={styles.avatar}
            >
              <User size={32} color="white" />
            </LinearGradient>
          </View>
          <Text style={styles.name}>Touch Grass Walker</Text>
          <Text style={styles.subtitle}>Privacy-focused movement tracker</Text>
        </View>

        <View style={styles.statsCard}>
          <Text style={styles.cardTitle}>Your Journey</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <MapPin size={20} color="#22C55E" />
              <Text style={styles.statValue}>0</Text>
              <Text style={styles.statLabel}>Walks</Text>
            </View>
            <View style={styles.statItem}>
              <Award size={20} color="#3B82F6" />
              <Text style={styles.statValue}>0.0</Text>
              <Text style={styles.statLabel}>km Total</Text>
            </View>
            <View style={styles.statItem}>
              <Camera size={20} color="#F59E0B" />
              <Text style={styles.statValue}>0</Text>
              <Text style={styles.statLabel}>Photos</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy & Security</Text>

          <TouchableOpacity style={styles.menuItem} onPress={handlePrivacyInfo}>
            <View style={styles.menuIcon}>
              <Shield size={20} color="#8B5CF6" />
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>Zero-Knowledge Proofs</Text>
              <Text style={styles.menuSubtitle}>Learn about cryptographic privacy</Text>
            </View>
            <ChevronRight size={20} color="#6B7280" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIcon}>
              <MapPin size={20} color="#EF4444" />
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>Location Data</Text>
              <Text style={styles.menuSubtitle}>Minimal storage, maximum privacy</Text>
            </View>
            <ChevronRight size={20} color="#6B7280" />
          </TouchableOpacity>

        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data & Preferences</Text>

          <TouchableOpacity style={styles.menuItem} onPress={handleDataExport}>
            <View style={styles.menuIcon}>
              <Settings size={20} color="#6B7280" />
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>Export Data</Text>
              <Text style={styles.menuSubtitle}>Download your walk history</Text>
            </View>
            <ChevronRight size={20} color="#6B7280" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIcon}>
              <Award size={20} color="#22C55E" />
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>Achievements</Text>
              <Text style={styles.menuSubtitle}>View your progress</Text>
            </View>
            <ChevronRight size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>

        <View style={styles.infoCard}>
          <Info size={24} color="#3B82F6" />
          <Text style={styles.infoTitle}>Built for Privacy</Text>
          <Text style={styles.infoDescription}>
            TouchGrass is designed from the ground up to protect your privacy. With Starknet wallet integration, we use zero-knowledge proof technology to verify your movement without exposing your exact routes.
          </Text>
        </View>

        <View style={styles.comingSoonSection}>
          <Text style={styles.comingSoonTitle}>🔮 Coming Soon</Text>
          <View style={styles.featuresList}>
            <View style={styles.featureItem}>
              <Text style={styles.featureBullet}>•</Text>
              <Text style={styles.featureText}>Zero-knowledge movement proofs</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureBullet}>•</Text>
              <Text style={styles.featureText}>Crypto rewards for walking</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureBullet}>•</Text>
              <Text style={styles.featureText}>Community challenges</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureBullet}>•</Text>
              <Text style={styles.featureText}>Decentralized leaderboards</Text>
            </View>
          </View>
        </View>

        {/* --- Place VerifyProof COMPONENT HERE, INSIDE SCROLLVIEW --- */}
        <View style={styles.section}> {/* You can give it a section style if you like */}
            <Text style={styles.sectionTitle}>Proof Verification</Text>
            <VerifyProof />
        </View>
        {/* -------------------------------------------------------- */}


        <View style={styles.footer}>
          <Text style={styles.footerText}>TouchGrass v1.0.0</Text>
          <Text style={styles.footerSubtext}>Privacy-first movement tracking</Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#94A3B8',
  },
  walletCard: { // These wallet styles are present but not used in the provided ProfileScreen
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  walletConnected: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  walletDisconnected: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  walletInfo: {
    flex: 1,
  },
  walletStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  connectedDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#22C55E',
    marginRight: 8,
  },
  walletStatusText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  walletAddress: {
    fontSize: 14,
    color: '#94A3B8',
    fontFamily: 'monospace',
  },
  walletDescription: {
    fontSize: 14,
    color: '#94A3B8',
    marginTop: 4,
  },
  walletButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  walletButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  connectButton: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  connectButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  connectButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  statsCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    gap: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  statLabel: {
    fontSize: 12,
    color: '#94A3B8',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 14,
    color: '#94A3B8',
  },
  infoCard: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.3)',
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 12,
    marginBottom: 8,
  },
  infoDescription: {
    fontSize: 14,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 20,
  },
  comingSoonSection: {
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.3)',
  },
  comingSoonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 16,
    textAlign: 'center',
  },
  featuresList: {
    gap: 8,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureBullet: {
    fontSize: 16,
    color: '#8B5CF6',
    fontWeight: 'bold',
  },
  featureText: {
    fontSize: 14,
    color: '#94A3B8',
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  footerText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '600',
  },
  footerSubtext: {
    fontSize: 12,
    color: '#4B5563',
    marginTop: 4,
  },
});