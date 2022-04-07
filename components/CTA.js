import Link from './Link'
import siteMetadata from '@/data/siteMetadata'

export default function CTA() {
  return (
    <div className="">
      <div className="mx-auto max-w-7xl py-0 px-0 sm:px-4 lg:flex lg:items-center lg:justify-between lg:py-8 lg:px-0">
        <h2 className="text-xl font-extrabold tracking-tight text-primary-500 md:text-3xl">
          <span className="block">Ready to learn more?</span>
          <span className="block text-lg text-orange-400 md:text-2xl lg:text-3xl">
            Contact us today.
          </span>
        </h2>
        <div className="mt-8 lg:mt-0">
          <div className="inline-flex rounded-md shadow">
            <Link
              href="/contactus"
              aria-label="Contact"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary-500 px-5 py-3 text-base font-medium text-white hover:bg-primary-600"
            >
              Get started now
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
