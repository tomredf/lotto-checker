import Image from './Image'
import Link from './Link'
export default function Hero() {
  return (
    <div className="relative">
      <main className="lg:relative">
        <div className="mx-auto w-full max-w-7xl pt-16 pb-20 text-center lg:py-6 lg:text-left">
          <div className="px-0 sm:px-0 lg:w-1/2 xl:pr-16">
            <h1 className="text-4xl font-extrabold tracking-tight text-white dark:text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
              <span className="block text-primary-500 xl:inline">Apps to enrich your</span>{' '}
              <span className="block text-orange-500 xl:inline">small business</span>
            </h1>
            <p className="mx-auto mt-3 max-w-md text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl">
              Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat
              commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.
            </p>
            <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
              <div className="rounded-md shadow">
                <a
                  href="#"
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 md:py-4 md:px-10 md:text-lg"
                >
                  Get started
                </a>
              </div>
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <a
                  href="#"
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-indigo-600 hover:bg-gray-50 md:py-4 md:px-10 md:text-lg"
                >
                  Live demo
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <div className="relative h-72 w-full rounded-lg sm:h-72 lg:absolute lg:inset-y-10 lg:right-0 lg:h-full lg:w-1/2">
        <img
          className="absolute inset-0 w-full rounded-lg object-cover"
          src="/static/images/signature-app-hero.jpg"
          alt="hero image"
        />
      </div>
    </div>
  )
}
