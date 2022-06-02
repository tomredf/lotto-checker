import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import Papa from 'papaparse'

export default function CTA() {
  return (
    <div className="">
      <div className="mx-auto max-w-7xl py-5 px-0 lg:items-center lg:justify-between lg:px-0 lg:pt-10">
        <h2 className="mb-4 text-xl font-extrabold tracking-tight text-primary-500 md:text-xl lg:text-2xl">
          <span className="block">Let's start by viewing</span>
          <span className="block text-lg text-secondary-500 md:text-xl lg:text-2xl">
            the latest winning numbers
          </span>
        </h2>
        <div className="mt-8 lg:mt-0">
          <div className="inline-flex rounded-md shadow">
            <Link
              href="/view"
              aria-label="Contact"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary-500 px-4 py-2 text-base font-medium text-white hover:bg-primary-600"
            >
              View Winning Numbers
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
