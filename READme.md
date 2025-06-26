# zk Touch Grass Mobile App  
🍃 A Vibathon Project

Welcome to the **zk Touch Grass** mobile application!  
This app is designed to bring a touch of the outdoors into your digital life, encouraging mindful breaks and real-world interaction, all while exploring the fascinating possibilities of zero-knowledge proofs.

> _"Touch grass"_ is a playful internet idiom urging people to step away from screens and engage with reality.  
> Our app gamifies this concept, rewarding you for disconnecting and experiencing the physical world, with a sprinkle of cutting-edge cryptography.

---

## ✨ Features

- **Mindful Break Reminders**: Get gentle nudges to step away from your device.
- **"Grass Touching" Verification (zk-powered)**:  
  Prove you've taken a break without revealing sensitive location data.  
  (Concept: leveraging zero-knowledge proofs for privacy-preserving verification of real-world activity, e.g., proximity to natural spaces or time spent offline).
- **Vibe Tracking & Sharing**:  
  Log your "vibe" after touching grass and share your refreshing experiences (anonymously or with friends).
- **Leaderboards & Challenges**:  (Coming soon)
  Compete with friends or the community on who can "touch grass" the most, fostering healthy habits.
- **Vibathon Integration**:  
  Specifically designed to enhance your *vibathon* experience, providing structure and motivation for mindful breaks.
- **Simple & Intuitive UI**:  
  An easy-to-use interface that encourages frequent interaction.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS version)
- `npm` or `yarn`
- [Expo CLI](https://docs.expo.dev/workflow/expo-cli/) (for development)

### Installation

Clone the repository:

```bash
git https://github.com/ASaidOguz/Vibathon-Zk-Touch-Grass
cd zk-touch-grass
npm install
```

and 

this is the vibathon server where we do heavy computing (proof generation with barretenberg)
```
https://github.com/ASaidOguz/express_server/tree/vibathon-server
```

Server can be easly removed and do the computaion and proving on mobile phone but it needs to be written in kotlin(native mobile lang) as shown in this repo 
```
https://github.com/madztheo/noir-react-native-starter
```

# Zk verify and nft minting 

This repository contains the server for creating zk proofs and verifying via Deployed contract. 

Zk verifier on starknet 
```
0x0148c91f8619e6fcc405736049318462d6ae325ef14c82bd984194ba05e29625
```

Example minted nft by walking some distance
```
https://sepolia.starkscan.co/nft/0x02be153a2f2502c5f4f8d3d36c74275fd0c1e03244ce573ec6ab7200df56ac27/4#activity
```

You can dowload my app via link to your android emulator for testing 
```
https://expo.dev/accounts/torpedopistol/projects/bolt-expo-nativewind/builds/9339c614-5c19-4fd1-91f5-e2c040d47105

```

