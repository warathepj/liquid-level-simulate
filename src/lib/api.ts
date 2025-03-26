interface TankStatus {
  device: string;
  timestamp: string;
  level: string;
  message: string;
}

export const publishTankStatus = async (status: TankStatus): Promise<void> => {
  // Updated to use the Express endpoint from publisher.js
  const response = await fetch('http://localhost:3000/publish', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(status),
  });

  if (!response.ok) {
    throw new Error('Failed to publish tank status');
  }
};