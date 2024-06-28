import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import { ContentWithPaddingXl, Container } from "components/misc/Layouts.js";
import {
  SectionHeading as Heading,
  Subheading as SubheadingBase,
} from "components/misc/Headings.js";
import { ReactComponent as SvgDecoratorBlob1 } from "images/svg-decorator-blob-7.svg";
import { ReactComponent as SvgDecoratorBlob2 } from "images/svg-decorator-blob-8.svg";
import { Link } from "react-router-dom";

const Subheading = tw(SubheadingBase)`text-center text-teal-600`;
const Testimonials = tw.div`flex flex-col lg:flex-row items-center lg:items-stretch`;
const TestimonialContainer = tw.div`mt-16 lg:w-1/3`;
const Testimonial = tw.div`px-4 text-center max-w-xs mx-auto flex flex-col items-center`;
const Image = tw.img`w-20 h-20 rounded-full object-cover`;
const Quote = tw.blockquote`mt-5 text-gray-600 font-medium leading-loose`;
const Course = tw.a`text-blue-600 mt-2`;
const CustomerName = tw.p`mt-5 text-gray-900 font-semibold uppercase text-sm tracking-wide`;

const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none -z-20 absolute left-0 top-0 h-56 w-56 opacity-15 transform -translate-x-2/3 -translate-y-12 text-teal-400`}
`;
const DecoratorBlob2 = styled(SvgDecoratorBlob2)`
  ${tw`pointer-events-none -z-20 absolute right-0 bottom-0 h-64 w-64 opacity-15 transform translate-x-2/3 text-yellow-500`}
`;

export default ({
  subheading = "Our Students",
  heading = "How learners like you are achieving their goals",
  testimonials = [
    {
      imageSrc:
        "https://static.vecteezy.com/system/resources/thumbnails/037/228/523/small/ai-generated-andsome-asian-student-smile-isolated-free-photo.jpg",
      quote:
        "I am proud to say that after a few months of taking this course...I passed my exam and am now an AWS Certified Cloud Practitioner! This content was exactly what the CCP exam covered.",
      course: "https://docs.google.com/",
      customerName: "Anh Nguyễn",
    },
    {
      imageSrc:
        "https://mechse.illinois.edu/_sitemanager/viewphoto.aspx?id=22471&s=350",
      quote:
        "This course helped me freshen up on my product manager skills and land a job at Facebook! Thanks guys :)",
      course: "https://google.com/",
      customerName: "Phan Quốc Bảo",
    },
    {
      imageSrc:
        "https://images.unsplash.com/photo-1580852300654-03c803a14e24?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4.25&w=512&h=512&q=80",
      quote:
        "One of the best courses on management and leadership I have come across so far. The advice is practical, and examples highly relatable. Would help anyone become a better manager.",
      course: "https://google.com/",
      customerName: "Tuấn Curry",
    },
    {
      imageSrc:
        "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg",
      quote:
        "I am a self taught programmer who has been programming for over 30 years. This is the best online course I have ever taken. Angela does an amazing job explaining the concepts and putting them in practice. Well done!",
      course: "https://google.com/",
      customerName: "Alex Ngô",
    },
  ],
}) => {
  return (
    <Container>
      <ContentWithPaddingXl>
        {subheading && <Subheading>{subheading}</Subheading>}
        <Heading>{heading}</Heading>
        <Testimonials>
          {testimonials.map((testimonial, index) => (
            <TestimonialContainer key={index}>
              <Testimonial>
                <Image src={testimonial.imageSrc} />
                <Quote>"{testimonial.quote}"</Quote>
                <Course href={testimonial.course} target={"_blank"}>
                  Go to course
                  {/* or {testinomial.courseName} --- this need to add another attribute to the collection above */}
                </Course>
                <CustomerName>- {testimonial.customerName}</CustomerName>
              </Testimonial>
            </TestimonialContainer>
          ))}
        </Testimonials>
      </ContentWithPaddingXl>

      <DecoratorBlob1 />
      <DecoratorBlob2 />
    </Container>
  );
};
