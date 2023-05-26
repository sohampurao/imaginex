import bcrypt from 'bcrypt';
const saltRounds = 10;

const data = {
  admins: [
    {
      firstName: 'test',
      lastName: 'admin',
      email: 'test@gmail.com',
      password: bcrypt.hashSync('1234', saltRounds),
      isAdmin: true,
    },
    {
      firstName: 'john',
      lastName: 'doe',
      email: 'john@gmail.com',
      password: bcrypt.hashSync('1234', saltRounds),
      isAdmin: true,
    },
    {
      firstName: 'sample',
      lastName: 'admin',
      email: 'sample@gmail.com',
      password: bcrypt.hashSync('1234', saltRounds),
      isAdmin: true,
    },
  ],
  items: [
    {
      image: '/images/carousel-image1.jpg',
      title: 'First slide label',
      subtitle:
        'Some Some representative placeholder content for the first slide.',
    },
    {
      image: '/images/carousel-image2.jpg',
      title: 'Second slide label',
      subtitle:
        'Some Some representative placeholder content for the Second slide.',
    },
    {
      image: '/images/carousel-image3.jpg',
      title: 'Third slide label',
      subtitle:
        'Some Some representative placeholder content for the Third slide.',
    },
  ],
  blogposts: [
    {
      path: 'https://my.matterport.com/show/?m=p7gSLGcPg2x',
      title: 'Lorem ipsum dolor sit amet.',
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum, ad? Quidem nam ducimus provident sequi enim, cumque unde corrupti inventore eius vero minus magnam rerum?',
      slug: 'aquant-display-centre',
      category: 'Real Estate',
      admin: {
        firstName: 'joh',
        lastName: 'doe',
        image: '/images/profile/profile-picture.webp',
        isAdmin: true,
      },
    },
    {
      path: 'https://my.matterport.com/show/?m=J2hb12qVgeb',
      title: 'Lorem ipsum dolor sit amet',
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum, ad? Quidem nam ducimus provident sequi enim, cumque unde corrupti inventore eius vero minus magnam rerum?',
      slug: 'welcome-the-new-look-of-pantaloons',
      category: 'sample Flats',
      admin: {
        firstName: 'elon',
        lastName: 'musk',
        image: '/images/profile/profile-picture.webp',
        isAdmin: true,
      },
    },
    {
      path: 'https://my.matterport.com/show/?m=XYZ46qV7SaP',
      title: 'Lorem ipsum dolor sit amet.',
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum, ad? Quidem nam ducimus provident sequi enim, cumque unde corrupti inventore eius vero minus magnam rerum?',
      category: 'Resale Homes',
      slug: 'starts-360',
      admin: {
        firstName: 'jeff',
        lastName: 'bezos',
        image: '/images/profile/profile-picture.webp',
        isAdmin: true,
      },
    },
    {
      path: 'https://my.matterport.com/show/?m=aPWgFkpVrEX',
      title: 'Lorem ipsum dolor sit amet.',
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum, ad? Quidem nam ducimus provident sequi enim, cumque unde corrupti inventore eius vero minus magnam rerum?',
      slug: 'blobar',
      category: 'Showrooms & Experience Centers',
      admin: {
        firstName: 'jonny',
        lastName: 'liver',
        image: '/images/profile/profile-picture.webp',
        isAdmin: true,
      },
    },
  ],
};

export default data;
