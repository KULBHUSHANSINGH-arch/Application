import React from 'react'

const Gallery = () => {
  const [cards, setCards] = useState([
    {
      id: 1,
      title: "Beautiful Sunset",
      description: "A mesmerizing view of the sun setting over the ocean.",
      image: "https://source.unsplash.com/400x300/?sunset",
    },
    {
      id: 2,
      title: "Mountain Peaks",
      description: "Snow-covered mountains under a clear blue sky.",
      image: "https://source.unsplash.com/400x300/?mountains",
    },
    {
      id: 3,
      title: "City Lights",
      description: "A breathtaking night view of a city skyline.",
      image: "https://source.unsplash.com/400x300/?city,night",
    },
  ]);

  return (
    <Grid container spacing={3} sx={{ padding: 3 }}>
      {cards.map((card) => (
        <Grid item xs={12} sm={6} md={4} key={card.id}>
          <Card
            sx={{
              maxWidth: 345,
              borderRadius: "12px",
              boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
              transition: "transform 0.3s ease-in-out",
              "&:hover": { transform: "scale(1.05)" },
            }}
          >
            <CardMedia component="img" height="200" image={card.image} alt={card.title} />
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                {card.title}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {card.description}
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "flex-end" }}>
              <IconButton color="primary">
                <EditIcon />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Gallery
