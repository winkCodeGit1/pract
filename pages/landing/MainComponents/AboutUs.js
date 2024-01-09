import { Grid, Card, CardContent, CardMedia, Typography, Container, Paper } from '@mui/material/';

import Image1 from '../../../assets/Images/Image1.jpg';
import Image2 from '../../../assets/Images/Image2.jpg';
import Image3 from '../../../assets/Images/Image3.jpg';

const cardDetails = [
  {
    title: 'Doctor',
    image: Image1,
    content: `Doctors are in charge of one of the most pivotal aspects of society, which is
healthcare. In modern times of increased health problems where healthcare has
become expensive, we have to look up to the good doctors who are working for
humanity without asking for anything in return. We discussed the various reasons
why a doctor is essential to uphold the social system.`,
  },
  {
    title: 'Virus',
    image: Image2,
    content: `Viruses consist of short sequences of nucleic acid, which can be in the form of
ribonucleic acid (RNA) or deoxyribonucleic acid (DNA) as their genetic material.
As compared to most other organisms where DNA is always a double-stranded
structure, viruses are unique because their DNA or RNA material can be either
single-stranded or double-stranded.`,
  },
  {
    title: 'Heart',
    image: Image3,
    content: `The heart is a fist-sized organ that pumps blood throughout your body. It’s the
primary organ of your circulatory system.Your heart contains four main sections
(chambers) made of muscle and powered by electrical impulses. Your brain and
nervous system direct your heart’s function.Your heart is located in the front of
your chest. It sits slightly behind and to the left of your sternum (breastbone).`,
  },
];

export default function AboutUs() {
  // const classes = useStyles();

  return (
    <Container sx={{ pt: 4 }}>
      <Typography color='primary' variant='h5' component='h2' gutterBottom align='center'>
        About BEL Hospital
      </Typography>

      <Typography
        variant='body2'
        color='textSecondary'
        sx={{ textAlign: 'center', fontWeight: '500' }}
      >
        Hospital, an institution that is built, staffed, and equipped for the diagnosis of disease;
        for the treatment, both medical and surgical, of the sick and the injured; and for their
        housing during this process. The modern hospital also often serves as a centre for
        investigation and for teaching. Further, one of the most important functions of hospitals is
        that they offer multiple healthcare professionals. It is filled with a host of doctors,
        nurses and interns. When a patient goes to a hospital, many doctors do a routine check-up to
        ensure maximum care. Similarly, when there are multiple doctors in one place, you can take
        as many opinions as you want. Further, you will never be left unattended with the
        availability of such professionals. It also offers everything under one roof.
      </Typography>

      <Grid container spacing={2} sx={{ mt: 4 }}>
        {cardDetails.map((card) => (
          <Grid key={card.title} item xs={12} sm={12} md={6} lg={4}>
            <Paper elevation={2} sx={{ p: 2, height: 1 }}>
              <Card sx={{ maxWidth: 400, height: '100%', backgroundColor: '#BFD1D9' }}>
                <CardMedia
                  component='img'
                  alt={card.title}
                  height='140'
                  image={card.image}
                  title={card.title}
                />
                <CardContent>
                  <Typography gutterBottom variant='h5' component='h2' align='center'>
                    {card.title}
                  </Typography>
                  <Typography
                    variant='body2'
                    color='textSecondary'
                    component='p'
                    style={{ textAlign: 'justify' }}
                  >
                    {card.content}
                  </Typography>
                </CardContent>
              </Card>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
