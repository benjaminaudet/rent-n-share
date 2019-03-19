export default [
  {
    label: 'Sign In',
    icon: 'home',
    url: '/signin',
    auth: false
  },
  {
    label: 'Sign Up',
    icon: 'home',
    url: '/signup',
    auth: false
  },
  {
    label: 'Onboarding',
    icon: 'onboarding',
    url: '/onboarding',
    auth: false,
    nav: 'none'
  },
  {
    label: 'Feed',
    icon: 'feed',
    url: '/feed',
    auth: true
  },
  {
    label: 'Create',
    icon: 'add',
    url: '/create',
    auth: true,
    nav: 'back'
  },
  {
    label: 'Chat',
    icon: 'home',
    url: '/chat',
    auth: true
  },

]