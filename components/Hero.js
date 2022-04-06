import Image from './Image'
import Link from './Link'
export default function Hero() {
  return (
    <div className="relative">
      <main className="">
        <div className="bg-gray-900 pt-10 sm:pt-16 lg:overflow-hidden lg:pt-8 lg:pb-14">
          <div className="mx-auto max-w-7xl lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8">
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

                {/*<div className="relative h-72 w-full rounded-lg sm:h-72 lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-1/2">*/}
                {/*        <img
          className="absolute inset-0 w-full rounded-lg object-cover"
          src="/static/images/hero1.png"
          alt="hero image"
        />*/}
                <div className="mt-12 -mb-16 sm:-mb-48 lg:relative lg:m-0">
                  <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0">
                    <Image
                      alt={'Hero image'}
                      src={'/static/images/hero1.png'}
                      className="object-center"
                      width={544}
                      height={544}
                      layout="intrinsic"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/*</div>*/}
    </div>
  )
}
