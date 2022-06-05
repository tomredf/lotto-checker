import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import Papa from 'papaparse'
import React from 'react'

export default function Links() {
  return (
    <div className="">
      <div className="border-t border-gray-200 pt-8 dark:border-gray-700">
        <Link
          className="
                  bg-gradient-to-r from-primary-500
                  via-blue-500 to-secondary-500 bg-[length:0px_3px] bg-left-bottom
                  bg-no-repeat
                  text-lg font-bold
                  text-primary-500
                  transition-[background-size]
                  duration-500
                  hover:bg-[length:100%_3px]
                  dark:text-secondary-500
              "
          href="https://www.playnow.com/lottery/lotto-649/"
        >
          Lotto 649 website
        </Link>
      </div>
      <div className="pt-2">
        <Link
          className="
                  bg-gradient-to-r from-primary-500
                  via-blue-500 to-secondary-500 bg-[length:0px_3px] bg-left-bottom
                  bg-no-repeat
                  text-lg font-bold
                  text-primary-500
                  transition-[background-size]
                  duration-500
                  hover:bg-[length:100%_3px]
                  dark:text-secondary-500
              "
          href="https://www.playnow.com/lottery/bc-49/"
        >
          Lotto BC49 website
        </Link>
      </div>
      <div className="pt-2">
        <Link
          className="
                  bg-gradient-to-r from-primary-500
                  via-blue-500 to-secondary-500 bg-[length:0px_3px] bg-left-bottom
                  bg-no-repeat
                  text-lg font-bold
                  text-primary-500
                  transition-[background-size]
                  duration-500
                  hover:bg-[length:100%_3px]
                  dark:text-secondary-500
              "
          href="https://www.playnow.com/lottery/lotto-max/"
        >
          Lotto MAX website
        </Link>
      </div>
      <div className="pt-2">
        <Link
          className="
                  bg-gradient-to-r from-primary-500
                  via-blue-500 to-secondary-500 bg-[length:0px_3px] bg-left-bottom
                  bg-no-repeat
                  text-lg font-bold
                  text-primary-500
                  transition-[background-size]
                  duration-500
                  hover:bg-[length:100%_3px]
                  dark:text-secondary-500
              "
          href="https://www.playnow.com/lottery/daily-grand/"
        >
          Lotto Daily Grand website
        </Link>
      </div>
    </div>
  )
}
