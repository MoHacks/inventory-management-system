const { Box } = require("@mui/material");
const { styled } = require("@mui/system");

// styled components is a way to reuse styles (css) in a component-like manner
// Makes a flex component of a Box and centers items within it
const FlexBetween = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
});

export default FlexBetween;


