import React, { useState } from "react";
import { motion } from "framer-motion";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { Container, ContentWithPaddingXl } from "components/misc/Layouts.js";
import { SectionHeading } from "components/misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import { ReactComponent as StarIcon } from "images/star-icon.svg";
import { ReactComponent as SvgDecoratorBlob1 } from "images/svg-decorator-blob-5.svg";
import { ReactComponent as SvgDecoratorBlob2 } from "images/svg-decorator-blob-7.svg";

const HeaderRow = tw.div`flex justify-between items-center flex-col xl:flex-row`;
const Header = tw(SectionHeading)``;
const TabsControl = tw.div`flex flex-wrap bg-gray-200 px-2 py-2 rounded leading-none mt-12 xl:mt-0`;

const TabControl = styled.div`
  ${tw`cursor-pointer px-6 py-3 mt-2 sm:mt-0 sm:mr-2 last:mr-0 text-gray-600 font-medium rounded-sm transition duration-300 text-sm sm:text-base w-1/2 sm:w-auto text-center`}
  &:hover {
    ${tw`bg-teal-200 text-gray-700`}
  }
  ${(props) => props.active && tw`bg-teal-500! text-gray-100!`}
  }
`;

const TabContent = tw(
  motion.div
)`mt-6 flex flex-wrap sm:-mr-10 md:-mr-6 lg:-mr-12`;
const CardContainer = tw.div`mt-10 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 sm:pr-10 md:pr-6 lg:pr-12`;
const Card = tw(
  motion.a
)`bg-gray-200 rounded-b block max-w-xs mx-auto sm:max-w-none sm:mx-0`;
const CardImageContainer = styled.div`
  ${(props) =>
    css`
      background-image: url("${props.imageSrc}");
    `}
  ${tw`h-56 xl:h-64 bg-center bg-cover relative rounded-t`}
`;
const CardRatingContainer = tw.div`leading-none absolute inline-flex bg-gray-100 bottom-0 left-0 ml-4 mb-4 rounded-full px-5 py-2 items-end`;
const CardRating = styled.div`
  ${tw`mr-1 text-sm font-bold flex items-end`}
  svg {
    ${tw`w-4 h-4 fill-current text-orange-400 mr-1`}
  }
`;

const CardHoverOverlay = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.5);
  ${tw`absolute inset-0 flex justify-center items-center`}
`;
const CardButton = tw(PrimaryButtonBase)`text-sm bg-teal-500`;

const CardReview = tw.div`font-medium text-xs text-gray-600`;

const CardText = tw.div`p-4 text-gray-900`;
const CardTitle = tw.h5`text-lg font-semibold group-hover:text-teal-500`;
const CardContent = tw.p`mt-1 text-sm font-medium text-gray-600`;
const CardPrice = tw.p`mt-4 text-xl font-bold`;

const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none -z-20 absolute right-0 top-0 h-64 w-64 opacity-15 transform translate-x-2/3 -translate-y-12 text-pink-400`}
`;
const DecoratorBlob2 = styled(SvgDecoratorBlob2)`
  ${tw`pointer-events-none -z-20 absolute left-0 bottom-0 h-80 w-80 opacity-15 transform -translate-x-2/3 text-primary-500`}
