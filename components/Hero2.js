//import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import { ChevronRightIcon } from '@heroicons/react/solid'
import Image from './Image'
import Link from './Link'
import CTA from '@/components/CTA'

export default function Hero2() {
  return (
    <div className="relative overflow-hidden">
      <main>
        <div className="pt-5 lg:overflow-hidden lg:pt-10 lg:pt-0 lg:pb-14">
          <div className="mx-auto max-w-7xl lg:px-0">
            <div className="grid md:grid-cols-2 lg:gap-8">
              <div className="mx-auto max-w-7xl px-4 text-center sm:max-w-2xl sm:px-6 md:text-left lg:flex  lg:px-0">
                <div className="lg:py-8">
                  <h1 className="mt-0 text-3xl font-extrabold tracking-tight text-primary-500 sm:mt-0 sm:text-4xl lg:mt-0 xl:text-6xl">
                    <span className="block">Lotto Checker</span>
                    <span className="block text-xl text-secondary-500 md:text-2xl xl:text-3xl">
                      649, BC49, Max, & Daily Grand
                    </span>
                  </h1>
                  <p className="mt-3 text-sm text-gray-600 dark:text-gray-300 sm:mt-5 md:text-base lg:text-lg">
                    This site is only for fun and only applies to the lotteries available in Canada.
                  </p>
                  <div className="mt-10 sm:mt-5">
                    <CTA />
                  </div>
                </div>
              </div>
              <div className="mt-8 lg:relative">
                <div className="max-w-lg px-4 text-center sm:max-w-3xl sm:px-6 md:text-right lg:max-w-none lg:px-0">
                  <Image
                    alt={'Hero image'}
                    src={'/static/images/hero3.svg'}
                    // className="w-full lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                    width={800}
                    height={600}
                    layout="intrinsic"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* More main page content here... */}
      </main>
    </div>
  )
}
