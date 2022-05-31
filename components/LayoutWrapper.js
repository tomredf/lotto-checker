import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo.svg'
import Link from './Link'
import Image from './Image'
import SectionContainer from './SectionContainer'
import Footer from './Footer'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import toast, { Toaster } from 'react-hot-toast'

const LayoutWrapper = ({ children }) => {
  return (
    <SectionContainer>
      <div className="flex h-screen flex-col justify-between">
        <header
          className="sticky top-0 z-50 mb-5 flex items-center justify-between border-b border-gray-200 bg-white 
        bg-opacity-75 py-3 backdrop-blur-md dark:border-gray-700 dark:bg-gray-900 dark:bg-opacity-75 sm:mb-5"
        >
          <div>
            <Link href="/" aria-label={siteMetadata.headerTitle}>
              <Image
                alt={'logo'}
                src={'/static/images/logo2.png'}
                // className="object-cover object-center md:h-36 lg:h-48"
                width={300}
                height={75}
              />
              {/*              <div className="flex items-center justify-between">
                <div className="mr-3">
                  <Logo />
                </div>
                {typeof siteMetadata.headerTitle === 'string' ? (
                  <div className="hidden h-6 text-2xl font-semibold sm:block">
                    {siteMetadata.headerTitle}
                  </div>
                ) : (
                  siteMetadata.headerTitle
                )}
              </div>*/}
            </Link>
          </div>
          <div className="flex items-center text-base leading-5">
            <div className="hidden sm:block">
              {headerNavLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="p-1 font-medium text-gray-900 dark:text-gray-100 sm:p-4"
                >
                  {link.title}
                </Link>
              ))}
            </div>
            <ThemeSwitch />
            <MobileNav />
          </div>
        </header>
        <main className="mb-auto">{children}</main>
        <Footer />
        <Toaster
          toastOptions={{
            className: '',
            style: {
              border: '3px solid #029BDF',
              padding: '16px',
              color: '#fff',
              background: '#2c2c2c',
              //background: '#029BDF'
            },
          }}
        />
      </div>
    </SectionContainer>
  )
}

export default LayoutWrapper
