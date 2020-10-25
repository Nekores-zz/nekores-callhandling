import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core";
import { Text } from "components/Elements";
import { timerStylesheet } from "jss/Audio/AudioPlayer/Timer";

const units = (value0, value1) => (value) => {
	return (value % value1) / value0 | 0;
};

const secs = units(1000, 60000);

const mins = units(60000, 3600000);

const hours = units(3600000, 3600000000);

const withZeroes = (x) =>`${x | 0}`.padStart(2, '0');

export const formatAsTimer = (ms) => (
	`${withZeroes(hours(ms))} : ${withZeroes(mins(ms))} : ${withZeroes(secs(ms))}`
);

export const Timer = withStyles(
	timerStylesheet, 
	{ name: "Timer" },
) (
	({ ms, size, classes }) => (
		<Text 
			className={clsx(
				classes.text, 
				classes[size || 'medium'],
			)}
		>
			{formatAsTimer(ms)}
		</Text>
	)
);
