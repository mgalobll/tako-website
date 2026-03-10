export type BookingMode = 'redirect' | 'embed';

export const bookingConfig = {
  provider: 'calcom',
  mode: (process.env.NEXT_PUBLIC_CAL_BOOKING_MODE ?? 'embed') as BookingMode,
  inPerson: {
    calLink: process.env.NEXT_PUBLIC_CAL_INPERSON_LINK ?? 'takomakhaldiani/first-session-პირველი-სესია',
    namespace: process.env.NEXT_PUBLIC_CAL_NAMESPACE ?? 'first-session-პირველი-სესია',
    origin: process.env.NEXT_PUBLIC_CAL_ORIGIN ?? 'https://app.cal.eu',
    elementId: 'my-cal-inline-first-session-პირველი-სესია',
    layout: 'month_view',
    theme: 'light'
  }
};
