import { View, Text, StyleSheet, TouchableOpacity, Alert, Platform, ScrollView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MapPin, Camera, TreePine, Target, Shield, Zap, Award, ChevronRight } from 'lucide-react-native';
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const [locationPermission, setLocationPermission] = useState<Location.LocationPermissionResponse | null>(null);
  const [currentLocation, setCurrentLocation] = useState<Location.LocationObject | null>(null);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      const permissionResponse = await Location.getForegroundPermissionsAsync();
      setLocationPermission(permissionResponse);
      
      if (status === 'granted') {
        getCurrentLocation();
      }
    } catch (error) {
      console.error('Error requesting location permission:', error);
    }
  };

  const getCurrentLocation = async () => {
    try {
      if (Platform.OS === 'web') {
        setCurrentLocation({
          coords: {
            latitude: 37.7749,
            longitude: -122.4194,
            altitude: 0,
            accuracy: 5,
            altitudeAccuracy: null,
            heading: null,
            speed: null,
          },
          timestamp: Date.now(),
        });
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      setCurrentLocation(location);
    } catch (error) {
      console.error('Error getting current location:', error);
    }
  };

  const startWalk = () => {
    if (!locationPermission?.granted) {
      Alert.alert(
        'Location Permission Required',
        'Please enable location permissions to start tracking your walk.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Settings', onPress: requestLocationPermission },
        ]
      );
      return;
    }

    router.push('/active');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero Section */}
      <LinearGradient
        colors={['#0F172A', '#1E293B', '#334155']}
        style={styles.heroSection}
      >
        <View style={styles.heroContent}>
          <View style={styles.logoContainer}>
            <LinearGradient
              colors={['#22C55E', '#16A34A', '#15803D']}
              style={styles.logoGradient}
            >
              <TreePine size={32} color="white" />
            </LinearGradient>
          </View>
          
          <Text style={styles.heroTitle}>TouchGrass</Text>
          <Text style={styles.heroSubtitle}>
            Prove your movement, protect your privacy
          </Text>
          <Text style={styles.heroDescription}>
            The first privacy-focused movement tracker that lets you prove you've been active without revealing where you've been.
          </Text>

          {/* Status Card */}
          <View style={styles.statusCard}>
            <View style={styles.statusHeader}>
              <MapPin 
                size={20} 
                color={locationPermission?.granted ? '#22C55E' : '#F59E0B'} 
              />
              <Text style={[
                styles.statusText,
                { color: locationPermission?.granted ? '#22C55E' : '#F59E0B' }
              ]}>
                {locationPermission?.granted ? 'Ready to Track' : 'Location Access Needed'}
              </Text>
            </View>
            
            {currentLocation && (
              <Text style={styles.statusDescription}>
                GPS signal strong • Privacy mode active
              </Text>
            )}
          </View>

          {/* CTA Button */}
          <TouchableOpacity 
            style={[styles.ctaButton, !locationPermission?.granted && styles.ctaButtonDisabled]}
            onPress={startWalk}
            disabled={!locationPermission?.granted}
          >
            <LinearGradient
              colors={locationPermission?.granted ? 
                ['#22C55E', '#16A34A', '#15803D'] : 
                ['#6B7280', '#4B5563', '#374151']
              }
              style={styles.ctaGradient}
            >
              <Text style={styles.ctaText}>Start Your Journey</Text>
              <ChevronRight size={20} color="white" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Features Section */}
      <View style={styles.featuresSection}>
        <Text style={styles.sectionTitle}>Why TouchGrass?</Text>
        <Text style={styles.sectionSubtitle}>
          Revolutionary privacy technology meets outdoor adventure
        </Text>

        <View style={styles.featuresGrid}>
          <View style={[styles.featureCard, styles.featureCardPrimary]}>
            <LinearGradient
              colors={['#22C55E', '#16A34A']}
              style={styles.featureIcon}
            >
              <TreePine size={24} color="white" />
            </LinearGradient>
            <Text style={styles.featureTitle}>Get Outside</Text>
            <Text style={styles.featureDescription}>
              Track your outdoor adventures with precision GPS monitoring
            </Text>
          </View>

          <View style={[styles.featureCard, styles.featureCardSecondary]}>
            <LinearGradient
              colors={['#3B82F6', '#2563EB']}
              style={styles.featureIcon}
            >
              <Shield size={24} color="white" />
            </LinearGradient>
            <Text style={styles.featureTitle}>Privacy First</Text>
            <Text style={styles.featureDescription}>
              Zero-knowledge proofs protect your location data
            </Text>
          </View>

          <View style={[styles.featureCard, styles.featureCardAccent]}>
            <LinearGradient
              colors={['#F59E0B', '#D97706']}
              style={styles.featureIcon}
            >
              <Camera size={24} color="white" />
            </LinearGradient>
            <Text style={styles.featureTitle}>Capture Moments</Text>
            <Text style={styles.featureDescription}>
              Document your journey with integrated photo capture
            </Text>
          </View>

          <View style={[styles.featureCard, styles.featureCardPurple]}>
            <LinearGradient
              colors={['#8B5CF6', '#7C3AED']}
              style={styles.featureIcon}
            >
              <Target size={24} color="white" />
            </LinearGradient>
            <Text style={styles.featureTitle}>Prove Movement</Text>
            <Text style={styles.featureDescription}>
              Generate cryptographic proof of your activity
            </Text>
          </View>
        </View>
      </View>

      {/* How It Works Section */}
      <View style={styles.howItWorksSection}>
        <Text style={styles.sectionTitle}>How It Works</Text>
        <Text style={styles.sectionSubtitle}>
          Simple steps to private movement verification
        </Text>

        <View style={styles.stepsContainer}>
          <View style={styles.stepCard}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>1</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Start Walking</Text>
              <Text style={styles.stepDescription}>
                Begin your outdoor adventure with GPS tracking
              </Text>
            </View>
          </View>

          <View style={styles.stepConnector} />

          <View style={styles.stepCard}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>2</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Capture Evidence</Text>
              <Text style={styles.stepDescription}>
                Take photos and record your movement data
              </Text>
            </View>
          </View>

          <View style={styles.stepConnector} />

          <View style={styles.stepCard}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>3</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Generate Proof</Text>
              <Text style={styles.stepDescription}>
                Create zero-knowledge proof of your activity
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Stats Section */}
      <View style={styles.statsSection}>
        <LinearGradient
          colors={['#1E293B', '#334155', '#475569']}
          style={styles.statsGradient}
        >
          <Text style={styles.statsTitle}>Your Journey Awaits</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Zap size={24} color="#22C55E" />
              <Text style={styles.statValue}>0</Text>
              <Text style={styles.statLabel}>Walks Completed</Text>
            </View>
            <View style={styles.statItem}>
              <Award size={24} color="#F59E0B" />
              <Text style={styles.statValue}>0.0</Text>
              <Text style={styles.statLabel}>km Traveled</Text>
            </View>
            <View style={styles.statItem}>
              <Camera size={24} color="#8B5CF6" />
              <Text style={styles.statValue}>0</Text>
              <Text style={styles.statLabel}>Memories Captured</Text>
            </View>
          </View>
        </LinearGradient>
      </View>

      {/* Coming Soon Section */}
      <View style={styles.comingSoonSection}>
        <Text style={styles.sectionTitle}>Coming Soon</Text>
        <View style={styles.comingSoonCard}>
          <LinearGradient
            colors={['#8B5CF6', '#7C3AED', '#6D28D9']}
            style={styles.comingSoonGradient}
          >
            <Shield size={40} color="white" />
            <Text style={styles.comingSoonTitle}>Zero-Knowledge Revolution</Text>
            <Text style={styles.comingSoonDescription}>
              Advanced cryptographic privacy features that let you prove your movement without revealing your location. The future of private fitness tracking is here.
            </Text>
            <View style={styles.comingSoonFeatures}>
              <Text style={styles.comingSoonFeature}>• Cryptographic movement proofs</Text>
              <Text style={styles.comingSoonFeature}>• Decentralized verification</Text>
              <Text style={styles.comingSoonFeature}>• Community challenges</Text>
            </View>
          </LinearGradient>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>TouchGrass v1.0.0</Text>
        <Text style={styles.footerSubtext}>Privacy-first movement tracking</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  heroSection: {
    minHeight: height * 0.85,
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  heroContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 24,
  },
  logoGradient: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#22C55E',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  heroTitle: {
    fontSize: 42,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 12,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 20,
    color: '#94A3B8',
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: '600',
  },
  heroDescription: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  statusCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    width: '100%',
    maxWidth: 320,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 12,
  },
  statusDescription: {
    fontSize: 14,
    color: '#94A3B8',
    marginTop: 4,
  },
  ctaButton: {
    borderRadius: 16,
    overflow: 'hidden',
    width: '100%',
    maxWidth: 280,
    shadowColor: '#22C55E',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  ctaButtonDisabled: {
    shadowColor: '#6B7280',
  },
  ctaGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 24,
    gap: 12,
  },
  ctaText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  featuresSection: {
    paddingHorizontal: 20,
    paddingVertical: 60,
    backgroundColor: '#1E293B',
  },
  sectionTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 12,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#94A3B8',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  featuresGrid: {
    gap: 20,
  },
  featureCard: {
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    alignItems: 'center',
  },
  featureCardPrimary: {
    backgroundColor: 'rgba(34, 197, 94, 0.08)',
    borderColor: 'rgba(34, 197, 94, 0.2)',
  },
  featureCardSecondary: {
    backgroundColor: 'rgba(59, 130, 246, 0.08)',
    borderColor: 'rgba(59, 130, 246, 0.2)',
  },
  featureCardAccent: {
    backgroundColor: 'rgba(245, 158, 11, 0.08)',
    borderColor: 'rgba(245, 158, 11, 0.2)',
  },
  featureCardPurple: {
    backgroundColor: 'rgba(139, 92, 246, 0.08)',
    borderColor: 'rgba(139, 92, 246, 0.2)',
  },
  featureIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 14,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 20,
  },
  howItWorksSection: {
    paddingHorizontal: 20,
    paddingVertical: 60,
    backgroundColor: '#0F172A',
  },
  stepsContainer: {
    alignItems: 'center',
  },
  stepCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  stepNumber: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#22C55E',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  stepNumberText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 14,
    color: '#94A3B8',
    lineHeight: 20,
  },
  stepConnector: {
    width: 2,
    height: 24,
    backgroundColor: '#22C55E',
    marginVertical: 12,
  },
  statsSection: {
    paddingHorizontal: 20,
    paddingVertical: 60,
  },
  statsGradient: {
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
  },
  statsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 32,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  statItem: {
    alignItems: 'center',
    gap: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  statLabel: {
    fontSize: 12,
    color: '#94A3B8',
    textAlign: 'center',
  },
  comingSoonSection: {
    paddingHorizontal: 20,
    paddingVertical: 60,
    backgroundColor: '#1E293B',
  },
  comingSoonCard: {
    borderRadius: 24,
    overflow: 'hidden',
  },
  comingSoonGradient: {
    padding: 32,
    alignItems: 'center',
  },
  comingSoonTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 16,
    marginBottom: 12,
    textAlign: 'center',
  },
  comingSoonDescription: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  comingSoonFeatures: {
    alignItems: 'flex-start',
    gap: 8,
  },
  comingSoonFeature: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    alignItems: 'center',
    backgroundColor: '#0F172A',
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