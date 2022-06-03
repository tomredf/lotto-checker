import React, { useState } from 'react'
import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import { useCSVReader } from 'react-papaparse'
import { usePapaParse } from 'react-papaparse'
import { continueFromInitialStream } from 'next/dist/server/node-web-streams-helper'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

export const options = {
  responsive: true,
  /*  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },*/
}

export default function Ranker() {
  const { readRemoteFile } = usePapaParse()
  const [plays, setPlays] = useState(50)
  const [numsToRank, setNumsToRank] = useState(
    '1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49'
  )
  const [labels, setLabels] = useState([])
  const [data, setData] = useState({
    labels: numsToRank.split(' '),
    datasets: [
      {
        label: 'Times drawn',
        data: [],
        backgroundColor: [], //barColours,
        borderColor: [], //barColours(),
        borderWidth: 0,
      },
    ],
  })
  const [results, setResults] = useState([])
  const [barColours, setBarColours] = useState([])
  const [name, setName] = useState('')
  const [icon, setIcon] = useState('/static/images/default.png')
  const [busy, setBusy] = useState(false)
  const [resultsLabel, setResultsLabel] = useState('Results')
  const [gameColours] = useState(['#007EC2', '#EE3124', '#619635', '#F59E0C'])
  //const [colourBC49] = useState('#EE3124')
  //const [colourMAX] = useState('#619635')
  //const [colourGrand] = useState('#F59E0C')

  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

  const getNumsArray = (numString) => {
    const res = numString.split(' ').map(Number)
    setLabels(res)
    return res
  }

  const getColour = () => {
    const o = Math.round,
      r = Math.random,
      s = 255
    return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + r().toFixed(1) + ')'
  }

  const getBarColours = (game) => {
    const colours = []
    const colour = gameColours[game] //'#F59E0C' //getColour()
    let i = 0
    const nums = getNumsArray(numsToRank)
    const arrayLength = nums.length
    for (i = 0; i < arrayLength; i++) {
      colours[i] = colour
    }
    setBarColours(colours)
    return colours
    //console.log(colours)
  }

  const getData = (rankings, game) => {
    const d = {
      labels: numsToRank.split(' '),
      datasets: [
        {
          label: 'Times drawn in the last ' + plays + ' draws',
          data: rankings,
          backgroundColor: getBarColours(game),
          borderColor: barColours,
          borderWidth: 0,
        },
      ],
    }
    setResultsLabel('Results from the last ' + plays + ' draws')
    setData(d)
  }

  const rank649 = (draws, count) => {
    const recentDraws = draws.reverse()
    let arrayLength = recentDraws.length
    if (count > arrayLength) {
      count = arrayLength
    }
    let nums = []
    let i = 0
    let n = 0
    // First get an array of all the numbers drawn
    for (i = 0; i < count; i++) {
      nums[n] = parseInt(recentDraws[i]['NUMBER DRAWN 1'])
      n++
      nums[n] = parseInt(recentDraws[i]['NUMBER DRAWN 2'])
      n++
      nums[n] = parseInt(recentDraws[i]['NUMBER DRAWN 3'])
      n++
      nums[n] = parseInt(recentDraws[i]['NUMBER DRAWN 4'])
      n++
      nums[n] = parseInt(recentDraws[i]['NUMBER DRAWN 5'])
      n++
      nums[n] = parseInt(recentDraws[i]['NUMBER DRAWN 6'])
      n++
    }
    // Now count how many times each number was drawn
    let j = 0
    let rankings = []
    const toRank = getNumsArray(numsToRank)
    arrayLength = toRank.length
    for (j = 0; j < arrayLength; j++) {
      rankings[j] = nums.filter((x) => x === toRank[j]).length
    }
    //console.log(rankings)
    return rankings
  }

  const rankMax = (draws, count) => {
    // Because the Max has multiple winning numbers, we only want the main ones that includes a bonus number.
    // This will be the jackpot numbers and not the Max Millions numbers
    const filteredDraws = draws.filter(function (draw) {
      return draw['BONUS NUMBER'] > 0
    })
    const recentDraws = filteredDraws.reverse()
    let arrayLength = recentDraws.length
    if (count > arrayLength) {
      count = arrayLength
    }
    let nums = []
    let i = 0
    let n = 0
    // First get an array of all the numbers drawn
    for (i = 0; i < count; i++) {
      nums[n] = parseInt(recentDraws[i]['NUMBER DRAWN 1'])
      n++
      nums[n] = parseInt(recentDraws[i]['NUMBER DRAWN 2'])
      n++
      nums[n] = parseInt(recentDraws[i]['NUMBER DRAWN 3'])
      n++
      nums[n] = parseInt(recentDraws[i]['NUMBER DRAWN 4'])
      n++
      nums[n] = parseInt(recentDraws[i]['NUMBER DRAWN 5'])
      n++
      nums[n] = parseInt(recentDraws[i]['NUMBER DRAWN 6'])
      n++
      nums[n] = parseInt(recentDraws[i]['NUMBER DRAWN 7'])
      n++
    }
    // Now count how many times each number was drawn
    let j = 0
    let rankings = []
    const toRank = getNumsArray(numsToRank)
    arrayLength = toRank.length
    for (j = 0; j < arrayLength; j++) {
      rankings[j] = nums.filter((x) => x === toRank[j]).length
    }
    //console.log(rankings)
    return rankings
  }

  const rankGrand = (draws, count) => {
    // Because the Daily Grand can have multiple winning numbers, we only want the main ones that includes a bonus number.
    const filteredDraws = draws.filter(function (draw) {
      return draw['GRAND NUMBER'] > 0
    })
    const recentDraws = filteredDraws.reverse()
    let arrayLength = recentDraws.length
    if (count > arrayLength) {
      count = arrayLength
    }
    let nums = []
    let i = 0
    let n = 0

    // First get an array of all the numbers drawn
    for (i = 0; i < count; i++) {
      nums[n] = parseInt(recentDraws[i]['NUMBER DRAWN 1'])
      n++
      nums[n] = parseInt(recentDraws[i]['NUMBER DRAWN 2'])
      n++
      nums[n] = parseInt(recentDraws[i]['NUMBER DRAWN 3'])
      n++
      nums[n] = parseInt(recentDraws[i]['NUMBER DRAWN 4'])
      n++
      nums[n] = parseInt(recentDraws[i]['NUMBER DRAWN 5'])
      n++
      //nums[n] = parseInt(recentDraws[i]['GRAND NUMBER'])
      //n++
    }
    // Now count how many times each number was drawn
    let j = 0
    let rankings = []
    const toRank = getNumsArray(numsToRank)
    arrayLength = toRank.length
    for (j = 0; j < arrayLength; j++) {
      rankings[j] = nums.filter((x) => x === toRank[j]).length
    }

    return rankings
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
        const rankings = rank649(Array.from(results.data), plays)
        getBarColours()
        getData(rankings, 0)
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
        const rankings = rank649(Array.from(results.data), plays)
        getBarColours()
        getData(rankings, 1)
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
        const rankings = rankMax(Array.from(results.data), plays)
        getBarColours()
        getData(rankings, 2)
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
        const rankings = rankGrand(Array.from(results.data), plays)
        getBarColours()
        getData(rankings, 3)
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
          <span className="block">Rank numbers</span>
          <span className="block text-lg text-secondary-500 md:text-xl lg:text-2xl">
            to see how popular they are
          </span>
        </h2>
        <div>
          <label htmlFor="nums-to-check" className="text-warm-gray-900 block text-sm font-medium">
            Number of draws to check
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
              Rank 649
            </Link>
          </div>
          <div className="mt-3 inline-flex rounded-md shadow">
            <Link
              href="#"
              onClick={() => handleReadBC49()}
              aria-label="Contact"
              className="mr-2 inline-flex items-center justify-center rounded-md border border-transparent bg-primary-500 px-4 py-2 text-base font-medium text-white hover:bg-primary-600"
            >
              Rank BC49
            </Link>
          </div>
          <div className="mt-3 inline-flex rounded-md shadow">
            <Link
              href="#"
              onClick={() => handleReadMax()}
              aria-label="Contact"
              className="mr-2 inline-flex items-center justify-center rounded-md border border-transparent bg-primary-500 px-4 py-2 text-base font-medium text-white hover:bg-primary-600"
            >
              Rank Max
            </Link>
          </div>
          <div className="mb-t inline-flex rounded-md shadow">
            <Link
              href="#"
              onClick={() => handleReadDailyGrand()}
              aria-label="Contact"
              className="mr-2 inline-flex items-center justify-center rounded-md border border-transparent bg-primary-500 px-3.5 py-2 text-base font-medium text-white hover:bg-primary-600"
            >
              Rank Grand
            </Link>
          </div>
        </div>
      </div>
      <div>
        <label htmlFor="nums-to-rank" className="text-warm-gray-900 block text-sm font-medium">
          Numbers to rank
        </label>
        <div className="mt-1">
          <input
            type="text"
            name="nums-to-rank"
            id="nums-to-rank"
            value={numsToRank}
            autoComplete=""
            onChange={(e) => setNumsToRank(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 bg-white text-base text-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
          />
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
        <div className="-mx-4 mt-4 max-h-[55vh] max-w-7xl overflow-y-auto rounded-md shadow sm:-mx-6 md:mx-0">
          <div className="sticky top-0 z-10 inline-flex h-16 w-full items-center rounded-t-md bg-gray-50 py-3 px-2 dark:bg-gray-600 md:h-20">
            <img src={icon} height="30" alt="Game icon" />
            <div className="ml-4 w-full items-center text-xl md:text-3xl">{resultsLabel}</div>
          </div>
          <div>{!busy && <Bar data={data} width={400} height={120} options={options} />}</div>

          {/*{busy && <div className="w-full p-4">Ranking numbers...</div>}*/}
        </div>
      </div>
    </div>
  )
}
