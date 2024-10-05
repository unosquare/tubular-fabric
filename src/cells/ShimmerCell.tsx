import * as React from 'react';
import { keyframes, mergeStyles, mergeStyleSets } from '@fluentui/react';

const holderAnimation = keyframes({
    '0%': {
        transform: 'translateX(-100%)',
    },
    '100%': {
        transform: 'translateX(100%)',
    },
});

const shimmer = keyframes({
    '0%': {
        backgroundPosition: '-1000px 0',
    },
    '100%': {
        backgroundPosition: '1000px 0',
    },
});

mergeStyles(shimmer);
mergeStyles(holderAnimation);

const classes = mergeStyleSets({
    shimmerAnimate: {
        animationName: shimmer,
        animationDuration: '2s',
        animationIterationCount: 'infinite',
        animationTimingFunction: 'linear',
        background: 'linear-gradient(to right, #eff1f3 4%, #e2e2e2 25%, #eff1f3 36%)',
        backgroundSize: '1000px 100%',
        width: '100%',
        height: '100%',
    },
});

export const ShimmerCell: React.FunctionComponent = () => (
    <div className={classes.shimmerAnimate} aria-busy='true'></div>
);
