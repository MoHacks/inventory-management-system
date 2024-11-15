import {React, useState, useEffect} from "react";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import { useGetGeographyQuery } from "state/api";
import Header from "components/Header";
import { ResponsiveChoropleth } from "@nivo/geo";
import { geoData } from "state/geoData";
import { schemeReds } from 'd3-scale-chromatic';

const Geography = (isDashboard = false) => {
    const theme = useTheme();
    const { data } = useGetGeographyQuery();
    const [boxSize, setBoxSize] = useState(window.innerWidth);

    const isNonMediumScreens = useMediaQuery("(min-width: 930px)");

    useEffect(() => {

        const handleResize = () => {
        setBoxSize(window.innerWidth)
        }
        window.addEventListener('resize', handleResize);

        // Clean up event listener on component unmount
        return () => {
        window.removeEventListener('resize', handleResize);
        };
    }, [])
    return (
        <Box m="1.5rem 2.5rem">
        <Header title="GEOGRAPHY" subtitle="Find where your users are located." />
        <Box
            mt="1rem"
            height="35rem"
            width={isDashboard ? "100%" : boxSize / 1.5}
        >
            {data ? (
            <ResponsiveChoropleth
                data={data}
                colors={schemeReds[9]}
                theme={{
                axis: {
                    domain: {
                    line: {
                        stroke: theme.palette.secondary[200],
                    },
                    },
                    legend: {
                    text: {
                        fill: theme.palette.secondary[200],
                    },
                    },
                    ticks: {
                    line: {
                        stroke: theme.palette.secondary[200],
                        strokeWidth: 1,
                    },
                    text: {
                        fill: theme.palette.secondary[200],
                    },
                    },
                },
                legends: {
                    text: {
                        fill: theme.palette.secondary[200],
                    },
                },
                tooltip: {
                    container: {
                        color: theme.palette.mode === "dark" ? theme.palette.primary.main : theme.palette.primary[600],
                    },
                },
                }}
                features={geoData.features}
                margin={{ top: 0, right: 0, bottom: 0, left: 5 }}
                domain={[0, 60]}
                unknownColor="#666666"
                label="properties.name"
                valueFormat=".2s"
                projectionScale={isDashboard ? 75 * (boxSize / 1000) : 150 * (boxSize / 500)} // This scales the map
                projectionTranslation={[0.45, 0.35 * (boxSize / 1000)]} // This moves the map away from the center
                projectionRotation={[0, 0, 0]} 
                borderWidth={1.3}
                borderColor="grey"
                legends={[
                {
                    anchor: isNonMediumScreens ? "bottom-left" : "bottom-left",
                    direction: "column",
                    justify: true,
                    translateX: 0,
                    translateY: -120,
                    itemsSpacing: 0,
                    itemWidth: isNonMediumScreens ? 65 : 65,
                    itemHeight: 18,
                    itemDirection: "left-to-right",
                    itemTextColor: theme.palette.secondary[200],
                    itemOpacity: 1,
                    symbolSize: 18,
                    effects: [
                    {
                        on: "hover",
                        style: {
                        itemTextColor: theme.palette.background.alt,
                        itemOpacity: 1,
                        },
                    },
                    ],
                },
                ]}
            />
            ) : (
            <>Loading...</>
            )}
        </Box>
    </Box>
  );
};

export default Geography;