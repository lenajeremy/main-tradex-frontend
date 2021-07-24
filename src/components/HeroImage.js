import React from 'react';
import {motion } from 'framer-motion';
import {Close} from '@material-ui/icons';

const HeroImage = ({imageUrl}) => {
    return (
        <motion.div className = 'p-4' layoutId = {imageUrl}>
            <div className = 'd-flex justify-content-end'><Close/></div>
            <img src = {imageUrl} alt = {imageUrl}/>
        </motion.div>
    );
}

export default HeroImage;