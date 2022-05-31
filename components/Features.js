import { CheckIcon } from '@heroicons/react/outline'

const features = [
  {
    name: 'Nothing To Install',
    description:
      'One of the big advantages of a web app over native apps, is that there is nothing to install ' +
      'and they are always up-to-date, so users never have to install updates. They also work on any device.',
  },
  {
    name: 'Cost Effective',
    description:
      'Much cheaper than native apps and can be deployed much faster. Onetime payment, no monthly charges unless you want us to ' +
      'provide ongoing support and maintenance.',
  },
  {
    name: 'Secure',
    description:
      'You control who has access to your app. You can choose to make it available to anyone or limit it to internal use only.',
  },
  {
    name: 'Changes & Updates',
    description:
      'When you are ready to add new feature or make changes, we are here to help. We will provide cost estimates on request.',
  },
  {
    name: 'Built Using The Latest Web Tools',
    description:
      'We only use the latest web technology, such as Next.js, React.js, and Tailwindcss. ' +
      'We host everything with Vercel, the same host used by some of the biggest websites,' +
      ' like Uber, MacDonalds, and Ticketmaster.',
  },
  {
    name: "Don't Need a Web App?",
    description:
      'No problem, we can build you a regular website or even a combination of both. Maybe you need a CMS powered website ' +
      'that you can update yourself, we can do that too, using the latest CMS tools such as Prismic CMS.',
  },
]

export default function Features() {
  return (
    <div className="">
      <div className="mx-auto max-w-7xl py-5 px-4 sm:px-6 lg:py-12 lg:px-0">
        <div className="mx-auto max-w-7xl text-left">
          <h2 className="text-xl font-extrabold text-primary-500 md:text-3xl lg:text-4xl">
            The benefits of web apps{' '}
          </h2>
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-300 md:text-lg">
            See what a custom web app can do for your business.
          </p>
        </div>
        <dl className="mt-12 space-y-10 sm:grid sm:grid-cols-1 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
          {features.map((feature) => (
            <div key={feature.name} className="relative">
              <dt>
                <CheckIcon className="absolute h-6 w-6 text-secondary-400" aria-hidden="true" />
                <p className="ml-9 text-sm font-medium leading-6 text-gray-600 dark:text-gray-300 md:text-base">
                  {feature.name}
                </p>
              </dt>
              <dd className="mt-2 ml-9 text-sm text-gray-600 dark:text-gray-300 md:text-base">
                {feature.description}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}
