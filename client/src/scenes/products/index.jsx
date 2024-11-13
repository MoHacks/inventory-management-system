import React, { useState } from 'react';
import { Box, Card, CardActions, CardContent, Collapse, Button, Typography, Rating, useTheme, useMediaQuery } from "@mui/material";
import { useGetProductsQuery } from 'state/api';
import Header from 'components/Header';

const Product = ({id, name, description, price, rating, category, supply, stat}) => {
    const theme = useTheme();
    const [isExpanded, setIsExpanded] = useState(false);
    // console.log("stat: ", stat);
    return (
        <Card
            sx={{
                backgroundImage: "none",
                backgroundColor: theme.palette.secondary[900],
                borderRadius: "0.55rem",
                "& .MuiTypography-root": { 
                            color: theme.palette.secondary[100],
                },
            }}>

            <CardContent>
                <Typography sx={{ fontSize: 14 }} color={theme.palette.secondary[700]} gutterBottom>
                    {category}
                </Typography>
                <Typography variant="h5" component="div">
                    {name}
                </Typography>
                <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
                    ${Number(price).toFixed(2)}
                </Typography>
                <Rating value={rating} readOnly />
                <Typography variant="body2">
                    {description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    variant="primary"
                    size="small"
                    onClick={() => setIsExpanded(!isExpanded)}
                >   
                    {/* If the "See More" button has not been clicked, it will say "See More" */}
                    {isExpanded && ("See Less")}
                    
                    {/* If the "See Less" button has not been clicked, it will say "See More" */}
                    {!isExpanded && ("See More")}
                </Button>
            </CardActions>
            <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography>
                        Supply Left: {supply}
                    </Typography>
                    <Typography>
                        Yearly Sales This Year: {stat[0] ? stat[0].yearly_sales_total : 0}
                    </Typography>
                    <Typography>
                        Yealy Units Sold This Year: {stat[0]? stat[0].yearly_total_sold_units : 0}
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    )
}


const Products = () => {
    // console.log("Within products front end...")
    //isLoading is provided by redux toolkit to determine if data has not come back yet to front end
    const { data, isLoading } = useGetProductsQuery();
    const isNonMobile = useMediaQuery("(min-width: 1000px)");
    // console.log("data: ", data)
    return (
           
        <Box m="1.5rem 2.5rem">
            <Header title="PRODUCTS" subtitle={"See your list of products"} />
            {data || !isLoading ? (
                <Box
                    mt="20px"
                    display="grid"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    justifyContent="space-between"
                    rowGap="20px"
                    columnGap="1.33%"
                    /* the sx targets the immediate div and its desktop screen size, dont set the gridColumn, otherwise it 
                        will target the entire width of mobile screens (span 4) */
                    sx={{
                        "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                        
                    }}
                >
                    {data.map(
                        ({
                        id,
                        name,
                        description,
                        price,
                        rating,
                        category,
                        supply,
                        stat
                    }) => (
                        <Product
                            key={id}
                            // id={id}
                            name={name}
                            description={description}
                            price={price}
                            rating={rating}
                            category={category}
                            supply={supply}
                            stat={stat}
                        />
                        )
                    )}

                </Box>
            ) : (
                <>Loading...</>
            )}
        </Box>
    )
}

export default Products
