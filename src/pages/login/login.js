import { useCallback, useEffect, useState } from "react";

import { Button, Field, Input, Stack } from "@chakra-ui/react"
import { PasswordInput } from "../../components/ui/password-input";
import { useNavigate } from "react-router";
import { isLoggedIn, setLoginCreds } from "../../utils/login";
import './login.css';



export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Navigate to home if already logged in
  useEffect(() => {
    if (isLoggedIn()) {
      navigate('/', { replace: true });
    }
  }, []);

  const onSubmit = useCallback(() => {
    if (!(username === 'poop' && password === 'poop')) return;

    setLoginCreds();
    navigate('/', { replace: true });
  }, [username, password, navigate]);

  return (
    <form onSubmit={onSubmit}>
      <Stack gap="4" align="flex-start" maxW="sm">
        <Field.Root>
          <Field.Label>Username</Field.Label>
          <Input placeholder="Username" variant="subtle" value={username} onChange={(ev) => setUsername(ev.target.value)} />
        </Field.Root>

        <Field.Root>
          <Field.Label>Password</Field.Label>
          <PasswordInput placeholder="Password" variant="subtle" value={password} onChange={(ev) => setPassword(ev.target.value)}/>
        </Field.Root>

        <Button type="submit">Login</Button>
      </Stack>
    </form>
  );
}
