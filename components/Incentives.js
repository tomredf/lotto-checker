/* This example requires Tailwind CSS v2.0+ */
const incentives = [
  {
    name: 'Free shipping',
    imageSrc: 'https://tailwindui.com/img/ecommerce/icons/icon-shipping-simple.svg',
    description:
      "It's not actually free we just price it into the products. Someone's paying for it, and it's not us.",
  },
  {
    name: '10-year warranty',
    imageSrc: 'https://tailwindui.com/img/ecommerce/icons/icon-warranty-simple.svg',
    description:
      "If it breaks in the first 10 years we'll replace it. After that you're on your own though.",
  },
  {
    name: 'Exchanges',
    imageSrc: 'https://tailwindui.com/img/ecommerce/icons/icon-exchange-simple.svg',
    description:
      "If you don't like it, trade it to one of your friends for something of theirs. Don't send it here though.",
  },
]

export default function Incentives() {
  return (
    <div className="">
      <div className="mx-auto mt-10 max-w-7xl border-t border-b border-gray-200 py-10 pt-10 dark:border-gray-700 sm:px-4 lg:px-0">
        <div className="mx-auto max-w-2xl px-0 lg:max-w-none">
          <div className="max-w-3xl">
            <h2 className="text-xl font-extrabold tracking-tight text-primary-500 md:text-3xl lg:text-4xl">
              We built our business on customer service
            </h2>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-300 md:text-base">
              At the beginning at least, but then we realized we could make a lot more money if we
              kinda stopped caring about that. Our new strategy is to write a bunch of things that
              look really good in the headlines, then clarify in the small print but hope people
              don't actually read it.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-y-10 gap-x-8 lg:grid-cols-3">
            {incentives.map((incentive) => (
              <div key={incentive.name} className="sm:flex lg:block">
                <div className="sm:flex-shrink-0">
                  <img className="h-16 w-16" src={incentive.imageSrc} alt="" />
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-6 lg:mt-6 lg:ml-0">
                  <h3 className="text-base font-medium text-gray-600 dark:text-gray-300">
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
