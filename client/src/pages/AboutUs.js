import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import tw from "twin.macro";
import styled from "styled-components"; //eslint-disable-line
import { css } from "styled-components/macro"; //eslint-disable-line
import Header from "components/headers/light.js";
import Footer from "components/footers/SimpleFiveColumn.js";
import MainFeature1 from "components/features/TwoColWithoutButton.js";
import Features from "components/features/ThreeColSimple.js";
import Greeting from "components/features/ThreeColSimpleHeader.js";
import TeamCardGrid from "components/cards/ProfileThreeColGrid.js";

import SupportIconImage from "images/support-icon.svg";
import ShieldIconImage from "images/shield-icon.svg";
import CustomerLoveIconImage from "images/simple-icon.svg";

const Subheading = tw.span`uppercase tracking-wider text-sm text-teal-600`;
export default () => {
  return (
    <AnimationRevealPage>
      <Header />
      <Greeting
        subheading="We Believe"
        heading="Skills are the key to unlocking potential"
        description="Whether you want to learn a new skill, train your teams, or share what you know with the world, you’re in the right place. As a leader in online learning, we’re here to help you achieve your goals and transform your life."
      />
      <MainFeature1
        subheading={<Subheading> </Subheading>}
        heading="Our Vision"
        imageSrc="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=768&q=80"
        description="We believes in the power of high-quality online education to create a better future for all. Through Eduject, our online learning platform, we see a world where learners everywhere have access to expert-led educational experiences and flexible pathways to personal and professional achievement."
      />
      <MainFeature1
        subheading={<Subheading> Our story </Subheading>}
        heading="Delivering world-class learning outcomes at scale"
        imageSrc="https://images.unsplash.com/3/doctype-hi-res.jpg?ixlib=rb-1.2.1&auto=format&fit=crop&w=768&q=80"
        description="Guided by our founding mission to eliminate the back row in higher education, Eduject has spent over 15 years advancing the technology and innovation to deliver world-class learning outcomes at scale. In 2021, Eduject created a global online learning platform that has delivered life-changing learning experiences to millions of people worldwide."
        textOnLeft={false}
      />
      <MainFeature1
        subheading={<Subheading> </Subheading>}
        heading="Helping great organizations create greater opportunity"
        imageSrc="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=768&q=80"
        description="Universities and institutions partner with us to bring high-quality online education to learners across the globe.
On Eduject, we offer thousands of courses, professional certificates, boot camps, credit-bearing micro credentials, and undergraduate and graduate degrees. We also create an impact at every level of industry-leading organizations."
      />

      <Features
        subheading={<Subheading>Our Values</Subheading>}
        heading="We follow these."
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        cards={[
          {
            imageSrc: SupportIconImage,
            title: "24/7 Support",
            description:
              "Lorem ipsum donor amet siti ceali placeholder text alipiscing elit sed do eiusmod temport",
          },
          {
            imageSrc: ShieldIconImage,
            title: "Strong Teams",
            description:
              "Lorem ipsum donor amet siti ceali placeholder text alipiscing elit sed do eiusmod temport",
          },
          {
            imageSrc: CustomerLoveIconImage,
            title: "Customer Satisfaction",
            description:
              "Lorem ipsum donor amet siti ceali placeholder text alipiscing elit sed do eiusmod temport",
          },
        ]}
        linkText=""
      />
      <TeamCardGrid subheading={<Subheading>Our Team</Subheading>} />
      <Footer />
    </AnimationRevealPage>
  );
};
