import React, { useEffect, useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import { IoReload } from 'react-icons/io5'
import ReactApexCharts from 'react-apexcharts'
import AxiosAdmin from '../../../apis/AxiosAdmin.jsx'

const buildQueryString = (filters) => {
  const params = new URLSearchParams()

  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      params.append(key, value)
    }
  })

  return params.toString()
}
const formatDate = (dateString) => {
  if (!dateString) return ''
  const [year, month, day] = dateString.split('-')
  return `${day}/${month}/${year}`
}

const formatter = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
  minimumFractionDigits: 0,
})

const IncomeStatisticChart = () => {
  const [filterValues, setFilterValues] = useState({
    minDate: '',
    maxDate: '',
  })

  const [minDate, setMinDate] = useState('')
  const [maxDate, setMaxDate] = useState('')

  const [chartOptions, setChartOptions] = useState({
    series: [],
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false,
      },
      animations: {
        enabled: false,
      },
    },
    stroke: {
      width: [5],
      curve: 'smooth',
    },
    xaxis: {
      categories: [],
    },
    yaxis: {
      title: {
        text: 'Thu nhập (VND)',
      },
    },
    legend: {
      show: false,
    },
  })

  const [error, setError] = useState('')

  useEffect(() => {
    const query = buildQueryString(filterValues)
    const getIncomeSummary = async () => {
      try {
        const response = await AxiosAdmin.get(
          `${import.meta.env.VITE_API_URL}/Statistic/IncomeSummary?${query}`,
        )
        const data = response.data

        const dates = Array.from(new Set(data.map((item) => item.updateDate)))

        const seriesData = [
          {
            name: 'Thu nhập',
            data: dates.map((date) => {
              const item = data.find((d) => d.updateDate === date)
              return item ? item.income : 0
            }),
          },
        ]

        setChartOptions((prevOptions) => ({
          ...prevOptions,
          series: seriesData,
          xaxis: {
            categories: dates,
          },
        }))
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu thu nhập', error)
      }
    }

    getIncomeSummary()
  }, [filterValues])

  const validateDates = () => {
    if (!minDate && !maxDate) {
      setError('Vui lòng chọn 1 trong hai ngày.')
      return false
    }

    if (new Date(minDate) > new Date(maxDate)) {
      setError('Ngày bắt đầu không thể lớn hơn ngày kết thúc.')
      return false
    }

    setError('')
    return true
  }

  const handleSearch = () => {
    if (validateDates()) {
      setFilterValues({
        minDate: formatDate(minDate),
        maxDate: formatDate(maxDate),
      })
    }
  }

  const handleReset = () => {
    setFilterValues({ minDate: '', maxDate: '' })
    setMinDate('')
    setMaxDate('')
    setError('')
  }

  return (
    <div className="space-y-10">
      <div className="flex gap-4 items-center bg-[#ece9e9] p-3 rounded-md">
        <label htmlFor="from">Ngày bắt đầu</label>
        <input
          type="date"
          className="rounded-md"
          value={minDate}
          onChange={(e) => setMinDate(e.target.value)}
        />
        <label htmlFor="to">Ngày kết thúc</label>
        <input
          type="date"
          className="rounded-md"
          value={maxDate}
          onChange={(e) => setMaxDate(e.target.value)}
        />
        <button className="bg-white p-1 rounded-md" onClick={handleSearch}>
          <CiSearch size={25} />
        </button>
        <button className="bg-white p-1 rounded-md" onClick={handleReset}>
          <IoReload size={25} />
        </button>
      </div>

      {error && <div className="text-red-500">{error}</div>}

      <div className="w-full">
        {chartOptions.series.map((item) => {
          let sum = 0
          item.data.forEach((value) => {
            sum += value
          })

          return (
            <div
              key={item.name}
              className={`border w-full px-10 py-5 rounded-md cursor-pointer bg-[#e91e63]`}
            >
              <h3 className="text-white text-center text-xl font-semibold">
                Tổng thu nhập
              </h3>
              <p className="text-white text-center text-md font-semibold ">
                {formatter.format(sum)}{' '}
              </p>
            </div>
          )
        })}
      </div>

      <div>
        <ReactApexCharts
          options={chartOptions}
          series={chartOptions.series}
          type="line"
          height={350}
        />
      </div>
    </div>
  )
}

export default IncomeStatisticChart
