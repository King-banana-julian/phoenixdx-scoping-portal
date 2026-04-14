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

  const getRecommendations = (intakeState) => {
    if (!intakeState.q1) return { mandatory: [], recommended: [] };

    const type = intakeState.q1;
    const recs = { mandatory: [], recommended: [], reasons: {} };

    // Recommendation Rules
    if (type.includes("Legacy system")) {
      recs.mandatory = ["heuristic_evaluation", "user_stakeholder_interviews", "contextual_inquiry", "user_flows", "low_mid_fidelity_wireframes", "high_fidelity_designs", "interactive_prototype"];
      recs.recommended = ["competitor_analysis", "affinity_mapping", "personas", "customer_journey_map", "service_blueprint", "usability_testing"];
    } else if (type.includes("built from scratch")) {
      recs.mandatory = ["user_stakeholder_interviews", "user_flows", "low_mid_fidelity_wireframes", "high_fidelity_designs", "interactive_prototype"];
      recs.recommended = ["jobs_to_be_done", "personas", "information_architecture", "hypothesis", "affinity_mapping", "usability_testing"];
    } else if (type.includes("redesigned or improved")) {
      recs.mandatory = ["heuristic_evaluation", "user_stakeholder_interviews", "user_flows", "low_mid_fidelity_wireframes", "high_fidelity_designs"];
      recs.recommended = ["competitor_analysis", "affinity_mapping", "personas", "usability_testing", "information_architecture"];
    } else if (type.includes("Internal tool")) {
      recs.mandatory = ["user_stakeholder_interviews", "user_flows", "low_mid_fidelity_wireframes", "high_fidelity_designs"];
      recs.recommended = ["heuristic_evaluation", "affinity_mapping", "personas", "do_go_mapping", "usability_testing"];
    } else if (type.includes("Research or discovery only")) {
      recs.mandatory = ["user_stakeholder_interviews", "affinity_mapping", "personas"];
      recs.recommended = ["contextual_inquiry", "empathy_maps", "jobs_to_be_done", "customer_journey_map", "heart_framework"];
    }

    // Reason strings
    recs.mandatory.forEach(id => {
      recs.reasons[id] = `Mandatory because this is a ${type} engagement.`;
    });
    recs.recommended.forEach(id => {
      recs.reasons[id] = `Recommended strategy for ${type}.`;
    });

    // Size Selection Rules (Q5)
    const sizeMap = {
      'Small': 'Small',
      'Medium': 'Medium',
      'Large': 'Large',
      'Extra Large': 'XL',
      'Not sure yet': 'Medium'
    };
    const defaultSize = sizeMap[intakeState.q5] || 'Medium';

    return { ...recs, defaultSize };
  };

  const applyRecommendations = (recs) => {
    const nextSelected = {};
    recs.mandatory.forEach(id => {
      nextSelected[id] = { size: recs.defaultSize, ai: false };
    });
    setSelectedActivities(nextSelected);
  };

  return {
    activities,
    selectedActivities,
    loading,
    toggleActivity,
    updateActivity,
    getRecommendations,
    applyRecommendations,
    calculation
  };
};
