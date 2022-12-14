import React, { useImperativeHandle, forwardRef } from 'react';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { countBy } from 'lodash';



//export default function ReviewStars(props, _ref) {
const ReviewStars = forwardRef((props, _ref) => {
    const [value, setValue] = React.useState(2);
    //console.log(value);


    useImperativeHandle(_ref, () => ({
        getChildStars: () => {
            return value;
        }
    }))

    return (
        <div>
            <Box align="left" component="fieldset" mb={3} borderColor="transparent">
                < Typography component="legend" > Please leave your rating here...</Typography >
                <Rating
                    value={value}
                    max={10}
                    defaultValue={2}
                    name="customized-10"
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    onClick={props.handleInputChange}
                />
            </Box>
        </div>
    );
});
export default React.memo(ReviewStars);
//};


