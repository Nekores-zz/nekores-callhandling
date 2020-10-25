export const recordButtonStylesheet = (theme) => ({

	root: {
		backgroundColor: theme.colors.primary.errorRed,
		color: theme.colors.primary.white,
	},

	recording: {
		backgroundColor: theme.colors.primary.white,
		border: `2px solid ${theme.colors.primary.errorRed}`,
		borderRadius: 2,
		boxShadow: 'none',
		color: theme.colors.primary.errorRed,
	},
  
});
