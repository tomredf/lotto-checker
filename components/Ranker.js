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

  function hexToRGBA(hex, opacity) {
    return (
      'rgba(' +
      (hex = hex.replace('#', ''))
        .match(new RegExp('(.{' + hex.length / 3 + '})', 'g'))
        .map(function (l) {
          return parseInt(hex.length % 2 ? l + l : l, 16)
        })
        .concat(isFinite(opacity) ? opacity : 1)
        .join(',') +
      ')'
    )
  }

  // Bar chart configuration
  const options = {
    responsive: true,
    padding: 10,
    plugins: {
      legend: {
        position: 'bottom',
      },
      tooltip: {
        padding: 20,
        caretPadding: 5,
        caretSize: 7,
        displayColors: false,
        backgroundColor: hexToRGBA('#F43F5F', 0.9),
        titleColor: 'white',
        titleFont: { size: 20, weight: 'bold', family: 'Helvetica', lineHeight: 1.5 },
        bodyColor: 'white',
        bodyFont: { size: 16, weight: 'bold', family: 'Helvetica', lineHeight: 1.5 },
      },
      title: {
        display: false,
        text: 'Chart.js Bar Chart',
      },
    },
  }

  const getColour = () => {
    const o = Math.round,
      r = Math.random,
      s = 255
    return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + r().toFixed(1) + ')'
  }

  const getBarColours = (game, opacity) => {
    const colours = []
    const colour = gameColours[game] //'#F59E0C' //getColour()
    const rgba = hexToRGBA(colour, opacity)
    let i = 0
    const nums = getNumsArray(numsToRank)
    const arrayLength = nums.length
    for (i = 0; i < arrayLength; i++) {
      colours[i] = rgba
    }
    setBarColours(colours)
    return colours
    //console.log(colours)
  }

  const getData = (rankings, game, count) => {
    const d = {
      labels: numsToRank.split(' '),
      datasets: [
        {
          label: 'Times drawn in the last ' + count + ' draws',
          data: rankings,
          backgroundColor: getBarColours(game, 0.6),
          borderColor: getBarColours(game, 0.9),
          borderWidth: 2,
          borderRadius: 5,
          hoverBorderWidth: 3,
          barPercentage: 0.75,
          pointStyle: 'circle',
          inflateAmount: 'auto',
        },
      ],
    }

    setData(d)
  }

  const rank649 = (draws, count) => {
    const recentDraws = draws.reverse()
    let arrayLength = recentDraws.length
    if (count > arrayLength) {
      count = arrayLength
    }
    setResultsLabel('Results from the last ' + count + ' draws')
    //setPlays(count)
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
    //setPlays(count)
    return [rankings, count]
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
    setResultsLabel('Results from the last ' + count + ' draws')
    //setPlays(count)
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
    //setPlays(count)
    return [rankings, count]
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
    setResultsLabel('Results from the last ' + count + ' draws')
    //setPlays(count)
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
    //setPlays(count)
    return [rankings, count]
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
        const [rankings, count] = rank649(Array.from(results.data), plays)
        //getBarColours(0)
        getData(rankings, 0, count)
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
        const [rankings, count] = rank649(Array.from(results.data), plays)
        //getBarColours(1)
        getData(rankings, 1, count)
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
        const [rankings, count] = rankMax(Array.from(results.data), plays)
        //getBarColours(2)
        getData(rankings, 2, count)
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
        const [rankings, count] = rankGrand(Array.from(results.data), plays)
        //getBarColours(3)
        getData(rankings, 3, count)
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
          <div className="sticky top-0 z-10 inline-flex h-16 w-full items-center rounded-t-md bg-gray-50 py-3 px-2 dark:bg-gray-700 md:h-20">
            <img src={icon} height="30" alt="Game icon" />
            <div className="ml-4 w-full items-center text-xl md:text-3xl">{resultsLabel}</div>
          </div>
          <div className="bg-white py-3 px-2 dark:bg-gray-800">
            {!busy && <Bar data={data} width={400} height={100} options={options} />}
          </div>

          {/*{busy && <div className="w-full p-4">Ranking numbers...</div>}*/}
        </div>
      </div>
    </div>
  )
}
