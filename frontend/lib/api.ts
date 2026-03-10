export const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8000';

export type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export async function submitContactForm(payload: ContactPayload) {
  const response = await fetch(`${apiBaseUrl}/api/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const fallback = { message: 'Something went wrong. Please try again later.' };
    const body = (await response.json().catch(() => fallback)) as { message?: string };
    throw new Error(body.message ?? fallback.message);
  }

  return response.json();
}
