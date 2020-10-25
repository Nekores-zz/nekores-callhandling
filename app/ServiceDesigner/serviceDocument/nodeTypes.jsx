import { 
  CallcareNodeIcon, CallcarePlayNodeIcon, HangUpIcon, 
  GoToNodeIcon, ExitNodeIcon, EntryNodeIcon, MenuNodeIcon, 
  TimeDateNodeIcon, DialNodeIcon, MultiDialNodeIcon, 
  RecordVoiceNodeIcon, PlayNodeIcon,
} from '../components';
import { objects, matching } from '../utility';

export const isFixedOutcome =
  matching.hasShape({
    key: matching.isString,
    label: matching.isString,
  })

export const isNodeType =
  matching.hasShape({
    nodeType: matching.isString,
    color: matching.isString,
    darkenColor: matching.isString,
    name: matching.isString,
    icon: matching.isAny,
    color: matching.isString,
    fixedOutcomes: matching.isArrayOf(isFixedOutcome),
  })

export const nodeTypes = objects.fromValues(x => x.nodeType) (
  matching.assert(matching.isArrayOf(isNodeType)) (
    [{
      nodeType: 'callcare', 
      color: '#e91e63', 
      darkenColor: '#ad1457',
      icon: CallcareNodeIcon, 
      category: 'NODE CATEGORY 1', 
      isFavorite: true, 
      name: 'Call care',
      fixedOutcomes: [
        { label: 'Branch 1', key: 'branch1' },
        { label: 'Branch 2', key: 'branch2' },
        { label: 'Branch 3', key: 'branch3' },
        { label: 'On timeout', key: 'ontimeout' },
      ]
    }, {
      nodeType: 'callcareplay', 
      color: '#9c27b0', 
      darkenColor: '#6a1b9a',
      icon: CallcarePlayNodeIcon, 
      category: 'NODE CATEGORY 1', 
      isFavorite: true, 
      name: 'Call care play',
      fixedOutcomes: [
        { label: 'Play success', key: 'playsuccess' },
        { label: 'Play failure', key: 'playfailure' },
      ]
    }, {
      nodeType: 'play', 
      color: '#673ab7', 
      darkenColor: '#4527a0',
      icon: PlayNodeIcon, 
      category: 'NODE CATEGORY 2', 
      isFavorite: true, 
      name: 'Play',
      fixedOutcomes: [
        {label: 'Play success', key: 'playsuccess'},
        {label: 'Play failure', key: 'playfailure'},
      ]
    }, {
      nodeType: 'record-voice', 
      color: '#03a9f4', 
      darkenColor: '#1565c0',
      icon: RecordVoiceNodeIcon, 
      category: 'NODE CATEGORY 2', 
      isFavorite: false, 
      name: 'Record voice',
      fixedOutcomes: [
        {label: 'Reccord success', key: 'playsuccess'},
        {label: 'Record failure', key: 'playfailure'},
      ]
    }, {
      nodeType: 'multi-dial', 
      color: '#00bcd4', 
      darkenColor: '#00838f',
      icon: MultiDialNodeIcon, 
      category: 'NODE CATEGORY 3', 
      isFavorite: false, 
      name: 'Multi-dial',
      fixedOutcomes: [
        {label: 'Success', key: 'success'},
        {label: 'Busy', key: 'busy'},
        {label: 'Ring-no-answer', key: 'no-answer'},
        {label: 'Other failure', key: 'other-failure'},
      ]
    }, {
      nodeType: 'dial', 
      color: '#009688', 
      darkenColor: '#00695c',
      icon: DialNodeIcon, 
      category: 'NODE CATEGORY 3', 
      isFavorite: true, 
      name: 'Dial',
      fixedOutcomes: [
        {label: 'Success', key: 'success'},
        {label: 'Busy', key: 'busy'},
        {label: 'Ring-no-answer', key: 'no-answer'},
        {label: 'Other failure', key: 'other-failure'},
      ]
    }, {
      nodeType: 'time-date', 
      color: '#8bc34a', 
      darkenColor: '#558b2f',
      icon: TimeDateNodeIcon, 
      category: 'NODE CATEGORY 1', 
      isFavorite: false, 
      name: 'Time / date',
      fixedOutcomes: [
        {label: 'Condition _', key: 'condition-_'},
        {label: 'On false', key: 'on-false'},
      ]
    }, {
      nodeType: 'menu', 
      color: '#cddc39', 
      darkenColor: '#9e9d24',
      icon: MenuNodeIcon, 
      category: 'NODE CATEGORY 3', 
      isFavorite: false, 
      name: 'Menu',
      fixedOutcomes: [
        {label: 'Option _', key: 'option-_'},
        {label: 'No choice', key: 'no-choice'},
      ]
    }, {
      nodeType: 'entry', 
      color: '#ffc107', 
      darkenColor: '#f9a825',
      icon: EntryNodeIcon, 
      category: 'NODE CATEGORY 2', 
      isFavorite: true, 
      name: 'Entry',
      fixedOutcomes: [
        {label: 'Enter', key: 'enter'}
      ]
    }, {
      nodeType: 'exit', 
      color: '#fc9600', 
      darkenColor: '#ef6c00',
      icon: ExitNodeIcon, 
      category: 'NODE CATEGORY 2', 
      isFavorite: true, 
      name: 'Exit',
      fixedOutcomes: []
    }, {
      nodeType: 'go-to-node', 
      color: '#ff5722', 
      darkenColor: '#d84315',
      icon: GoToNodeIcon, 
      category: 'NODE CATEGORY 2', 
      isFavorite: false, 
      name: 'Go To',
      fixedOutcomes: [
        {label: 'Service _ > page _ > node _', key: 'service-page-node'},
      ]
    }, {
      nodeType: 'hang-up', 
      color: '#795548', 
      darkenColor: '#4e342e',
      icon: HangUpIcon, 
      category: 'NODE CATEGORY 1', 
      isFavorite: false, 
      name: 'Hang up',
      fixedOutcomes: []
    },
  ]
));