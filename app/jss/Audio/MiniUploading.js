export const styleSheet = (theme) => ({
    uploadingTooltip: {
        position: "fixed",
        bottom: 0,
        right: 0,
        width: 500,
        zIndex: 100000,
        opacity: ".9",
    },

    uploadingTooltipExpanded: {
        opacity: 1,
    },

    uploadingTooltipHeader: {
        height: 70,
        paddingLeft: 24,
        alignItems: "center",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        background: "rgb(89,89,89)",
    },

    uploadingTooltipTitle: {
        color: theme.colors.primary.white,
    },

    uploadingTooltipButtons: {
        color: theme.colors.primary.white,
    },

    uploadingTooltipBody: {
        background: "white",
    },
    
    mediumIcon: {
        fontSize: "1.2em",
        width: "40px",
        height: "40px",
        lineHeight: "40px",
    },

    fileIcon: {
    },

    phoneIcon: {
        background: "red",
        backgroundImage: "radial-gradient(circle, red 50%, rgb(230, 140, 140) 70%)",
    },

    browserIcon: {
    },

    circularProgress: {
        color: theme.colors.primary.secondaryBlue,
    },

    typeClass: {
        fontSize: "0.8em",
        position: "relative",
        bottom: -4
    },

    typeIconClass: {
        marginRight: 2,
        marginLeft: theme.spacing.unit * 2,
        position: "relative",
        bottom: -4
    },
});

export const largeMainIconStylesheet = (theme) => ({
	root: {
        fontSize: "1.5em",
        width: "60px",
        height: "60px",
        textAlign: "center",
        lineHeight: "60px",
		backgroundColor: theme.colors.primary.secondaryBlue,
		color: theme.colors.primary.white,
		borderRadius: '50%',
	},
});
