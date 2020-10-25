import React,{ PureComponent } from 'react';
import { Box } from './Box';

export const Text = Box;

export const PrimaryText = (props) => <Text textDarkGrey fontSizeM {...props}/>;

export const SecondaryText = (props) => <Text textMediumGrey fontSizeM {...props}/>;

export const Subtitle = (props) => <Text textBlack fontSizeM {...props}/>;

export const SectionHeader = (props) => <Text uppercase textBlack bold fontSizeXS {...props}/>;

export const ModalHeader = (props) => <Text textBlack fontSizeL fontWeightMedium {...props}/>;

export const Caption = (props) => <Text textMediumGrey fontSizeXS {...props}/>;

export const SmallText = (props) => <Text textMediumGrey fontSizeS {...props}/>;

