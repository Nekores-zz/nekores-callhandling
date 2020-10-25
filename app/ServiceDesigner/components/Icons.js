import React, {memo, PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {withStyles, Icon} from '@material-ui/core';
import {arrays, geometry, svg, events} from '../utility';
import MoreVert from 'Icons/MoreVert';
import CommentIcon from 'Icons/Comment';
import Filter1 from 'Icons/Filter1';
import Filter2 from 'Icons/Filter2';
import Filter3 from 'Icons/Filter3';
import Filter4 from 'Icons/Filter4';
import Filter5 from 'Icons/Filter5';
import Filter6 from 'Icons/Filter6';
import CallcareNodeIcon from 'Icons/CallcareNodeIcon';
import CallcarePlayNodeIcon from 'Icons/CallcarePlayNodeIcon';
import PlayNodeIcon from 'Icons/PlayNodeIcon';
import RecordVoiceNodeIcon from 'Icons/RecordVoiceNodeIcon';
import MultiDialNodeIcon from 'Icons/MultiDialNodeIcon';
import DialNodeIcon from 'Icons/DialNodeIcon';
import TimeDateNodeIcon from 'Icons/TimeDateNodeIcon';
import MenuNodeIcon from 'Icons/MenuNodeIcon';
import EntryNodeIcon from 'Icons/EntryNodeIcon';
import ExitNodeIcon from 'Icons/ExitNodeIcon';
import GoToNodeIcon from 'Icons/GoToNodeIcon';
import HangUpIcon from 'Icons/HangUpIcon';

// const MultiDialNodeIcon = props => <Icon {...props}>shuffle</Icon>;
// const DialNodeIcon = props => <Icon {...props} style={{transform: 'rotate(-45deg)'}}>arrow_right_alt</Icon>;
// const TimeDateNodeIcon = props => <Icon {...props}>access_time</Icon>;
// const MenuNodeIcon = props => <Icon {...props}>menu_open</Icon>;
// const EntryNodeIcon = props => <Icon {...props} style={{transform: 'rotate(-90deg)'}}>vertical_align_bottom</Icon>;
// const ExitNodeIcon = props => <Icon {...props} style={{transform: 'rotate(90deg)'}}>vertical_align_bottom</Icon>;
// const GoToNodeIcon = props => <Icon {...props}>trending_up</Icon>;
// const HangUpIcon = props => <Icon {...props}>call_end</Icon>;

const Undo = memo(props => <Icon {...props}>undo</Icon>);

const Redo = memo(props => <Icon {...props}>redo</Icon>);

const SelectionIcon = memo(props => <Icon {...props}>photo_size_select_small</Icon>);

const PointerIcon = memo(props => <Icon {...props}>near_me</Icon>);

const CopyIcon = memo(props => <Icon {...props}>file_copy</Icon>);

const PasteIcon = memo(props => <Icon {...props}>assignment</Icon>);

const RemoveIcon = memo(props => <Icon {...props}>delete_sweep</Icon>);

const FlipToFrontIcon = memo(props => <Icon {...props}>flip_to_front</Icon>);

const FlipToBackIcon = memo(props => <Icon {...props}>flip_to_back</Icon>);

// const CommentIcon = memo(props => <Icon {...props}>comment</Icon>);

const GridIcon = memo(props => <Icon {...props}>grid_on</Icon>);

const LinkIcon = memo(props => <Icon {...props}>trending_up</Icon>);

const FitZoom = memo( props => <Icon {...props}>aspect_ratio</Icon>);

export {
    Undo, Redo, Filter1, Filter2, Filter3, Filter4, Filter5, Filter6,
    HangUpIcon, GoToNodeIcon, ExitNodeIcon, EntryNodeIcon, MenuNodeIcon,
    TimeDateNodeIcon, DialNodeIcon, MultiDialNodeIcon,
    RecordVoiceNodeIcon, PlayNodeIcon, CallcareNodeIcon, CallcarePlayNodeIcon,
    FitZoom, SelectionIcon, PointerIcon, CopyIcon, PasteIcon,
    RemoveIcon, FlipToFrontIcon, FlipToBackIcon, GridIcon, CommentIcon, LinkIcon, MoreVert,
};
