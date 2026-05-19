const MOCK_DELAY_MS = 1200;

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export type MockAuthResult = {
  success: boolean;
  message: string;
};

export async function mockLogin(_email: string): Promise<MockAuthResult> {
  await delay(MOCK_DELAY_MS);
  return {
    success: true,
    message: "Signed in successfully. (Mock — no backend connected.)",
  };
}

export async function mockRegister(_email: string): Promise<MockAuthResult> {
  await delay(MOCK_DELAY_MS);
  return {
    success: true,
    message: "Account created successfully. (Mock — no backend connected.)",
  };
}
