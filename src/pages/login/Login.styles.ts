import styled from 'styled-components';
import StarSvg from '@/assets/icons/star.svg?react';

export { Container as Page } from '@/components/gradient-card/GradientCard.styles';

export const Body = styled.div`
  width: min(100%, 28rem);
  padding: 2.5rem;
  border: 1px solid #e8e7ef;
  border-radius: 1.75rem;
  background: white;
  box-shadow: 0 12px 44px rgb(34 27 69 / 6%);
`;

export const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.75rem;
  color: #352753;
  font-size: 1.125rem;
  font-weight: 750;
`;

export const Sigil = styled(StarSvg)`
  width: 2rem;
  height: 2rem;
  padding: 0.38rem;
  border-radius: 0.65rem;
  background: ${({ theme }) => theme.colors.violet.vt200};
`;

export const Title = styled.h1`
  color: #20232c;
  font-size: 2rem;
  font-weight: 750;
  letter-spacing: -0.045em;
  line-height: 1.25;
`;

export const Subtitle = styled.p`
  margin-top: 0.5rem;
  color: #626675;
  font-size: 0.9375rem;
  line-height: 1.6;
`;

export const Form = styled.form`
  display: grid;
  gap: 1rem;
  margin-top: 1.75rem;

  label {
    display: grid;
    gap: 0.45rem;
    color: #383d48;
    font-size: 0.875rem;
    font-weight: 600;
  }

  input {
    width: 100%;
    min-height: 3.125rem;
    padding: 0.8rem 1rem;
    border: 1px solid #dbdee6;
    border-radius: 0.875rem;
    background: #fafbfc;
    color: #20232c;
    font: inherit;
    font-size: 1rem;
    font-weight: 400;
  }

  input::placeholder {
    color: #777e8c;
  }

  input:focus {
    border-color: ${({ theme }) => theme.colors.violet.vt500};
    outline: 3px solid #e8e2ff;
    background: white;
  }

  button {
    min-height: 3.125rem;
    margin-top: 0.35rem;
    border-radius: 0.875rem;
    font-size: 1rem;
    font-weight: 650;
  }

  button:hover:not(:disabled) {
    background: #4028c7;
  }
`;

export const ErrorText = styled.p`
  color: #ae2944;
  font-size: 0.875rem;
  line-height: 1.5;
`;

export const Notice = styled.p`
  margin-top: 1rem;
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  background: #f1edff;
  color: #523493;
  font-size: 0.875rem;
  line-height: 1.5;
`;

export const Footer = styled.p`
  margin-top: 1.35rem;
  color: #686c77;
  font-size: 0.875rem;
  line-height: 1.5;
  text-align: center;

  a {
    margin-left: 0.5rem;
    color: ${({ theme }) => theme.colors.violet.vt500};
    font-weight: 650;
  }

  a:hover,
  a:focus-visible {
    text-decoration: underline;
  }
`;
