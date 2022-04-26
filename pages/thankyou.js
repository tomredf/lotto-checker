import Contact from '@/components/Contact'

export default function ThankYou() {
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="mb-8 space-y-2 pt-6 text-center md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-primary-500 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
          Thank You
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          Thank you for contacting us. We will be in touch shortly.
        </p>
      </div>
    </div>
  )
}
