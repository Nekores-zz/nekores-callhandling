import PropTypes from "prop-types";

export const search = (string, strings) => {
    let includes = (s0) => (s1) => s1.includes(s0);
    return strings.find(includes(string));
};