`;

export default ({
  heading = "Popular Courses 🔥",
  tabs = {
    Suggestions: [
      {
        imageSrc:
          "https://www.etudemy.com/wp-content/uploads/2022/01/Computer-Courses-in-Perinthalmanna-python-Copy.jpg??ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
        title: "Python for Beginners",
        content:
          "Learn Python like a Professional Start from the basics and go all the way to creating your own applications and games",
        price: "$149.99",
        rating: "5.0",
        reviews: "2,489",
        url: "#",
      },
      {
        imageSrc:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYbsJFulTRg3kb36fs2oHH0rDX5C0uJ6HBDQ&s",
        title: "Expert Python",
        content:
          "Master Python by building 100 projects in 100 days. Learn data science, automation, build websites, games and apps!",
        price: "$189.99",
        rating: "4.8",
        reviews: "4,788",
        url: "#",
      },
      {
        imageSrc: "https://img-b.udemycdn.com/course/480x270/613808_3c1c_6.jpg",
        title: "Leadership: Practical Leadership Skills",
        content:
          "Master leadership skills and leadership techniques with highly practical advice and training",
        price: "$79",
        rating: "4.9",
        reviews: "352",
        url: "#",
      },
      {
        imageSrc:
          "https://rendemy.org/_next/image?url=https%3A%2F%2Fimg-c.udemycdn.com%2Fcourse%2F480x270%2F1362070_b9a1_2.jpg&w=3840&q=100",
        title: "React The Complete Bootcamp 2024",
        content:
          "Dive in and learn React.js from scratch! Learn React, Hooks, Redux, React Router, Next.js, Best Practices and way more!",
        price: "$69.99",
        rating: "4.6",
        reviews: "1,689",
        url: "#",
      },
      {
        imageSrc: "https://img-c.udemycdn.com/course/750x422/638604_c94a_6.jpg",
        title: "Master Diploma : Economics (Includes Macro/Micro)",
        content: "92 HOURS : Micro/Macro/Global Economics",
        price: "$47.89",
        rating: "4.2",
        reviews: "874",
        url: "#",
      },
      {
        imageSrc: "https://img-c.udemycdn.com/course/750x422/8814_0329_5.jpg",
        title: "Creating Responsive Web Design",
        content:
          "Learn how to optimize your webpages for different screen sizes and platforms.",
        price: "$44.99",
        rating: "4.4",
        reviews: "439",
        url: "#",
      },
      {
        imageSrc:
          "https://img-c.udemycdn.com/course/750x422/1643044_e281_5.jpg",
        title: "Graphic Design Masterclass - Learn GREAT Design",
        content:
          "The Ultimate Graphic Design Course Which Covers Photoshop, Illustrator, InDesign, Design Theory, Branding, Logo Design",
        price: "$35.99",
        rating: "3.8",
        reviews: "215",
        url: "#",
      },
      {
        imageSrc: "https://img-c.udemycdn.com/course/750x422/573984_ce2a_3.jpg",
        title: "Social Media Marketing MASTERY 2024 | Ads on 10+ Platforms",
        content:
          "MASTER online marketing on Meta, Pinterest, Instagram, YouTube, Facebook, Google and more ad platforms! Coursenvy",
        price: "$68.79",
        rating: "4.4",
        reviews: "21,455",
        url: "https://www.udemy.com/course/social-media-marketing-ads/?couponCode=ST18MT62524",
      },
    ],
    Day: getRandomCards(),
    Week: getRandomCards(),
    Month: getRandomCards(),
  },
}) => {
  /*
   * To customize the tabs, pass in data using the `tabs` prop. It should be an object which contains the name of the tab
   * as the key and value of the key will be its content (as an array of objects).
   * To see what attributes are configurable of each object inside this array see the example above for "Starters".
   */
  const tabsKeys = Object.keys(tabs);
  const [activeTab, setActiveTab] = useState(tabsKeys[0]);

  return (
    <Container>
      <ContentWithPaddingXl>
        <HeaderRow>
          <Header>{heading}</Header>
          <TabsControl>
            {Object.keys(tabs).map((tabName, index) => (
              <TabControl
                key={index}
                active={activeTab === tabName}
                onClick={() => setActiveTab(tabName)}
              >
                {tabName}
              </TabControl>
            ))}
          </TabsControl>
        </HeaderRow>

        {tabsKeys.map((tabKey, index) => (
          <TabContent
            key={index}
            variants={{
              current: {
                opacity: 1,
                scale: 1,
                display: "flex",
              },
              hidden: {
                opacity: 0,
                scale: 0.8,
                display: "none",
              },
            }}
            transition={{ duration: 0.4 }}
            initial={activeTab === tabKey ? "current" : "hidden"}
            animate={activeTab === tabKey ? "current" : "hidden"}
          >
            {tabs[tabKey].map((card, index) => (
              <CardContainer key={index}>
                <Card
                  className="group"
                  href={card.url}
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                >
                  <CardImageContainer imageSrc={card.imageSrc}>
                    <CardRatingContainer>
                      <CardRating>
                        <StarIcon />
                        {card.rating}
                      </CardRating>
                      <CardReview>({card.reviews})</CardReview>
                    </CardRatingContainer>
                    <CardHoverOverlay
                      variants={{
                        hover: {
                          opacity: 1,
                          height: "auto",
                        },
                        rest: {
                          opacity: 0,
                          height: 0,
                        },
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <CardButton>Enroll</CardButton>
                    </CardHoverOverlay>
                  </CardImageContainer>
                  <CardText>
                    <CardTitle>{card.title}</CardTitle>
                    <CardContent>{card.content}</CardContent>
                    <CardPrice>{card.price}</CardPrice>
                  </CardText>
                </Card>
              </CardContainer>
            ))}
          </TabContent>
        ))}
      </ContentWithPaddingXl>
      <DecoratorBlob1 />
      <DecoratorBlob2 />
    </Container>
  );
};

/* This function is only there for demo purposes. It populates placeholder cards */
const getRandomCards = () => {
  const cards = [
    {
      imageSrc:
        "https://www.etudemy.com/wp-content/uploads/2022/01/Computer-Courses-in-Perinthalmanna-python-Copy.jpg??ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
      title: "Python for Beginners",
      content:
        "Learn Python like a Professional Start from the basics and go all the way to creating your own applications and games",
      price: "$149.99",
      rating: "5.0",
      reviews: "2,489",
      url: "#",
    },
    {
      imageSrc:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYbsJFulTRg3kb36fs2oHH0rDX5C0uJ6HBDQ&s",
      title: "Expert Python",
      content:
        "Master Python by building 100 projects in 100 days. Learn data science, automation, build websites, games and apps!",
      price: "$189.99",
      rating: "4.8",
      reviews: "4,788",
      url: "#",
    },
    {
      imageSrc: "https://img-b.udemycdn.com/course/480x270/613808_3c1c_6.jpg",
      title: "Leadership: Practical Leadership Skills",
      content:
        "Master leadership skills and leadership techniques with highly practical advice and training",
      price: "$79",
      rating: "4.9",
      reviews: "352",
      url: "#",
    },
    {
      imageSrc:
        "https://rendemy.org/_next/image?url=https%3A%2F%2Fimg-c.udemycdn.com%2Fcourse%2F480x270%2F1362070_b9a1_2.jpg&w=3840&q=100",
      title: "React The Complete Bootcamp 2024",
      content:
        "Dive in and learn React.js from scratch! Learn React, Hooks, Redux, React Router, Next.js, Best Practices and way more!",
      price: "$69.99",
      rating: "4.6",
      reviews: "1,689",
      url: "#",
    },
    {
      imageSrc: "https://img-c.udemycdn.com/course/750x422/638604_c94a_6.jpg",
      title: "Master Diploma : Economics (Includes Macro/Micro)",
      content: "92 HOURS : Micro/Macro/Global Economics",
      price: "$47.89",
      rating: "4.2",
      reviews: "874",
      url: "#",
    },
    {
      imageSrc: "https://img-c.udemycdn.com/course/750x422/8814_0329_5.jpg",
      title: "Creating Responsive Web Design",
      content:
        "Learn how to optimize your webpages for different screen sizes and platforms.",
      price: "$44.99",
      rating: "4.4",
      reviews: "439",
      url: "#",
    },
    {
      imageSrc: "https://img-c.udemycdn.com/course/750x422/1643044_e281_5.jpg",
      title: "Graphic Design Masterclass - Learn GREAT Design",
      content:
        "The Ultimate Graphic Design Course Which Covers Photoshop, Illustrator, InDesign, Design Theory, Branding, Logo Design",
      price: "$35.99",
      rating: "3.8",
      reviews: "215",
      url: "#",
    },
    {
      imageSrc: "https://img-c.udemycdn.com/course/750x422/573984_ce2a_3.jpg",
      title: "Social Media Marketing MASTERY 2024 | Ads on 10+ Platforms",
      content:
        "MASTER online marketing on Meta, Pinterest, Instagram, YouTube, Facebook, Google and more ad platforms! Coursenvy",
      price: "$68.79",
      rating: "4.4",
      reviews: "21,455",
      url: "https://www.udemy.com/course/social-media-marketing-ads/?couponCode=ST18MT62524",
    },
  ];

  // Shuffle array
  return cards.sort(() => Math.random() - 0.5);
};
