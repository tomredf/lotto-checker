/* This example requires Tailwind CSS v2.0+ */
import Image from '@/components/Image'

const incentives = [
  {
    name: 'Text Messaging',
    imageSrc: '/static/images/text-message-icon.png',
    description:
      'Want an easy way to text customers? Want a centralized place where customers can text message you? We can ' +
      'build you a stand-alone app or one you can integrate into your existing website. No more having your employees ' +
      'using there personal mobile phones to text customers',
  },
  {
    name: 'Signature / Image Capture',
    imageSrc: '/static/images/text-message-icon.png',
    description:
      'Need proof of delivery or proof of completion? We can build you a custom solution that will let you staff collect digital signatures' +
      " and/or photos using mobile phones or tablets. Al manged from a central admin screen. It can even work off-line so you don't have to pay for data. ",
  },
  {
    name: 'Custom Forms / Data Collection',
    imageSrc: '/static/images/text-message-icon.png',
    description:
      'Many businesses have very specific needs for data collection. and customer inquires etc. Things like quote requests can involve collecting ' +
      'very specific data from customers. We can build a stand-alone form or one that integrates into your existing website. Can include email and text message notifications.' +
      'Everything can easily be manged from a custom admin screen.',
  },
]

export default function Incentives() {
  return (
    <div className="">
      <div className="mx-auto mt-10 max-w-7xl border-t border-b border-gray-200 py-10 pt-10 dark:border-gray-700 sm:px-4 lg:px-0">
        <div className="mx-auto max-w-2xl px-0 lg:max-w-none">
          <div className="max-w-3xl">
            <h2 className="text-xl font-extrabold tracking-tight text-primary-500 md:text-3xl lg:text-4xl">
              Here are some examples
            </h2>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-300 md:text-base">
              Here are a few examples of the kind of solutions we can provide for you small
              business. These are the types of things that up until recently, only larger companies
              could afford.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-y-10 gap-x-8 lg:grid-cols-3">
            {incentives.map((incentive) => (
              <div key={incentive.name} className="sm:flex lg:block">
                <div className="sm:flex-shrink-0">
                  <Image
                    alt={incentive.name}
                    src={incentive.imageSrc}
                    className="object-cover object-center md:h-36 lg:h-48"
                    width={75}
                    height={75}
                  />
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-6 lg:mt-6 lg:ml-0">
                  <h3 className="text-base font-bold text-gray-600 dark:text-gray-300">
                    {incentive.name}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 md:text-base">
                    {incentive.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
