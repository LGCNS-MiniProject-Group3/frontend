import { useState, type FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { Button } from '@/components';
import { DEFAULT_ERROR_MESSAGE } from '@/constants/errorMessages';
import { PATHS } from '@/constants/paths';
import { login, signup } from '@/services/auth';
import { useAuthStore } from '@/stores/useAuthStore';

import * as S from './Login.styles';

export default function Login({ signupMode = false }: { signupMode?: boolean }) {
  const navigate = useNavigate();
  const location = useLocation();
  const setTokens = useAuthStore((state) => state.setTokens);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const registeredEmail: string | undefined = location.state?.registeredEmail;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    const form = new FormData(event.currentTarget);
    const email = String(form.get('email')).trim();
    const password = String(form.get('password'));
    setError('');
    setBusy(true);
    try {
      if (signupMode) {
        const name = String(form.get('name')).trim();
        if (!name) throw new Error('이름을 입력해 주세요.');
        if (new TextEncoder().encode(password).length > 72)
          throw new Error('비밀번호는 72바이트 이하로 입력해 주세요.');
        if (password !== form.get('confirm')) throw new Error('비밀번호 확인이 일치하지 않습니다.');
        await signup({ email, password, name });
        navigate(PATHS.LOGIN, { replace: true, state: { registeredEmail: email } });
      } else {
        const result = await login({ email, password });
        setTokens(result.accessToken, result.refreshToken, result.name);
        navigate(result.profileCompleted ? PATHS.HOME : PATHS.USER_INPUT, { replace: true });
      }
    } catch (cause) {
      setError(
        typeof cause === 'object' &&
          cause !== null &&
          'message' in cause &&
          typeof cause.message === 'string'
          ? cause.message
          : DEFAULT_ERROR_MESSAGE,
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <S.Page>
      <S.Body>
        <S.Brand>
          <S.Sigil aria-hidden />
          ReCu
        </S.Brand>
        <S.Title>{signupMode ? '회원가입' : '로그인'}</S.Title>
        <S.Subtitle>
          {signupMode
            ? 'ReCu에서 사용할 계정을 만들어 주세요.'
            : '이메일로 기술블로그 읽기 가이드를 시작하세요.'}
        </S.Subtitle>
        {!signupMode && registeredEmail && (
          <S.Notice role="status">가입이 완료됐어요. 로그인해 주세요.</S.Notice>
        )}
        <S.Form onSubmit={submit}>
          {signupMode && (
            <label>
              이름
              <input name="name" autoComplete="name" maxLength={50} required />
            </label>
          )}
          <label>
            이메일
            <input
              name="email"
              type="email"
              placeholder="name@example.com"
              autoComplete="username"
              maxLength={100}
              defaultValue={signupMode ? '' : registeredEmail}
              required
            />
          </label>
          <label>
            비밀번호
            <input
              name="password"
              type="password"
              autoComplete={signupMode ? 'new-password' : 'current-password'}
              minLength={signupMode ? 8 : undefined}
              placeholder={signupMode ? '8자 이상' : undefined}
              required
            />
          </label>
          {signupMode && (
            <label>
              비밀번호 확인
              <input name="confirm" type="password" autoComplete="new-password" required />
            </label>
          )}
          {error && <S.ErrorText role="alert">{error}</S.ErrorText>}
          <Button type="submit" loading={busy}>
            {signupMode ? '회원가입' : '로그인'}
          </Button>
        </S.Form>
        {busy ? null : (
          <S.Footer>
            {signupMode ? '이미 계정이 있으신가요?' : '처음 이용하시나요?'}
            <Link to={signupMode ? PATHS.LOGIN : PATHS.SIGNUP}>
              {signupMode ? '로그인으로 돌아가기' : '회원가입'}
            </Link>
          </S.Footer>
        )}
      </S.Body>
    </S.Page>
  );
}
