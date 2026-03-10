export const services = [
  {
    id: 'individual',
    title: {
      en: 'Individual Therapy',
      ka: 'ინდივიდუალური თერაპია'
    },
    description: {
      en: 'One-on-one sessions focused on emotional awareness, patterns, and meaningful change.',
      ka: 'ინდივიდუალური სესიები ემოციურ ცნობიერებაზე, ჩვევებსა და რეალურ ცვლილებაზე ფოკუსით.'
    }
  },
  {
    id: 'remote',
    title: {
      en: 'Remote Sessions',
      ka: 'ონლაინ სესიები'
    },
    description: {
      en: 'Secure online sessions for clients who prefer flexibility or live abroad.',
      ka: 'უსაფრთხო ონლაინ სესიები მათთვის, ვისაც სჭირდება მეტი მოქნილობა ან საზღვარგარეთ ცხოვრობს.'
    }
  },
  {
    id: 'in-person',
    title: {
      en: 'In-Person Sessions',
      ka: 'პირადი შეხვედრები'
    },
    description: {
      en: 'Face-to-face sessions in a private, welcoming office setting.',
      ka: 'პირისპირ შეხვედრები მშვიდ და დაცულ გარემოში.'
    }
  },
  {
    id: 'workshops',
    title: {
      en: 'Workshops & Consultations',
      ka: 'ვორკშოპები და კონსულტაციები'
    },
    description: {
      en: 'Optional themed workshops and professional consultations for groups.',
      ka: 'არჩევითი თემატური ვორკშოპები და პროფესიული კონსულტაციები ჯგუფებისთვის.'
    }
  }
];

export const pricingConfig = {
  showPricing: false,
  items: [
    { label: { en: '50-minute session', ka: '50-წუთიანი სესია' }, value: '80 USD' },
    { label: { en: 'Initial consultation', ka: 'პირველი კონსულტაცია' }, value: '60 USD' }
  ]
};
