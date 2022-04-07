import Contact from '@/components/Contact'

export default function ContactUs() {
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="mb-8 space-y-2 pt-6 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-primary-500 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
          Contact Us
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          Interested in discussing a custom web app for you business? Send us a message below.
        </p>
      </div>
      <Contact />
    </div>
  )
}
