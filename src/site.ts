// Site-wide details. Edit these in one place.
export const site = {
  // Full name, used for the browser tab, search engines and the footer.
  name: 'Kyrylo Shliaiev',
  // Shown as the big heading on the home page.
  displayName: 'kyrylo.sh',
  handle: 'striksio',
  tagline: 'Towards Edge AI computer vision',
  intro:
    'I build computer vision pipelines to run on edge devices. Edge AI enthusiast and owner of an Nvidia Jetson Orin Nano.',
  // Photo next to the heading on the home page. Leave image empty to hide it.
  hero: {
    image: '/media/jetson-setup.webp',
    label: 'jetson-orin-nano',
    alt: 'Nvidia Jetson Orin Nano connected to a Raspberry Pi camera module by an orange ribbon cable.',
  },
  // Paste the code from Google Search Console here to verify the site.
  googleSiteVerification: '',
  // Leave empty to hide the email button.
  email: '',
  links: [
    { label: 'GitHub', url: 'https://github.com/striksio' },
    { label: 'Hugging Face', url: 'https://huggingface.co/striksio' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/kyrylo-shliaiev/' },
  ],
  publications: [
    {
      title: 'Laser-prompted real-time object segmentation on smartphones via cloud computing',
      authors: 'Kyrylo Shliaiev, Jinfu Yang',
      venue: 'Journal of Real-Time Image Processing, 23(3), 91',
      year: 2026,
      url: 'https://doi.org/10.1007/s11554-026-01887-z',
      project: 'lprtos',
    },
  ],
};
