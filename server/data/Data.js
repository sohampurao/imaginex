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
      path: '/images/house.jpg',
      mediaType: 'image',
      title: 'Lorem ipsum dolor sit amet.',
      description:
        'Lorem ipsum Lorem ipsum dolor sit amet consectetur, provident sequi enim, cumque unde corrupti inventore eius vero minus magnam rerum?dolor sit amet consectetur, adipisicing elit. Rerum, ad? Quidem nam ducimus provident sequi enim, cumque unde corrupti inventore eius vero minus magnam rerum? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum, ad? Quidem nam ducimus provident sequi enim, cumque unde corrupti inventore eius vero minus magnam rerum? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum, ad? Quidem nam ducimus provident sequi enim, cumque unde corrupti inventore eius vero minus magnam rerum?',
      slug: 'aquant-display-centre',
      category: 'Real Estate',
      admin: {
        firstName: 'joh',
        lastName: 'doe',
        profileImage: '/images/profile/default-profile-picture.webp',
        isAdmin: true,
      },
    },
    {
      path: '/videos/sample-video.mp4',
      mediaType: 'video',
      title: 'Lorem ipsum dolor sit amet',
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum, ad? Quidem nam ducimus provident sequi enim, cumque unde corrupti inventore eius vero minus magnam rerum?',
      slug: 'welcome-the-new-look-of-pantaloons',
      category: 'Sample Flats',
      admin: {
        firstName: 'elon',
        lastName: 'musk',
        profileImage: '/images/profile/default-profile-picture.webp',
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
        profileImage: '/images/profile/default-profile-picture.webp',
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
        profileImage: '/images/profile/default-profile-picture.webp',
        isAdmin: true,
      },
    },
  ],
  features: [
    {
      image:
        'https://pexels360.com/wp-content/uploads/2021/11/google-street-iview.png',
      title: 'google map integration',
      description:
        "We put your projects on Google Maps by integrating the virtual tour model with Google street view. This opens up endless opportunities of organic visibility to your project. Google Maps recognizes your virtual tour scans and converts them into it's own virtual tour path thereby giving you twin advantage. Our clients have highly rated this initiative and we continue to offer this to all our clients in our package",
      admin: {
        firstName: 'jonny',
        lastName: 'liver',
        profileImage: '/images/profile/default-profile-picture.webp',
        isAdmin: true,
      },
    },
    {
      image:
        'https://pexels360.com/wp-content/uploads/2021/08/Furniture-info-virtual-tour-1000x1024.jpg',
      title: 'information tagging',
      description:
        "We Tag useful information that you provide like the useful sections, amenities, elements and features of your space within the 3D virtual tour. In short, your space's key USPs, important links and media can go right into the tour itself. A great way to keep your users engaged. Advantage 2 over normal real estate photography and 360 tours. Information tagging in our virtual tours can be of 3 types - Text content tagging, tagging of useful weblinks and tagging a video or image.",
      admin: {
        firstName: 'jonny',
        lastName: 'liver',
        profileImage: '/images/profile/default-profile-picture.webp',
        isAdmin: true,
      },
    },
    {
      image:
        'https://pexels360.com/wp-content/uploads/2021/08/hospitality-dollhouse-virtual-tour3.jpg',
      title: 'information tagging',
      description:
        "Dollhouse and Floor Plan Views give Completeness to our 3D scanning process. Visitors get to see the Dollhouse view or sectional view of the property. From the dollhouse view they'll be able to jump to any section of their interest in the virtual tour model, making it more simpler for the users. This is made possible using Matterport virtual tour technology that is immersive in nature from start to finish. Advantage 3 over normal real estate photography.",
      admin: {
        firstName: 'jeff',
        lastName: 'bezos',
        profileImage: '/images/profile/default-profile-picture.webp',
        isAdmin: true,
      },
    },
  ],
  aboutus: [
    {
      profileImage:
        'https://pbs.twimg.com/profile_images/1485050791488483328/UNJ05AV8_400x400.jpg',
      firstName: 'chetan',
      lastName: 'kumar',
      position: 'Founder',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, quis magnam? Reprehenderit optio quo fugiat perferendis cupiditate, rerum, sequi mollitia dolores quos amet ab ex reiciendis, nulla praesentium inventore iste? Reprehenderit numquam dolores voluptate, hic, dolorum commodi sit ipsa mollitia cumque, assumenda molestias dicta temporibus nulla eum eligendi. In nostrum repudiandae atque quisquam ab nemo laudantium error velit, corporis quia? Perspiciatis nobis optio deserunt voluptatibus adipisci, quae exercitationem! Temporibus quibusdam facilis amet? Porro ducimus distinctio facilis beatae voluptatem totam tempore in, quidem nam nihil eaque pariatur sit, vel dignissimos magnam.',
      facebookURL: '#',
      twitterURL: '#',
      linkedinURL: '#',
      whatsappNo: 9518556937,
      instagramURL: '#',
    },
    {
      profileImage:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeJmFW_rzPyuJUmTEmTk9ZLB7u1CmTclyKCA&usqp=CAU',
      firstName: 'SHAILESH',
      lastName: 'TORASKAR',
      position: 'co-founder',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, quis magnam? Reprehenderit optio quo fugiat perferendis cupiditate, rerum, sequi mollitia dolores quos amet ab ex reiciendis, nulla praesentium inventore iste? Reprehenderit numquam dolores voluptate, hic, dolorum commodi sit ipsa mollitia cumque, assumenda molestias dicta temporibus nulla eum eligendi. In nostrum repudiandae atque quisquam ab nemo laudantium error velit, corporis quia? Perspiciatis nobis optio deserunt voluptatibus adipisci, quae exercitationem! Temporibus quibusdam facilis amet? Porro ducimus distinctio facilis beatae voluptatem totam tempore in, quidem nam nihil eaque pariatur sit, vel dignissimos magnam.',
      facebookURL: '#',
      twitterURL: '#',
      linkedinURL: '#',
      whatsappNo: 9518556937,
      instagramURL: '#',
    },
  ],
  ourwork: [
    {
      title: 'POPULAR PROJECTS',
      description:
        'These are Matterport virtual tour projects that we had most fun shooting and also the most liked by our visitors, clients and prospects. We ensure most of our commercial and residential projects get integrated on google maps and by doing so we ensure lot of visitors see our client’s spaces via street view. All our virtual tours are created with Matterport Pro 2 and the following once are some favourites. P.S – these are as of feb 2022. If you are a frequent visitor to our site, you will find lot more 360 virtual tours getting added to the popular list.',
      work: [
        {
          thumbnail:
            'https://media.designcafe.com/wp-content/uploads/2023/01/31151510/contemporary-interior-design-ideas-for-your-home.jpg',
          title: 'Matterport Virtual Tour The Address Moshi Pune',
          description:
            'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum, ad? Quidem nam ducimus provident sequi enim, cumque unde corrupti inventore eius vero minus magnam rerum?',
          model: 'https://my.matterport.com/show/?m=XYZ46qV7SaP',
        },
        {
          thumbnail:
            'https://thestoreys.in/wp-content/uploads/2022/08/3d-rendering-modern-dining-room-living-room-with-luxury-decor-1300x698.jpg',
          title:
            'Marc Salon & Furniture Equipments Virtual Showroom – Matterport',
          description:
            'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum, ad? Quidem nam ducimus provident sequi enim, cumque unde corrupti inventore eius vero minus magnam rerum?',
          model: 'https://my.matterport.com/show/?m=XYZ46qV7SaP',
        },
        {
          thumbnail:
            'https://5.imimg.com/data5/SELLER/Default/2022/12/RG/PR/AQ/34203483/flat-interior-designing-service-500x500.jpg',
          title: 'Monarch Aqua 3BHK Bengaluru Virtual Tour',
          description:
            'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum, ad? Quidem nam ducimus provident sequi enim, cumque unde corrupti inventore eius vero minus magnam rerum?',
          model: 'https://my.matterport.com/show/?m=XYZ46qV7SaP',
        },
        {
          thumbnail:
            'https://static.asianpaints.com/content/dam/asianpaintsbeautifulhomes/home-decor-advice/design-and-style/nine-small-house-interior-design-hacks/Title-two-seater-couches-and-wall--mounts-design-hack.jpg',
          title: 'Matterport Virtual Tour of Sanskruti Luxury Villa 2BHK',
          description:
            'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum, ad? Quidem nam ducimus provident sequi enim, cumque unde corrupti inventore eius vero minus magnam rerum?',
          model: 'https://my.matterport.com/show/?m=XYZ46qV7SaP',
        },
      ],
    },
    {
      title: 'RESIDENTIAL PROJECTS',
      description:
        'Since inception, 80% of our work has been into residential real estate (New live projects and resale homes alike). Matterport virtual tours is the best way of marketing and showcasing residential units of different types. Our work has helped builders and developers garner better marketing strategies and reaching larger set of users. It is a great mix to have (Online and Offline). Going virtual helps individual home owners too to sell faster or to simply preserve a digital copy of their home as memory.',
      work: [
        {
          thumbnail:
            'https://media.designcafe.com/wp-content/uploads/2023/01/31151510/contemporary-interior-design-ideas-for-your-home.jpg',
          title: 'Matterport Virtual Tour The Address Moshi Pune',
          description:
            'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum, ad? Quidem nam ducimus provident sequi enim, cumque unde corrupti inventore eius vero minus magnam rerum?',
          model: 'https://my.matterport.com/show/?m=XYZ46qV7SaP',
        },
        {
          thumbnail:
            'https://thestoreys.in/wp-content/uploads/2022/08/3d-rendering-modern-dining-room-living-room-with-luxury-decor-1300x698.jpg',
          title:
            'Marc Salon & Furniture Equipments Virtual Showroom – Matterport',
          description:
            'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum, ad? Quidem nam ducimus provident sequi enim, cumque unde corrupti inventore eius vero minus magnam rerum?',
          model: 'https://my.matterport.com/show/?m=XYZ46qV7SaP',
        },
        {
          thumbnail:
            'https://5.imimg.com/data5/SELLER/Default/2022/12/RG/PR/AQ/34203483/flat-interior-designing-service-500x500.jpg',
          title: 'Monarch Aqua 3BHK Bengaluru Virtual Tour',
          description:
            'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum, ad? Quidem nam ducimus provident sequi enim, cumque unde corrupti inventore eius vero minus magnam rerum?',
          model: 'https://my.matterport.com/show/?m=XYZ46qV7SaP',
        },
        {
          thumbnail:
            'https://static.asianpaints.com/content/dam/asianpaintsbeautifulhomes/home-decor-advice/design-and-style/nine-small-house-interior-design-hacks/Title-two-seater-couches-and-wall--mounts-design-hack.jpg',
          title: 'Matterport Virtual Tour of Sanskruti Luxury Villa 2BHK',
          description:
            'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum, ad? Quidem nam ducimus provident sequi enim, cumque unde corrupti inventore eius vero minus magnam rerum?',
          model: 'https://my.matterport.com/show/?m=XYZ46qV7SaP',
        },
      ],
    },
  ],
};
export default data;
