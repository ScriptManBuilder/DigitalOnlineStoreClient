import {
  HomeContainer,
  Hero,
  Title,
  Subtitle,
  CTAButton,
  ImageSection,
  ImageCard,
  Features,
  FeatureCard,
  FeatureTitle,
  FeatureDescription
} from '../styles/Home.styles';

function Home() {
  return (
    <HomeContainer>
      <Hero>
        <Title>Discover the joy of gifting with the house's festive creations</Title>
        <Subtitle>
          Premium digital products designed for modern living
        </Subtitle>
        <CTAButton onClick={() => window.location.href = '/products'}>
          Shop Now
        </CTAButton>
      </Hero>

      <ImageSection>
        <ImageCard />
        <ImageCard />
        <ImageCard />
      </ImageSection>

      <Features>
        <FeatureCard>
          <FeatureTitle>Fast Delivery</FeatureTitle>
          <FeatureDescription>
            Get your digital products instantly delivered to your email. No waiting, no shipping fees.
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard>
          <FeatureTitle>Premium Quality</FeatureTitle>
          <FeatureDescription>
            All our products are carefully curated to ensure the highest quality standards.
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard>
          <FeatureTitle>Secure Payments</FeatureTitle>
          <FeatureDescription>
            Shop with confidence using our secure payment system. Your data is always protected.
          </FeatureDescription>
        </FeatureCard>
      </Features>
    </HomeContainer>
  );
}

export default Home;
