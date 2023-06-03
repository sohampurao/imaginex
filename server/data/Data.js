import bcrypt from 'bcrypt';
const saltRounds = 10;

const data = {
  admins: [
    {
      firstName: 'test',
      lastName: 'admin',
      email: 'test@gmail.com',
      profileImage:
        'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      password: bcrypt.hashSync('1234', saltRounds),
      isAdmin: true,
    },
    {
      firstName: 'daani',
      lastName: 'lopez',
      email: 'daani@gmail.com',
      profileImage:
        'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      password: bcrypt.hashSync('1234', saltRounds),
      isAdmin: true,
    },
    {
      firstName: 'sample',
      lastName: 'admin',
      email: 'sample@gmail.com',
      profileImage:
        'https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg?resize=768,512',
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
      mediaType: 'matterport',
      title: 'Lorem ipsum dolor sit amet.',
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum, ad? Quidem nam ducimus provident sequi enim, cumque unde corrupti inventore eius vero minus magnam rerum?',
      slug: 'aquant-display-centre',
      category: 'Real Estate',
      admin: {
        firstName: 'joh',
        lastName: 'doe',
        image: '/images/profile/default-profile-picture.webp',
        isAdmin: true,
      },
    },
    {
      path: 'https://my.matterport.com/show/?m=J2hb12qVgeb',
      mediaType: 'matterport',
      title: 'Lorem ipsum dolor sit amet',
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum, ad? Quidem nam ducimus provident sequi enim, cumque unde corrupti inventore eius vero minus magnam rerum?',
      slug: 'welcome-the-new-look-of-pantaloons',
      category: 'Sample Flats',
      admin: {
        firstName: 'elon',
        lastName: 'musk',
        image: '/images/profile/default-profile-picture.webp',
        isAdmin: true,
      },
    },
    {
      path: 'https://my.matterport.com/show/?m=XYZ46qV7SaP',
      mediaType: 'matterport',
      title: 'Lorem ipsum dolor sit amet.',
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum, ad? Quidem nam ducimus provident sequi enim, cumque unde corrupti inventore eius vero minus magnam rerum?',
      category: 'Resale Homes',
      slug: 'starts-360',
      admin: {
        firstName: 'jeff',
        lastName: 'bezos',
        image: '/images/profile/default-profile-picture.webp',
        isAdmin: true,
      },
    },
    {
      path: 'https://my.matterport.com/show/?m=aPWgFkpVrEX',
      mediaType: 'matterport',
      title: 'Lorem ipsum dolor sit amet.',
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum, ad? Quidem nam ducimus provident sequi enim, cumque unde corrupti inventore eius vero minus magnam rerum?',
      slug: 'blobar',
      category: 'Showrooms and Experience Centers',
      admin: {
        firstName: 'jonny',
        lastName: 'liver',
        image: '/images/profile/default-profile-picture.webp',
        isAdmin: true,
      },
    },
  ],
};

export default data;
