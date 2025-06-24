import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Trophy, Target, Calendar, MapPin, Camera, Award } from 'lucide-react-native';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  completed: boolean;
  progress?: number;
  maxProgress?: number;
  color: string;
}

export default function AchievementsScreen() {
  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'First Steps',
      description: 'Complete your first walk',
      icon: <MapPin size={24} color="white" />,
      completed: false,
      color: '#22C55E',
    },
    {
      id: '2',
      title: 'Distance Walker',
      description: 'Walk a total of 10km',
      icon: <Target size={24} color="white" />,
      completed: false,
      progress: 2.5,
      maxProgress: 10,
      color: '#3B82F6',
    },
    {
      id: '3',
      title: 'Photo Collector',
      description: 'Take 25 photos during walks',
      icon: <Camera size={24} color="white" />,
      completed: false,
      progress: 3,
      maxProgress: 25,
      color: '#F59E0B',
    },
    {
      id: '4',
      title: 'Streak Master',
      description: 'Walk for 7 consecutive days',
      icon: <Calendar size={24} color="white" />,
      completed: false,
      progress: 2,
      maxProgress: 7,
      color: '#8B5CF6',
    },
    {
      id: '5',
      title: 'Privacy Pioneer',
      description: 'Generate your first zero-knowledge proof',
      icon: <Award size={24} color="white" />,
      completed: false,
      color: '#EF4444',
    },
    {
      id: '6',
      title: 'Century Walker',
      description: 'Walk a total of 100km',
      icon: <Trophy size={24} color="white" />,
      completed: false,
      progress: 2.5,
      maxProgress: 100,
      color: '#F97316',
    },
  ];

  const completedCount = achievements.filter(a => a.completed).length;
  const totalCount = achievements.length;

  return (
    <LinearGradient
      colors={['#0F172A', '#1E293B', '#334155']}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Achievements</Text>
        <View style={styles.progressSummary}>
          <Trophy size={24} color="#F59E0B" />
          <Text style={styles.progressText}>
            {completedCount}/{totalCount} unlocked
          </Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.achievementsGrid}>
          {achievements.map((achievement) => (
            <View 
              key={achievement.id} 
              style={[
                styles.achievementCard,
                achievement.completed && styles.achievementCardCompleted
              ]}
            >
              <View 
                style={[
                  styles.achievementIcon,
                  { backgroundColor: achievement.color },
                  !achievement.completed && styles.achievementIconLocked
                ]}
              >
                {achievement.icon}
              </View>
              
              <View style={styles.achievementContent}>
                <Text style={[
                  styles.achievementTitle,
                  !achievement.completed && styles.achievementTitleLocked
                ]}>
                  {achievement.title}
                </Text>
                <Text style={styles.achievementDescription}>
                  {achievement.description}
                </Text>
                
                {achievement.progress && achievement.maxProgress && (
                  <View style={styles.progressContainer}>
                    <View style={styles.progressBar}>
                      <View 
                        style={[
                          styles.progressFill,
                          { 
                            width: `${(achievement.progress / achievement.maxProgress) * 100}%`,
                            backgroundColor: achievement.color
                          }
                        ]} 
                      />
                    </View>
                    <Text style={styles.progressLabel}>
                      {achievement.progress}/{achievement.maxProgress}
                    </Text>
                  </View>
                )}
              </View>

              {achievement.completed && (
                <View style={styles.completedBadge}>
                  <Award size={16} color="#22C55E" />
                </View>
              )}
            </View>
          ))}
        </View>

        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Your Stats</Text>
          
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>0</Text>
              <Text style={styles.statLabel}>Total Walks</Text>
            </View>
            
            <View style={styles.statCard}>
              <Text style={styles.statValue}>0.0</Text>
              <Text style={styles.statLabel}>km Walked</Text>
            </View>
            
            <View style={styles.statCard}>
              <Text style={styles.statValue}>0</Text>
              <Text style={styles.statLabel}>Photos Taken</Text>
            </View>
            
            <View style={styles.statCard}>
              <Text style={styles.statValue}>0</Text>
              <Text style={styles.statLabel}>Day Streak</Text>
            </View>
          </View>
        </View>

        <View style={styles.comingSoonSection}>
          <Text style={styles.sectionTitle}>Coming Soon</Text>
          <View style={styles.comingSoonCard}>
            <Award size={32} color="#8B5CF6" />
            <Text style={styles.comingSoonTitle}>Zero-Knowledge Proofs</Text>
            <Text style={styles.comingSoonDescription}>
              Prove your movement without revealing your location. Advanced cryptographic privacy features coming soon!
            </Text>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
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
  progressSummary: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  progressText: {
    fontSize: 16,
    color: '#94A3B8',
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  achievementsGrid: {
    gap: 16,
    marginBottom: 30,
  },
  achievementCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  achievementCardCompleted: {
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    borderColor: 'rgba(34, 197, 94, 0.3)',
  },
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  achievementIconLocked: {
    backgroundColor: '#374151',
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  achievementTitleLocked: {
    color: '#6B7280',
  },
  achievementDescription: {
    fontSize: 14,
    color: '#94A3B8',
    marginBottom: 8,
  },
  progressContainer: {
    marginTop: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 2,
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  progressLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  completedBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(34, 197, 94, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#94A3B8',
    textAlign: 'center',
  },
  comingSoonSection: {
    marginBottom: 40,
  },
  comingSoonCard: {
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.3)',
  },
  comingSoonTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 12,
    marginBottom: 8,
  },
  comingSoonDescription: {
    fontSize: 14,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 20,
  },
});