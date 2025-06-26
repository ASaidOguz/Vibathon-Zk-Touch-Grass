import { View, Text, StyleSheet, TouchableOpacity, Alert, Platform, Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Play, Pause, Square, Camera, MapPin } from 'lucide-react-native';
import { useState, useEffect, useRef } from 'react';
import * as Location from 'expo-location';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Modal, TextInput, Clipboard } from 'react-native';

interface WalkData {
  startTime: number;
  endTime?: number;
  distance: number;
  duration: number;
  path: Location.LocationObject[];
  photos: string[];
  userAddress?: string; // Add this line
}


export default function ActiveScreen() {
  const [isWalking, setIsWalking] = useState(false);
  const [walkData, setWalkData] = useState<WalkData | null>(null);
  const [currentLocation, setCurrentLocation] = useState<Location.LocationObject | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [starknetAddress, setStarknetAddress] = useState('');
  

  const locationSubscription = useRef<Location.LocationSubscription | null>(null);
  const walkTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (locationSubscription.current) {
        locationSubscription.current.remove();
      }
      if (walkTimer.current) {
        clearInterval(walkTimer.current);
      }
    };
  }, []);

  const calculateDistance = (coords1: Location.LocationObjectCoords, coords2: Location.LocationObjectCoords): number => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (coords2.latitude - coords1.latitude) * Math.PI / 180;
    const dLon = (coords2.longitude - coords1.longitude) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(coords1.latitude * Math.PI / 180) * Math.cos(coords2.latitude * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const startWalk = async () => {
    try {
      if (Platform.OS === 'web') {
        // Mock walk data for web
        const mockWalkData: WalkData = {
          startTime: Date.now(),
          distance: 0,
          duration: 0,
          path: [],
          photos: [],
        };
        setWalkData(mockWalkData);
        setIsWalking(true);
        
        // Mock timer for web
        walkTimer.current = setInterval(() => {
          setWalkData(prev => prev ? {
            ...prev,
            duration: Date.now() - prev.startTime,
            distance: prev.distance + Math.random() * 0.01, // Simulate distance increment
          } : null);
        }, 1000);
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

    const newWalkData: WalkData = {
  startTime: Date.now(),
  distance: 0,
  duration: 0,
  path: [location],
  photos: [],
  userAddress: starknetAddress, // ← Save it in the walk data
};

      setWalkData(newWalkData);
      setCurrentLocation(location);
      setIsWalking(true);

      // Start location tracking
      locationSubscription.current = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000, // Update every 5 seconds
          distanceInterval: 10, // Update every 10 meters
        },
        (newLocation) => {
          setCurrentLocation(newLocation);
          setWalkData(prev => {
            if (!prev) return prev;
            
            const lastLocation = prev.path[prev.path.length - 1];
            const additionalDistance = calculateDistance(lastLocation.coords, newLocation.coords);
            
            return {
              ...prev,
              distance: prev.distance + additionalDistance,
              duration: Date.now() - prev.startTime,
              path: [...prev.path, newLocation],
            };
          });
        }
      );

      // Start timer for duration
      walkTimer.current = setInterval(() => {
        setWalkData(prev => prev ? {
          ...prev,
          duration: Date.now() - prev.startTime,
        } : null);
      }, 1000);

    } catch (error) {
      console.error('Error starting walk:', error);
      Alert.alert('Error', 'Failed to start walk tracking');
    }
  };

  const pauseWalk = () => {
    setIsWalking(false);
    if (locationSubscription.current) {
      locationSubscription.current.remove();
    }
    if (walkTimer.current) {
      clearInterval(walkTimer.current);
    }
  };

