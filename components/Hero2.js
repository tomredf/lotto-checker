//import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import { ChevronRightIcon } from '@heroicons/react/solid'
import Image from './Image'
import Link from './Link'
import CTA from '@/components/CTA'

export default function Checker() {
  return (
    <div className="relative overflow-hidden">
      <main>
        <div className="pt-5 lg:overflow-hidden lg:pt-10 lg:pt-0 lg:pb-14">
          <div className="mx-auto max-w-7xl lg:px-0">
            <div className="grid md:grid-cols-2 lg:gap-8">
              <div className="mx-auto max-w-7xl px-4 text-left sm:max-w-2xl sm:px-6 lg:flex lg:items-center lg:px-0">
                <div className="lg:py-8">
                  <h1 className="mt-0 text-3xl font-extrabold tracking-tight text-primary-500 sm:mt-0 sm:text-4xl lg:mt-0 xl:text-6xl">
                    <span className="block">Lotto Checker</span>
                    <span className="block text-2xl text-secondary-500 md:text-3xl xl:text-4xl">
                      649, BC49, & Max
                    </span>
                  </h1>
                  <p className="mt-3 text-sm text-gray-600 dark:text-gray-300 sm:mt-5 md:text-base lg:text-lg">
                    This is the description
                  </p>
                  {/*<div className="mt-10 sm:mt-5">/!*<CTA />*!/</div>*/}
                </div>
              </div>
              <div className="mt-5 lg:relative lg:m-4">
                <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0">
                  <Image
                    alt={'Hero image'}
                    src={'/static/images/hero3.svg'}
                    className="w-full lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                    width={400}
                    height={400}
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
