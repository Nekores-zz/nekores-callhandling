import PropTypes from 'prop-types';
import { objects } from 'utils';

const decisions = {
  allow: 'Allow',
  deny: 'Deny',
};

const decisionStrategies = {
  unanimous: 'Unanimous',
  affirmative: 'Affirmative',
};

const types = {
  user: 'user',
  role: 'role',
  aggregated: 'aggregated',
};

export const Policy = {
  types,
  decisionStrategies,
  decisions,

  propType: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.oneOf(objects.values(types)).isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    isFavorite: PropTypes.bool,
    decision: PropTypes.oneOf(objects.values(decisions)),
    isRequiredAll: PropTypes.bool,
    applyStrategy: PropTypes.oneOf(objects.values(decisionStrategies)),
    decisionStrategy: PropTypes.oneOf(objects.values(decisionStrategies)),
    ids: PropTypes.arrayOf(PropTypes.string),
  }),

  create: (type) => ({
    type: type,
    name: "",
    description: "",
    isFavorite: false,
    decision: decisions.deny,
    isRequiredAll: false,
    applyStrategy: decisionStrategies.unanimous,
    decisionStrategy: decisionStrategies.unanimous,
    ids: [],
  }),

  setName: (policy, name) => ({ ...policy, name }),

  setDescription: (policy, description) => ({ ...policy, description }),

  setDecision: (policy, decision) => ({ ...policy, decision }),

  setDecisionStrategy: (policy, decisionStrategy) => ({ ...policy, decisionStrategy }),

  toggleRequiredAll: (policy, isRequiredAll) => ({ ...policy, isRequiredAll })
};
