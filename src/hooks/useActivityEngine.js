import { useState, useMemo, useEffect } from 'react';
import { loadAllActivities } from '../utils/activityParser';

export const useActivityEngine = () => {
  const [activities, setActivities] = useState([]);
  const [selectedActivities, setSelectedActivities] = useState({}); // { id: { size: 'Small', ai: false } }
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const data = await loadAllActivities();
        setActivities(data);
      } catch (error) {
        console.error('Failed to load activities:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchActivities();
  }, []);

  const toggleActivity = (id, size = 'Small') => {
    setSelectedActivities(prev => {
      const next = { ...prev };
      if (next[id]) {
        delete next[id];
      } else {
        next[id] = { size, ai: false };
      }
      return next;
    });
  };

  const updateActivity = (id, updates) => {
    setSelectedActivities(prev => ({
      ...prev,
      [id]: { ...prev[id], ...updates }
    }));
  };

  const calculation = useMemo(() => {
    let totalBaseEffort = 0;
    let totalAIEffort = 0;
    const activityDetails = [];

    Object.entries(selectedActivities).forEach(([id, config]) => {
      const activity = activities.find(a => a.id === id);
      if (!activity) return;

      const effortData = activity.effortBySize[config.size];
      if (!effortData) return;

      const baseDays = parseFloat(effortData.effort);
      const aiDays = parseFloat(effortData.aiEffort);
      const friction = parseFloat(effortData.friction);

      const currentEffort = config.ai ? aiDays : baseDays;
      const frictionCompounded = currentEffort * friction;

      totalBaseEffort += baseDays;
      totalAIEffort += frictionCompounded;

      activityDetails.push({
        ...activity,
        selectedSize: config.size,
        selectedAI: config.ai,
        calculatedEffort: frictionCompounded,
        originalEffort: baseDays
      });
    });

    return {
      totalBaseEffort,
      totalAIEffort,
      activityDetails
    };
  }, [activities, selectedActivities]);

  return {
    activities,
    selectedActivities,
    loading,
    toggleActivity,
    updateActivity,
    calculation
  };
};
