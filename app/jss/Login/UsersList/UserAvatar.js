/**
 * Created by Andy on 2018-02-11.
 */
export const styleSheet = theme => ({
  avatar: {
    width: 49,
    height: 49
  },

  initialsAvatar: {
    fontSize: "0.8rem",
    fontWeight: "700",
    color: theme.colors.primary.secondaryBlue,
    background: theme.colors.primary.white,
    border: `1px solid ${theme.colors.primary.lightGrey}`
  },

  image: {
    width: "100%",
    height: "auto"
  },

  big: {
    fontSize: "1.6rem"
  }
});
