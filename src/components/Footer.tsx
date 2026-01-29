import {
  FooterContainer,
  FooterContent,
  FooterSection,
  FooterTitle,
  FooterLink,
  FooterBottom,
  Copyright
} from '../styles/Footer.styles';

function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterTitle>Shop</FooterTitle>
          <FooterLink href="/products">All Products</FooterLink>
          {/* <FooterLink href="/products">New Arrivals</FooterLink> */}
          <FooterLink href="/products">Best Sellers</FooterLink>
        </FooterSection>

        <FooterSection>
          <FooterTitle>About</FooterTitle>
          <FooterLink href="#">Our Story</FooterLink>
          {/* <FooterLink href="#">Careers</FooterLink> */}
          <FooterLink href="#">Press</FooterLink>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Support</FooterTitle>
          <FooterLink href="#">Contact Us</FooterLink>
          <FooterLink href="#">FAQ</FooterLink>
          {/* <FooterLink href="#">Shipping</FooterLink> */}
        </FooterSection>

        <FooterSection>
          <FooterTitle>Legal</FooterTitle>
          <FooterLink href="#">Privacy Policy</FooterLink>
          <FooterLink href="#">Terms of Service</FooterLink>
          {/* <FooterLink href="#">Refund Policy</FooterLink> */}
        </FooterSection>
      </FooterContent>
      
      <FooterBottom>
        <Copyright>© 2026 Digital Shop. All rights reserved.</Copyright>
      </FooterBottom>
    </FooterContainer>
  );
}

export default Footer;
