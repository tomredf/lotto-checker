import { useState } from 'react'
import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import { useCSVReader } from 'react-papaparse'
import { usePapaParse } from 'react-papaparse'
import { continueFromInitialStream } from 'next/dist/server/node-web-streams-helper'

export default function Viewer() {
  const { readRemoteFile } = usePapaParse()
  const [plays, setPlays] = useState(3)
  //const [numsToCheckArray, setNumsToCheckArray] = useState([])
  const [results, setResults] = useState([])
  const [name, setName] = useState('')
  const [icon, setIcon] = useState('/static/images/default.png')
  const [busy, setBusy] = useState(false)

  const getNumsArray = (numString) => {
    const res = numString.split(' ').map(Number)
    //setNumsToCheckArray(res)
    return res
  }

  const build649Draws = (draws) => {
    let newDraws = []
    let arrayLength = draws.length - 1
    let dt = ''
    let bonus = 0
    let nums = []
    let i = 0
    for (i = 0; i < arrayLength; i++) {
      nums = []
      dt = draws[i]['DRAW DATE']
      bonus = parseInt(draws[i]['BONUS NUMBER'])
      nums[0] = parseInt(draws[i]['NUMBER DRAWN 1'])
      nums[1] = parseInt(draws[i]['NUMBER DRAWN 2'])
      nums[2] = parseInt(draws[i]['NUMBER DRAWN 3'])
      nums[3] = parseInt(draws[i]['NUMBER DRAWN 4'])
      nums[4] = parseInt(draws[i]['NUMBER DRAWN 5'])
      nums[5] = parseInt(draws[i]['NUMBER DRAWN 6'])
      let draw = {}
      draw.drawDate = dt
      draw.numbersDrawn = nums
      draw.bonusNumber = bonus
      newDraws[i] = draw
    }

    return newDraws
  }

  const buildMaxDraws = (draws) => {
    let newDraws = []
    let arrayLength = draws.length - 1
    let dt = ''
    let bonus = 0
    let nums = []
    let i = 0
    for (i = 0; i < arrayLength; i++) {
      nums = []
      dt = draws[i]['DRAW DATE']
      bonus = parseInt(draws[i]['BONUS NUMBER'])
      nums[0] = parseInt(draws[i]['NUMBER DRAWN 1'])
      nums[1] = parseInt(draws[i]['NUMBER DRAWN 2'])
      nums[2] = parseInt(draws[i]['NUMBER DRAWN 3'])
      nums[3] = parseInt(draws[i]['NUMBER DRAWN 4'])
      nums[4] = parseInt(draws[i]['NUMBER DRAWN 5'])
      nums[5] = parseInt(draws[i]['NUMBER DRAWN 6'])
      nums[6] = parseInt(draws[i]['NUMBER DRAWN 7'])
      let draw = {}
      draw.drawDate = dt
      draw.numbersDrawn = nums
      draw.bonusNumber = bonus
      newDraws[i] = draw
    }

    return newDraws
  }

  const buildGrandDraws = (draws) => {
    let newDraws = []
    let arrayLength = draws.length - 1
    let dt = ''
    let bonus = 0
    let nums = []
    let i = 0
    for (i = 0; i < arrayLength; i++) {
      nums = []
      dt = draws[i]['DRAW DATE']
      nums[0] = parseInt(draws[i]['NUMBER DRAWN 1'])
      nums[1] = parseInt(draws[i]['NUMBER DRAWN 2'])
      nums[2] = parseInt(draws[i]['NUMBER DRAWN 3'])
      nums[3] = parseInt(draws[i]['NUMBER DRAWN 4'])
      nums[4] = parseInt(draws[i]['NUMBER DRAWN 5'])
      nums[5] = parseInt(draws[i]['GRAND NUMBER'])
      let draw = {}
      draw.drawDate = dt
      draw.numbersDrawn = nums
      draw.bonusNumber = bonus
      newDraws[i] = draw
    }

    return newDraws
  }

  const isSubset = (arr1, arr2, m, n) => {
    let i = 0
    let j = 0
    for (i = 0; i < n; i++) {
      for (j = 0; j < m; j++) if (arr2[i] === arr1[j]) break
      if (j === m) return false
    }
    return true
  }

  const pickNums = (numCount, numPlays, pastDraws, game) => {
    //let isIncluded = false
    //let arrayLength = 10
    let res = []
    let n = 0

    const draws = pastDraws.reverse()

    const a1 = draws[0].numbersDrawn
    const a2 = draws[1].numbersDrawn
    const a3 = draws[2].numbersDrawn
    const a4 = draws[3].numbersDrawn
    const a5 = draws[4].numbersDrawn
    const a6 = draws[5].numbersDrawn
    const a7 = draws[6].numbersDrawn
    const a8 = draws[7].numbersDrawn
    const a9 = draws[8].numbersDrawn
    const a10 = draws[9].numbersDrawn

    const numPool = [].concat.apply([], [a1, a2, a3, a4, a5, a6, a7, a8, a9, a10])
    //console.log('Num pool', numPool)
    const numPoolUnique = [...new Set(numPool)]
    //console.log('Num pool unique', numPoolUnique)
    //const randomElement = array[Math.floor(Math.random() * array.length)]

    let randomPlay = []

    function getRandomPlay() {
      randomPlay = []
      let n = numCount
      if (game === 'grand') {
        n = 5
      }
      for (let i = 0; i < n; i++) {
        getRandomNum()
      }

      let x = randomPlay.sort(function (a, b) {
        return a - b
      })
      if (game === 'grand') {
        x.push(Math.floor(Math.random() * 7))
      }
      //console.log('Random Play', randomPlay)
      return x
    }

    function getRandomNum() {
      let isValid = false
      let randomNumIndex = null
      while (isValid === false) {
        randomNumIndex = Math.floor(Math.random() * numPoolUnique.length)
        if (validateRandomNum(numPoolUnique[randomNumIndex]) === true) {
          randomPlay.push(numPoolUnique[randomNumIndex])
          isValid = true
        }
      }
    }

    function validateRandomNum(n) {
      if (randomPlay.includes(n)) {
        return false
      }
      return true
    }

    for (let i = 0; i < numPlays; i++) {
      let draw = {}
      draw.drawDate = ''
      draw.numbersDrawn = getRandomPlay()
      res[n] = draw
      n++
    }

    //console.log('Results', res)
    setResults(res)
    setBusy(false)
  }

  const handleRead649 = () => {
    reset()
    setBusy(true)
    setName('649')
    setIcon('/static/images/649.png')
    readRemoteFile('/static/649.csv', {
      header: true,
      download: true,
      dynamicTyping: true,
      complete: (results) => {
        //const nums = getNumsArray(numsToCheck)
        const draws = build649Draws(Array.from(results.data))
        //setResults(draws.reverse())
        pickNums(6, plays, draws, '649')
        setBusy(false)
      },
    })
  }

  const handleReadBC49 = () => {
    reset()
    setBusy(true)
    setName('BC49')
    setIcon('/static/images/bc49.png')
    readRemoteFile('/static/BC49.csv', {
      header: true,
      download: true,
      dynamicTyping: true,
      complete: (results) => {
        //const nums = getNumsArray(numsToCheck)
        const draws = build649Draws(Array.from(results.data))
        pickNums(6, plays, draws, 'bc49')
        setBusy(false)
      },
    })
  }

  const handleReadMax = () => {
    reset()
    setBusy(true)
    setName('Max')
    setIcon('/static/images/max.png')
    readRemoteFile('/static/MAX.csv', {
      header: true,
      download: true,
      dynamicTyping: true,
      complete: (results) => {
        //const nums = getNumsArray(numsToCheck)
        const draws = buildMaxDraws(Array.from(results.data))
        pickNums(7, plays, draws, 'max')
        setBusy(false)
      },
    })
  }

  const handleReadDailyGrand = () => {
    reset()
    setBusy(true)
    setName('Daily Grand')
    setIcon('/static/images/dailygrand.png')
    readRemoteFile('/static/DailyGrand.csv', {
      header: true,
      download: true,
      dynamicTyping: true,
      complete: (results) => {
        //const nums = getNumsArray(numsToCheck)
        const draws = buildGrandDraws(Array.from(results.data))
        pickNums(6, plays, draws, 'grand')
        setBusy(false)
      },
    })
  }

  const reset = () => {
    setName('')
    setIcon('/static/images/default.png')
    setResults([])
  }

  //////////////////////////////////////////////////////////

  return (
    <div className="">
      <div className="mx-auto max-w-7xl py-5 px-0 lg:flex lg:items-center lg:justify-between lg:px-0 lg:pt-10">
        <h2 className="text-xl font-extrabold tracking-tight text-primary-500 md:text-xl lg:text-2xl">
          <span className="block">Pick numbers</span>
          <span className="block text-lg text-secondary-500 md:text-xl lg:text-2xl">
            from the last 10 draws
          </span>
        </h2>
        <div>
          <label htmlFor="nums-to-check" className="text-warm-gray-900 block text-sm font-medium">
            Number of plays
          </label>
          <div className="mt-1">
            <input
              type="number"
              name="nums-to-check"
              id="nums-to-check"
              value={plays}
              autoComplete=""
              onChange={(e) => setPlays(parseInt(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 bg-white text-base text-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
            />
          </div>
        </div>
        <div className="mt-6 lg:mt-5">
          <div className="mb-3 inline-flex rounded-md shadow">
            <Link
              href="#"
              onClick={() => handleRead649()}
              aria-label="Contact"
              className="mr-2 inline-flex items-center justify-center rounded-md border border-transparent bg-primary-500 px-4 py-2 text-base font-medium text-white hover:bg-primary-600"
            >
              Pick 649
            </Link>
          </div>
          <div className="mt-3 inline-flex rounded-md shadow">
            <Link
              href="#"
              onClick={() => handleReadBC49()}
              aria-label="Contact"
              className="mr-2 inline-flex items-center justify-center rounded-md border border-transparent bg-primary-500 px-4 py-2 text-base font-medium text-white hover:bg-primary-600"
            >
              Pick BC49
            </Link>
          </div>
          <div className="mt-3 inline-flex rounded-md shadow">
            <Link
              href="#"
              onClick={() => handleReadMax()}
              aria-label="Contact"
              className="mr-2 inline-flex items-center justify-center rounded-md border border-transparent bg-primary-500 px-4 py-2 text-base font-medium text-white hover:bg-primary-600"
            >
              Pick Max
            </Link>
          </div>
          <div className="mb-t inline-flex rounded-md shadow">
            <Link
              href="#"
              onClick={() => handleReadDailyGrand()}
              aria-label="Contact"
              className="mr-2 inline-flex items-center justify-center rounded-md border border-transparent bg-primary-500 px-3.5 py-2 text-base font-medium text-white hover:bg-primary-600"
            >
              Pick Grand
            </Link>
          </div>
        </div>
      </div>
      {/*      {results && results.length > 0 && (
        <div>
          {results.map((draw, index) => (
            <div key={index}>
              {draw.drawDate} :
              <div className="items-right ml-2 inline-flex">
                {draw.numbersDrawn.map((num, index) => (
                  <div key={index}>{num}|</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}*/}
      <div className="px-4 md:px-0">
        {/*        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-primary-500">Results</h1>
            <p className="mt-2 text-sm text-secondary-500">
              List of draws that contain the numbers entered.
            </p>
          </div>
        </div>*/}
        <div className="-mx-4 mt-4 max-h-[55vh] max-w-4xl overflow-y-auto rounded-md shadow sm:-mx-6 md:mx-0">
          <div className="sticky top-0 z-10 inline-flex w-full items-center rounded-t-md bg-gray-50 py-3 px-4 dark:bg-gray-600">
            <img src={icon} height="30" alt="Game icon" />
            <div className="ml-4 w-full items-center text-3xl">
              Lucky Numbers ({results.length})
            </div>
          </div>
          <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-600">
            {/*<thead className="bg-gray-50 dark:bg-gray-600">
              <tr className="col-span-7">
                <th
                  scope="col"
                  className="sticky top-0 z-10 col-span-7 bg-gray-50 py-3 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:bg-gray-600 dark:text-gray-50 sm:pl-6"
                >
                  <span className="inline-flex w-full items-center align-bottom">
                    <img src={icon} height="30" alt="Game icon" />
                    <span className="ml-4 w-full items-center text-3xl">
                      Winning Numbers ({results.length})
                    </span>
                  </span>
                </th>
                <th
                  scope="col"
                  className="sticky top-0 z-10 bg-gray-50 px-3 py-3 text-left text-sm font-semibold text-gray-900 dark:bg-gray-600 lg:table-cell"
                ></th>
                <th
                  scope="col"
                  className="sticky top-0 z-10 bg-gray-50 px-3 py-3 text-left text-sm font-semibold text-gray-900 dark:bg-gray-600 sm:table-cell"
                ></th>
                <th
                  scope="col"
                  className="sticky top-0 z-10 bg-gray-50 px-3 py-3 text-left text-sm font-semibold text-gray-900 dark:bg-gray-600"
                ></th>
                <th
                  scope="col"
                  className="sticky top-0 z-10 bg-gray-50 px-3 py-3 text-left text-sm font-semibold text-gray-900 dark:bg-gray-600"
                ></th>
                <th
                  scope="col"
                  className="sticky top-0 z-10 bg-gray-50 px-3 py-3 text-left text-sm font-semibold text-gray-900 dark:bg-gray-600"
                ></th>
                <th
                  scope="col"
                  className="sticky top-0 z-10 bg-gray-50 px-3 py-3 text-left text-sm font-semibold text-gray-900 dark:bg-gray-600"
                ></th>
                {name === 'Max' && (
                  <th
                    scope="col"
                    className="sticky top-0 z-10 bg-gray-50 px-3 py-3 text-left text-sm font-semibold text-gray-900 dark:bg-gray-600"
                  ></th>
                )}
              </tr>
            </thead>*/}
            {!busy && results && results.length > 0 && (
              <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-600 dark:bg-gray-500">
                {results.map((draw, index) => (
                  <tr
                    key={index}
                    className="divide-x divide-gray-200 bg-white dark:divide-gray-600 dark:bg-gray-500"
                  >
                    <td className="w-full max-w-0 py-2 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-gray-100 sm:w-auto sm:max-w-none sm:pl-6">
                      Play {index + 1}
                    </td>
                    {draw.numbersDrawn.map((num, index) => (
                      <td
                        key={index}
                        className="px-3 py-2 text-center text-sm font-normal text-gray-500 dark:text-gray-200 lg:table-cell"
                      >
                        {num}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            )}
          </table>
          {busy && <div className="w-full p-4">Picking lucky numbers...</div>}
        </div>
      </div>
    </div>
  )
}