const stopWalk = async () => {
  if (walkData) {
    const finalWalkData = {
      ...walkData,
      endTime: Date.now(),
      duration: Date.now() - walkData.startTime,
    };
    
    try {
      // Prepare payload: sending path (latitude & longitude array) + other data this 
      // only for demonstration, adjust as needed
    const payload = {
        startTime: finalWalkData.startTime,
        endTime: finalWalkData.endTime,
        duration: finalWalkData.duration,
        distance: finalWalkData.distance*1000, // Convert to meters
        userAddress: finalWalkData.userAddress, // ← Send it to the server
        path: finalWalkData.path.map(loc => ({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          timestamp: loc.timestamp,
        })),
        photos: finalWalkData.photos,
      };

      
      // Replace with your server API endpoint
      const response = await fetch('https://perfect-gorilla-unduly.ngrok-free.app/verify-mint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add auth headers if needed here, e.g.
          // 'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      
      if (!response.ok) {
        throw new Error('Failed to send walk data');
      }

     const responseText = await response.text(); // Get HTML string
      Alert.alert(
        'NFT Minted Successfully!',
        `Transaction:\n${responseText.replace(/<[^>]*>/g, '')}`, // Strip <p> tags
        [{ text: 'View on StarkScan', onPress: () => {
          const urlMatch = responseText.match(/https?:\/\/[^<]+/);
          if (urlMatch) {
            const url = urlMatch[0];
            // Open URL in browser
            Linking.openURL(url);
    }
  } }]
);


      console.log('Walk data sent successfully');
      
    } catch (error) {
      console.error('Error sending walk data:', error);
      Alert.alert('Error', 'Failed to send walk data to server');
    }
  }
  
  setWalkData(null);
  setIsWalking(false);
  if (locationSubscription.current) {
    locationSubscription.current.remove();
  }
  if (walkTimer.current) {
    clearInterval(walkTimer.current);
  }
};


  const takePhoto = async () => {
    if (!cameraPermission?.granted) {
      const response = await requestCameraPermission();
      if (!response.granted) {
        Alert.alert('Camera Permission', 'Camera permission is required to take photos');
        return;
      }
    }
    setShowCamera(true);
  };

  const formatDuration = (ms: number): string => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (showCamera) {
    return (
      <View style={styles.cameraContainer}>
        <CameraView style={styles.camera} facing="back">
          <View style={styles.cameraOverlay}>
            <TouchableOpacity 
              style={styles.cameraButton}
              onPress={() => setShowCamera(false)}
            >
              <Text style={styles.cameraButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.captureButton}
              onPress={() => {
                // Here you would capture the photo
                setShowCamera(false);
                Alert.alert('Photo Captured!', 'Photo added to your walk proof');
              }}
            >
              <View style={styles.captureButtonInner} />
            </TouchableOpacity>
          </View>
        </CameraView>
      </View>
    );
  }

 return (
  <>
    <LinearGradient
      colors={['#0F172A', '#1E293B', '#334155']}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Active Walk</Text>
        <View style={styles.statusIndicator}>
          <View
            style={[
              styles.statusDot,
              { backgroundColor: isWalking ? '#22C55E' : '#F59E0B' },
            ]}
          />
          <Text style={styles.statusText}>
            {isWalking ? 'Walking' : walkData ? 'Paused' : 'Ready'}
          </Text>
        </View>
      </View>

      {walkData && (
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{walkData.distance.toFixed(2)}</Text>
            <Text style={styles.statLabel}>km</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statValue}>{formatDuration(walkData.duration)}</Text>
            <Text style={styles.statLabel}>time</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statValue}>{walkData.photos.length}</Text>
            <Text style={styles.statLabel}>photos</Text>
          </View>
        </View>
      )}

      <View style={styles.mapPlaceholder}>
        <MapPin size={48} color="#94A3B8" />
        <Text style={styles.mapText}>Live tracking active</Text>
        {currentLocation && (
          <Text style={styles.coordinatesText}>
            {currentLocation.coords.latitude.toFixed(6)},{' '}
            {currentLocation.coords.longitude.toFixed(6)}
          </Text>
        )}
      </View>

      <View style={styles.controlsContainer}>
        {!walkData && (
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => setShowAddressModal(true)}
          >
            <LinearGradient
              colors={['#22C55E', '#16A34A']}
              style={styles.buttonGradient}
            >
              <Play size={24} color="white" />
              <Text style={styles.buttonText}>Start Walk</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}

        {walkData && (
          <View style={styles.activeControls}>
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={isWalking ? pauseWalk : startWalk}
            >
              {isWalking ? (
                <Pause size={24} color="white" />
              ) : (
                <Play size={24} color="white" />
              )}
            </TouchableOpacity>

            <TouchableOpacity style={styles.secondaryButton} onPress={takePhoto}>
              <Camera size={24} color="white" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.dangerButton} onPress={stopWalk}>
              <Square size={24} color="white" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </LinearGradient>

    {/* 🔽 Modal */}
<Modal visible={showAddressModal} transparent animationType="fade">
  <View style={styles.modalOverlay}>
    <View style={styles.modalContainer}>
      <Text style={styles.modalTitle}>Start New Walk</Text>
      <Text style={styles.modalText}>Enter your address to begin the walk.</Text>
      
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: '#CBD5E1',
          borderRadius: 8,
          padding: 10,
          width: '100%',
          marginBottom: 16,
          color: '#0F172A',
        }}
        placeholder="Enter your address"
        placeholderTextColor="#94A3B8"
        value={starknetAddress}
        onChangeText={setStarknetAddress}
      />

      <TouchableOpacity
        style={styles.modalButton}
        onPress={() => {
          if (!starknetAddress.trim()) {
            Alert.alert('Address Required', 'Please enter your address to continue.');
            return;
          }

          setShowAddressModal(false);
          startWalk(); // Start walk after closing modal
        }}
      >
        <Text style={styles.modalButtonText}>Start Walk</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>

  </>
);

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 16,
    color: '#94A3B8',
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    gap: 15,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#94A3B8',
    fontWeight: '600',
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  mapText: {
    fontSize: 18,
    color: '#94A3B8',
    fontWeight: '600',
    marginTop: 12,
  },
  coordinatesText: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 8,
  },
  controlsContainer: {
    marginBottom: 40,
  },
  primaryButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    gap: 12,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  activeControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: 'rgba(59, 130, 246, 0.8)',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dangerButton: {
    flex: 1,
    backgroundColor: 'rgba(239, 68, 68, 0.8)',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraContainer: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  cameraOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  cameraButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  cameraButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
  },
    modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#0F172A',
  },
  modalText: {
    fontSize: 16,
    color: '#475569',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#16A34A',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },

});